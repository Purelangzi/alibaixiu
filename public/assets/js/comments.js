// 向服务器端发送请求 获取评论列表数据
$.ajax({
    type: 'get',
    url: '/comments',
    success: function (data) {
        var html = template('commentsTpl', data);
        $('#commentsBox').html(html);
        var pageHTML = template('pageTpl',data);
        $('#pageBox').html(pageHTML);
    }
});

// 实现分页
function changePage(page) {
    $.ajax({
        type: 'get',
        url: '/comments',
        data: { page: page },
        success: function (data) {
            var html = template('commentsTpl', data);
            $('#commentsBox').html(html);
            var pageHTML = template('pageTpl',data);
            $('#pageBox').html(pageHTML);
        }
    });
}

// 当审核按钮被点击时
$('#commentsBox').on('click', '.status', function () {
    // 获取当前评论的状态
    var status = $(this).attr('data-status');
    // 获取当前要修改的评论id
    var id = $(this).attr('data-id');
    // 向服务器发送请求 更改评论状态
    $.ajax({
        type: 'put',
        url: '/comments/' + id,
        data: { state: status == 0 ? 1 : 0 },
        success: function (data) {
            // 更改成功，重新加载页面
            location.reload();
        }
    });
});

// 当删除按钮被点击时
$('#commentsBox').on('click', '.delete', function () {
    if (confirm('您真的要执行删除操作吗')) {
        // 获取当前要删除的评论id
        var id = $(this).attr('data-id');
        // 向服务器发送请求 删除评论
        $.ajax({
            type: 'delete',
            url: '/comments/' + id,
            success: function (data) {
                // 删除成功，重新加载页面
                location.reload();
            }
        });
    }
});