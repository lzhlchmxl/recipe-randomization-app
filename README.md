# Recipe randomization app

## Description:
The goal of the “What To Eat” APP is to provide convenience for Bill and Key when deciding on a reasonable meal plan. 
The APP will be a small-scale mobile web app. It allows users to create, edit and delete meal entries. Each entry has a meal prep time estimation. Besides showing a list of entries, the APP also allows the user to input a time allowance and prompts the user with a meat-veggie balanced suggestion that fits the time allowance.  

## Development

For development, the React dev server is configured to run on port 3000, while the Node.js server is configured to run on port 4000.

- From the `recipe-app-client` directory, run `npm start` to start the React dev server.
- From the `recipe-app-server` directory, run `npm start` to start the Node.js server.
- Use `http://localhost:3000` for testing during development. Changes to the frontend will automatically refresh the page, but changes to the backend require a restart of the server.

The React dev server is configured (see `package.json`) to proxy requests to unknown URLs to the Node.js server, so that's why API requests are able to reach the Node.js server.

## Deployment

For production deployment, see the [server README](recipe-app-server).
