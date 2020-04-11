// 向服务器端发送请求，获取文章的数量
$.ajax({
    type: 'get',
    url: '/posts/count',
    success: function (data) {
        $('#post').html('<strong>' + data.postCount + '</strong>篇文章（<strong>' + data.draftCount + '</strong>篇草稿）')
    }
});

// 向服务器端发送请求， 获取分类的数量
$.ajax({
    type: 'get',
    url: '/categories/count',
    success: function (data) {
        $('#category').html('<strong>' + data.categoryCount + '</strong>个分类');
    }
});

// 向服务器端发送请求， 获取评论的数量
$.ajax({
    type: 'get',
    url: '/comments/count',
    success: function (data) {
        $('#comment').html('<strong>' + data.commentCount + '</strong>条评论');
    }
});