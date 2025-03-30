const express = require('express');
const dialogflow = require('@google-cloud/dialogflow');
const speech = require('@google-cloud/speech');
const uuid = require('uuid');
const router = express.Router();

const projectId = 'your-dialogflow-project-id';
const sessionClient = new dialogflow.SessionsClient();
const speechClient = new speech.SpeechClient();

router.post('/speech-to-text', async (req, res) => {
    const audio = req.body.audio; // Base64 encoded audio

    const request = {
        audio: { content: audio },
        config: {
            encoding: 'LINEAR16',
            sampleRateHertz: 16000,
            languageCode: 'ta-IN',
        },
    };

    const [response] = await speechClient.recognize(request);
    const transcript = response.results.map(r => r.alternatives[0].transcript).join('\n');

    res.json({ transcript });
});

module.exports = router;
