import testimonials from '../Json/testimonials.json';

let myMap = [];

const addMap = (testimonial) => {
	let hashMap = [];
	testimonial.copy
		.replace(/[^\w\s]|_/g, '')
		.replace(/\s+/g, ' ')
		.split(' ')
		.map((word) => (hashMap[word] ? hashMap[word]++ : (hashMap[word] = 1)))
		.sort();

	return hashMap;
};
export const heatMap = testimonials.reduce((init, testimonial) => {
	let thisMap = addMap(testimonial);
	thisMap.map((word) => (myMap[word] ? myMap[word]++ : (myMap[word] = 1)));

	return myMap;
}, myMap);
