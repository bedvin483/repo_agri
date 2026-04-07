const jwt = require('jsonwebtoken');

module.exports = (req,res,next)=>{
    const header = req.headers.authorization;
    if (!header){
        return res.status(401).json({message:'token manquant'})
    }
    const token = header.split(' ')[1];
    try {
        const playload = jwt.verify(token,process.env.secret_key);
        req.id_ach = playload.id_ach;
        next()
    } catch (err) {
        return res.status(401).json({message:'token invalide'})
    }
}