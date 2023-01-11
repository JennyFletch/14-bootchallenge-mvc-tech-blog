function commentOnPost(e) {
    // console.log(e.target.getAttribute('data-id'));
    var comPostId = e.target.getAttribute('data-id')

}

var selectedPost = document.querySelector('.blogroll-posts');
if(selectedPost) {
  selectedPost.addEventListener('click', commentOnPost);
} 