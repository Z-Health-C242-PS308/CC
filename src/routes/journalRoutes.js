const express = require('express');
const multer = require('multer');
const router = express.Router();
const { createJournalCtrl, getAllJournalsCtrl, getJournalByIdCtrl, getLatestJournalCtrl } = require('../controller/journalController')
const upload = multer();

router.post('/', upload.none(), createJournalCtrl)
router.get('/all/:id', getAllJournalsCtrl)
router.get('/latest/:id', getLatestJournalCtrl)
router.get('/:id', getJournalByIdCtrl)

module.exports = router;