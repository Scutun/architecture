const jwt = require("jsonwebtoken")

function checkToken(req, res, next) {
	try {
		const authHeaders = req.headers.authorization
		const token = authHeaders && authHeaders.split(" ")[1]
		jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
		next()
	} catch (e) {
		res.status(403).json({
			error: "Invalid or expired token.",
		})
	}
}

module.exports = checkToken
