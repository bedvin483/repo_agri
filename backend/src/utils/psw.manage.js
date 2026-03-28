const bcrypt = require('bcrypt');

const chiffrer = async (pass)=>{
    const pass_c = await bcrypt.hash(pass,10);
    return pass_c
};

const checkPsw = async (pass,psw_chiffrer)=>{
    const result = await bcrypt.compare(pass,psw_chiffrer);
    return result;
}


module.exports = {chiffrer, checkPsw};