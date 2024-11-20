const projects=require("../Model/projectSchema")

exports.addProject=async(req,res)=>{
    console.log("inside the add project fn");
    const {title,languages,github,overview,website}=req.body
    const projectImage=req.file.filename
    const userId=req.payload

    console.log(title,languages,github,overview,website,projectImage,userId)

    try{
        const existingProject=await projects.findOne({github})
        if(existingProject){
            res.status(406).json("Project already exist...")
        }
        else{
            const newProject=new projects({
                title,languages,github,overview,website,projectImage,userId
            })
            await newProject.save()
            res.status(200).json(newProject)
        }

    }catch(err){
        res.status(401).json(err)

    }
    
}

//getHomeProjects
exports.getHomeProjects=async(req,res)=>{
    try{
    
        const homeProjects=await projects.find().limit(3)
        res.status(200).json(homeProjects)
    }catch(err){
        res.status(401).json(err)
    }
    }


//getAllProjects
exports.getAllProjects=async(req,res)=>{
    const searchKey=req.query.search
    const query={
        languages:{$regex:searchKey,$options:'i'}

    }
try{

    const allProjects=await projects.find(query)
    res.status(200).json(allProjects)
}catch(err){
    res.status(401).json(err)
}
}

//getUserProjects

exports.getUserProjects=async(req,res)=>{
    const userId=req.payload
    try{
        const allProjects=await projects.find({userId})
    res.status(200).json(allProjects)

    }catch(err){
        res.status(401).json(err) 
    }
}


//updateProjects
exports.editProject=async(req,res)=>{

    const {title,languages,github,overview,website,projectImage}=req.body
    const uploadImage=req.file?req.file.filename:projectImage
    const userId=req.payload
    const {pid}=req.params
    try{
        const updateProject=await projects.findByIdAndUpdate({_id:pid},{
            title, languages, github, overview, website, projectImage:uploadImage, userId
        },{new:true})  
        await updateProject.save()
        res.status(200).json(updateProject)


    }catch(err){
        res.status(401).json(err) 
    }
}


//deleteProject

exports.deleteProject=async(req,res)=>{
    const {pid}=req.params
    try{

        const deleteData=await projects.findByIdAndDelete({_id:pid})
    
        res.status(200).json(deleteData)
    }catch(err){
        res.status(401).json(err) 
    }

}
