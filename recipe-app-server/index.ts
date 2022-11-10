import Express from 'express';
import Path from 'node:path';

const app = Express();
const port = 4000;

// Serve static files from the latest production React app build
app.use(Express.static(Path.join('..', 'recipe-app-client', 'build')));

// Parse JSON requests automatically
app.use(Express.json());

// Example GET endpoint
// Try out this route by visiting `http://localhost:4000/api/hello`
app.get('/api/hello', (_req, res) => {
    // Return a JSON response
    res.send({
        hello: 'world'
    });
});

// Example GET endpoint
// Try out this route by visiting `http://localhost:4000/api/fruits/123`
app.get('/api/fruits/:fruitId', (req, res) => {
    // Get the fruit ID out of the URL
    const fruitId = req.params.fruitId;

    // Fake a Fruit JSON object with the right ID
    res.send({
        id: fruitId,
        name: 'Orange',
        content: 'Oranges are cool.',
    });
});

// Example DELETE endpoint
// Try out this route with `curl -v -X DELETE http://localhost:4000/api/fruits/123`
app.delete('/api/fruits/:fruitId', (req, res) => {
    // Get the fruit ID out of the URL
    const fruitId = req.params.fruitId;
    console.log(`Deleting fruit with ID ${fruitId}.`);

    // Return a 204 No Content response
    res.status(204).send();
});

// Example POST endpoint
// Try out this route with `curl -H 'Content-Type: application/json' -d '{"numbers": [2, 4, 5]}' http://localhost:4000/api/calculate-total`
app.post('/api/calculate-total', (req, res) => {
    // Sum the numbers in the request
    const numbers = req.body.numbers as number[];
    const total = numbers.reduce((a, b) => a + b, 0);

    // Return a JSON response
    res.send({total});
});

// Serve index.html to all other routes
app.get('/*', (_req, res) => {
    res.sendFile(Path.join(process.cwd(), '..', 'recipe-app-client', 'build', 'index.html'));
});

// Run the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
