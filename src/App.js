import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';

import Nav from './Components/Nav/Nav';
import Home from './Components/Home/Home';
import ContactUs from './Components/Contact/emailJS';
import Executives from './Components/Executives/Executives';
import Talent from './Components/Talent/Talent';
import Test from './Components/Test/Test';

function App() {
	return (
		<div className='App'>
			<header>
				<Nav />
			</header>
			<main>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route exact path='/test' element={<Test />} />

					<Route exact path='/contact' element={<ContactUs />} />
					<Route exact path='/talent' element={<Talent />} />
					<Route exact path='/executives' element={<Executives />} />
				</Routes>
			</main>
		</div>
	);
}

export default App;
