const express = require('express')
const Posts = require('../models/posts')
const router = new express.Router()

router.get('/posts', async (req, res) => {
	try {
		const posts = await Posts.find({})
		if (!posts) return res.status(404).send()
		return res.send(posts)
	} catch (e) {
		return res.status(500).send()
	}
})

router.get('/posts/:id', async (req, res) => {
	try {
		const posts = await Posts.findById(req.params.id)
		if (!posts) return res.status(404).send()
		return res.send(posts)
	} catch (e) {
		return res.status(500).send()
	}
})

router.post('/posts', async (req, res) => {
	try {
		const oldPost = await Posts.find({"title":req.body['title']})
		console.log('wtf')
		console.log(req.body)
		if(oldPost.length > 0)	return res.send('Posts already exists')
		const posts = new Posts(req.body)
		await posts.save()
		res.status(201).send('Posts Added')
	} catch (e){
		console.log(e)
		return res.status(400).send(e)
	}
	
})

router.patch('/posts/:id', async (req, res) => {
	const updates = Object.keys(req.body)
	const allowedUpdates = ['title']
	const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
	if(updates.length == 0) return res.send('Body was not sent')
	if (!isValidOperation) return res.status(400).send({ error: 'Invalid updates!' })
	try{
		const posts = await Posts.findByIdAndUpdate(req.params.id,req.body)
		if (!posts) return res.status(404).send()
		return res.send('{"updated":true}')
	}catch{
		return res.status(500).send()
	}
})

router.delete('/posts/:id', async (req, res) => {
	try {
		const posts = await Posts.findByIdAndDelete(req.params.id)
		if (!posts) return res.status(404).send()
		return res.send('{"deleted":true}')
	} catch (e) {
		return res.status(500).send()
	}
})

module.exports = router
