//初始化下拉框
  initSearchInput();

  function fuzzySearch(e) {
      var that = this;
      //获取列表的ID
      var listId = $(this).attr("list");
      //列表
      var list = $('#' + listId + ' div');
      //列表项数组  包列表项的id、内容、元素
      var listArr = [];
      //遍历列表，将列表信息存入listArr中
      $.each(list, function(index, item){
          var obj = {'eleId': item.getAttribute('id'), 'eleName': item.innerHTML.toLowerCase(), 'ele': item};
          listArr.push(obj);
      })

      //current用来记录当前元素的索引值
      var current = 0;
      //showList为列表中和所输入的字符串匹配的项
      var showList = [];
      //为文本框绑定键盘引起事件
      $(this).keyup(function(e){
          //列表框显示
          $('#' + listId).show();
          if(e.keyCode == 38) {
              //up
              console.log('up');
              current --;
              if(current <= 0) {
                  current = 0;
              }
              console.log(current);
          }else if(e.keyCode == 40) {
              //down
              console.log('down');
              current ++;
              if(current >= showList.length) {
                  current = showList.length -1;
              }
              console.log(current);

          }else if(e.keyCode == 13) {
              //enter
              console.log('enter');
              //如果按下回车，将此列表项的内容填充到文本框中
              $(that).val(showList[current].innerHTML);
              //下拉框隐藏
              $('#' + listId).hide();
          }else {
              //other
              console.log('other');
              //文本框中输入的字符串
              var searchVal = $(that).val();
              searchVal = searchVal.toLowerCase()
              showList = [];
              //将和所输入的字符串匹配的项存入showList
              //将匹配项显示，不匹配项隐藏
              $.each(listArr, function(index, item){
                  if(item.eleName.indexOf(searchVal) != -1) {
                      item.ele.style.display = "block";
                      showList.push(item.ele);
                  }else {
                      item.ele.style.display = 'none';
                  }
              })
              // console.log(showList);
              current = 0;
          }
          //设置当前项的背景色及位置
          $.each(showList, function(index, item){
              if(index == current) {
                  item.style.background = "#eee";
                  $('#' + listId).scrollTop(item.offsetTop);
              }else {
                  item.style.background = "";
              }
          })
          //设置下拉框的高度
          //212为列表框的最大高度
          if(212 > $('#' + listId + ' div').eq(0).height() * showList.length) {
              $('#' + listId).height($('#' + listId + ' div').eq(0).outerHeight() * showList.length);
          }else {
              $('#' + listId).height(212);
          }
      })
  }

  function initSearchInput() {
      //给下拉箭头绑定点击事件  点击下拉箭头显示/隐藏对应的列表
      //输入框的类名为form-control
      //下拉列表的类名为selectList

      //为列表中的每一项绑定鼠标经过事件
      $('.selectList div').mouseenter(function(){
          $(this).css("background", "#eee").siblings().css("background", "");
      });
      //为列表中的每一项绑定单击事件
      $('.selectList div').click(function(){
          //文本框为选中项的值
          $(this).parent().parent().find('.form-control').val($(this).html());
          searchId = this.id;
          //下拉框隐藏
          $(this).parent().hide();
      });

      //点击下拉框外部的时候使下拉框隐藏
      var selectList = document.getElementsByClassName('selectList');
      document.body.onclick = function(e){
          e = e || window.event;
          var target = e.target || e.srcElement;
          if(target != selectList[0]){
              selectList[0].style.display = 'none';
          }
      }
  }
  var searchId;
  function search(){
    if(searchId){
      location.href = "article.html#/tip"+searchId;
    }else{
      var list = $('#articleList div');
      var listArr = [];
      $.each(list, function(index, item){
          var obj = {'eleId': item.getAttribute('id'),'eleInfo':item.innerHTML};
          listArr.push(obj);
      });
      for(let i=0;i<listArr.length;i++){
        if(listArr[i].eleInfo===$('.selectInput').val()){
          searchId=listArr[i].eleId;
          location.href = "article.html#/tip"+searchId;
        }
      }
    }
    return false;
  }






   //
