$.ajax({
  type: 'get',
  url: '/posts/recommend',
  success: function(response) {
    console.log(response)
    var recommandTpl = `
    {{each data}}
      <li>
        <a href="/detail.html?id={{$value._id}}">
          <img src="{{$value.thumbnail}}" alt="">
          <span>{{$value.title}}</span>
        </a>
      </li>
    {{/each}}
    `;
    var html = template.render(recommandTpl, { data: response });
    // console.log(html);
    $('#recommendBox').html(html);
  }
})