

const updateFocus = (idx, value, setTestimonialFocus) => {
	setTestimonialFocus({
		active: idx,
		previous: idx + value,
		newState: true,
	});
};

export const scrollDown = (context) => {
	const {
		rects,
		animation,
		setAnimation,
		authorAnimation,
		setAuthorAnimation,
		testimonialFocus,
		setTestimonialFocus,
		display,
		setDisplay,
	} = context;
	for (let i = 0; i < rects.length; i++) {
		if (rects[i].y < 600) {
			updateFocus(i, -1, setTestimonialFocus);
			setAnimation({
				...animation,
				[testimonialFocus.active]: 'coaching-slide-in 3s',
				[testimonialFocus.previous]: 'coaching-slide-up 4s',
			});

			setAuthorAnimation({
				...authorAnimation,
				[testimonialFocus.active]: 'coaching-appear 3s',
				[testimonialFocus.previous]: 'coaching-slide-up 4s',
			});

			setDisplay({
				...display,
				[testimonialFocus.active]: 'block',
			});
		}
	}
};

export const scrollUp = (context) => {
	const {
		rects,
		animation,
		setAnimation,
		authorAnimation,
		setAuthorAnimation,
		testimonialFocus,
		setTestimonialFocus,
		display,
		setDisplay,
	} = context;
	for (let i = 0; i < rects.length; i++) {
		if (rects[i].y < 150) {
			updateFocus(i, 1, setTestimonialFocus);
			setAnimation({
				...animation,
				[testimonialFocus.active]: 'coaching-slide-in 3s',
				[testimonialFocus.previous]: 'coaching-slide-out 4s',
			});

			setAuthorAnimation({
				...authorAnimation,
				[testimonialFocus.active]: 'coaching-appear 3s',
				[testimonialFocus.previous]: 'coaching-slide-out 4s',
			});

			setDisplay({
				...display,
				[testimonialFocus.active]: 'block',
			});
		}
	}
};
