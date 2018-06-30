	
	/*关键在几个函数的使用，setTimeout("jump()",5000);函数是打开页面，等待5秒，调用jump()函数。setInterval("changeSec()",1000);函数是每隔1秒调用一次changeSec()函数*/
		function jump(){
			clearInterval(mytime);
			window.open("slindex.html","_self");
		}
        //打开页面，停留3秒，调用jump(),打开待办清单系统界面
		setTimeout("jump()",3000);
		var mytime = setInterval("changeSec()",1000);
		function changeSec() {//改变标签里面（去除标签后）的内容，时间减1
			$('myspan').innerText=$('myspan').innerText-1;
		}

		function $(id){//获取元素
			return document.getElementById(id);
		}
           //setInterval()不停地调用函数，直到clearInternal()被调用或者窗口被关闭。
          // 一个可以传递给Window.clearInterval()从而取消对code的周期性执行的值，
          //直到changSec()返回为1000。取消对changeSec()的执行
		
	
	