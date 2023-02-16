const { StatusCodes } = require("http-status-codes")
const errorHandlerMiddleware = (err, req, res, next) => {
	// console.log(err)
	let customError = {
		statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
		msg: err.message || "Something went wrong.try again later",
	}

	if (err.name === "CastError") {
		customError.statusCode = StatusCodes.NOT_FOUND
		customError.msg = `no item found for id : ${err.value}`
	}

	if (err.name === "validationError") {
		customError.msg = Object.values(err.errors)
			.map((item) => item.message)
			.join(",")
		customError.statusCode = StatusCodes.BAD_REQUEST
	}

	if (err.code && err.code === 11000) {
		customError.msg = `Duplicate value entered for ${Object.keys(err.keyValue)} field, please choose another value`
		customError.statusCode = StatusCodes.BAD_REQUEST
	}
	return res.status(customError.statusCode).json({ msg: customError.msg })
}

module.exports = errorHandlerMiddleware
