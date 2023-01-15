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


const deletePost = async (e) => {

  console.log("delete button clicked");

  if (e.target.hasAttribute('data-id')) {
    const id = e.target.getAttribute('data-id');
    const idNum = parseInt(id, 10);

    const response = await fetch(`/api/postRoutes/${idNum}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert('Failed to delete project');
    }
  }

}


const updatePost = async (e) => {

  console.log("update button clicked");

}




var updatePostBtn = document.querySelector('#update-a-post');
if(updatePostBtn) {
  updatePostBtn.addEventListener('click', updatePost);
} 

var deletePostBtn = document.querySelector('#delete-a-post');
if(deletePostBtn) {
  deletePostBtn.addEventListener('click', deletePost);
} 

var newPostBtn = document.querySelector('#create-post');
if(newPostBtn) {
  newPostBtn.addEventListener('click', (e) => { location.href='/post' });
} 

var createPostForm = document.querySelector('.create-a-post-form');
if(createPostForm) {
  createPostForm.addEventListener('submit', savePost);
}