import logo from './logo.svg';
import './App.css';
import { Link, Routes, Route } from 'react-router-dom';
import { useState, useRef, createContext, useContext } from 'react';
import { Context } from './Util/Context';

import Nav from './Components/Nav/Nav';
import Home from './Components/Home/Home';
import ContactUs from './Components/Contact/emailJS';
import Coaching from './Components/Coaching/Coaching';
import Talent from './Components/Talent/Talent';
import About from './Components/About/About';


import Api from './Components/Api/Api';
import ApiActor from './Components/Api/ApiActor/ApiActor';
import ApiTestimonial from './Components/Api/ApiTestimonial/ApiTestimonial';


import { useQuery } from '@apollo/client';
import { ACTORS_QUERY } from './Util/GraphQL';
import { TESTIMONIALS_QUERY } from './Util/GraphQL';

function App() {
	const testimonialsData = useQuery(TESTIMONIALS_QUERY).data;
	const actorsData = useQuery(ACTORS_QUERY).data;

	// const chooseFocus = (e) => {
	// 	e.preventDefault();
	// 	let id;

	// 	if (e.target.id.length) {
	// 		console.log('checking for author');
	// 		id =
	// 			e.target.id.substring(0, 6) === 'author'
	// 				? e.target.id.substring(7)
	// 				: e.target.id;
	// 	} else {
	// 		id = e.target.parentElement.id.substring(7);
	// 	}
	// 	console.log('id: ', id);
	// 	let blockFocus = e.target.id ? 'end' : 'start';
	// 	focusPoints[id].current.scrollIntoView({
	// 		behavior: 'smooth',
	// 		block: blockFocus,
	// 	});
	// };

	return (
		<Context.Provider
			value={{
				// chooseFocus: chooseFocus,
				testimonialsData: testimonialsData,
				actorsData: actorsData,
			}}>
			<div className='App'>
				<header>{window.innerWidth >= 1100 ? <Nav /> : null}</header>
				<main>
					<Routes>
						<Route path='/' element={<Home />} />

						<Route exact path='/contact' element={<ContactUs />} />
						<Route exact path='/talent' element={<Talent />} />
						<Route exact path='/coaching' element={<Coaching />} />
						<Route exact path='/about' element={<About />} />

						<Route path='/api' element={<Api />} />
						<Route exact path='/api/actors' element={<ApiActor />} />
						<Route
							exact
							path='/api/testimonials'
							element={<ApiTestimonial />}
						/>
					</Routes>
				</main>
				<footer>{window.innerWidth < 1100 ? <Nav /> : null}</footer>
			</div>
		</Context.Provider>
	);
}

export default App;
