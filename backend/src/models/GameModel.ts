import mongoose from "mongoose"
import { IGame } from "../types";

export const GameSchema = new mongoose.Schema<IGame>({
    name: {
        type: String,
    },
    imagePath: {
        type: String,
    },
    types:{
        type: String,
    },
    url: {
        type: String,
    },
    all_reviews: {
        type: String,
    },
    release_date: {
        type: String,
    },
    game_details: {
        type: String,
    },
    achievements: {
        type: Number,
    },
    genre: {
        type: [String],
    },
    game_description: {
        type: String,
    },
    original_price: {
        type: String,
    },
    discount_price: {
        type: String,
    },
    price: {
        type: Number,
    },
    appId: {
        type: Number
    },
    releaseDate: {
        type: Date
    },
    developer: {
        type: String
    },
    publisher: {
        type: [String]
    },
    popular_tags: {
        type: [String]
    },
    languages: {
        type: [String]
    },
    comments: {
        type: [{
            name: String,
            rating: Number,
            comment: String
        }]
    }
});

export const Game = mongoose.model('Game', GameSchema);