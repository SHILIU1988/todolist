Vue.component('togglebutton', {

  props: ['label', 'name'],//父组件传递信息给子组件是通过props，通常不会在子组件中修改父组件传递下来的信息，
  //通过这样去通知父组件对某些参数进行修改。

  template: `<div class="togglebutton-wrapper" v-bind:class="isactive ? 'togglebutton-checked' : ''">

      <label v-bind:for="name">

        <span class="togglebutton-label">{{ label }}</span>

        <span class="tooglebutton-box"></span>

      </label>
      <input v-bind:id="name" type="checkbox" v-bind:name="name" v-model="isactive" @change="onToogle">
  </div>`,

  model: {
    prop: 'checked',
    event: 'change',
  },
  data: function() {
    return {
      isactive:false
    }
  },
  methods: {
    onToogle: function() {
       this.$emit('clicked', this.isactive)
    }//默认按钮为isactive的，不打开的。
  }

});
//隐藏按钮功能设计的


// 开始加入新东西
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
var todo = store.fetch("todolist");
var vm = new Vue({
  el: '#todolist',//只控制todolist这个div元素
  data: {
        todo: todo,//todo菜单 
        newitem:'',//添加的input里面的v-model新事项
        sortByStatus:false,//隐藏按钮的状态
      },
  watch: {
    todo: {
      handler: function () {
        store.save("todolist", this.todo)
      },
      deep: true
    }
  },



  methods: {
    addItem: function() {
      this.todo.push({label: this.newitem, done: false, belong:this.listname});//todo放东西进去
      this.newitem = '';
    },
    markAsDoneOrUndone: function(item) {
      item.done = !item.done;
    },
    deleteItemFromList: function(item) {
      let index = this.todo.indexOf(item);
      this.todo.splice(index, 1);
    },

    clickontoogle: function(active) {
      this.sortByStatus = active;
    }

  },


    directives: {
    "focus": {
      update(el, binding) {
        if (binding.value) {
          el.focus()
        }
      }
    }
  },
  computed: {
    todoByStatus: function() {
       // todo是清单事项内容，包含label,done
       // 如果没有开启按钮，返回原来的列表
      if(!this.sortByStatus) {
        return this.todo;
      }
      // 将没有完成的事项找出来，重新放在sortedArray里面。
      var sortedArray = []
      //filter()对数组中的每一项运行给定函数，该函数会返回true的项组成的数组
      var notDoneArray = this.todo.filter(function(item) { return !item.done; });
      
      sortedArray = [...notDoneArray];
      return sortedArray;
     }

    }

  }
);


function watchHashChange() {
  var hash = window.location.hash.slice(1);
  vm.data = hash;
};

watchHashChange();

window.addEventListener("hashchange", watchHashChange)