import { useContext } from 'react';
import Actor from '../Components/Talent/Actor/Actor';
import Slideshow from '../Components/Talent/Slideshow/Slideshow';
import Talent from '../Components/Talent/Talent';
import actors from '../Json/actors.json';

export const displayActors = (focusPoints, chooseFocus) => {
	return (
		<>
			{actors.map((actor, idx, arr) => {
				return (
					<>
						<div
							key={`${actor.name}`}
							className={`actor ${actor.name}`}
							ref={focusPoints[`${actor.focus}`]}>
							<Actor
								actor={actor}
								idx={idx}
								arr={arr}
								focusPoints={focusPoints}
							/>
						</div>
					</>
				);
			})}
		</>
	);
};

export const displayLookbook = (chooseFocus, setLightCoordinates) => {

	return (
		<>
			<div className='lookbook'>
				{actors.map((actor, index) => {
					return (
						<>
							<img
								onClick={chooseFocus}
								id={`${actor.focus}`}
								className={`thumbnail`}
								src={`${actor.img}`}
								alt={`${actor.alt}`}
								style={index === 0 ? { marginTop: '0em' } : null}
							/>
						</>
					);
				})}
			</div>
		</>
	);
};

export const displayBackground = () => {
	return (
		<div>
			<div className='tall-rectangle'></div>
			{/* <div className='long-rectangle'></div> */}
			<div className='dot'></div>
			{/* <div className='arm'></div> */}
			{/* <div className='circle'></div> */}
			{/* <div className='white-square'></div> */}
		</div>
	);
};
