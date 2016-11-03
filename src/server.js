import Botkit from 'botkit';
import BeepBoop from 'beepboop-botkit';
import app from './app';
import multiTeam from './multiTeam';

const controller = Botkit.slackbot({
    retry: Infinity,
    debug: false // TODO make debug configurable.
});

// Assume single team mode if we have a SLACK_TOKEN. This also gives you a simple way to test your code locally
// without connecing to Beep Boop's
// NOTE: You will need to set the SLACK_TOKEN environment variable manuallyt in your development environment.
const token = process.env.SLACK_TOKEN;
if (token) {
    console.log('Starting in single-team mode');
    controller.spawn({ token }).startRTM((err, bot) => {
        if (err) {
            throw new Error(err);
        }
        console.log(`Connected to Slack RTM for team ${bot.team_info.name}`);
    });
} else {
    // Otherwise assume multi-team mode - setup beep boop resourcer connection
    console.log('Starting in Beep Boop multi-team mode');
    const beepboop = BeepBoop.start(controller, { debug: true });
    multiTeam.start(beepboop); // Start the multi-team portion on the app.
}

// Start the "App" in both single and multi-team mode.
app.start(controller);
