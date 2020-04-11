// 向服务器端发送请求 获取文章列表数据
$.ajax({
    type: 'get',
    url: '/posts',
    success: function (data) {
        var html = template('postsTpl', data);
        $('#postsBox').html(html);
        var page = template('pageTpl', data);
        $('#page').html(page);
    }
});

// 分页
function changePage(page) {
    // 向服务器端发送请求 获取文章列表数据
    $.ajax({
        type: 'get',
        url: '/posts',
        data: {
            page: page
        },
        success: function (data) {
            var html = template('postsTpl', data);
            $('#postsBox').html(html);
            var page = template('pageTpl', data);
            $('#page').html(page);
        }
    });
}
// 向服务器端发送请求 索要分页数据
$.ajax({
    type: 'get',
    url: '/categories',
    success: function (data) {
        var html = template('categoryTpl', { data: data });
        $('#categoryBox').html(html);
    }
});

// 当用户进行文章列表筛选时
$('#filterForm').on('submit', function () {
    // 获取到管理员选择的过滤条件
    var formData = $(this).serialize();
    // 向服务器端发送请求 根据条件索要文章列表数据
    $.ajax({
        type: 'get',
        url: '/posts',
        data: formData,
        success: function (data) {
            var html = template('postsTpl', data);
            $('#postsBox').html(html);
            var page = template('pageTpl', data);
            $('#page').html(page);
        }
    });
    return false;
});

// 当文章删除按钮被点击时
$('#postsBox').on('click', '.delete', function () {
    if (confirm('您真的要进行删除操作吗')) {
        // 获取管理员当前删除文章的id值
        var id = $(this).attr('data-id');
        // 向服务器端发送请求 执行删除文章操作
        $.ajax({
            type: 'delete',
            url: '/posts/' + id,
            success: function () {
                // 文章删除成功 重新加载页面
                location.reload();
            }
        });
    }
});