import { Game } from "../models";
import { QueryConfig, SortConfig } from "../types";

/** The query we get from graphql requires 4 arguments, but we only care about the `args` argument */
export async function getGames(_1: any, args: any, _3: any, _4: any) {
    const config: QueryConfig = {}
    const sort: SortConfig = {}
    
    // check if filters have been passed to the graphql query and handle it
    if (args.filter) {
        for (const key of Object.keys(args.filter)) {
            if (args[key] !== null) {
                if (key === "genre") {
                    if (args.filter.genre !== null) {
                        config.genre = {
                            $all: args.filter.genre
                        }
                    }
                } else if (key === "price") {
                    if (args.filter.price !== null) {
                        config.price = {
                            $gte: args.filter.price[0],
                            $lte: args.filter.price[1]
                        }
                    }
                } else if (key === "releasedate") {
                    if (args.filter.releasedate !== null) {
                        if (args.filter.releasedate[0] !== null && args.filter.releasedate[1] !== null) {
                            config.releaseDate = { 
                                $gte: new Date(args.filter.releasedate[0]),
                                $lte: new Date(args.filter.releasedate[1])
                            }
                        } else if (args.filter.releasedate[0] !== null && args.filter.releasedate[1] === null) {
                            config.releaseDate = {
                                $gte: new Date(args.filter.releasedate[0])
                            }
                        } else if (args.filter.releasedate[0] === null && args.filter.releasedate[1] !== null) {
                            config.releaseDate = {
                                $lte: new Date(args.filter.releasedate[1])
                            }
                        }
                    }
                } else if (key === "achivements") {
                    if (args.filter.achivements !== null) {
                        switch (args.filter.achivements) {
                            case 1:
                                config.achievements = {
                                    $lte: 0
                                }
                                break;
                            case 2:
                                config.achievements = {
                                    $gt: 0
                                }
                                break;
        
                            case 3:
                                config.achievements = {
                                    $lte: 10,
                                    $gte: 1
                                }
                                break;
                            case 4:
                                config.achievements = {
                                    $lte: 20,
                                    $gte: 10
                                }
                                break;
                        
                            case 5:
                                config.achievements = {
                                    $gte: 20
                                }
                                break;
                        }
                    }
                } else if (key === "tags") {
                    if (args.filter.tags !== null) {
                        config.popular_tags = {
                            $all: args.filter.tags
                        }
                    }
                }
            }
        }
    }

    if (args.search) {
        config.$or = [
            {"name": { 
                $regex: args.search, 
                $options: 'i' }
            },
            {"developer": { 
                $regex: args.search, 
                $options: 'i' }
            },
            {"publisher": {
                $regex: args.search,
                $options: "i" }
            }
        ]
    }

    if (args.sort) {
        switch (args.sort.type) {
            case "NAME":
                sort["name"] = (args.sort.ascending) ? 1 : -1;
                break;
    
            case "RELEASEDATE":
                sort["releaseDate"] = (args.sort.ascending) ? 1 : -1;
                break;
    
            case "PRICE":
                sort["price"] = (args.sort.ascending) ? 1 : -1;
                break;
        }
    }

    return await Game.find(config).limit(15).skip(args.page*15).sort(sort).collation({ locale: "en", caseLevel: true });
}

export async function getGame(_1: any, args: any, _2: any, _3: any) {
    return await Game.findOne({ appId: args.appId });
}