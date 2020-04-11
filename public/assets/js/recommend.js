// 向服务器端发送请求，索要热门推荐数据
$.ajax({
    type: 'get',
    url: '/posts/recommend',
    success: function (data) {
        // 为了将模板变成公共的，写在js文件中
        var recommendTpl = `
        {{each data}}
        <li>
            <a href="detail.html?id={{$value._id}}">
              <img src="{{$value.thumbnail}}" alt="">
              <span>{{$value.title}}</span>
            </a>
        </li>
        {{/each}}
        `;
        var html = template.render(recommendTpl, { data: data });
        $('#recommendBox').html(html);
    }
});
