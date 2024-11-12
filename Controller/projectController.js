const projects=require("../Model/projectSchema")

exports.addProject=(req,res)=>{
    console.log("inside the add project fn");
    const {title,languages,github,overview,website}=req.body
    const projectImage=req.file.filename
    const userId=req.payload

    console.log(title,languages,github,overview,website,projectImage,userId)
    res.status(200).json("add project request recieved")
    
}

