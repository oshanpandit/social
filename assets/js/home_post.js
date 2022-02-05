{

    let createPost=function(){

        let newPostForm=$('#new-post-form');

        newPostForm.submit(function(e){

            e.preventDefault();

            $.ajax({

                type:'post',
                url:'/post/create',
                data:newPostForm.serialize(),
                success:function(data){
                
                    let newPost=newPostDom(data.data.post);
                    $('#post-list-container>ul').prepend(newPost);
                    deletePost($('.delete-post-button',newPost));
               
                },error:function(error){

                    console.log(error.responseText);
                }

            });
        });
    }

    let newPostDom=function(post){

        return $(`                <li id="post-${post._id}">
                
        <p id="post-main">
            <i class="fas fa-blog"></i>&ensp;${post.content}&ensp;
           
            <small>
                <a class="delete-post-button" href="/post/destroy/${post._id}"><i class="fas fa-trash-alt"></i></a>
            </small>

          
            <p id="post-user-name">By: ${post.user.name}</p>
           
        </p>


        <div class="post-comments">

          

         <form action="/comment/create" method="post">

        <input type="text" name="content" placeholder="Add Comment here" id="add-comment">

        <input type="hidden" name="post" value="${post._id}">

        <button type="submit" id="comment-button"><i class="fas fa-comments"></i></button>

                </form>

          

        </div>

      <div id="post-comments-view">

        <ul type="none">


        </ul>


      </div>

      </li>

`)
    }

    let deletePost = function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    $(`#post-${data.data.post_id}`).remove();
                },error: function(error){
                    console.log(error.responseText);
                }
            });

        });
    }
    createPost();
}