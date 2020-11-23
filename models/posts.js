const mongoose = require('mongoose')

const Post = mongoose.model('posts', {
	title: {
		type: String,
		required: true
	},
	snippet: {
		type: String,
		required: true
	},
	body: {
		type: String,
		required: true
	}
})

module.exports = Post