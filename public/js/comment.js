const commentOnPost = async (e) => {
    
  e.stopPropagation();
  var comPostId = e.target.getAttribute('data-id');
  console.log("Need to comment on post #" + comPostId);

}

var homePosts = document.querySelector('.blogroll-posts-home');
if(homePosts) {
  homePosts.addEventListener('click', commentOnPost);
} 