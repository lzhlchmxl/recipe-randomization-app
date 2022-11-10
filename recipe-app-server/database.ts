import { readFile, writeFile } from 'node:fs/promises'

type Database = {
    fruits: Fruit[],
};

type Fruit = {
    id: string,
    name: string,
    content: string,
};

const databaseFilePath = process.env.DATABASE_FILE || 'database.json';

function makeNewDatabase(): Database {
    return {
        fruits: [],
    }
}

export async function readDatabase(): Promise<Database> {
    try {
        const databaseAsString = await readFile(databaseFilePath, {encoding: 'utf-8'});
        const database: Database = JSON.parse(databaseAsString);
        return database;
    } catch (err) {
        if (err instanceof Error && (err as any /* lmao you caught me */).code === 'ENOENT') {
            return makeNewDatabase();
        }

        throw err;
    }
}

export async function writeDatabase(database: Database): Promise<void> {
    const databaseAsString = JSON.stringify(database, null, '\t');
    await writeFile(databaseFilePath, databaseAsString, {encoding: 'utf-8'});
}
