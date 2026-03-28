const jwt = require('jsonwebtoken');

module.exports = async (playload={})=>{
    const token = await jwt.sign(playload,'secret_key',{expiresIn: "1h"});
    return token;
}