require("dotenv").config()
const User = require("../models/User")
const jwt = require("jsonwebtoken")
const UnauthenticatedError = require("../errors/unauthenticated")

const auth = (req, res, next) => {
	const authHeader = req.headers["authorization"]
	const token = authHeader && authHeader.split(" ")[1]
	if (!token) {
		throw new UnauthenticatedError("authentication failed")
	}
	try {
		const payload = jwt.verify(token, process.env.JWT_SECRET)
		req.user = { userId: payload.userId, name: payload.name }
		next()
	} catch (err) {
		throw new UnauthenticatedError("authentication failed")
	}
}

module.exports = auth
