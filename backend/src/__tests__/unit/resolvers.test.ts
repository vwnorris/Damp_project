import { addComment, getGame, getGames } from "../../resolvers";
import { IGame } from "../../types";
import { Game } from "../../models";
import mongoose from "mongoose";
import { MongoMemoryServer } from 'mongodb-memory-server';
import { mockData } from "../../data/data";

let db: MongoMemoryServer;
let connection: mongoose.Connection;
let count = 0;

const connectDb = async (db: MongoMemoryServer) => {
    await mongoose.connect(db.getUri());
    connection = mongoose.connection;
}

const disconnectFromDb = async () => {
    await connection.close();
}

const addMockData = async () => {
    const l = mockData.map(d => ({...d, releaseDate: new Date(parseInt(d.releaseDate.$date.$numberLong)).toISOString()}));
    await Game.create(l);
    return Promise.resolve();
}

beforeAll(async () => {
    db = await MongoMemoryServer.create();
    await connectDb(db);
    await addMockData();
});

afterAll(async () => {
    if (db) {
        await disconnectFromDb();
        await db.stop();
    }
});

describe("getGames", () => {
    let foundGames: IGame[] = [];

    beforeEach(async () => {
        foundGames = [];
    });

    it("should get 15 games", async () => {
        const args = {
            page: 0,
            sort: {
                type: 'NONE',
                ascending: true
            }
        }

        foundGames.push(...(await getGames({}, args, {}, {})));
        expect(foundGames.length).toEqual(15);
    });

    it("should first load 15 games, then load 15 more", async () => {
        const args = {
            page: 0
        }
        
        foundGames.push(...(await getGames({}, args, {}, {})));
        expect(foundGames.length).toEqual(15);
        args.page++;
        foundGames.push(...(await getGames({}, args, {}, {})));
        expect(foundGames.length).toEqual(30);
    });

    it("should get filtered games by genre", async () => {
        const args = {
            page: 0,
            filter: {
                genre: ["Action"]
            },
            sort: {
                type: 'NONE',
                ascending: true
            }
        }
        
        foundGames.push(...(await getGames({}, args, {}, {})));
        foundGames.forEach(game => {
            expect(game.genre).toContain("Action")
        });

        foundGames = [];
        args.filter.genre.push("Strategy");
        foundGames.push(...(await getGames({}, args, {}, {})));
        foundGames.forEach(game => {
            expect(game.genre).toContain("Action")
            expect(game.genre).toContain("Strategy")
        });
    });
    
    it("should get filtered games by price", async () => {
        const args = {
            page: 0,
            filter: {
                price: [0, 15]
            },
            sort: {
                type: 'NONE',
                ascending: true
            }
        }
        
        foundGames.push(...(await getGames({}, args, {}, {})));
        foundGames.forEach(game => {
            expect(game.price).toBeLessThanOrEqual(15);
        });
    });

    it("should get filtered games by tags", async () => {
        const args = {
            page: 0,
            filter: {
                tags: ["Strategy"]
            },
            sort: {
                type: 'NONE',
                ascending: true
            }
        }
        
        foundGames.push(...(await getGames({}, args, {}, {})));
        foundGames.forEach(game => {
            expect(game.popular_tags).toContain("Strategy")
        });
    });

    it("should get filtered games by releaseDate", async () => {
        // check before date
        const args = {
            page: 0,
            filter: {
                releasedate: [null, new Date(1513136810000)]
            },
            sort: {
                type: 'NONE',
                ascending: true
            }
        }
        
        foundGames.push(...(await getGames({}, args, {}, {})));
        expect(foundGames.map(a => a.name)).toContain("They Are Billions");

        // check between dates
        args.filter.releasedate = [new Date(1463011200000), new Date(1513136810000)];
        foundGames.push(...(await getGames({}, args, {}, {})));
        expect(foundGames.map(a => a.name)).toContain("DOOM");

        // check after date
        args.filter.releasedate = [new Date(1430784000000), null];
        foundGames.push(...(await getGames({}, args, {}, {})));
        expect(foundGames.map(a => a.name)).toContain("TERA");
    });

    it("should get filtered games by achievements", async () => {
        const args = {
            page: 0,
            filter: {
                achivements: 1
            },
            sort: {
                type: 'NONE',
                ascending: true
            }
        }
        // check for no achievements
        foundGames.push(...(await getGames({}, args, {}, {})));
        foundGames.forEach(game => {
            expect(game.achievements).toBeLessThan(1);
        });

        // check for achievements
        args.filter.achivements = 2;
        foundGames = [];
        foundGames.push(...(await getGames({}, args, {}, {})));
        foundGames.forEach(game => {
            expect(game.achievements).toBeGreaterThan(0);
        });

        // check between 1 and 10 achievements
        args.filter.achivements = 3;
        foundGames = [];
        foundGames.push(...(await getGames({}, args, {}, {})));
        foundGames.forEach(game => {
            expect(game.achievements).toBeGreaterThan(1);
            expect(game.achievements).toBeLessThanOrEqual(10);
        });

        // check between 10 and 20 achievements
        args.filter.achivements = 4;
        foundGames = [];
        foundGames.push(...(await getGames({}, args, {}, {})));
        foundGames.forEach(game => {
            expect(game.achievements).toBeGreaterThanOrEqual(10);
            expect(game.achievements).toBeLessThanOrEqual(20);
        });

        // check for more than 20 achievements
        args.filter.achivements = 5;
        foundGames = [];
        foundGames.push(...(await getGames({}, args, {}, {})));
        foundGames.forEach(game => {
            expect(game.achievements).toBeGreaterThanOrEqual(20);
        });
    });

    it("should sort by name", async () => {
        const args = {
            page: 0,
            sort: {
                type: 'NONE',
                ascending: true
            }
        }
        
        const l = await getGames({}, args, {}, {});
        args.sort.type = "NAME";
        foundGames.push(...(await getGames({}, args, {}, {})));
        expect(foundGames).not.toEqual(l);
    });

    it("ascending and descending should not be the same", async () => {
        const args = {
            page: 0,
            sort: {
                type: 'NAME',
                ascending: true
            },
            filter: {}
        }
        
        // check sort on name
        let l = await getGames({}, args, {}, {});
        args.sort.ascending = false;
        foundGames.push(...(await getGames({}, args, {}, {})));
        expect(foundGames).not.toEqual(l);
        
        // check sort on releaseDate
        foundGames = []
        args.sort.type = "RELEASEDATE";
        args.sort.ascending = true;
        l = await getGames({}, args, {}, {});
        args.sort.ascending = false;
        foundGames.push(...(await getGames({}, args, {}, {})));
        expect(foundGames).not.toEqual(l);
        
        // check sort on price
        foundGames = []
        args.sort.type = "PRICE";
        args.sort.ascending = true;
        args.filter = {
            price: [0, 15]
        }
        l = await getGames({}, args, {}, {});
        args.sort.ascending = false;
        foundGames.push(...(await getGames({}, args, {}, {})));
        expect(foundGames).not.toEqual(l);
    });

    it("should get games by searching", async () => {
        const args = {
            page: 0,
            search: "DO"
        }

        foundGames.push(...(await getGames({}, args, {}, {})));
        expect(foundGames.map(g => g.name)).toContain("DOOM");
    });

    it("should not get games by searching invalid", async () => {
        const args = {
            page: 0,
            search: "thereIsNoGameWithThisName"
        }

        foundGames.push(...(await getGames({}, args, {}, {})));
        expect(foundGames.length).toBe(0);
    });



});

