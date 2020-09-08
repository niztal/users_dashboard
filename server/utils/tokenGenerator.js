import nJwt from 'njwt';
import secureRandom from 'secure-random';

const createToken = (userId) => {
    var signingKey = secureRandom(256, { type: 'Buffer' }); // Create a highly random byte array of 256 bytes
    var claims = { userId };
    var jwt = nJwt.create(claims,signingKey);
    jwt.setExpiration(new Date().getTime() + 60*1000);
    return jwt.compact();
}

export default createToken;