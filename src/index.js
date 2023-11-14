import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { setContext } from '@apollo/client/link/context';
import {
	ApolloProvider,
	ApolloClient,
	createHttpLink,
	InMemoryCache,
} from '@apollo/client';
import { BrowserRouter as Router } from 'react-router-dom';

const httpLink = createHttpLink({
	uri: process.env.REACT_APP_API,
});

const authLink = setContext((_, { headers }) => {
	// get the authentication token from local storage if it exists
	const token = sessionStorage.getItem('token');
	// return the headers to the context so httpLink can read them
	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : '',
		},
	};
});

export const client = new ApolloClient({
	link: authLink.concat(httpLink),
	cache: new InMemoryCache(),
});

ReactDOM.render(
	<ApolloProvider client={client}>
		<Router>
			<App />
		</Router>
	</ApolloProvider>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

// https://create-react-app.dev/docs/measuring-performance/
const sendToAnalytics = (metric) => {
	const body = JSON.stringify(metric);
	const url = 'https://example.com/analytics';

	if(navigator.sendBeacon){
		navigator.sendBeacon(url, body);
	} else {
		fetch(url, {body, method: 'POST', keepalive: true});
	}
}


reportWebVitals(sendToAnalytics);
