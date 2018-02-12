# slackinvideo

This is a collaborative project housed in the Learning Lab.  If you want to help, contact mkuzmick.

## notes for new collaborators

In order to work on this project on one of the LL machines, there are a couple of things you'll have to do.

1. clone the repository by entering the following command in your Development folder: `git clone https://github.com/ll-dev-team/slackinvideo.git`
2. change directories to get in there: `cd slackinvideo`
3. install all the dependencies: `npm install`
4. create a .env file with all the secret stuff (api tokens, etc.)--can't quote all that here, obviously, but get the file started by typing `nano .env` or `atom .env`.  If you don't create and populate this file, everything will fail, because all the references to stuff like `process.env.SLACK_TOKEN` will just not work.
5. type `npm start` and you should be all ready to go.  Go to http://localhost:3000/ in your browser of choice to test stuff out.
