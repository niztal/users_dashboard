import { decodeToken } from '../utils/token';

export default (req, res, next) => {
    if (req.url === '/login' || req.method === 'OPTIONS') {
        next();
    } else {
        const authorizationHeader = req.headers.authorization && req.headers.authorization.startsWith('Bearer ');
        if (!authorizationHeader) {
            console.error('no authorization found', req.method);
            res.status(401).send();
        } else {
            const jwtToken = req.headers.authorization.split('Bearer ')[1];
            decodeToken(jwtToken, (decodedToken) => {
                if (decodedToken && decodedToken.body.userId) {
                    req.userId = decodedToken.body.userId;
                    next();
                } else {
                    res.status(401).send();
                }
            });
        }
    }
}