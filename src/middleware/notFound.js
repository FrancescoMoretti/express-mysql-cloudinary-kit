//404
const path=require('path');

function createNotFoundHandler(publicDir){
    return (req, res)=>{
        res.status(404).sendFile(path.join(publicDir, '404.html'));//così rimane il nome del file non trovato nell'url
    };
};

module.exports={createNotFoundHandler};