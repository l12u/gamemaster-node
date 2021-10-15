class Game {
    /**
     * @param {string} id
     * @param {Array<any>} players
     * @param {Map<string, string>} roles
     * @param {string} state
     * @param {number} createdAt
     * @param {number} updatedAt
     * @param {any} [gameData]
     */
    constructor(id, players, roles, state, createdAt, updatedAt, gameData) {
        this.id = id;
        this.players = players;
        this.roles = roles;
        this.state = state;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.gameData = gameData;
    }
}

module.exports = Game;