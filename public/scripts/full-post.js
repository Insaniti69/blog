const removePost = document.querySelector('.remove')
const updatePost = document.querySelector('.update')
const idPost = document.querySelector('.full-post').dataset.id
if(idPost){
	removePost.addEventListener('click', () => {
		axios.delete(`/api/posts/${idPost}`)
		.then(async(data) => {
			if(data['data']['deleted']){
				alert('POST DELETED')
				window.location.href = "/"
			}else alert(data['data'])
		})
		.catch(e => console.log(e))
	})

	updatePost.addEventListener('click', () => {
		const updateTitle = document.querySelector('.updateTitle').value
		axios.patch(`/api/posts/${idPost}`, data={"title":updateTitle})
		.then(async(data) => {
			if(data['data']['updated']){
				alert('POST UPDATED')
				location.reload()
			}else alert(data['data'])
		})
		.catch(e => console.log(e))
	})

}