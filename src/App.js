import logo from './logo.svg';
import './App.css';
import { Link, Routes, Route } from 'react-router-dom';
import { useState, useRef, createContext, useContext, useEffect } from 'react';
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
import { ACTORS_QUERY, TESTIMONIALS_QUERY } from './Util/GraphQL';

function App() {
	const testimonialsData = useQuery(TESTIMONIALS_QUERY).data;
	const actorsData = useQuery(ACTORS_QUERY).data;

	const [animation, setAnimation] = useState([]);
	const [divAnimation, setDivAnimation] = useState([]);
	const [authorAnimation, setAuthorAnimation] = useState([]);
	const [rects, setRects] = useState([]);
	const [display, setDisplay] = useState([]);

	const [testimonialFocus, setTestimonialFocus] = useState({
		active: null,
		previous: null,
		newState: false,
	});


	return (
		<Context.Provider
			value={{
				// chooseFocus: chooseFocus,
				testimonialsData: testimonialsData,
				actorsData: actorsData,
				animation: animation,
				setAnimation: setAnimation,
				authorAnimation: authorAnimation,
				setAuthorAnimation: setAuthorAnimation,
				divAnimation: divAnimation,
				setDivAnimation: setDivAnimation,
				rects: rects,
				setRects: setRects,
				testimonialFocus: testimonialFocus,
				setTestimonialFocus: setTestimonialFocus,
				display: display,
				setDisplay: setDisplay,
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
