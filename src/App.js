import './App.css';
import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';

import { Context } from './Util/Context';

import PhoneNav from './Components/Nav/PhoneNav';
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

	const [divAnimation, setDivAnimation] = useState([]);
	return (
		<Context.Provider
			value={{
				testimonialsData: testimonialsData,
				actorsData: actorsData,
				divAnimation: divAnimation,
				setDivAnimation: setDivAnimation,
			}}>
			<div className='App'>
				<header>{window.innerWidth >= 1100 ? <Nav /> : <PhoneNav />}</header>
				<main>
					<Routes>
						<Route
							path='/'
							element={<Home />}
						/>

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
			</div>
		</Context.Provider>
	);
}

export default App;
