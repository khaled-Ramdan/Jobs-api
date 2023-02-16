const Job = require("../models/Job")
const { StatusCodes } = require("http-status-codes")
const { BadRequestError, NotFoundError } = require("../errors")

const getALlJobs = async (req, res) => {
	console.log(req.user.userId)
	const jobs = await Job.find({ createdBy: req.user.userId }).sort("createdAt")
	res.status(StatusCodes.OK).send({ jobs, count: jobs.length })
}

const getJob = async (req, res) => {
	const searchObj = {}
	searchObj.createdBy = req.user.userId
	searchObj._id = req.params.id
	console.log(searchObj)

	const job = await Job.findOne(searchObj)
	res.status(StatusCodes.OK).json({ job })
}

const createJob = async (req, res) => {
	req.body.createdBy = req.user.userId
	const job = await Job.create(req.body)
	res.status(StatusCodes.CREATED).json({ job })
}

const updateJob = async (req, res) => {
	const searchObj = { createdBy: req.user.userId, _id: req.params.id }
	const updateObj = { company: req.body.company, position: req.body.position }

	console.log(searchObj, updateObj)

	if (!updateObj.company || !updateObj.position) {
		throw new BadRequestError("provide company and position ")
	}
	const job = await Job.findOneAndUpdate(searchObj, updateObj, { new: true, runValidators: true })
	if (job) res.status(StatusCodes.OK).json({ job })
	else throw new BadRequestError("this job id is not found")
}

const deleteJob = async (req, res) => {
	const searchObj = { createdBy: req.user.userId, _id: req.params.id }
	const job = await Job.findOneAndRemove(searchObj)
	if (job) res.status(StatusCodes.OK).json({ job, status: "deleted" })
	else throw new BadRequestError("this job id is not found")
}

module.exports = {
	getALlJobs,
	getJob,
	createJob,
	updateJob,
	deleteJob,
}
