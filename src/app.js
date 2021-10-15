const express = require("express");
const bodyParser = require("body-parser");

const Game = require("./types/game");
const Player = require("./types/player");
const gameStates = {
    lobby: "lobby",
    running: "running"
};

const app = express();
app.use(bodyParser.json());

console.log("Hello World!");
const games = [];

// register a new game
app.post("/games", (req, res) => {
    let rawGame = req.body;

    let currentTime = Date.now();
    let game = new Game(
        rawGame.id, rawGame.players,
        rawGame.roles, rawGame.state,
        currentTime, currentTime,
        undefined
    );

    if (games.filter(g => g.id === game.id)) {
        res.status(400);
        return;
    }

    games.push(game);
});

// delete an existing game
app.delete("/games/:id", (req, res) => {
    let gameId = req.params.id;

    for (let i = 0; i < games.length; i++) {
        let game = games[i];
        if (game.id === gameId) {
            games.splice(i, 1);
            return;
        }
    }
    res.status(404);
});

// get all games
app.get("/games", (req, res) => {
    res.json(games);
});

// get specific game
app.get("/games/:id", (req, res) => {
    let gameId = req.params.id;

    let game = games.filter(g => g.id === gameId);
    if (!game) {
        res.status(404);
        return;
    }
    res.json(game);
});

// add a player to a game
app.post("/games/:id/players", (req, res) => {
    let gameId = req.params.id;
    let rawPlayer = req.body;

    let player = new Player(rawPlayer.id, rawPlayer.name);

    let game = games.filter(g => g.id === gameId);
    if (!game) {
        res.status(404);
        return;
    }

    if (game.players.filter(pl => pl.id === player.id)) {
        res.status(400);
        return;
    }
    game.players.push(player);
});

// deletes a player from the game
app.delete("/games/:id/players/:pId", (req, res) => {
    let gameId = req.params.id;
    let playerId = req.params.pId;

    let game = games.filter(g => g.id === gameId);
    if (!game) {
        res.status(404);
        return;
    }

    for (let i = 0; i < game.players.length; i++) {
        let player = game.players[i];
        if (player.id === playerId) {
            game.players.splice(i, 1);
            return;
        }
    }
    res.status(404);
});

// updates the state of the game
app.put("/games/:id/state", (req, res) => {
    let gameId = req.params.id;
    let newState = req.body.state;

    // validate that state is LEGIT
    if (!(newState in gameStates)) {
        res.status(400);
    }

    let game = games.filter(g => g.id === gameId);
    if (!game) {
        res.status(404);
        return;
    }

    game.state = newState;
});

app.listen(8000, () => {
    console.log("Started web server at http://localhost:8000");
});