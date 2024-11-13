const {Firestore} = require("@google-cloud/firestore");
const db = new Firestore();

async function createJournal(id, data) {
    const journalCollection = db.collection("journals");
    return journalCollection.doc(id).set(data)
}

async function getAllJournals() {
    const journalsRef = await db.collection("journals").get();
    const journals = [];

    journalsRef.forEach(doc => {
        journals.push(doc.data());
    })

    console.log(journals)
    return journals;
}

module.exports = { createJournal, getAllJournals }