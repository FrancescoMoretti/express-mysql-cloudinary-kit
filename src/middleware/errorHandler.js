//handler per erorri non gestiti
const errorHandler=(err, req, res, next)=>{
    console.error("Errore non gestito: ", err);
    res.status(err.status || 500).json({
        success: false,
        message: "Errore interno lato server."
    });
};

module.exports={errorHandler};