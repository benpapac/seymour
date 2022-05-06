import { useState } from 'react';
import { useEffect } from 'react';

const useScrollPosition = () => {
	const [scrollPosition, setScrollPosition] = useState({ x: 0, y: 0 });

	const handleScroll = (e) => {
		setScrollPosition({ x: e.path[1].scrollX, y: e.path[1].scrollY });
	};

	useEffect(() => {
		window.addEventListener('onScroll', handleScroll);

		return () => {
			window.removeEventListener('onScroll', handleScroll);
		};
	}, []);

	return scrollPosition;
};

export default useScrollPosition;
