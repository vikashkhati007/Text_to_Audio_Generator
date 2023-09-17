export const getVoicesApi = async () => {

const axios = require('axios');

const options = {
  method: 'GET',
  url: 'https://text-to-speech-pro.p.rapidapi.com/api/voices',
  headers: {
    'X-RapidAPI-Key': process.env.NEXT_PUBLIC_RAPIDKEY,
    'X-RapidAPI-Host': 'text-to-speech-pro.p.rapidapi.com'
  }
};

try {
	const response = await axios.request(options);
	return response.data;
} catch (error) {
	console.error(error);
}
}