// 处理日期时间格式
function formateData(date) {
    // 将日期时间字符串转换成日期对象
    date = new Date(date);
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
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
// 向服务器端发送请求,索要最新发布数据
$.ajax({
    type: 'get',
    url: '/posts/random',
    success: function (data) {
        var randomTpl = `
            {{each data}}
            <li>
                <a href="detail.html?id={{$value._id}}">
                  <p class="title">{{$value.title}}</p>
                  <p class="reading">阅读{{$value.meta.views}}</p>
                  <div class="pic">
                    <img src="{{$value.thumbnail}}">
                  </div>
                </a>
             </li>
            {{/each}}
        `;
        var html = template.render(randomTpl, { data, data })
        $('#randomBox').html(html);
    }
});

// 向服务器端发送请求,索要最新评论数据
$.ajax({
    type: 'get',
    url: '/comments/lasted',
    success: function (data) {
        var commentTpl = `
            {{each data}}
            <li>
                <a href="detail.html?id={{$value.post}}">
                  <div class="avatar">
                    <img src="{{$value.author.avatar}}" alt="">
                  </div>
                  <div class="txt">
                    <p>
                      <span>{{$value.author.nickName}}</span>{{$imports.formateData($value.createAt)}}说:
                    </p>
                    <p>{{$value.content}}</p>
                  </div>
                </a>
            </li>
            {{/each}}
        `;
        var html = template.render(commentTpl, { data, data })
        $('#commentBox').html(html);
    }
});

// 向服务器端发送请求,索要文章分类数据
$.ajax({
    type: 'get',
    url: '/categories',
    success: function (data) {
        var navTpl = `
            {{each data}}
            <li>
                <a href="list.html?categoryId={{$value._id}}">
                    <i class="fa {{$value.className}}"></i>{{$value.title}}
                </a>
            </li>
            {{/each}}
        `;
        var html = template.render(navTpl, { data, data })
        $('#navBox').html(html);
        $('#topNavBox').html(html);
    }
});

// 为搜索表单绑定表单提交事件
$('.search form').on('submit', function () {
    // 获取到用户输入的搜索关键字
    var keys = $(this).find('.keys').val();
    // 跳转到搜索结果页面并且将用户输入的搜索关键字传递到搜索结果页面
    location.href = '/search.html?key=' + keys;
    return false;
});

// 获取网站配置信息
$.ajax({
    type: 'get',
    url: '/settings',
    success: function (data) {
        // 更换网站图标
        $('#logo').attr('src', data.logo);
        $('#logo').attr('title', data.title);
    }
});
