import logo from './logo.svg';
import './App.css';
import { Routes, Route} from 'react-router-dom';

import Nav from './Components/Nav/Nav';
import  Home  from './Components/Home/Home';
import About from './Components/About/About';
import Contact from './Components/Contact/Contact';
import Executives from './Components/Executives/Executives';
import Talent from './Components/Talent/Talent';
import Consultation from './Components/Consultation/Consultation';

function App() {
  return (
		<div className='App'>
			<header>
				<h1>LG LOGO HERE</h1>
				<Nav />
			</header>
			<main>
				{/* <Home /> */}
				<Routes>
					<Route path='/' element={<Home />} />
					<Route exact path='/about' element={<About />} />
					<Route exact path='/contact' element={<Contact />} />
					<Route exact path='/talent' element={<Talent />} />
					<Route exact path='/executives' element={<Executives />} />
					<Route exact path='/consultation' element={<Consultation />} />
				</Routes>
			</main>
		</div>
	);
}

export default App;
