const crypto = require('crypto');

const journals = []

const createJournalCtrl = async (req, res) => {
    console.log(req.body);
    const { keluhan, mood } = req.body
    const journal_id = crypto.randomUUID()

    const newJournal = {
        journal_id: journal_id,
        keluhan: keluhan,
        mood: mood
    }
    journals.push(newJournal)
    
    console.log(journals)

    const berhasil = journals.filter((check) => check.journal_id === journal_id).length > 0;

    // if (!keluhan) {
    //     return res.status(404).json ({
    //         error: true,
    //         message: "mana keluhannya?"
    //     })
    // } else if (!mood) {
    //     return res.status(404).json ({
    //         error: true,
    //         message: "loh, robot lu?"
    //     })
    // }

    if (berhasil) {
        return res.status(200).json ({
            error: false,
            message: "journal telah dibuat",
            journal: newJournal
        })
    } else {
        return res.status(404).json ({
            error: true,
            message: "gagal"
        })
    }
}

module.exports = { createJournalCtrl }