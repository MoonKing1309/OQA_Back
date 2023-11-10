// let quizData = require('quizData')
const quizCollection = require('../model/quizSchema')
const questionCollection = require('../model/questionSchema')
const mongoose = require('mongoose');


const getAllQuiz = async (req,res)=>{
    try {
        const data = await quizCollection.find({isQuiz:true})
        if(!data){
            return res.status(500).json({success:false})
        }
        res.status(200).json(data)
        
    } catch (error) {
        res.status(404).json({success:false})
    }

    // res.status(200).json({data:data}) 
}
const createQuiz =  async (req,res)=>{
    try {
        var newId = new mongoose.Types.ObjectId();
        let {quizJson,questionJson} = req.body;
        
        let qcount = quizJson.quesCount;
        quizJson = {...quizJson, _id:newId};
        quizCollection.create(quizJson)
        for(let i =0;i<qcount;i++)
        {
            questionJson[i] = {...questionJson[i], quizID:newId};
            questionCollection.create(questionJson[i]);

        }
        res.status(200).json({msg:success})
    } catch (error) {
        res.json({msg:error})
    }
    
}
const getQuestions = async (req,res)=>{
    try {
        
        const {id} = req.params;
        const tempQuiz = await quizCollection.find({_id:id,isQuiz:true})
        const requiredQuizID = tempQuiz[0]._id
        const Question = await quizCollection.find({isQuiz:false,quizID:requiredQuizID})
        res.status(200).json(Question)
    } catch (error) {
        res.status(404).send(error)
    }
}
const editQuiz = async (req,res)=>{
    
}
const deleteQuiz = async (req,res)=>{
    quizCollection.findOneAndDelete()
}

module.exports = {
    getAllQuiz,
    createQuiz,
    getQuestions,
    editQuiz,
    deleteQuiz
}