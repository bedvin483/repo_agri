const bcrypt = require('bcrypt');

const chiffrer = async (pass)=>{
    const pass_c = await bcrypt.hash(pass,10);
    return pass_c
};



module.exports = {chiffrer}