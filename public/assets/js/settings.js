// 当管理员选择logo图片时
$('#logo').on('change', function () {
    // 获取到管理员选择到的图片
    var file = this.files[0];
    // 创建formData对象 实现二进制文件上传
    var formData = new FormData();
    // 将管理员选择的文件追加到formData对象中
    formData.append('logo', file);
    // 向服务器端发送请求 实现文件上传
    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        processData: false,
        contentType: false,
        success: function (data) {
            $('#hiddenLogo').val(data[0].logo);
            // 将logo图片显示在页面中
            $('#preview').attr('src', data[0].logo);
        }
    });
});

// 当网站设置表单发生提交行为时
$('#settingsForm').on('submit', function () {
    // 获取管理员在表单中输入的内容
    var formData = $(this).serialize();
    // 向服务器端发送请求 实现网站设置数据添加功能
    $.ajax({
        type: 'post',
        url: '/settings',
        data: formData,
        success: function () {
            location.reload();
        }
    });
});

// 向服务器端发送请求，获取网站设置数据
$.ajax({
    type: 'get',
    url: '/settings',
    success: function (data) {
        if (data) {
            // 将 logo地址存储在隐藏域
            $('#hiddenLogo').val(data.logo);
            // 将 logo地址存显示在页面
            $('#preview').attr('src', data.logo);
            // 将网站标题显示在页面
            $('input[name="title"]').val(data.title);
            // 将是否开启评论功能显示在页面
            $('input[name="comment"]').prop('checked', data.comment);
            // 将评论是否经过人工审核显示在页面
            $('input[name="review"]').prop('checked', data.review);
        }
    }
});