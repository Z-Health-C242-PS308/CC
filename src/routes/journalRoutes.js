const express = require('express');
const multer = require('multer');
const router = express.Router();
const { createJournalCtrl, getAllJournalsCtrl } = require('../controller/journalController')
const upload = multer();

router.post('/', upload.none(), createJournalCtrl)
router.get('/', getAllJournalsCtrl)

module.exports = router;