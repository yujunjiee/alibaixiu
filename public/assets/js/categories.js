//添加分类
$('#addCategory').on('submit', function () {
  // console.log($(this).serialize());
  $.ajax({
    type: 'post',//get或post
    url: '/categories',//请求的地址
    data: $(this).serialize(),//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
    dataType: 'json',
    success: function (result) {//成功的回调函数
      // console.log(result)
      location.reload();
    }
  })
  return false;
})

//展示分类列表数据
$.ajax({
  type: 'get',//get或post
  url: '/categories',//请求的地址
  success: function (result) {//成功的回调函数
    // console.log(result)
    var html = template('categoryListTpl', { data: result });
    $('#categoryList').html(html);
  }
})

//当点击编辑按钮的时候，让当前这一行的内容展示在左侧的表单上面
$('#categoryList').on('click', '.edit', function () {
  var id = $(this).attr('data-id');
  // console.log(id);
  $.ajax({
    type: 'get',//get或post
    url: '/categories/' + id,//请求的地址
    data: {},//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
    success: function (result) {//成功的回调函数
      // console.log(result)
      var html = template('modifyFormTpl', result);
      $('#formBox').html(html);
    }
  })
  //阻止默认行为
  return false;
})

//当提交修改表单的时候提交ajax
$('#formBox').on('submit', '#addCategory', function () {
  //收集表单数据ajax
  var formData = $(this).serialize();
  var id = $(this).attr('data-id');
  $.ajax({
    type: 'put',//get或post
    url: '/categories/' + id,//请求的地址
    data: formData,
    success: function (result) {//成功的回调函数
      // console.log(result)
      location.reload();
    }
  })
  return false;
})

//删除功能
$('#categoryList').on('click', '.delete', function () {
  if (confirm('确定要删除吗？')) {
    var id = $(this).attr('data-id');
    $.ajax({
      type: 'delete',//get或post
      url: '/categories/' + id,//请求的地址
      data: {},//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
      success: function (result) {//成功的回调函数
        // console.log(result)
        location.reload();
      }
    })
    //阻止默认行为
    return false;
  }
})