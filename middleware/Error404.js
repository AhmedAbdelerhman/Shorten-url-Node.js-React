const error4040 =(req, res) =>{


    res.status(404).json({  status: "failed",
    message: "not found"})
}


module.exports =error4040