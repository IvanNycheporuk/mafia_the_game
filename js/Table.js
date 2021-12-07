class Table {
    constructor(name) {
        this.Participants = [];
        this.Name = name;
    }

    HasParticipant(id) {
        return this.Participants.some(x => x.Id == id);
    }

    GetParticipantPosition(id) {
        return this.Participants.findIndex(x => x.Id == id);
    }

    AddParticipant(participant) {
        this.Participants.push(participant);
    }
}