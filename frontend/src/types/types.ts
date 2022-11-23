export interface Comment {
    name: string;
    rating: number;
    comment: string;
}

export interface Game {
    name: string;
    genre: string[];
    release_date: string;
    all_reviews: string;
    imagePath: string;
    publisher: string[];
    developer: string;
    appId: number;
    game_description: string;
    achievements: number;
    languages: string[];
    price: number;
    description: string;
    comments: Comment[];
    releaseDate: Date;
}

export enum SortType {
    NAME = "NAME",
    RELEASEDATE = "RELEASEDATE",
    PRICE = "PRICE",
    NONE = "NONE"
}

export interface IFilterData {
    type: string;
    data: number | string[] | number[] | (Date | null)[];
    visualData: string;
}

export interface IFilter {
    name: string;
    color: string;
    description: string;
    data?: IFilterData;
}