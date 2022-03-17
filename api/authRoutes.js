const express = require('express');
const authRouter = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

const salt = bcrypt.genSaltSync(10);

const expirationTime = 3600000;

authRouter.post('/signup', async (req, res) => {
	try {
		let { username, password } = req.body;
    
		let user = await User.findOne({ username });

		if (user) {
			return res.json({
				success: false,
				message: 'This username already exists.'
			});
		}

		password = bcrypt.hashSync(password, salt);

		await User.create({
			username,
			password
		});

		res.json({
			success: true,
			message: 'New user has been created'
		});
	} catch (error) {
		res.json({
			success: false,
			message: 'Server error'
		});
	}
});

authRouter.post('/login', async (req, res) => {
	try {
		let { username, password } = req.body;
    
		let user = await User.findOne({ username });

		if (!user) {
			return res.json({
				success: false,
				message: 'Invalid username'
			});
		}

		let validPassword = await bcrypt.compare(password, user.password);

		if (validPassword === false) {
			return res.json({
				success: false,
				message: 'Bad authentication'
			});
		}

		let token = jwt.sign({ id: user._id }, process.env.SECRET_WORD, { expiresIn: expirationTime });

		res.status(200).json({
			success: true,
			token
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: 'Server error'
		});
	}
});

module.exports = authRouter;
