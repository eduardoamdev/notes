const jwt = require('jsonwebtoken');

const tokenAuth = (req, res, next) => {
	let token = req.headers.token;

	if (!token) {
		return res.json({
			success: false,
			message: 'No token provided'
		});
	}

	jwt.verify(token, process.env.SECRET_WORD, (error, decoded) => {
		if (error) {
			return res.json({
				success: false,
				message: 'Incorrect token authentication'
			});
		} else {
			req.userId = decoded.id;
			next();
		}
	});
};

module.exports = tokenAuth;
