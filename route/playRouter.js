const express = require("express")
const router = express.Router();
const {
    getAllQuiz,
    createQuiz,
    getQuestions,
    editQuiz,
    deleteQuiz
} = require('../controller/playController')


router.route('').get(getAllQuiz)
router.route('/adminQuiz').post(createQuiz)
router.route('/Quiz/:id').get(getQuestions).patch(editQuiz).delete(deleteQuiz)


module.exports = router;


