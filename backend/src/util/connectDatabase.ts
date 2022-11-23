import { ApolloServer, BaseContext } from '@apollo/server';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from "mongoose";
import { mockData } from '../data/data';
import { Game } from '../models';
import resolvers from "../resolvers";
import { typeDefs } from "../types";

export const connectToMongoDB = async (): Promise<void> => {
    return new Promise(async (resolve, reject) => {
        if (!process.env.DB_PATH) {
            console.error("Could not find enviorment file. Can not connect to database!");
            return reject();
        }
    
        try {
            if (!process.env.PROD) {
                const db = await MongoMemoryServer.create();
                const con = await mongoose.connect(db.getUri());
                const l = mockData.map(d => ({...d, releaseDate: new Date(parseInt(d.releaseDate.$date.$numberLong)).toISOString()}));
                console.log("running on the mock database")
                await Game.create(l);
            } else {
                const con = await mongoose.connect(process.env.DB_PATH);
            }
        } catch (error) {
            console.error("Could not connect to database!");
            return reject();
        }
    
        return resolve();
    });
}

export const createApolloServer = (): ApolloServer<BaseContext> => new ApolloServer<BaseContext>({
    introspection: true,
    typeDefs,
    resolvers
})



