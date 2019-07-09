//从地址栏中获取文章id
var postId = getUrlParams('id');

//向服务器端发送请求 根据文章id请求数据
$.ajax({
  type:'get',//get或post
  url:'/posts/'+postId,//请求的地址
  success:function(result){//成功的回调函数
    var html = template('postTpl',result);
    $('#article').html(html)
  }
})
// 点赞
$('#article').on('click','#like',function(){
  //向服务器端发送请求 执行点赞操作
  $.ajax({
    type:'post',//get或post
    url:'/posts/fabulous/'+postId,//请求的地址
    success:function(result){//成功的回调函数
      alert('点赞成功，感谢你的支持')
    }
  })
})

$.ajax({
  type:'get',//get或post
  url:'/settings',//请求的地址
  success:function(result){//成功的回调函数
    // 判断管理员是否开启的评论功能
    if(result.comment) {
      // 管理员开启了评论功能 渲染评论模板
      var html = template('commentTpl');
      // 渲染评论模板
      $('#comment').html(html);
    }
  }
})