export const sendTextToAPI = async (text: string, selectedVoiceID: string, selectedAudioID: string) => {
    const axios = require('axios');

    const encodedParams = new URLSearchParams();
    encodedParams.set('text', text);
    encodedParams.set('voiceId', !selectedVoiceID? '200': selectedVoiceID);
    encodedParams.set('effectsProfileId', !selectedAudioID ? 'small-bluetooth-speaker-class-device': selectedAudioID);
    
    const options = {
      method: 'POST',
      url: 'https://text-to-speech-pro.p.rapidapi.com/api/tts-mp3-download',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'X-RapidAPI-Key': process.env.NEXT_PUBLIC_RAPIDKEY,
        'X-RapidAPI-Host': 'text-to-speech-pro.p.rapidapi.com'
      },
      data: encodedParams,
    };
    
    try {
        const response = await axios.request(options);
        return response.data.results;
    } catch (error) {
        console.error(error);
    }
};
