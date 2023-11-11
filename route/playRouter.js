const express = require("express")
const router = express.Router();
const {
    getAllQuiz,
    createQuiz,
    getQuestions,
    deleteQuiz,
    getQuizAndQues,
    updateQuizAndQues
} = require('../controller/playController')


router.route('').get(getAllQuiz)
router.route('/adminQuiz').post(createQuiz)
router.route('/adminEditQuiz/:id').get(getQuizAndQues).put(updateQuizAndQues)
router.route('/Quiz/:id').get(getQuestions).delete(deleteQuiz)



module.exports = router;


