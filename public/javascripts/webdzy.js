var store = {
  save(key, value) {//使用JSON.stringfy()方法将其转换为字符串后存储
    localStorage.setItem(key, JSON.stringify(value));
  },
  fetch(key) {//JSON.parse()方法进行还原。
    return JSON.parse(localStorage.getItem(key)) || [];
  }
}

var web = store.fetch("web")

  // vue实例，实现保存，删除，修改功能
  var vm = new Vue({
    el: '#app',
    data:{
      rows:[
        {
         id:1,
         no:1,
         content:'web大作业的页面设计',
       },{
         id:2,
         no:2,
         content:'练习英语'
       },{
         id:3,
         no:3,
         content:'数据库'
       },{
         id:4,
         no:4,
         content:'瑜伽练习',
       }],
     rowtemplate:{id:0,no:'',content:' '},
    },
    watch: {
      rows: {
        handler: function () {
          store.save("web", this.rows)
        },
        deep: true
      }
    },
    
    methods:{
      save:function(event){
        if(this.rowtemplate.id===0){
          this.rowtemplate.id=this.rows.length+1;
         this.rows.push(this.rowtemplate);
        }
        this.rowtemplate={id:0, no:'',content:''};
      },
      deleteItem:function(id){
        this.rows.splice(id,1);
      },
      edit:function(row){
        this.rowtemplate=row;
      },
      
    },
  });
  function watchHashChange() {
    var hash = window.location.hash.slice(1);
    vm.data = hash;
  };
  
  watchHashChange();
  
  window.addEventListener("hashchange", watchHashChange);

