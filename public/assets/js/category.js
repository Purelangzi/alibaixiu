// 当添加分类表单发生提交行为时
$('#addCategory').on('submit', function () {
    // 获取用户在表单中输入的内容
    var formData = $(this).serialize();
    // 向服务器端发送请求 添加分类
    $.ajax({
        type: 'post',
        url: '/categories',
        data: formData,
        success: function (data) {
            location.reload();
        }
    });
    return false;
});

// 向服务器端发送请求 索要所有分类列表数据
$.ajax({
    type: 'get',
    url: '/categories',
    success: function (data) {
        // 将服务器返回的数据和html模板进行拼接
        var html = template('categoryListTpl', { data: data });
        // 将拼接好的内容显示在页面
        $('#categoryBox').html(html);
    }
});

// 为编辑按钮添加点击事件
$('#categoryBox').on('click', '.edit', function () {
    // 获取要修改的分裂数据的id
    var id = $(this).attr('data-id');
    // 根据id获取分类数据的详细信息
    $.ajax({
        type: 'get',
        url: '/categories/' + id,
        success: function (data) {
            var html = template('modifyCategoryTpl', data);
            $('#formBox').html(html);
        }
    });
});

// 当修改分类数据表单发生提交行为时
$('#formBox').on('submit', '#modifyCategory', function () {
    // 获取管理员在表单中输入的内容
    var formData = $(this).serialize();
    // 获取要修改的分裂数据的id
    var id = $(this).attr('data-id');
    $.ajax({
        type: 'put',
        url: '/categories/' + id,
        data: formData,
        success: function () {
            location.reload();
        }
    });
    return false;
});

// 为删除按钮添加点击事件
$('#categoryBox').on('click', '.delete', function () {
    if (confirm('您真的要执行删除操作吗')) {
        // 获取要修改的分裂数据的id
        var id = $(this).attr('data-id');
        // 向服务器端发送请求 删除分类数据
        $.ajax({
            type: 'delete',
            url: '/categories/' + id,
            success: function () {
                location.reload();
            }
        });
    }
});

