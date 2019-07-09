//当管理员选中logo图片时
// alert(1111)
$('#logo').on('change', function(){
  // alert(1)
  //获取管理员选择到的图片
  var file = this.files[0];
  //创建formData对象，实现二进制文件上传
  var formData = new FormData();
  //将管理员选择到的文件添加到formData对象中
  formData.append('logo',file);
  //向服务器端发送请求，实现文件上传
  $.ajax({
    type:'post',//get或post
    url:'/upload',//请求的地址
    data:formData,//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
    processData:false,
    contentType:false,
    success:function(response){//成功的回调函数
      console.log(response)
      $('#hiddenLogo').val(response[0].logo);
      //将logo图片显示在页面中
      $('#preview').attr('src',response[0].logo);
    }
  })
});

//当网站设置表单发生提交行为是
$('#settingsForm').on('submit',function(){
  //获取管理员在表单中输入的内容
  var formData = $(this).serialize();
  //向服务器端发送请求，实现网站设置数据的添加功能
  $.ajax({
    type:'post',//get或post
    url:'/settings',//请求的地址
    data:formData,//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
    dataType:'json',
    success:function(result){//成功的回调函数
      // console.log(result)
      location.reload();
    }
  })
  //阻止表单默认提交行为
  return false;
})

//向服务器端发送接收请求，索要网站设置数据
$.ajax({
  type:'get',//get或post
  url:'/settings',//请求的地址
  success:function(result){//成功的回调函数
    // console.log(result)
    if (result){
      $('#hiddenLogo').val(result.logo)
      $('#preview').attr('src',result.logo)
      $('input[name = "title"]').val(result.title);
      $('input[name="comment"]').prop('checked',result.comment)
      $('input[name="review"]').prop('checked',result.review)
    }
  }
})