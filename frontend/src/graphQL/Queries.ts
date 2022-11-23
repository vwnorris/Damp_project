import { gql } from "@apollo/client";

export const LOAD_GAMES = gql`
  query getGames($page: Int!, $search: String, $filter: FilterInput, $sort: SortInput) {
    games(page: $page, filter: $filter, sort: $sort, search: $search) {
      name
      genre
      release_date
      all_reviews
      imagePath
      publisher
      developer
      appId
      languages
      achievements
      price
      game_description
      releaseDate
    }
  }
`;

export const GET_SINGLE_GAME = gql`
  query GetGame($appId: Int!) {
    game(appId: $appId) {
      name
      genre
      release_date
      all_reviews
      imagePath
      publisher
      developer
      appId
      languages
      achievements
      price
      game_description
      comments {
        name
        rating
        comment
      }
    }
  }

`;

export const SEARCH_GAME = gql`
  query SearchGame($search: String!, $page: Int = 0, ) {
      gameSearch(search: $search, page: $page, ) {
          name
          appId
      }
  }
`;

export const ADD_COMMENT = gql`
  mutation Mutation($game: Int!, $comment: CommentInput!) {
    addComment(game: $game, comment: $comment) {
      name
      rating
      comment
    }
  }
`;
