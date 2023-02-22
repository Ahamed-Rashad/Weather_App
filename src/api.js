// const options = {
// 	method: 'GET',
// 	headers: {
// 		'X-RapidAPI-Key': process.env.API_KEY_NEW,
// 		'X-RapidAPI-Host': 'dark-sky.p.rapidapi.com'
// 	}
// };

import axios from "axios";

const getWeather = async (lat , lon) => {
	try {
		
		const options = {
			method: 'GET',
			url: 'https://weatherbit-v1-mashape.p.rapidapi.com/forecast/daily',
			params: {lat: lat, lon: lon},
			headers: {
				'X-RapidAPI-Key': process.env.REACT_APP_WEATHER_API_KEY_NEW,
				'X-RapidAPI-Host': 'weatherbit-v1-mashape.p.rapidapi.com'
			}
	};
	const response = await axios.request(options);
	return response.data;
} catch (error) {
	console.log(error)
}
}

export { getWeather}

