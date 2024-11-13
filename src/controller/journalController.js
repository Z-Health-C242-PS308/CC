const crypto = require('crypto');

const { createJournal, getAllJournals } = require("../model/journalModel")

// const journals = []

const createJournalCtrl = async (req, res) => {
    const { keluhan, mood } = req.body
    const journal_id = crypto.randomUUID()

    const newJournal = {
        journal_id: journal_id,
        keluhan: keluhan,
        mood: mood
    }

    console.log(newJournal)

    // opsional criteria

    if (!keluhan) {
        return res.status(404).json ({
            error: true,
            message: "tolong isi keluhannya !"
        })
    } else if (!mood) {
        return res.status(404).json ({
            error: true,
            message: "moodnya juga disampaikan !"
        })
    }

    try {
            await createJournal(journal_id, newJournal)
            return res.status(200).json ({
                error: false,
                message: "journal telah dibuat",
                journal: newJournal
            })
    } catch(e) {
        return res.status(500).json({
            error: true,
            message: 'Gagal membuat donasi: ' + e.message,
        });
    }
}

const getAllJournalsCtrl = async (req, res) => {
    try {
        const journals = await getAllJournals();

        return res.status(200).json({
            message: 'Semua journal berhasil ditampilkan!',
            journals: journals
        });
    } catch (e) {
        return res.status(500).json({
            message: e.message,
        });
    }
    
}
// console.log(getAllJournalsCtrl)

module.exports = { createJournalCtrl, getAllJournalsCtrl }