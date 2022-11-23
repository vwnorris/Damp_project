import { SortOrder } from "mongoose";

export interface IGame {
    appId: number;
    name: string;
    release_date: string;
    types: string;
    desc_snippet: string;
    developer: string;
    publisher: string[];
    popular_tags: string[];
    game_details: string;
    languages: string[];
    achievements: number;
    genre: string[];
    game_description: string;
    mature_content: string;
    minimum_requirements: string;
    recommended_requirements: string;
    original_price: string;
    discount_price: string;
    price: number;
    imagePath: string;
    url: string;
    all_reviews: string;
    releaseDate: Date;
    comments: IComment[]
}

export interface QueryConfig {
    $or?: Array<any>
    genre?: object;
    price?: object;
    releaseDate?: object;
    achievements?: object;
    popular_tags?: object;
}

export interface IComment {
    comment: string;
    name: string;
    rating: number;
}

export interface SortConfig {
    [key: string]: SortOrder
}