//获取地址栏中的categoryId参数
var categoryId = getUrlParams('categoryId');

//根据分类id获取文章列表
$.ajax({
  type:'get',//get或post
  url:'/posts/category/'+categoryId,//请求的地址
  success:function(result){//成功的回调函数
    var html = template('listTpl', { data: result});
    $('#listBox').html(html);
  }
})

// 根据分类id获取分类信息
$.ajax({
  type:'get',//get或post
  url:'/categories/'+categoryId,//请求的地址
  success:function(result){//成功的回调函数
    $('#categoryTitile').html(result.title);
  }
})