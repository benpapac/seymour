import { useState } from 'react';
import { useEffect } from 'react';

const useScrollPosition = () => {
	const [scrollPosition, setScrollPosition] = useState({ x: 0, y: 0 });

	const handleScroll = (e) => {
		if (e.path)
			setScrollPosition({ x: e.path[1].scrollX, y: e.path[1].scrollY });
		else setScrollPosition({ x: e.target.scrollingElement.scrollLeft, y: e.target.scrollingElement.scrollTop });
	};

	useEffect(() => {
		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	return scrollPosition;
};

export default useScrollPosition;
