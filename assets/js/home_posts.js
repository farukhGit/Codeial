{
    // method to submit form data for new post using ajax
    let createPost = function(){
        let newPostForm = $('#new-post-form');
        newPostForm.submit(e =>{
            e.preventDefault();

            $.ajax({
                url : '/posts/create',
                type : 'post',
                data : newPostForm.serialize(),  // convert form data into json
                success : data =>{
                    let newPost = newPostDom(data.data.post);
                    $('#posts-container > ul').prepend(newPost);
                },
                error : err =>{
                    console.log(error.responseText);
                }
            });
        });
    }

    // method to create a post in DOM
    let newPostDom = function(post){
        return $(`<li id="post-${post._id} ">
        <p>
            ${post.content}
                <small>
                    <a class="delete-post-btn" href="/posts/destroy/${post.id}">X</a>
                </small>
        </p>
            <small>
                <p>
                    ${post.user.username}
                </p>
            </small>
            
            <div class="post-comments">\

                <form action="/comments/create" method="POST">
                    <input type="text" name="content" placeholder="Add Comment..." required>
                    <input type="hidden" name="post" value="${post._id}">
                    <input type="submit" value="Add Comment">
                </form>    
    
                <div class="post-comments-list">
                    <ul id="post-comments-${post._id}">
                        
                    </ul>
                </div>
            </div>
         </li>`)
        }
    createPost();
}