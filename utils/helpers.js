const bcrypt = require('bcrypt');

function hashPassword (password) {
    const salt = bcrypt.genSaltSync(8);
    return bcrypt.hashSync(password, salt);
}

function comparedPassword (raw, hash){
    return bcrypt.compareSync(raw, hash);
}

module.exports = {
    hashPassword,
    comparedPassword,
}