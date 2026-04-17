const multer = require('multer');
const fs = require('fs');
module.exports = (req,res,next)=>{
    const memoire = multer.diskStorage({
        destination: (req,file,cb)=>{
            const path = `public/produit/${req.id_vend}`;
            if (!fs.existsSync(path)){
                fs.mkdirSync(path, {recursive: true});
            }
            cb(null,path);
        },
        filename: (req,file,cb)=>{
            if (!file.mimetype.startsWith('image')){
                cb(new Error('le fichier doit etre une image'),null)
            }
            const path = `public/produit/${req.id_vend}`;
            if (!fs.existsSync(path)){
                fs.mkdirSync(path, {recursive: true});
            }
            let format = file.mimetype.split('/')[1];
            req.image_prod = `http://localhost:${process.env.PORT}/${path}/${req.query.nom_prod}.${format}`;
            cb(null,`${req.query.nom_prod}.${format}`)
        }
    })
    const saver = multer({storage: memoire}).single('image_prod');
    saver(req,res, (err)=>{
        if (err){
            return res.status(400).json({message: err});
        }
        next()
    });
}