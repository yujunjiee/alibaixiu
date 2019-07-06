
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
$('#feature').on('change',function(){
  console.dir(this);
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
      console.log(result)
      //图片效果预览
      $('.thumbnail').attr('src',result[0].avatar).show();
      $('#hiddenImg').val(result[0].avatar)
    }
  })
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