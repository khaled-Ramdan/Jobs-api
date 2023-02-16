const mongoose = require("mongoose")
const jobSchema = new mongoose.Schema(
	{
		company: {
			type: String,
			required: [true, "please enter a company name"],
			maxLength: 50,
		},
		position: {
			type: String,
			required: [true, "please enter a position"],
			maxLength: 100,
		},
		status: {
			type: String,
			enum: ["interview", "declined", "pending"],
			defult: "pending",
		},
		createdBy: {
			type: mongoose.Types.ObjectId,
			ref: "User",
			required: [true, "please provide a User"],
		},
	},
	{ timestamps: true }
)

module.exports = mongoose.model("Job", jobSchema)
