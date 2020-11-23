const formPost = document.querySelector('.form-post form')
formPost.addEventListener('submit', (e) => {
	e.preventDefault()
	data = {
		title:e.target.elements.title.value,
		snippet:e.target.elements.snippet.value,
		body:e.target.elements.body.value
	}
	fetch('/api/posts',{
		method: 'POST',
		headers: {
		  'Content-Type': 'application/json'
		},
		body:JSON.stringify(data)})
	.then(res => res.text())
	.then(data => {
		 alert(data)
		 window.location.href = "/"
		})
	.catch(e => console.log(e))
	formPost.reset()
})