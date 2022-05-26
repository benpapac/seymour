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
		focusPoints[e.target.id].current.scrollIntoView({
			behavior: 'smooth',
			block: 'end',
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
				<header>
					<Nav />
				</header>
				<main>
					<Routes>
						<Route path='/' element={<Home />} />
						<Route exact path='/test' element={<Test />} />

						<Route exact path='/contact' element={<ContactUs />} />
						<Route exact path='/talent' element={<Talent />} />
						<Route exact path='/coaching' element={<Coaching />} />
						<Route exact path='/about' element={<About />} />
					</Routes>
				</main>
				<footer>
					<section className='footer-content'>
							<h4>
							Designed by Ben Papac.
							</h4>


							<div id='designer-links'>
							<a
								href='https://www.benpapac.org'
								alt={`Ben's website`}
								rel='norefferer'
								target='_blank'>
								{' '}
								<svg
									className='project-link'
									xmlns='http://www.w3.org/2000/svg'
									width='34'
									height='34'
									viewBox='0 0 24 24'>
									<path d='M6 17c2.269-9.881 11-11.667 11-11.667v-3.333l7 6.637-7 6.696v-3.333s-6.17-.171-11 5zm12 .145v2.855h-16v-12h6.598c.768-.787 1.561-1.449 2.339-2h-10.937v16h20v-6.769l-2 1.914z' />
								</svg>
							</a>

							<a
								href='https://www.github.com/benpapac'
								alt={`Ben's Github`}
								rel='norefferer'
								target='_blank'>
								<svg
									className='project-link'
									xmlns='http://www.w3.org/2000/svg'
									width='34'
									height='34'
									viewBox='0 0 24 24'>
									<path d='M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z' />
								</svg>
							</a>
							</div>
					</section>
				</footer>
			</div>
		</Context.Provider>
	);
}

export default App;
