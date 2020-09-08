import nJwt from 'njwt';

const secret = Buffer.from('fe1a1915a379f3be5394b64d14794932', 'hex');

const createToken = (userId) => {
    var claims = { userId };
    var jwt = nJwt.create(claims, secret);
    jwt.setExpiration(new Date().getTime() + (60 * 60 * 1000)); // One hour from now
    return jwt.compact();
}

const decodeToken = (token, callback) => {
    nJwt.verify(token, secret, (err, verifiedToken) => {
        if (err) {
            console.error(err);
        }
        callback(verifiedToken);
    });
}

module.exports = {
    createToken,
    decodeToken
}