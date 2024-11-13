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

async function getJournalById(journal_id) {
    const journalRef = await db
    .collection("journals")
    .where("journal_id", "==", journal_id)
    .get()

    let journal;
    journalRef.forEach((item) => {
        journal = item.data();
    });
    return journal;
}

async function getLatestJournal() {
    const journalRef = await db
    .collection('journals')
    .orderBy('created', 'desc')
    .limit(1)
    .get();
    
    let journal;
    journalRef.forEach((item) => {
        journal = item.data();
    })
    return journal
}
console.log(getLatestJournal)

module.exports = { createJournal, getAllJournals, getJournalById, getLatestJournal }