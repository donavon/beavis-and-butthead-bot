import youSaid from './youSaid.json';

const MEME_URL_PATTERN = 'https://cdn.meme.am/instances/300x/{ID}.jpg'; // Build the array of regular expressions.
const REGEX_WORDS = Object.keys(youSaid).map(word => `\\b(${word})\\b`);

const start = (controller/*, beepboop*/) => {
    // Listen to all messages that match the array of regular expressions.
    controller.hears(REGEX_WORDS, ['ambient'], (bot, message) => {
        const word = message.match[1].toLowerCase();
        const text = `Heh heh heh… You said "${word}".`;
        const url = MEME_URL_PATTERN.replace('{ID}', youSaid[word]);
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

    // If we are contacted directly or in an @mention.
    controller.hears('.*', ['direct_message', 'direct_mention'], (bot, message) => {
        bot.reply(message, 'Sorry <@{message.user}>, I don\'t understand.');
    });
};

export default { start }; // TODO why do I have to fo this?
