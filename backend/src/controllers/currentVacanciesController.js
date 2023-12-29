const currentVacanciesModal = require('../models/currentVacanciesModal')

const createCurrentVacancies = async(req,res)=>{
    try{
        const data = new currentVacanciesModal({
            role:req?.body?.role,
            experience : req?.body?.experience,
            location : req?.body?.location,
            description:req?.body?.description
        })
        await data.save()
        res.status(201).json({status:'SUCCESS' , data : data})
    }
    catch(err){
        console.log("err" , err)
        res.status(400).json({status:'FAILURE' , error: `${err?.message?.split(":")[2]}` || `Internal server error-${err.message}`})
    }
}

const getCurrentVacancies = async(req,res)=>{
    try{
        const data = await currentVacanciesModal.find()
        res.status(200).json({status:'SUCCESS' , data : data})

    }
    catch(err){
        
        console.log("err" , err)
        res.status(400).json({status:'FAILURE' , error: `${err?.message?.split(":")[2]}` || `Internal server error-${err.message}`})
    }
}

const getSingleCurrentVacancies = async(req,res)=>{
    try{
        const data = await currentVacanciesModal.findById(req?.params?.id)
        if(!data){
            return res.status(400).json({status:"FAILURE" , msg : "data is not available for particular id"})
        }
        res.status(200).json({status:'SUCCESS' , data : data})

    }
    catch(err){
        
        console.log("err" , err)
        res.status(400).json({status:'FAILURE' , error: `${err?.message?.split(":")[2]}` || `Internal server error-${err.message}`})
    }
}
const updateCurrentVacancies = async(req,res)=>{
    try{
        const data = await currentVacanciesModal.findByIdAndUpdate(req?.params?.id , {...req.body} ,{new:true})
        if(!data){
            return res.status(400).json({status:"FAILURE" , msg : "data is not available for particular id"})
        }
        res.status(200).json({status:'SUCCESS' , data : data})

    }
    catch(err){
        
        console.log("err" , err)
        res.status(400).json({status:'FAILURE' , error: `${err?.message?.split(":")[2]}` || `Internal server error-${err.message}`})
    }
}

const deleteCurrentVacancies = async(req,res)=>{
    try{
        const data = await currentVacanciesModal.findByIdAndDelete(req?.params?.id)
        if(!data){
            return res.status(400).json({status:"FAILURE" , msg : "data is not available for particular id"})
        }
        res.status(200).json({status:'SUCCESS' , msg : "data is deleted successfully"})

    }
    catch(err){
        
        console.log("err" , err)
        res.status(400).json({status:'FAILURE' , error: `${err?.message?.split(":")[2]}` || `Internal server error-${err.message}`})
    }
}
module.exports = {createCurrentVacancies , getCurrentVacancies , getSingleCurrentVacancies , updateCurrentVacancies,deleteCurrentVacancies}