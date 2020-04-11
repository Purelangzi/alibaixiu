// 当修改密码表单发生提交行为时
$('#modifyForm').on('submit', function () {
    // 获取用户在表单中输入的内容
    var formData = $(this).serialize();
    // 调用接口 实现密码修改功能
    $.ajax({
        type: 'put',
        url: '/users/password',
        data: formData,
        success: function () {
            location.href = '/admin/login.html'
        },
        error: function () {
            alert('密码或新密码错误');
        }
    });
    return false;
});