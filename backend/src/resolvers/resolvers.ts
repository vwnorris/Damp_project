import { addComment } from "./Comment";
import { getGame, getGames } from "./Game";

export const resolvers = {
    Query: {
        games: getGames,
        game: getGame
    },
    Mutation: {
        addComment: addComment
    }
}