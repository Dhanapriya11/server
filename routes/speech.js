const express = require('express');
const speech = require('@google-cloud/speech');
const textToSpeech = require('@google-cloud/text-to-speech');
const router = express.Router();

const speechClient = new speech.SpeechClient();
const ttsClient = new textToSpeech.TextToSpeechClient();

router.post('/speech-to-text', async (req, res) => {
    const { audio } = req.body;

    const request = {
        audio: { content: audio },
        config: {
            encoding: 'LINEAR16',
            sampleRateHertz: 16000,
            languageCode: 'ta-IN', // Tamil Language
        },
    };

    const [response] = await speechClient.recognize(request);
    const transcript = response.results.map(r => r.alternatives[0].transcript).join('\n');

    res.json({ transcript });
});

router.post('/text-to-speech', async (req, res) => {
    const { text } = req.body;

    const request = {
        input: { text },
        voice: { languageCode: 'ta-IN', ssmlGender: 'FEMALE' },
        audioConfig: { audioEncoding: 'MP3' },
    };

    const [response] = await ttsClient.synthesizeSpeech(request);
    res.json({ audio: response.audioContent.toString('base64') });
});

module.exports = router;
