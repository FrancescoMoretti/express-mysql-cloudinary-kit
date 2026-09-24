const rateLimit=require('express-rate-limit');

//limitatore di tentativi di login (da un ip)
function createLoginLimiter({windowMs=15*60*1000, max=10}={}){
    return rateLimit({
        windowMs,//15*60*1000=15 minuti
        max,//10 tentativi
        standardHeaders: true,
        legacyHeaders: false,
        skipSuccessfulRequests: true,
        message: {
            success: false,
            message: "Troppi tentativi di accesso, riprova tra 15 minuti."
        }
    });
};

//limitatore di richieste a pagine pubbliche
function createPublicLimiter({windowMs=60*1000, max=60}={}){
    return rateLimit({
        windowMs,//60*1000=1 minuto
        max,//60 richieste
        standardHeaders: true,
        legacyHeaders: false,
        message: {
            success: false,
            message: "Troppe richieste, riprova tra qualche minuto."
        }
    });
};

module.exports={createLoginLimiter, createPublicLimiter};