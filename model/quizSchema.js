const { boolean } = require('mathjs')
const mongoose = require('mongoose')

const quizSchema = new mongoose.Schema({
    quizTitle:String,
    quizDesc:String,
    quizImg:String,
   isQuiz:boolean,
   quesCount:Number
},{
    collection:'quizCollection'
})




module.exports = mongoose.model('quizCollection',quizSchema)