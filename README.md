# beavis-and-butthead-bot
[![Build Status](https://travis-ci.org/donavon/beavis-and-butthead-bot.svg?branch=develop)](https://travis-ci.org/donavon/beavis-and-butthead-bot)

Heh heh heh. A Slackbot that doesn't suck.
These two juvenile clowns respond to your messages with childish comments like this:

![Screen Shot](https://github.com/donavon/beavis-and-butthead-bot/blob/develop/resources/screenshot1.png)

## About the Unorthodox Build Process

### Git Branches

`feature/{initials}/{feature-name}` - Any new features are pushed to their own feature branch.
They will be linted and tested by Travis CI. If they pass, they will eventually be merged into `develop`.

`develop` - This is where the mainline ES6 source code is maintained. It is a
[GitHub Protected Branch](https://help.github.com/articles/defining-the-mergeability-of-pull-requests/)
 meaning that no code can be merged without passing all status checks
 (in our case, passing Travis CI feature branch linting and tests).

`master` - This is where the ES5 transpiled code lives. There are no ES6 source code or test scripts.
The only one who pushes to `master` is Travis CI after a successful merge into `develop`. It does so
using a cool utility called [`gh-pages`](https://www.npmjs.com/package/gh-pages)
which was originally developed to automatically build GitHub Pages, but can work with any branch.

Why was this branching architecture used? Mainly because Beep Boop's free service is limited
to using the `master` branch only. This forced me to develop my ES6 code in a different branch
and reserve `master` for ES5 Beep Boop deploys only.
