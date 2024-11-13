const {Firestore} = require("@google-cloud/firestore");
const db = new Firestore();

async function createJournal(id, data) {
    const journalCollection = db.collection("journals");
    return journalCollection.doc(id).set(data)
}

module.exports = { createJournal }