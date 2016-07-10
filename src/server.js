import Botkit from 'botkit';

const MEME_URL_PATTERN = 'https://cdn.meme.am/instances/300x/{ID}.jpg';
const YOU_SAID = {
    member: '69347671',
    wood: '69347681',
    pole: '69347708',
    hard: '69350496',
    bone: '69350550',
    firm: '69354294'
};
// Build the array of regular expressions.
const REGEX_WORDS = Object.keys(YOU_SAID).map(word => `\\b(${word})\\b`);

const controller = Botkit.slackbot({ debug: false });

controller.spawn({ token: process.env.SLACK_TOKEN }).startRTM();

// Listen to all messages that match the array of regular expressions.
controller.hears(REGEX_WORDS, ['ambient'], (bot, message) => {
    const word = message.match[1].toLowerCase();
    const text = `Heh heh heh… You said "${word}".`;
    const url = MEME_URL_PATTERN.replace('{ID}', YOU_SAID[word]);
    const msg = {
        attachments: [
            {
                fallback: text,
                color: '#36a64f',
                title: text,
                image_url: url
            }
        ]
    };
    bot.reply(message, msg);
});
