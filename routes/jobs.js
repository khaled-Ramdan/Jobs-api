const express = require("express")
const router = express.Router()

const { getALlJobs, updateJob, createJob, getJob, deleteJob } = require("../controllers/jobs")

router.route("/").post(createJob).get(getALlJobs)
router.route("/:id").get(getJob).post(updateJob).patch(updateJob).delete(deleteJob)

module.exports = router
