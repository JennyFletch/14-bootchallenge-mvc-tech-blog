const commentOnPost = async (e) => {
    
  e.stopPropagation();
  var comPost = e.target;
  var comPostId = comPost.getAttribute('data-id');
  var comPostFunc = comPost.getAttribute('data-func');
  var commentForm = document.querySelector(".post-comment-form-" + comPostId);
  var commentTextarea = document.querySelector(".new-comment-" + comPostId);


  switch (comPostFunc) {
    case 'add-comment':
      commentForm.setAttribute("style", "display:block");
      e.target.innerHTML = "- CANCEL";
      comPost.setAttribute("data-func", "cancel");
      commentTextarea.focus();
      break;
  
    case 'cancel':
      commentForm.setAttribute("style", "display:none");
      e.target.innerHTML = "+ ADD COMMENT";
      comPost.setAttribute("data-func", "add-comment");
      break;

    case 'submit-comment':
      e.preventDefault();
      var comment_body = commentTextarea.value;

      const newComment = {
        'description': comment_body,
        'post_id': comPostId
      }

      const saveResponse = await fetch('/api/commentRoutes', {
        method: 'POST',
        body: JSON.stringify(newComment),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if(saveResponse.ok) {
        const anchoredPage = '/#blogpost-' + comPostId;
        document.location.reload();
        document.location.replace(anchoredPage);
      } else {
        alert('Failed to save comment');
      }
      break;

    default:
      break;
  }

/*   if(comPostFunc === "add-comment") {

    commentForm.setAttribute("style", "display:block");
    e.target.innerHTML = "- CANCEL";
    comPost.setAttribute("data-func", "cancel");

  } else if(comPostFunc === "cancel") {

    commentForm.setAttribute("style", "display:none");
    e.target.innerHTML = "+ ADD COMMENT";
    comPost.setAttribute("data-func", "add-comment");

  } else {

    e.preventDefault();
    console.log("something else");
    var comment_body = commentTextarea.val();

    const newComment = {
      'description': comment_body
    }

    const saveResponse = await fetch('/api/commentRoutes', {
      method: 'POST',
      body: JSON.stringify(newComment),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if(saveResponse.ok) {
      const anchoredPage = '/#blogpost-' + comPostId;
      document.location.replace(anchoredPage);
    } else {
      alert('Failed to save comment');
    }

  }
 */




  // LEFT TO DO:
  // Create a new comment on submit
  // Reload the homepage with comment now added
  // Append the id of #blogpost-{postID} to anchor to the updated post -- does this still work with routing???

}

var homePosts = document.querySelector('.blogroll-posts-home');
if(homePosts) {
  homePosts.addEventListener('click', commentOnPost);
} 