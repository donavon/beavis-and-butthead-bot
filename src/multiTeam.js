const welcomeMessage =
    'Beavis: Hey fartknocker, `/invite` us to a channel!\n' +
    'Butthead: Yeah, that would be cool! Huh huh huh.';

export const start = (beepboop) => {

    // Send the user who added the bot to their team a welcome message the first time it's connected.
    beepboop.on('botkit.rtm.started', (bot, resource, meta) => {

        console.log(`Connected to Slack RTM for team ${bot.team_info.name}`);

        const slackUserId = resource.SlackUserID;

        if (slackUserId && meta.isNew) {
            bot.api.im.open({ user: slackUserId }, (err, response) => {
                if (err) {
                    return console.log(err);
                }
                const channel = response.channel.id;
                bot.say({ channel, text: welcomeMessage });
            });
        }
    });
};
