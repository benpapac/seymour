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
import Test from './Components/Test/Test';
import About from './Components/About/About';
import Api from './Components/Api/Api';
import ApiActor from './Components/Api/ApiActor';
import ApiTestimonial from './Components/Api/ApiTestimonial';

function App() {
	const width = window.innerWidth;
	const [zoom, setZoom] = useState({
		show: false,
		src: '',
		alt: '',
	});

	const zoomIn = (e) => {
		e.preventDefault();
		if (!e.target.src) return;
		else
			setZoom({
				show: true,
				src: e.target.src,
				alt: e.target.alt,
			});
	};

	const zoomOut = (e) => {
		e.preventDefault();
		setZoom({
			show: false,
			src: '',
			alt: '',
		});
	};

	const focusPoints = {
		focus1: useRef(null),
		focus2: useRef(null),
		focus3: useRef(null),
		focus4: useRef(null),
		focus5: useRef(null),
		focus6: useRef(null),
		focus7: useRef(null),
		focus8: useRef(null),
	};

	const chooseFocus = (e) => {
		e.preventDefault();
		let id;

		if (e.target.id.length) {
			console.log('checking for author');
			id =
				e.target.id.substring(0, 6) === 'author'
					? e.target.id.substring(7)
					: e.target.id;
		} else {
			id = e.target.parentElement.id.substring(7);
		}
		console.log('id: ', id);
		let blockFocus = e.target.id ? 'end' : 'start';
		focusPoints[id].current.scrollIntoView({
			behavior: 'smooth',
			block: blockFocus,
		});
	};

	return (
		<Context.Provider
			value={{
				zoom: zoom,
				setZoom: setZoom,
				zoomIn: zoomIn,
				zoomOut: zoomOut,
				chooseFocus: chooseFocus,
				focusPoints: focusPoints,
			}}>
			<div className='App'>
				<header>{window.innerWidth >= 1100 ? <Nav /> : null}</header>
				<main>
					<Routes>
						<Route path='/' element={<Home />} />
						<Route exact path='/test' element={<Test />} />

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
