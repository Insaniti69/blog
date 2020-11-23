const mongoose = require('mongoose')
const validator = require('validator')

const Question = mongoose.model('Questions', {
	question: {
		type: String,
		required: true
	},
	answers: [answerSchema]
})

module.exports = Question