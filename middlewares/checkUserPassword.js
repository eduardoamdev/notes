const minPassLength = 8;

const checkUserPassword = async (req, res, next) => {
	let { username, password } = req.body;

	if (!username || !password) {
		return res.json({
			success: false,
			message: 'Introduce username and password'
		});
	}

	if (password.length < minPassLength) {
		return res.json({
			success: false,
			message: 'Password is too short'
		});
	}

	next();
};

module.exports = checkUserPassword;
