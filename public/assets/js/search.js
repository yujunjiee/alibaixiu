//获取到浏览器地址栏中的搜索关键字
var key = getUrlParams('key');
//根据搜索关键字调用搜索接口 获取搜索结果
$.ajax({
  type:'get',//get或post
  url:'/posts/search/'+key,//请求的地址
  success:function(result){//成功的回调函数
    var html = template('searchTpl', { data: result});
    $('#listBox').html(html);
  }
})