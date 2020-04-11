// 获取地址栏的Id参数
var categoryId = getUrlParams('categoryId');

// 根据分类id获取文章列表，实现文章列表页
$.ajax({
    type: 'get',
    url: '/posts/category/' + categoryId,
    success: function (data) {
        var html = template('listTpl', { data: data });
        $('#listBox').html(html);
    }
});

// 根据分类id获取分类信息
$.ajax({
    type: 'get',
    url: '/categories/' + categoryId,
    success: function (data) {
        $('#categoryTitle').html(data.title);
    }
});
