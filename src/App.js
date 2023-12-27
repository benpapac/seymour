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
import Blog from './Components/Blog/Blog';

import Api from './Components/Api/Api';
import ApiActor from './Components/Api/ApiActor/ApiActor';
import ApiBlog from './Components/Api/ApiBlog/ApiBlog';
import ApiTestimonial from './Components/Api/ApiTestimonial/ApiTestimonial';

import { useQuery } from '@apollo/client';
import { ACTORS_QUERY, BLOGS_QUERY, TESTIMONIALS_QUERY } from './Util/GraphQL';
import ActorAddForm from './Components/Api/ApiActor/AddActorForm';
import AddBlogForm from './Components/Api/ApiBlog/AddBlogForm';
import AddTestimonialForm from './Components/Api/ApiTestimonial/AddTestimonialForm';

function App() {
	const testimonialsData = useQuery(TESTIMONIALS_QUERY).data?.testimonials;
	const actorsData = useQuery(ACTORS_QUERY).data?.actors;
	const blogsData = useQuery(BLOGS_QUERY).data?.blogs

	const [divAnimation, setDivAnimation] = useState({});
	return (
		<Context.Provider
			value={{
				testimonialsData: testimonialsData,
				actorsData: actorsData,
				blogsData: blogsData,
				divAnimation: divAnimation,
				setDivAnimation: setDivAnimation,
			}}>
			<div className='App'>
				<div className='App-bg'/>
				<main>
					{window.innerWidth >= 1100 ? <Nav /> : <PhoneNav />}
					<Routes>
						<Route path='/' element={<Home />} />

						<Route exact path='/contact' element={<ContactUs />} />
						<Route exact path='/talent' element={<Talent />} />
						<Route exact path='/coaching' element={<Coaching />} />
						<Route exact path='/about' element={<About />} />
						<Route exact path='/blog' element={<Blog />} />

						<Route path='/api' element={<Api />} />
						<Route exact path='/api/actors' element={<ApiActor />} />
						<Route exact path='/api/actors/create' element={<ActorAddForm />} />
						<Route exact path='/api/blogs' element={<ApiBlog />} />
						<Route exact path='/api/blogs/create' element={<AddBlogForm />} />
						<Route
							exact
							path='/api/testimonials'
							element={<ApiTestimonial />}
						/>
						<Route
							exact
							path='/api/testimonials/create'
							element={<AddTestimonialForm />}
						/>
					</Routes>
				</main>
			</div>
		</Context.Provider>
	);
}

export default App;
