export const typeDefs = `

    enum SortType {
        NONE
        NAME
        RELEASEDATE
        PRICE
    }

    input CommentInput {
        name: String
        rating: Int
        comment: String
    }

    input FilterInput {
        genre: [String]
        releasedate: [String]
        achivements: Int
        tags: [String]
        price: [Float]
    }

    input SortInput {
        type: SortType = NONE
        ascending: Boolean = true
    }
    
    type Comment {
        name: String
        rating: Int
        comment: String
    }

    type CommentReturn {
        name: String
        rating: Int
        comment: String
        updated: Boolean
    }

    type Game {
        appId: Int
        name: String
        types: String
        developer: String
        publisher: [String]
        popular_tags: [String]
        languages: [String]
        url: String
        all_reviews: String
        release_date: String
        game_details: String
        achievements: String
        genre: [String]
        game_description: String
        original_price: String
        discount_price: String
        price: Float
        imagePath: String
        releaseDate: String
        comments: [Comment]
    }
    
    type Query {
        games(page: Int!, filter: FilterInput, sort: SortInput, search: String): [Game]
        game(appId: Int!): Game
    }

    type Mutation {
        addComment(game: Int!, comment: CommentInput!): CommentReturn
    }
`