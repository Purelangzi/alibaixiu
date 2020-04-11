// 当表单发生提交行为时
$('#userForm').on('submit', function () {
    // 获取用户在表单中输入的内容并格式化成参数字符串
    var formData = $(this).serialize();
    // 先服务器端发送添加用户的请求
    $.ajax({
        type: 'post',
        url: '/users',
        data: formData,
        success: function () {
            // 刷新页面
            location.reload();
        },
        error: function () {
            alert('用户添加失败');
        }
    });
    return false
});

// 当用户选择文件时
$('#modifyBox').on('change', '#avatar', function () {
    // 用户选择到的文件
    // this.files[0]
    var formData = new FormData();
    formData.append('avatar', this.files[0]);
    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        // 不解析请求参数
        processData: false,
        // 不设置请求参数的类型
        contentType: false,
        success: function (data) {
            // 实现头像预览功能
            $('#preview').attr('src', data[0].avatar);
            $('#hiddenAvatar').val(data[0].avatar);
        }
    });
});

// 向服务器端发送请求，索要用户列表数据
$.ajax({
    type: 'get',
    url: '/users',
    success: function (data) {
        // 使用模板引擎将数据和html字符串拼接
        var html = template('userTpl', { data: data });
        // 将拼接好的字符串显示在页面
        $('#userBox').html(html);
    }
});

// 通过事件委托为编辑按钮添加点击事件
$('#userBox').on('click', '.edit', function () {
    // 获取被点击用户的id值
    var id = $(this).attr('data-id');
    // 根据id获取用户的详细信息
    $.ajax({
        type: 'get',
        url: '/users/' + id,
        success: function (data) {
            var html = template('modifyTpl', data);
            $('#modifyBox').html(html)
        }
    });
});

// 为修改表单添加表单提交事件
$('#modifyBox').on('submit', '#modifyForm', function () {
    // 获取用户在表单中输入的内容
    var formData = $(this).serialize();
    // 获取修改的用户的id值
    var id = $(this).attr('data-id');
    // 发生请求 修改用户信息
    $.ajax({
        type: 'put',
        url: '/users/' + id,
        data: formData,
        success: function (data) {
            // 修改成功 重新加载页面页面
            location.reload();
        }
    })

    return false;
});

// 当删除按钮被点击时
$('#userBox').on('click', '.delete', function () {
    if (confirm('您真的要删除用户吗')) {
        var id = $(this).attr('data-id');
        // 向服务器发送请求 删除用户
        $.ajax({
            type: 'delete',
            url: '/users/' + id,
            success: function () {
                // 重新加载页面
                location.reload();
            }
        });
    }
});

// 获取全选按钮
var selectAll = $('#selectAll');
// 获取批量删除按钮
var deleteMany = $('#deleteMany');

// 当全选按钮的状态发生改变
selectAll.on('change', function () {
    // 获取全选按钮当前的状态
    var status = $(this).prop('checked');
    if (status) {
        // 显示批量删除按钮
        deleteMany.show();
    } else {
        // 隐藏批量删除按钮
        deleteMany.hide();
    }
    // 获取所有用户,同步状态
    $('#userBox').find('input').prop('checked', status);
});

// 当用户前面的复选框状态发生改变时
$('#userBox').on('change', '.userStatus', function () {
    // 获取所有用户 在所有用户中过滤出选中的用户
    // 判断选中用户的数量和所有用户的数量是否一致
    // 如果一致 说明所有用户的数量都是选中的
    // 否则就是有用户没有被选中
    var inputs = $('#userBox').find('input');
    if (inputs.length == inputs.filter(':checked').length) {
        // 全选中
        selectAll.prop('checked', true);
    } else {
        // 不全选中
        selectAll.prop('checked', false);
    }
    // 如果选中的复选框的数量大于0 显示批量删除按钮
    if (inputs.filter(':checked').length > 0) {
        deleteMany.show();
    } else {
        deleteMany.hide();
    }
});

// 为批量删除按钮添加点击按键
deleteMany.on('click', function () {
    var ids = [];
    // 获取选中的用户
    var checkedUser = $('#userBox').find('input').filter(':checked');
    // 循环复选框 获取id值
    checkedUser.each(function (index, ele) {
        ids.push($(ele).attr('data-id'));
    });

    if (confirm('您真的要进行批量删除吗')) {
        $.ajax({
            type: 'delete',
            url: '/users/' + ids.join('-'),
            success: function () {
                location.reload();
            }
        })
    }


});
