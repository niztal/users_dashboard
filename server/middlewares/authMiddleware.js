import { decodeToken } from '../utils/token';

export default (req, res, next) => {
    if (req.url === '/' || req.url === '/login' || req.url === '/register') {
        next();
    } else {
        const authorizationHeader = req.headers.authorization && req.headers.authorization.startsWith('Bearer ');
        if (!authorizationHeader) {
            console.error('no authorization found');
            return res.redirect('/');
        } else {
            const jwtToken = req.headers.authorization.split('Bearer ')[1];
            decodeToken(jwtToken, (decodedToken) => {
                if (decodedToken && decodedToken.body.userId) {
                    req.userId = decodedToken.body.userId;
                    next();
                } else {
                    return res.redirect('/');
                }
            });
        }
    }
}