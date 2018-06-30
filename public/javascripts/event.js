var store = {
	save(key, value) {
		localStorage.setItem(key, JSON.stringify(value));
	},
	fetch(key) {
		return JSON.parse(localStorage.getItem(key)) || [];
	}
}

//存储todolist表单
var list = store.fetch("todolist");


var filter = {
	all: function (list) {
		return list
	},

}

var vm = new Vue({
	el: ".main",
	data: {
		list: list,
		things: "",		
		beforeTime: "",
		visibility: "all",
	},
	watch: {
		list: {
			handler: function () {
				store.save("todolist", this.list)
			},
			deep: true
		}
	},
	computed: {
	
		filteredList() {
			return filter[this.visibility] ? filter[this.visibility](this.list) : list
		}
	},
	methods: {
		// 加入事项
		addTodo() {
			if (this.things !== "") {
				var time = this.getNowFormatDate(Date.parse(new Date()));
				var item = {
					title: this.things,
					createdAt: time,
					isChecked: false
				}
				this.list.push(item)
			}
			this.things = "";
			this.time = "";
		},
		//所以任务里面的删除
		deleteTodo(item) {
			var index = this.list.indexOf(item);
			this.list.splice(index, 1);
		},

		
	    //获取事件生成时间
		getNowFormatDate: function (tsp) {
			let time = new Date(tsp),
				year = time.getFullYear(),
				month = time.getMonth() + 1,
				date = time.getDate(),
				hour = time.getHours(),
				minute = time.getMinutes(),
				second = time.getSeconds();
			month = month > 10 ? month : '0' + month;
			minute = minute > 9 ? minute : '0' + minute;
			second = second > 9 ? second : '0' + second;
			return year + "-" + month + "-" + date;
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
	}
});

function watchHashChange() {
	var hash = window.location.hash.slice(1);
	vm.visibility = hash;
};

watchHashChange();

window.addEventListener("hashchange", watchHashChange)