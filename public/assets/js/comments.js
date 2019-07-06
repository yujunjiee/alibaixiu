$.ajax({
  type: 'get',//get或post
  url: '/comments',//请求的地址
  data: {},//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
  success: function (result) {//成功的回调函数
    // console.log(result)
    var html = template('commentsTpl', result);
    $('#commentsBox').html(html);
  }
})

function dateFormat(str) {
  var date = new Date(str);
  var year = date.getFullYear();
  var month = date.getMonth();
  var day = date.getDate();
  return year + '-' + month + '-' + day;
}


$('#commentsBox').on('click', '.status', function () {
  var id = $(this).attr('data-id');
  var status = $(this).attr('data-status');
  $.ajax({
    type: 'put',//get或post
    url: '/comments/' + id,//请求的地址
    data: {
      state: status == 1 ? 0 : 1
    },
    success: function (result) {//成功的回调函数
      // console.log(result)
      location.reload();
    }
  })
  return false;
})


//删除功能
$('#commentsBox').on('click','.delete', function(){
  if(confirm('确定要删除吗？')){
    //获取id值
    var id = $(this).attr('data-id');
    $.ajax({
      type:'delete',//get或post
      url:'/comments/'+ id,//请求的地址
      success:function(result){//成功的回调函数
        location.reload();
      }
    })
  }
  return false;
})