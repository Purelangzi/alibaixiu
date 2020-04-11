// 获取地址栏的Id参数
var postId = getUrlParams('id');
// 评论是否经过人工审核
var review;
// 根据文章id获取文章详细信息，实现文章详情页
$.ajax({
    type: 'get',
    url: '/posts/' + postId,
    success: function (data) {
        var html = template('postTpl', data);
        $('#article').html(html);
    }
});

// 当点赞按钮发生点赞事件时
$('#article').on("click", '#like', function () {
    $.ajax({
        type: 'post',
        url: '/posts/fabulous/' + postId,
        success: function (data) {
            alert('点赞成功');
        }
    });
});

// 获取网站配置信息
$.ajax({
    type: 'get',
    url: '/settings',
    success: function (data) {
        review = data.review;
        // 判断管理员是否开启评论功能
        if (data.comment) {
            // 已开启，渲染评论模板
            var html = template('commentTpl');
            $('#comment').html(html);
        }
    }
});

// 当评论表单发生表单提交行为时
$('#comment').on('submit', 'form', function () {
    // 获取用户输入的内容
    var content = $(this).find('textarea').val();
    // 评论状态
    var state;
    // 是否经过人工审核
    if (review) {
        state = 0;
    } else {
        state = 1;
    }
    // 向服务器端发送请求，执行添加评论操作
    $.ajax({
        type: 'post',
        url: '/comments',
        data: {
            content: content,
            post: postId,
            state: state
        },
        success: function () {
            alert("评论成功");
            location.reload();
        },
        error: function () {
            alert("评论失败，请登录再评论");
        }
    });
    return false;
});