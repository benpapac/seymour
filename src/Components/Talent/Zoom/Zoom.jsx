import React, { useContext, useEffect } from 'react';
import { TalentContext } from '../../../Util/Context';
 const Zoom = () => {
     const talentContext = useContext(TalentContext);
     const zoom = talentContext.zoom;
     const zoomOut = talentContext.zoomOut;

     useEffect( () => {
         console.log(zoom);

     }, [zoom]);

	return (
		<div
			className='zoom'
			onClick={zoomOut}
			style={{
				height: `${!zoom.show ? '0px' : '100%'}`,
				backgroundColor: `${!zoom.show ? 'white' : 'rgba(0,0,0,0.4)'}`,
				zIndex: `${!zoom.show ? -1 : 1}`,
			}}>
			<img
				className='zoom-photo'
				style={{ display: `${zoom.show ? 'block' : 'hidden'}` }}
				src={`${zoom.src}`}
				alt={`${zoom.alt}`}
			/>
		</div>
	);
};

export default Zoom;