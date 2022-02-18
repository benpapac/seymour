import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { useState, useRef, createContext, useContext } from 'react';
import { TalentContext } from './Util/Context';

import Nav from './Components/Nav/Nav';
import Home from './Components/Home/Home';
import ContactUs from './Components/Contact/emailJS';
import Executives from './Components/Executives/Executives';
import Talent from './Components/Talent/Talent';
import Test from './Components/Test/Test';

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
	};

	const chooseFocus = (e) => {
		e.preventDefault();
		const value = width < 1000 ? 'end' : 'center';
		// setDisplay('');
		focusPoints[e.target.id].current.scrollIntoView({
			behavior: 'smooth',
			block: value,
		});
	};
	return (
		<TalentContext.Provider
			value={{
				zoom: zoom,
				setZoom: setZoom,
				zoomIn: zoomIn,
				zoomOut: zoomOut,
				chooseFocus: chooseFocus,
				focusPoints: focusPoints,
			}}>
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
		</TalentContext.Provider>
	);
}

export default App;
