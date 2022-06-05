import actors from '../Json/actors.json';

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
