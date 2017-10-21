$(function(){

	 
	//聚焦失焦input
	$('#phone').eq(0).focus(function(){
		if($(this).val().length==0){
			$(this).parent().next("div").text("输入手机号码");
		}
	})
	$('input').eq(1).focus(function(){
		if($(this).val().length==0){
		    $(this).parent().next("div").text("建议使用字母、数字和符号两种以上的组合，6-20个字符");
		}
	})
	$('input').eq(2).focus(function(){
		if($(this).val().length==0){
			$(this).parent().next("div").text("请再次输入密码");
		}
	})
	
	$('input').eq(3).focus(function(){	
		if($(this).val().length==0){
			$(this).parent().next().next("div").text("看不清？点击图片更换验证码");
		}
	})
	$('input').eq(4).focus(function(){	
		if($(this).val().length==0){
			$(this).parent().next().next("div").text("输入验证码");
		}
	})
	//密码
	$('input').eq(1).blur(function(){
		if($(this).val().length==0){
			$(this).parent().next("div").text("密码正确");
			$(this).parent().next("div").css("color",'#ccc');
		}else if($(this).val().length>0 && $(this).val().length<6){
			$(this).parent().next("div").text("长度只能在6-20个字符之间");
			$(this).parent().next("div").css("color",'red');
		}else{
			$(this).parent().next("div").text("");
		}		
	})
//	确认密码
	$('input').eq(2).blur(function(){
		if($(this).val().length==0){
			$(this).parent().next("div").text("密码正确");
			$(this).parent().next("div").css("color",'#ccc');
		}else if($(this).val()!=$('input').eq(1).val()){
			$(this).parent().next("div").text("两次密码不匹配");
			$(this).parent().next("div").css("color",'red');
		}else{
			$(this).parent().next("div").text("");
		}		
	})
//	手机号
	$('#phone').eq(0).blur(function(){
		if($(this).val().length==0){
			$(this).parent().next("div").text("手机号码正确");
			$(this).parent().next("div").css("color",'#ccc');
		}else if($(this).val().substr(0,3)!=139&&$(this).val().substr(0,3)!=138&&$(this).val().substr(0,3)!=137&&$(this).val().substr(0,3)!=136&&$(this).val().substr(0,3)!=135&&$(this).val().substr(0,3)!=134&&$(this).val().substr(0,3)!=133&&$(this).val().substr(0,3)!=150&&$(this).val().substr(0,3)!=152&&$(this).val().substr(0,3)!=153&&$(this).val().substr(0,3)!=158&&$(this).val().substr(0,3)!=159&&$(this).val().substr(0,3)!=182&&$(this).val().substr(0,3)!=187&&$(this).val().substr(0,3)!=188&&$(this).val().substr(0,3)!=147&&$(this).val().substr(0,3)!=130&&$(this).val().substr(0,3)!=131&&$(this).val().substr(0,3)!=132&&$(this).val().substr(0,3)!=133&&$(this).val().substr(0,3)!=185&&$(this).val().substr(0,3)!=186&&$(this).val().substr(0,3)!=145&&$(this).val().substr(0,3)!=133&&$(this).val().substr(0,3)!=153&&$(this).val().substr(0,3)!=180&&$(this).val().substr(0,3)!=189||$(this).val().length!=11){
			$(this).parent().next("div").text("手机号格式不正确");
			$(this).parent().next("div").css("color",'red');
		}else{
			$(this).parent().next("div").text("");
		}		
	})
// 	验证码
//	 验证码刷新
	function code(){
		var str="qwertyuiopasdfghjklzxcvbnm1234567890QWERTYUIOPLKJHGFDSAZXCVBNM";
		var str1=0;
		for(var i=0; i<4;i++){
			str1+=str.charAt(Math.floor(Math.random()*62)) 
		}
		str1=str1.substring(1)
		$("#code").text(str1);
	}
	code();
	$("#code").click(code);	
//	验证码验证
	$('input').eq(3).blur(function(){
		if($(this).val().length==0){
			$(this).parent().next().next("div").text("验证码正确");
			$(this).parent().next().next("div").css("color",'#ccc');
		}else if($(this).val().toUpperCase()!=$("#code").text().toUpperCase()){
			$(this).parent().next().next("div").text("验证码不正确");
			$(this).parent().next().next("div").css("color",'red');
		}else{
			$(this).parent().next().next("div").text("");
		}		
	})
//	提交按钮
	$("#submit_btn").click(function(e){		
		for(var j=0 ;j<5;j++){
			if($('input').eq(j).val().length==0){				
				$('input').eq(j).focus();				
				if(j==4){
					$('input').eq(j).parent().next().next("div").text("此处不能为空");
					$('input').eq(j).parent().next().next("div").css("color",'red');
					e.preventDefault();
					return;
				}
				$('input').eq(j).parent().next(".tips").text("此处不能为空");
				$('input').eq(j).parent().next(".tips").css("color",'red');	
				e.preventDefault();
				return;
			}			
		}
		//协议
		if($("#xieyi")[0].checked){
			//向变量stuList数组添加一个数值，数值内部格式Student(name,password,tel,id)
			//发送用户信息
			stuList.push(new Student($('input').eq(0).val(),$('input').eq(1).val(),$('input').eq(3).val(),stuList.length+1));
            localStorage.setItem('stuList',JSON.stringify(stuList));
            alert("注册成功");
			window.open("userlist.html","_blank");
		}else{						
			$("#xieyi").next().next().next(".tips").text("请勾选协议");
			$("#xieyi").next().next().next(".tips").css("color",'red');
			e.preventDefault();
			return;
		}
	})
	


})
