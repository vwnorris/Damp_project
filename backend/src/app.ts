import express, { json } from "express";
import { connectToMongoDB, createApolloServer } from "./util";
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import * as dotenv from 'dotenv';

async function main() {
    dotenv.config();
    const app = express();
    const port = 8000;

    try {
        await connectToMongoDB();
    } catch {
        console.error("Shutting down server!");
        return;
    }

    const apollo = createApolloServer();
    await apollo.start();

    app.use('/graphql', cors<cors.CorsRequest>(), json(), expressMiddleware(apollo));

    app.listen(port, () => {
        return console.log(`Server has started on ${port}`);
    });
}

main();