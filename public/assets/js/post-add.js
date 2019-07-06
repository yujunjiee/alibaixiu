
  //实现分类显示功能
$.ajax({
  type:'get',//get或post
  url:'/categories',//请求的地址
  data:{},
  success:function(result){//成功的回调函数
    console.log(result)
    var html = template('categoryTpl',{data:result});
    $('#category').html(html);
  }
})


//图标上传和预览
// $('#feature').on('change',function(){
// })

$('#paerntBox').on('change', '#hiddenImg', function(){
  // console.dir(this);
  var formData = new FormData();
  formData.append('avatar',this.files[0]);
  //formData 原生ajax来写
  //1.不需要写xhr。setRequestHeader
  //2.二进制的，不需要key=value

  $.ajax({
    type:'post',//get或post
    url:'/upload',//请求的地址
    contentType:false,
    processData:false,
    data:formData,
    success:function(result){//成功的回调函数
      // console.log(result)
      //图片效果预览
      $('.thumbnail').attr('src',result[0].avatar).show();
      $('#hiddenImg').val(result[0].avatar)
    }
  })
  return false;
})


//文章上传功能
$('#addForm').on('submit', function(){
 console.log($(this).serialize());
 $.ajax({
   type:'post',//get或post
   url:'/posts',//请求的地址
   data:$(this).serialize(),
   success:function(result){//成功的回调函数
    //  console.log(result)
    location.href = '/admin/posts.html'
   }
 })
 return false;
})

function getUrlParams(name){
  var paramsAry = location.search.substr(1).split('&');
  for(var i = 0; i < paramsAry.length; i++){
    var tmp = paramsAry[i].split('=');
    if(tmp[0] == name){
      return tmp[1];
    }
  }
  return -1;
}

//获取id值，如果id不存在，说明在添加，如果存在说明在修改
var id = getUrlParams('id');
if(id != -1) {
  $.ajax({
    type: 'get',
    url: '/posts/' + id,
    success: function(result) {
      $.ajax({
        url: '/categories',
        type: 'get',
        success: function(response) {
          result.categories = response;
          console.log(response);
          var html = template('modifyTpl', result);
          $('#parentBox').html(html);
        }
      })
    }
  })
}

//当修改文章信息表单发生提交行为的时候
//通过事件委托方式
$('#parentBox').on('submit','#addForm', function(){
  var id = $(this).attr('data-id');
  $.ajax({
    type:'put',//get或post
    url:'/posts/'+ id,//请求的地址
    data:$(this).serialize(),
    success:function(result){//成功的回调函数
      console.log(result)
      location.href = 'posts.html'
    }
  })
  return false;
})