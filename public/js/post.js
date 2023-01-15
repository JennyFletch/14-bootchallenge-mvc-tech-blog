const savePost = async (e) => {

    e.preventDefault();

    const newpost_title = document.querySelector('#newpost-title').value.trim();
    const newpost_body = document.querySelector('#newpost-body').value.trim();

    const newPost = {
      'title': newpost_title,
      'description': newpost_body
    }

    const response = await fetch('/api/postRoutes', {
      method: 'POST',
      body: JSON.stringify(newPost),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if(response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to save post');
    }

}

var newPostBtn = document.querySelector('#create-post');
if(newPostBtn) {
  newPostBtn.addEventListener('click', (e) => { location.href='/post' });
} 

var createPostForm = document.querySelector('.create-a-post-form');
if(createPostForm) {
  createPostForm.addEventListener('submit', savePost);
}