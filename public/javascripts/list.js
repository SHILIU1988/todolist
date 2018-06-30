//开始加入新东西
var store = {
    save(key, value) {//使用JSON.stringfy()方法将其转换为字符串后存储
      localStorage.setItem(key, JSON.stringify(value));
    },
    fetch(key) {//JSON.parse()方法进行还原。
      return JSON.parse(localStorage.getItem(key)) || [];
    }
  }

//还原todolist它只是一个名称而已，todo才是关键
//将todo的数据还原出来
//todo和lists都没有id的，
var items = store.fetch("items");
var lists = store.fetch("lists");
var vm = new Vue({
  el:"#aaa",
  data:{
      searched:[],
      searchinfo:'',
      listSign:'daily',
      stateSign:true,
      label:'显示全部',
      todoList:items,
      sortSign:false,
      lists:lists,
      newTodo:{id:0,title:'',year:'',month:'',day:'',isFinished:false,remarks:'',belongToListName:''},
      newList:{id:0,name:'',unFinishCount:0}
  },
  watch: {
    todoList: {
      handler: function () {
        store.save("items", this.todoList)
      },
      deep: true
    },
    lists:{
      handler:function(){
        store.save("lists",this.lists)
      },
      deep: true
    }
  },
  computed:{
      showList:function(){
          var show = new Array();
          for(var i=0;i<this.todoList.length;i++){
              var item = this.todoList[i];
              if(item.belongToListName === this.listSign){
                  if(this.stateSign === false){
                      if(item.isFinished === false)
                          show.push(item);
                  }else{
                      show.push(item);
                  }
              }
          }
          return show;
      }
 
  },
//   filter:{
//       all:function(list){
//           return list;
//       },
//       unfinished:function(list){
//           return list.filter(function(todo){
//               return !todo.isFinished;
//           });
//       }
//   },
  methods:{
      chickon:function(active){
          this.sortSign=active;
      },
      addTodo:function(){
          if(this.newTodo.id===0){
              this.newTodo.id = this.todoList.length + 1;
              this.newTodo.belongToListName = this.listSign;
              this.todoList.push(this.newTodo);
          }
          this.newTodo = {id:0,title:'',isFinished:false,remarks:'',belongToListName:''};
      },
      edit:function(todo){
        this.newTodo=todo;
      },
      deleteList:function(id) {
        this.lists.splice(id,1);
        //如何把清单里面的事项一并删除
      },
      deleteTdo:function(id){
          this.todoList.splice(id,1);
      },
      addList:function(){
          if(this.newList.id===0){
              this.newList.id = this.lists.length + 1;
              this.lists.push(this.newList);
          }
          this.newList = {id:0,name:'',year:'',month:'',day:'',unFinishCount:0};
      },
      changeListSign:function(name){
          this.listSign = name;
      },
      changeState:function(id){
          this.todoList[id].isFinished = !this.todoList[id].isFinished;
      },
      changeStateSign:function(){
          if(this.stateSign === true)
              this.label = '显示全部';
          else 
              this.label = '隐藏已完成';
          this.stateSign = !this.stateSign;
      },
      searchOnTable:function() {
          this.searched=searchByName(this.todoList,this.searchinfo);
      },
  }
});

function compare(property){
	return function(a,b){
		return a[property]-b[property];
	}
};



function tolower(text) {
    return text.toString().toLowerCase();
};
function searchByName (items,text) {
    if(text){
       return items.filter(function(item){
            tolower(item.title).include(tolower(text));
        });
    }
    return items;
};

function watchHashChange() {
  var hash = window.location.hash.slice(1);
  vm.data = hash;
};

watchHashChange();

window.addEventListener("hashchange", watchHashChange);