import Express, { Request, Response} from 'express';
import Path from 'node:path';
import * as util from './util';
import * as T from './types';
import { readDatabase, writeDatabase } from './database';
import { randomizeRecipe } from './calculations';

const app = Express();
const port = 4000;

// Serve static files from the latest production React app build
app.use(Express.static(Path.join('..', 'recipe-app-client', 'build')));

// Parse JSON requests automatically
app.use(Express.json());

/*
    GET /recipe-list
    Description: retrieve a list of recipe headers from server
    Request body: no request body
    Response body: RecipeHeader[]
*/
app.get('/api/recipe-list', async (_req, res) => {

    const database = await readDatabase();

    const recipeHeaders: T.RecipeHeader[] = database.recipes.map( recipe => {
        const {id, name, foodType, prepTimeInSeconds} = recipe;
        return {id, name, foodType, prepTimeInSeconds};
    });

    res.send(recipeHeaders);
});

/*
    POST /recipe-list/create
    Description: create a new recipe
    Request body: RecipeDetail without ID field
    Response body: the id of the newly created recipe {id: string}
*/
app.post('/api/recipe-list/create', async (req, res) => {
    
    // Note: should I handle errors here?
    const database = await readDatabase();

    const {name, foodType, prepTimeInSeconds, description}: T.NewRecipe = req.body;

    const id = util.generateId();

    const newRecipe = {
        id,
        name,
        foodType,
        prepTimeInSeconds,
        description,
    }

    database.recipes.push(newRecipe);

    await writeDatabase(database);

    res.send(id);
})

/*
    GET /recipe-list:id
    Description: retrieve a list of recipe headers from server
    Request body: no request body
    Response body: RecipeDetail
*/
app.get('/api/recipe-list/:recipeId', async (req, res) => {
    const database = await readDatabase();

    const recipe: T.RecipeDetail | undefined = database.recipes.find( recipe => recipe.id === req.params.recipeId)

    if (recipe === undefined) {
        res.status(204).send();
        console.log(`the requested recipe is not found in the database`);
    }

    res.send(recipe); // Note: still has the type Recipe instead of RecipeDetail, though the two types are identical
});

/*  
    PUT /recipe-list/edit/id
    Description: edit an recipe with given ID and update the recipe with given information
    Request body: RecipeDetail 
    Response body: no response body
*/
app.put('/api/recipe-list/edit/:recipeId', async (req, res) => {
    const database = await readDatabase();

    const recipe = database.recipes.find( recipe => recipe.id === req.params.recipeId);

    if (recipe === undefined) {
        res.status(204).send();  // Note: or should I send 404? how should I handle the "server couldnt find a match with the legit user input" situations
        throw new Error;
    }

    const updatedRecipe: T.Recipe = req.body;

    // Note: there should be a way to simplify this, right?
    recipe.name = updatedRecipe.name;
    recipe.foodType = updatedRecipe.foodType;
    recipe.prepTimeInSeconds = updatedRecipe.prepTimeInSeconds;
    recipe.description = updatedRecipe.description;

    await writeDatabase(database);

    res.status(204).send();
});

/* 
    DELETE /recipe-details/id
    Description: remove recipe with given ID
    Request body: selected recipe id {id: string}
    Response body: no response body
*/
app.delete('/api/recipe-list/:recipeId', async (req, res) => {
    
    const database = await readDatabase();

    const newRecipes = database.recipes.filter( recipe => recipe.id !== req.params.recipeId);

    database.recipes = newRecipes;

    await writeDatabase(database);

    res.status(204).send();
});

/*
    POST /randomize
    Description: calculate a recipe combo that fits the prep time limit and food type (more details in the Calculations section below)
    Request body: RandomizerParam
    Response body: RecipeDetail[]
*/
app.post('/api/randomize', async (req, res) => {

    const database = await readDatabase();

    const {prepTimeLimitInSecounds, selectedFoodType}: T.RandomizerParam = req.body;

    const recipes = randomizeRecipe(database.recipes, prepTimeLimitInSecounds, selectedFoodType);

    res.send(recipes);
});

/*
    GET /history
    Description: retrieve a list of history headers from server
    Request body: no request body
    Response body: HistoryHeader[]
*/
app.get('/api/history-list', async (_req, res) => {

    const database = await readDatabase();

    const resBody = database.histories.map( history => {
        const historyHeader: T.HistoryHeader = {
            id: history.id,
            dateCreated: history.dateCreated,
            recipeNames: util.recipeIdsToNames(history.recipeIds, database.recipes),
        }
        return historyHeader;
    });

    res.send(resBody);
})


/*
    POST /history/create
    Description: create a new “history” card in the history list view after confirmation on randomize page
    Request body: an array of recipe ids {recipeIds: RecipeId[]}
    Response body: no response body
*/
app.post('/api/history/create', async (req, res) => {

    const database = await readDatabase();

    const { recipeIds }: {recipeIds: T.RecipeId[]} = req.body;

    const id = util.generateId();

    const newHistory: T.History = {
        id,
        recipeIds,
        dateCreated: new Date(),
    }

    database.histories.push(newHistory);

    await writeDatabase(database);

    res.status(204).send();
})

// Serve index.html to all other routes
app.get('/*', (_req, res) => {
    res.sendFile(Path.join(process.cwd(), '..', 'recipe-app-client', 'build', 'index.html'));
});

// Run the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});




/* TODO: below this line will be cleaned up later*/

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

//  curl -X POST -H 'Content-Type: application/json' -d '{"name": "test0", "foodType": "meat", "prepTimeInSeconds": 50, "description": "test0 description is very descriptive"}' http://localhost:4000/api/recipe-list/create
//  curl -X PUT -H 'Content-Type: application/json' -d '{"name": "test0-1", "foodType": "veggie", "prepTimeInSeconds": 40, "description": "test0-1 put description is very descriptive"}' http://localhost:4000/api/recipe-details/edit/0.06306481484312698
//  curl -v -X DELETE http://localhost:4000/api/recipe-details/0.06306481484312698
// {"name": "test0", "foodType": "meat", "prepTimeInSeconds": 50, "description": "test0 description is very descriptive"}

// curl -X POST -H 'Content-Type: application/json' -d '{"recipeIds": ["0.047884915549020635", "0.31693048759237286", "0.8273016878707797"] }' http://localhost:4000/api/history/create
// curl -X POST -H 'Content-Type: application/json' -d '{"prepTimeLimitInSecounds": 10000, "selectedFoodType": "meat"}' http://localhost:4000/api/randomize