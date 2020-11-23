const express = require('express')
const Posts = require('../models/posts')

require('../db/mongoose')

const port = process.env.PORT

// express app
const app = express();

// listen for requests
app.listen(port, () => {
	console.log(`Server listening for port port`)
});

// register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'));

app.use((req, res, next) => {
	console.log('new request made:');
	console.log('host: ', req.hostname);
	console.log('path: ', req.path);
	console.log('method: ', req.method);
	next();
});


app.get('/', async(req, res) => {
	const posts = await Posts.find({})
	res.render('index', { title: 'Blog', posts: posts});
});

app.get('/full-post/:id', async(req, res) => {
	const post = await Posts.findById(req.params.id)
	res.render('full-post', { title: 'Post', post: post});
});

app.get('/form-post', (req, res) => {
	res.render('form-post', { title: 'Send Post'});
});
 

//Api
const blog = require('../routers/posts')
app.use(express.json())
app.use('/api', blog)


// 404 page
app.use((req, res) => {
	res.status(404).render('404', { title: '404' });
});