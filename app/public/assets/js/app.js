$(function() {
  $(".save").on("click", function(event) {
      event.preventDefault();
        if(
            $(this).hasClass('btn-info')){
                $(this).removeClass("btn-info");
                $(this).addClass("btn-success");
                $(this).text("Saved");

                var articleId = { id: $(this).data("id")};
                console.log(articleID);

                $.ajax({
                    url: '/save',
                    type: 'PUT',
                    data: articleID,
                    success: function (data) {
                        console.log(`Article ${articleID.id} Saved`)
                    }
                });
            } else {
                $(this).removeClass("btn-success");
                $(this).addClass("btn-info");
                $(this).text("Save")

                var articleID = {id:$(this).data('id')};
                console.log(articleID);

                $.ajax({
                    url: '/unsave',
                    type: 'PUT',
                    data: articleID,
                    sucess: function (data) {
                        console.log(`Article ${articleID.id} has been unsaved`)
                    }
                });
            }
        
    });

    $(document).on('click', '#add-comment', function(event) {
        event.preventDefault();
        var articleID = $(this).data('id')

        $('submit').on('click', function (event) {
            event.preventDefault();
            var newComment = {
                title: $('#title').val().trim(),
                body: $('#body').val().trim()
            }

            $.ajax({
                type: 'POST',
                url: `/articles/${articleID}`,
                data: newComment
            }).then(function (data){
                console.log('Comment added')
                location.reload();
            });
        })
    });

    $(document).on('click', '#update-comment', function (event) {
        event.preventDefault();
        var articleID = $(this).data('id')
        console.log(articleID);

        $.ajax({
            method: 'GET',
            url: `/articles/${articleID}`
        }).then(function (data) {
            console.log(data.comment)
            $('#update-title').val(data.comment.title);
            $('#update-body').val(data.comment.body);
            let commentID = data.comment._id;

            $('#save').on('click', function(event){
                event.preventDefault();
                var newComment = {
                    title: $('#update-title').val().trim(),
                    body: $('update-body').val.trim()
                }

                console.log(newComment.title, newComment.body)
                $.ajax({
                    type:'PUT',
                    url: `/comment/${commentID}`,
                    data: newComment
                }).then(function (data) {
                    console.log('Comment updated');
                    console.log(data)
                    location.reload();
                });
            })
        });
    });
});
