const MainTag = require('../models/mainTags')

const createMainTag = async(req,res)=>{
    try{
        console.log("req.body" , req.body)
        let data = new MainTag(req.body)
        let saveData = await data.save()
        res.status(201).json({status : "SUCCESS" ,data : saveData})

    }
    catch(err){
        console.log("err" , err)
        res.status(500).json({status : "FAILURE" ,error : err})
    }
}

const getMainTag = async(req,res)=>{
    try{
        let data = await MainTag.find()
        res.status(200).json({status : "SUCCESS" ,data : data})

    }
    catch(err){
        console.log("err",err)
        res.status(500).json({status : "FAILURE" ,error : err})
    }
}
const getSingleMainTag = async(req,res)=>{
    try{
        let data = await MainTag.findById(req?.params?.id)
        res.status(200).json({status : "SUCCESS" ,data : data})

    }
    catch(err){
        console.log("err",err)
        res.status(500).json({status : "FAILURE" ,error : err})
    }
}

module.exports = {createMainTag , getMainTag , getSingleMainTag}