const tableNames = ['A', 'B', 'C', 'D', 'E', 'F'];

let matrix = [];
let matrixElement = document.querySelector('.matrix');

const gamesCount = 21;
const participantsCount = 35;
const tablesCount = Math.floor(participantsCount / 10);
const freePlayers = participantsCount - tablesCount * 10;
const participants = [];

for (let i = 0; i < participantsCount; i++) {
    participants.push(new Participant(i + 1, "Player " + (i + 1)));
}

for (let i = 1; i <= participantsCount; i++) {
    let arr = [];
    for (let j = 0; j < gamesCount; j++) {
        let num = j + i;
        if (num > 10) {
            num = num % 10;
        }

        arr.push(num);
    }

    matrix.push(arr);
}

let b = 0; // offset
for (let r = gamesCount - 1; r >= 0; r--) {
    for (let i = 0; i < freePlayers; i++) {
        matrix[b][r] = "*";
        b++;

        if (b > participantsCount - 1) {
            b = 0;
        }
    }
}

for (let i = 0; i < participantsCount; i++) {
    let iterator = 0;
    for (let j = 0; j < gamesCount; j++) {
        let el = matrix[i][j]

        if (el != "*") {
            iterator++;
            let num = iterator + i;
            if (num > 10) {
                num = num % 10;

                if (num == 0) {
                    num = 10;
                }
            }

            matrix[i][j] = num;
        }
    }
}

let tables = [];
const roundTables = []; // gamesCount

for (let round = 0; round < gamesCount; round++) {
    for (let t = 0; t < tablesCount; t++) {
        const table = new Table(tableNames[t]);
        tables.push(table);

        // Register all participantsCount for table
        for (i = 0; i < 10; i++) {
            let p = getParticipant(table, round, i + 1);
            table.AddParticipant(p);
            p.AddPosition(i);
        }

        // Register opponents for participants
        for (i = 0; i < 10; i++) {
            let p = table.Participants[i];
            p.AddRound();

            table.Participants.forEach(item => {
                if (item != p) {
                    p.AddOpponent(item.Id);
                }
            });
        }
    }

    roundTables.push({
        tables: tables
    });
    tables = [];
}

console.log(roundTables);

function getParticipant(table, round, position) {
    let participantsOnThisPosition = [];

    for (let i = 0; i < participantsCount; i++) {
        if (matrix[i][round] == position) {
            participantsOnThisPosition.push(participants[i]);
        }
    }

    let sortedparticipants = participantsOnThisPosition
        .map(x => {
            return {
                participant: x,
                weight: getWeight(x)
            }
        })
        .sort((a, b) => a.weight - b.weight);

    return sortedparticipants[0].participant;

    function getWeight(participant) {
        let w = 0;

        table.Participants.forEach(p => {
            if (participant.HasOpponent(p.Id)) {
                w += participant.GetOpponentIntersectCount(p.id);
            }
        });

        return w;
    }
}

function getShuffledArray(array) {
    return [...array].sort((a, b) => 0.5 - Math.random());
}