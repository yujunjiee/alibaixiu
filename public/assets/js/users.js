//监听提交事件
$('#userForm').on('submit',function(){
  //serialize 第一点，保证form表单每一个input要有一个name属性
  // console.log($('#userForm').serialize());//自动收集表单数据
  $.ajax({
    type:'post',//get或post
    url:'/users',//请求的地址
    data:$('#userForm').serialize(),//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
    // dataType:'json',
    success:function(result){//成功的回调函数
      // console.log(result)
      location.reload();//刷新当前页面
    }
  })
  //阻止默认行为
  return false;
})


//回调函数不能用es6箭头函数，this会出错
//上传用户头像

$('#formBox').on('change','#avatar', function() {
  var formData = new FormData();
  formData.append('avatar', this.files[0]);
  //jq中$.ajax默认的contentType值是'application/x-www-form=urlendcoded'
  //jq中$.ajax默认会吧数据变成key=value&key=value的形式，我们现在是不需要，因为数据是二进制的数据
  $.ajax({
    type:'post',//get或post
    url:'/upload',//请求的地址
    contentType:false,
    processData:false,
    data:formData,//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
    dataType:'json',
    success:function(result){//成功的回调函数
      // console.log(result)
      $('#preview').attr('src',result[0].avatar)
      $('#hiddenImg').val(result[0].avatar)
    }
  })
  })

  //图片预览
  $.ajax({
    type:'get',//get或post
    url:'/users',//请求的地址
    // data:{},//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
    dataType:'json',
    success:function(result){//成功的回调函数
      // console.log(result)
      var html = template('userTpl',{data:result});
      $('#usersBox').html(html);
    }
  })

  //修改分为两步
  $('#usersBox').on('click', '.edit', function(){
    //点击获取当前这个编辑按钮的id值
    var id = $(this).attr('data-id');
    // console.log(id);
    //通过ajax吧当前这个用户的信息查询出来
    $.ajax({
      type:'get',//get或post
      url:'/users/'+id,//请求的地址
      data:{},//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
      dataType:'json',
      success:function(result){//成功的回调函数
        // console.log(result)
        var html = template('modifyFormTpl',result);
        $('#formBox').html(html);
      }
    })
  })

  $('#formBox').on('submit','#userForm',function(){
    //收集表单数据
    // console.log($(this).serialize());
    var id = $(this).attr('data-id');
    // console.log(id);
    $.ajax({
      type:'put',//get或post
      url:'/users/'+id,//请求的地址
      data:$(this).serialize(),//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
      dataType:'json',
      success:function(result){//成功的回调函数
        // console.log(result)
        location.reload();
      }
    })
    return false;
  })

  //删除功能
  $('#usersBox').on('click', '.delete',function(){
    var id = $(this).attr('data-id');
    console.log(id);
    $.ajax({
      type:'delete',//get或post
      url:'/users/'+id,//请求的地址
      data:{},//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
      dataType:'json',
      success:function(result){//成功的回调函数
        // console.log(result)
        location.reload();
      }
    })
  })

  //当切换全选input的时候，下面所有的input跟着来改变状态
  $('#selectAll').on('change',function(){
    console.log($(this).prop('checked'));
    var bool = $(this).prop('checked');
    $('#usersBox').find('.status').prop('checked',bool);
    if(bool == true){
      $('#deleteMany').show();
    }else{
      $('#deleteMany').hide();
    }
  })



  //当tobody中大的input全部选中的时候，我们就让全选也是选中的状态
  $('#usersBox').on('change','.status',function(){
    if($('#usersBox').find('.status').length == $('#usersBox').find('.status').filter(':checked').length){
      $('#selectAll').prop('checked',true);
    }else{
      $('#selectAll').prop('checked',false);
    }
    if($('#usersBox').find('.status').filter(':checked').length >= 2){
      $('#deleteMany').show();
    }else{
      $('#deleteMany').hide();
    }
  })


$('#deleteMany').on('click',function(){
  //找到所有的选中的input
  if(confirm('确定要删？')){
    var selectAll = $('#usersBox').find('.status').filter(':checked');
  var arr = [];
   selectAll.each(function(index,element){
     console.log($(element).attr('data-id'));
     arr.push($(element).attr('data-id'));
   })
   $.ajax({
     type:'delete',//get或post
     url:'/users/'+arr.join('-'),//请求的地址
     data:{},//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
     dataType:'json',
     success:function(result){//成功的回调函数
      //  console.log(result)
      location.reload();
     }
   })
  }
})