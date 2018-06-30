    //  使得侧边的内容与左边的标签对应 

    
      $('#myTabs a').click(function (e) {
        e.preventDefault()
        $(this).tab('show')
      })

      function onSearch(obj){
       // js函数开始
       setTimeout(function(){
         //tableId是事项表格，获取
        var storeId=document.getElementById('tableId');
        var rowsLength = storeId.rows.length;
        var key = obj.value
        ;
        var searchCol = 1;
        for(var i=1; i < rowsLength; i++)
        {
          var searchText = storeId.rows[i].cells[searchCol].innerHTML;

          if(searchText.match(key)){
            storeId.rows[i].style.display='';
          }
          else{
            storeId.rows[i].style.display='none';
          }
        }
       },200);
      }


      

    