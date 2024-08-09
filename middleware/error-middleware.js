const errorMiddleware = (err,req,res,next)=>{

    const status = err.status || 500 ; //if error status not provided then 500 by default

    const message = err.message || "Backend-error"

    const extraDetails = err.extraDetails || "Error from backed";

    return res.status(status).json({message,extraDetails});

};

module.exports = errorMiddleware;