//当管理员选择文件时
$('#file').on('change', function () {
    // 选择到的文件
    var file = this.files[0];
    // 创建formData对象
    var formData = new FormData();
    // 将选择的文件追加到formData对象中
    formData.append('image', file);
    // 向服务器端发送请求，实现图片上传
    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        processData: false,
        contentType: false,
        success: function (data) {
            $('#image').val(data[0].image);
        }
    });
});

// 当轮播图表单发生提交行为时
$('#slidesForm').on('submit', function () {
    // 获取管理员在表单中输入的内容
    var formData = $(this).serialize();
    // 向服务器端发送请 添加轮播图数据
    $.ajax({
        type: 'post',
        url: '/slides',
        data: formData,
        success: function (data) {
            location.reload();
        },
        error:function(){
            alert('请输入内容啊');
        }
    });
    return false;
});

// 向服务器端发送请求，索要图片轮播列表数据
$.ajax({
    type: 'get',
    url: '/slides',
    success: function (data) {
        var html = template('slidesTpl', { data: data });
        $('#slidesBox').html(html);
    }
});

// 当管理员点击轮播图删除按钮时
$('#slidesBox').on('click', '.delete', function () {
    if (confirm('您真的要执行删除操作吗')) {
        // 获取要删除的轮播图数据的id
        var id = $(this).attr('data-id');
        // 向服务器端发送请求，实现轮播图数据删除功能
        $.ajax({
            type: 'delete',
            url: '/slides/' + id,
            success: function () {
                location.reload();
            }
        });
    }
});