describe("getGame", () => {

    it("should get game with matching appId", async () => {
        const args = {
            appId: 379720
        };

        const game = await getGame({}, args, {}, {});
        expect(game).not.toBeNull();
        expect(game?.appId).not.toBeNull();
        expect(game?.appId).toBe(args.appId);
    });

    it("should not find a game with invalid id", async () => {
        const args = {
            appId: 0
        };

        const game = await getGame({}, args, {}, {});
        expect(game).toBeNull();
    });
});

describe("addComment", () => {

    it("should not update as id is wrong", async () => {
        const commentArgs = {
            game: 0,
            comment: {
                name: "TestName",
                rating: 3,
                comment: "Test comment"
            }
        };

        const r = await addComment({}, commentArgs);
        expect(r.updated).toBe(false);
        const game = await getGame({}, {appId: 379720}, {}, {});
        expect(game).not.toBeNull();
        expect(game?.comments).not.toBeNull();
        expect(game?.comments.length).toBe(0);
    });

    it("should add commenct", async () => {
        const commentArgs = {
            game: 379720,
            comment: {
                name: "TestName",
                rating: 3,
                comment: "Test comment"
            }
        };

        await addComment({}, commentArgs);
        const game = await getGame({}, {appId: 379720}, {}, {});
        expect(game).not.toBeNull();
        expect(game?.comments).not.toBeNull();
        expect(game?.comments.length).not.toBe(0);
    });
});
