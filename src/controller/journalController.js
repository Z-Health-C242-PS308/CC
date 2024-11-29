const crypto = require('crypto');

const { createJournal, getAllJournals, getJournalById, getLatestJournal } = require("../model/journalModel")


const createJournalCtrl = async (req, res) => {
    const { user_id, waktu_belajar, waktu_belajar_tambahan, waktu_tidur, aktivitas_sosial, aktivitas_fisik, jurnal_harian } = req.body

    if (isNaN(parseFloat(waktu_belajar)) || isNaN(parseFloat(waktu_belajar_tambahan)) || isNaN(parseFloat(waktu_tidur)) || isNaN(parseFloat(aktivitas_sosial)) || isNaN(parseFloat(aktivitas_fisik))) {
        return res.status(400).json({ message: 'Input waktu dan aktivitas harus berupa angka!' });
    }

    const journal_id = crypto.randomUUID()
    const createdAt = new Date().toISOString();

    const newJournal = {
        journal_id: journal_id,
        user_id: user_id,
        waktu_belajar: parseFloat(waktu_belajar),
        waktu_belajar_tambahan: parseFloat(waktu_belajar_tambahan),
        waktu_tidur: parseFloat(waktu_tidur),
        aktivitas_sosial: parseFloat(aktivitas_sosial),
        aktivitas_fisik: parseFloat(aktivitas_fisik),
        jurnal_harian: jurnal_harian,
        created: createdAt
    }

    if (!newJournal) {
        return res.status(404).json ({
            error: true,
            message: "harap diisi yang lengkap ya !"
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

const getLatestJournalCtrl = async (req, res) => {
    try {
        const lastjournal = await getLatestJournal();
        console.log(lastjournal)

        if (!lastjournal) {
            return res.status(404).json({
                message: 'Journal terakhir tidak ditemukan!'
            })
        }

        return res.status(200).json({
            message: 'Journal terakhir telah ditampilkan!',
            journal: lastjournal
        })
    } catch(e) {
        return res.status(500).json({
            message: e.message,
        });
    }
}

const getJournalByIdCtrl = async (req, res) => {
    const { id } = req.params;

    try {
        const journal = await getJournalById(id);

        if (!journal) {
            return res.status(404).json({
                message: 'Journal tidak ditemukan!'
            })
        }

        return res.status(200).json({
            message: 'Journal ditemukan!',
            journal: journal
        })
    } catch(e) {
        return res.status(500).json({
            message: e.message,
        });
    }
}

module.exports = { createJournalCtrl, getAllJournalsCtrl, getJournalByIdCtrl, getLatestJournalCtrl }