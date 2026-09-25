//favicon
function createFaviconHandler(faviconPath){
    return (req, res)=>{
        res.set("Cross-Origin-Resource-Policy", "cross-origin");//permetto il recupero del favicon da altre origini
        res.sendFile(faviconPath);
    };
};

module.exports={createFaviconHandler};