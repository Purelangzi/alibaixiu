// 向服务器端发送请求 获取文章分类数据并显示在下拉列表中
$.ajax({
    type: 'get',
    url: '/categories',
    success: function (data) {
        var html = template('categoryTpl', { data: data });
        $('#category').html(html);
    }
});

// 当管理员选择文件时
$('#feature').on('change', function () {
    // 获取管理员选中到的文件
    var file = this.files[0];
    // 创建formData对象 实现二进制文件上传
    var formData = new FormData();
    // 将管理员选中的文件追加到formData对象中
    formData.append('cover', file);
    // 实现文章封面图片上传
    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        // 不处理data属性对应的参数
        processData: false,
        // 不需要设置参数类型
        contentType: false,
        success: function (data) {
            $('#thumbnail').val(data[0].cover);
        }
    });
});

// 当添加文章表单提交时
$('#addForm').on('submit', function () {
    // 获取管理员在表单中输入的内容
    var formData = $(this).serialize();
    // 向服务器端发送请求 实现添加文章功能
    $.ajax({
        type: 'post',
        url: '/posts',
        data: formData,
        success: function () {
            // 文章添加成功 跳转到文章列表页面
            location.href = '/admin/posts.html';
        }
    });
    return false;
});

// 获取地址栏中的id参数
var id = getUrlParams('id');
// 当前管理员是在做修改文章操作
if (id != -1) {
    // 根据id获取文章的详细信息
    $.ajax({
        type: 'get',
        url: '/posts/' + id,
        success: function (data) {
            // 向服务器端发送请求 获取文章分类数据并显示在下拉列表中
            $.ajax({
                type: 'get',
                url: '/categories',
                success: function (categories) {
                    data.categories = categories;
                    console.log(data);

                    var html = template('modifyTpl', data);
                    $('#parentBox').html(html);
                }
            });
        }
    });
}

// 从地址栏中获取查询参数
function getUrlParams(name) {
    var paramsAry = location.search.substr(1).split('&');
    // 循环数据
    for (var i = 0; i < paramsAry.length; i++) {
        var temp = paramsAry[i].split('=');
        if (temp[0] == name) {
            return temp[1];
        }
    }
    return -1;

}

// 当修改文章信息表单发生提交行为时
$('#parentBox').on('submit', '#modifyForm', function () {
    // 获取管理员在表单中输入的内容
    var formData = $(this).serialize();
    // 获取管理员正在修改的文章id值
    var id = $(this).attr('data-id');
    // 向服务器端发送请求 实现修改文章功能
    $.ajax({
        type: 'put',
        url: '/posts/' + id,
        data: formData,
        success: function () {
            // 文章修改成功 跳转到文章列表页面
            location.href = '/admin/posts.html';
        }
    });
    return false
});
