const {Firestore} = require("@google-cloud/firestore");
const db = new Firestore();

async function createJournal(id, data) {
    const journalCollection = db.collection("journals");
    return journalCollection.doc(id).set(data)
}

async function getAllJournals(user_id) {
    const journalsRef = await db
    .collection("journals")
    .where("user_id", "==", user_id)
    .get();
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

async function getLatestJournal(user_id) {
    const journalRef = await db
    .collection('journals')
    .where("user_id", "==", user_id)
    .orderBy('created', 'desc')
    .limit(1)
    .get();
    
    let journal;
    journalRef.forEach((item) => {
        journal = item.data();
    })
    return journal
}

async function getWeekLatestJournal(user_id) {
    const journalRef = await db
    .collection('journals')
    .where("user_id", "==", user_id)
    .orderBy('created', 'desc')
    .limit(7)
    .get();
    
    const journals = [];

    journalRef.forEach(doc => {
        journals.push(doc.data());
    })
    return journals;
}
// console.log(getLatestJournal)

module.exports = { createJournal, getAllJournals, getJournalById, getLatestJournal, getWeekLatestJournal }