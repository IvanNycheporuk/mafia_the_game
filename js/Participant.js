class Participant {
    constructor(id, fullName) {
        this.Id = id;
        this.FullName = fullName;

        this.Opponents = [];
        this.UniqueOpponents = [];
        this.Blacklist = [];
        this.Rounds = 0;
        this.PlayedPositions = [];
    }

    AddOpponent(id) {
        if (this.UniqueOpponents.indexOf(id) == -1) {
            this.UniqueOpponents.push(id);
        }

        this.Opponents.push(id);
    }

    ClearOpponents() {
        this.Opponents = [];
    }

    HasOpponent(id) {
        return this.Opponents.indexOf(id) !== -1;
    }

    AddPosition(number) {
        this.PlayedPositions.push(number);
    }

    HasPosition(number) {
        return this.PlayedPositions.indexOf(number) !== -1;
    }

    AddRound() {
        this.Rounds++;
    }

    InBlacklist(id) {
        return this.Blacklist.indexOf(id) !== -1;
    }
}