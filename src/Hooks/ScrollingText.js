import { useEffect, useState, useReducer } from 'react';
import useScrollPosition from './useScrollPosition';

const useTextWheel = () => {
	const scrollData = useScrollPosition();
	const wheelReducer = (state, action) => {
		switch (action.type) {
			case 'opacity':
				return {
					...state,
					opacity: {
						...state.opacity,
						[state.targetAngle]:
							state.opacity[state.targetAngle] >= 1
								? 1
								: state.opacity[state.targetAngle] + 0.005,
						[state.oldAngle]:
							state.opacity[state.oldAngle] <= 0
								? 0
								: state.opacity[state.oldAngle] - 0.02,
					},
				};

			case 'oldHeight':
				return {
					...state,
					oldHeight: action.value,
				};

			case 'angle':
				return {
					...state,
					angle: action.value,
				};

			case 'oldAngle':
				return {
					...state,
					oldAngle: action.value,
				};

			case 'newTargetAngle':
				return {
					...state,
					targetAngle: action.value,
				};

			case 'atTarget':
				return {
					...state,
					atTarget: action.value,
				};

			default:
				break;
		}
	};

	const [wheel, wheelDispatch] = useReducer(wheelReducer, {
		angles: [0, 90, 180],
		atTarget: false,
		angle: 0,
		targetAngle: 0,
		oldAngle: 0,
		opacity: {
			0: 1,
			90: 0,
			180: 0,
		},
	});

	const getNewAngle = (yDiff) => {
		wheelDispatch({ type: 'oldAngle', value: wheel.angle });
		if (yDiff < 0) return wheel.angle === 0 ? 0 : wheel.angle - 90;
		else if (yDiff > 0) return wheel.angle === 180 ? 180 : wheel.angle + 90;
		else return wheel.angle;
	};

	const rotate = () => {
		console.log(wheel.angle === wheel.targetAngle);
		wheelDispatch({ type: 'opacity', value: null });
		if (wheel.angle === wheel.targetAngle) {
			wheelDispatch({ type: 'atTarget', value: true });
		} else if (wheel.angle > wheel.targetAngle) {
			console.log('decreasing angle...', wheel.angle);
			wheelDispatch({ type: 'angle', value: wheel.angle - 1 });
		} else if (wheel.angle < wheel.targetAngle) {
			console.log('increasing angle...');
			wheelDispatch({ type: 'angle', value: wheel.angle + 1 });
		} else return;
	};

	useEffect(() => {
		wheelDispatch({ type: 'oldHeight', value: scrollData.y });
		let yDiff = scrollData.y - wheel.oldHeight;
		let atTarget = wheel.angle === wheel.targetAngle;

		console.log(wheel);
		if (!atTarget) {
			if (wheel.atTarget) wheelDispatch({ type: 'atTarget', value: false });
			setTimeout(() => {
				rotate();
			}, 10);
		} else {
			let newAngle = getNewAngle(yDiff);
			wheelDispatch({ type: 'newTargetAngle', value: newAngle });
		}
	}, [scrollData.y, wheel.angle]);

	return wheel;
};

export default useTextWheel;
