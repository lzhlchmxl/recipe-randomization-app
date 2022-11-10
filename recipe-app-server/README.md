# Server

The server is written in TypeScript so it needs to be compiled to JavaScript before it can be run. The compiled JavaScript files will be placed in the `build` directory.

## Development

To build and run the server, use `npm start`. There is no auto-restart, so any time you make a change, you'll need to re-run `npm start`.

## Deployment

- Build the client using `npm run build`.
- Build the server using `npm run build`.
- Copy the entire repo to the server.
- Run the server using `node build/index.js` from the `recipe-app-server` directory.
