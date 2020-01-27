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
                    let newPost = newPostDom(data.newData.post);
                    console.log(data);
                    $('#posts-container>ul').prepend(newPost);
                    deletePost($(' .delete-post-btn', newPost));                 
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
                                <a class="delete-post-btn" href="/posts/destroy/${post._id}">X</a>
                            </small>
                    </p>
                    <small>
                        <p>
                            ${post.name}
                        </p>
                    </small>
            
                    <div class="post-comments">

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

        // method to delete a post from DOM
        let deletePost = function(deleteLink){
            $(deleteLink).click(function(e){
                e.preventDefault();

                $.ajax({
                    type : 'get',
                    url : $(deleteLink).prop('href'),
                    success : function(data){
                        console.log(data);
                        $(`#post-${data.newData.post_id}`).remove();    
                    },
                    error : function(error){
                        console.log(error.responseText);
                    }
                })
            })
        } 

    createPost();
}