import { GET_SINGLE_GAME } from "../../../src/graphQL";

beforeEach(() => {
  cy.visit("/");
});

describe("E2E tests, with some simple tests", () => {
  it("successfully loads", () => {
      cy.intercept(
          { method: "GET_SINGLE_GAME", url: "**/graphql" },
          {
              statusCode: 200,
              body: {
                  __typename: "Game",
                  name: "DOOM",
                  genre: ["Action"],
                  release_date: "May 12, 2016",
                  all_reviews:
                  "Very Positive,(42,550),- 92% of the 42,550 user reviews for this game are positive.",
                  imagePath:
                  "https://cdn.akamai.steamstatic.com/steam/apps/379720/header.jpg",
                  publisher: ["Bethesda Softworks", "Bethesda Softworks"],
                  developer: "id Software",
                  appId: 379720,
          languages: [
              "English",
              "French",
              "Italian",
              "German",
              "Spanish - Spain",
              "Japanese",
              "Polish",
              "Portuguese - Brazil",
              "Russian",
              "Traditional Chinese",
            ],
            achievements: "54",
            price: 19.99,
            game_description:
            " About This Game Developed by id software, the studio that pioneered the first-person shooter genre and created multiplayer Deathmatch, DOOM returns as a brutally fun and challenging modern-day shooter experience. Relentless demons, impossibly destructive guns, and fast, fluid movement provide the foundation for intense, first-person combat – whether you’re obliterating demon hordes through the depths of Hell in the single-player campaign, or competing against your friends in numerous multiplayer modes. Expand your gameplay experience using DOOM SnapMap game editor to easily create, play, and share your content with the world. STORY: You’ve come here for a reason. The Union Aerospace Corporation’s massive research facility on Mars is overwhelmed by fierce and powerful demons, and only one person stands between their world and ours.  As the lone DOOM Marine, you’ve been activated to do one thing – kill them all. KEY FEATURES: A Relentless Campaign There is no taking cover or stopping to regenerate health as you beat back Hell’s raging demon hordes.  Combine your arsenal of futuristic and iconic guns, upgrades, movement and an advanced melee system to knock-down, slash, stomp, crush, and blow apart demons in creative and violent ways. Return of id Multiplayer Dominate your opponents in DOOM’s signature, fast-paced arena-style combat. In both classic and all-new game modes, annihilate your enemies utilizing your personal blend of skill, powerful weapons, vertical movement, and unique power-ups that allow you to play as a demon. Endless Possibilities DOOM SnapMap – a powerful, but easy-to-use game and level editor – allows for limitless gameplay experiences on every platform.  Without any previous experience or special expertise, any player can quickly and easily snap together and visually customize maps, add pre-defined or completely custom gameplay, and even edit game logic to create new modes.  Instantly play your creation, share it with a friend, or make it available to players around the world – all in-game with the push of a button. ",
          comments: [
              {
              __typename: "Comment",
              name: "l33t g4m3r",
              rating: 4,
              comment: "Amazing game! Really loved all the action!",
            },
            {
                __typename: "Comment",
                name: "yeet",
                rating: 3,
                comment: "nice game",
            },
            {
              __typename: "Comment",
              name: "Ole",
              rating: 5,
              comment:
              "Really nice game! Would recommend all other to try this one. ",
            },
            {
                __typename: "Comment",
                name: "Gamer Deluxe",
                rating: 5,
                comment:
                "One of the most intense and exciting games I have played in a while. Loved it!",
            },
            {
                __typename: "Comment",
                name: "Gamer Deluxe",
                rating: 5,
                comment:
                "One of the most intense and exciting games I have played in a while. Loved it!",
            },
            {
                __typename: "Comment",
                name: "Gamer Deluxe",
                rating: 5,
                comment:
                "One of the most intense and exciting games I have played in a while. Loved it!",
            },
            {
                __typename: "Comment",
                name: "Gamer Deluxe",
                rating: 5,
                comment:
                "One of the most intense and exciting games I have played in a while. Loved it!",
            },
            {
                __typename: "Comment",
                name: "awd",
                rating: 3,
                comment: "awdawd",
            },
            {
                __typename: "Comment",
                name: "awdaeg",
                rating: 2,
                comment: "awdasgr",
            },
            {
                __typename: "Comment",
                name: "test",
                rating: 4,
                comment: "testtest",
            },
            {
                __typename: "Comment",
                name: "test2",
                rating: 3,
                comment: "test2",
            },
            {
                __typename: "Comment",
                name: "awda2323",
                rating: 2,
                comment: "awdawd2332",
            },
            {
                __typename: "Comment",
                name: "awda2323",
                rating: 2,
                comment: "awdawd2332",
            },
            {
                __typename: "Comment",
                name: "testing123",
                rating: 3,
                comment: "wowgame",
            },
            {
                __typename: "Comment",
                name: "damn",
                rating: 4,
                comment: "comment",
            },
            {
                __typename: "Comment",
                name: "johan",
                rating: 3,
                comment: "kiult",
            },
            {
                __typename: "Comment",
                name: "adawd",
                rating: 3,
                comment: "adawd",
            },
            {
              __typename: "Comment",
              name: "testy",
              rating: 3,
              comment: "testicle",
            },
            {
                __typename: "Comment",
                name: "awdawd23232323",
                rating: 4,
                comment: "afawfaw",
            },
            {
                __typename: "Comment",
                name: "awfawf",
                rating: 1,
                comment: "awdawdawd",
            },
            {
                __typename: "Comment",
                name: "yeetyeet",
                rating: 3,
                comment: "123123",
            },
            {
                __typename: "Comment",
                name: "yeetero",
                rating: 3,
                comment: "12345",
            },
            {
                __typename: "Comment",
                name: "yeeteri",
                rating: 4,
                comment: "yeeteri 1234456!!!",
            },
            {
                __typename: "Comment",
                name: "victor",
                rating: 0,
                comment: "this is game",
            },
            {
                __typename: "Comment",
                name: "simon",
                rating: 5,
                comment: "wow",
            },
            {
                __typename: "Comment",
                name: "simon",
                rating: 5,
                comment: "wow",
            },
            {
                __typename: "Comment",
                name: "bishboi",
                rating: 4,
                comment: "bishbboi",
            },
            {
                __typename: "Comment",
                name: "bishboi",
                rating: 4,
                comment: "bishbboi",
            },
            {
                __typename: "Comment",
                name: "awdawdawd",
                rating: 4,
                comment: "awdawd",
            },
            {
                __typename: "Comment",
                name: "amazing rating",
                rating: 5,
                comment: "amazing rating",
            },
            {
                __typename: "Comment",
                name: "testrating 1",
                rating: 3,
                comment: "adaw",
            },
            {
                __typename: "Comment",
                name: "testrating 2",
              rating: 3,
              comment: "wow",
            },
            {
                __typename: "Comment",
                name: "testrating 3",
                rating: 3,
                comment: "testrating 3",
            },
            {
              __typename: "Comment",
              name: "testrating 4",
              rating: 4,
              comment: "tesad",
            },
          ],
        },
    }
    ).as('getGame');
    cy.visit("/");
    let newItem = "eve online";
    cy.get("[data-testid=searchBox]").type(`${newItem}{enter}`);
    const gameCardConatienr = cy.get("[data-testid=gameCardContainer]");
    gameCardConatienr.contains('div', 'EVE Online');
});
});
