// 获取地址栏的搜索关键字
var key = getUrlParams('key');
// 根据用户输入的搜索关键字调用搜索接口
$.ajax({
    type: 'get',
    url: '/posts/search/' + key,
    success: function (data) {
        var html = template('searchTpl', { data: data });
        $('#listBox').html(html);
    }
});