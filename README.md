# Recipe randomization app

## Development

For development, the React dev server is configured to run on port 3000, while the Node.js server is configured to run on port 4000.

- From the `recipe-app-client` directory, run `npm start` to start the React dev server.
- From the `recipe-app-server` directory, run `npm start` to start the Node.js server.
- Use `http://localhost:3000` for testing during development. Changes to the frontend will automatically refresh the page, but changes to the backend require a restart of the server.

The React dev server is configured (see `package.json`) to proxy requests to unknown URLs to the Node.js server, so that's why API requests are able to reach the Node.js server.

## Deployment

For production deployment, see the [server README](recipe-app-server).
