const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];

        let decodedData;

        if (token) {
            decodedData = jwt.verify(token, process.env.SECRET_KEY);

            req.email = decodedData?.email;
        }

        next();
    } catch (e) {
        res.status(401).json({ message: e.toString() });
    }
}

module.exports = auth;