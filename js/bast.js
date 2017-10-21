// JavaScript Document

//返回顶部
function b(){
	h = 70;
	t = $(document).scrollTop();
	if(t > h){
		$('#gotop').css("display","block");
	}else{
		$('#gotop').hide();
	}
}
/*$(document).ready(function(e) {
	b();
	$('#gotop').click(function(){
		$(document).scrollTop(0);	
	})
	$('#code').hover(function(){
			$(this).attr('id','code_hover');
			$('#code_img').show();
		},function(){
			$(this).attr('id','code');
			$('#code_img').hide();
	})
	
});*/

var iNow=0;
var timer=null;
var bReady=false;

$(document).ready(function(e) {
	
	$('.piao').css({display:'none'});
	
	var bOn=false;
	
	setTimeout(function(){
		$('.piao').css({display:'block'});
		bOn=true;
		
		if(bOn){
			timer=setInterval(function(){
				//console.log(doyoo.util.openChat?true:false);
				iNow++;
				if(iNow==100){
					clearInterval(timer);
					bReady=true;
				}
				/*if(iNow==25){
				$('.piao').css({opacity:iNow/100})
				}*/
				$('.piao').css({opacity:iNow/100})
				
				if(bReady){
					b();
					$('#gotop').click(function(){
						$(document).scrollTop(0);	
					});
					$('#code').hover(function(){
							$(this).attr('id','code_hover');
							//$('#code_img').show();
						},function(){
							$(this).attr('id','code');
							$('#code_img').hide();
					})
				}
				
			},30);
			bReady=false;
		}
		
	},2000)
	
	
});

$(window).scroll(function(e){
	b();		
});




//微信
$(document).ready(function(){
		$('.weixin,.msg1').bind('mouseenter',function(){
			$('.msg1').show();
		}).bind('mouseleave',function(){
			$('.msg1').hide();
		})
	});

$(document).ready(function(){
		$('.footer_icons_weixin,.msg2').bind('mouseenter',function(){
			$('.msg2').show();
		}).bind('mouseleave',function(){
			$('.msg2').hide();
		})
	});
    
//导航  
$(document).ready(function(){
  $(".nav li a").mouseenter(function(){
	$(this).find("div").fadeIn(400);
  }).mouseleave(function(){
	$(this).find("div").fadeOut(600);
  });
  
});  

/*定利宝table切换*/  
function ve_doa(mid){
for(var i=1;i<=3;i++){
if(i==mid){
document.getElementById("actioa"+i).style.display='';
document.getElementById("ahovea"+i).className='m_nad';

}else{
document.getElementById("actioa"+i).style.display='none';
document.getElementById("ahovea"+i).className='m_nad1';

		  }
	  }
}

/*债权转让table切换*/  
function ve_Tab(mid){
for(var i=1;i<=3;i++){
if(i==mid){
document.getElementById("Tablist"+i).style.display='';
document.getElementById("Tab"+i).className='m_nad';

}else{
document.getElementById("Tablist"+i).style.display='none';
document.getElementById("Tab"+i).className='m_nad1';

      }
    }
} 

//弹层组件 start 
function LayerShow(Err,now,url,json) {
	Err=Err||'';
	/*增加提前结清相关js 开始 1.13*/
	if( Object.prototype.toString.call( now ) == '[object Object]' ){	//是json
		now=2;	//隐藏图标
	}else{
		now=now||0;	//显示图标
	}
	/*增加提前结清相关 js 结束*/
	url=url||'';
	json=json||{};
	json.btnlength=json.btnlength||1;
	json.fnSucc=json.fnSucc||'';
	
	//背景
	var bgObj=document.createElement('div');
	bgObj.setAttribute('id','bgDiv');
	bgObj.style.display='block';
	bgObj.style.width = document.body.offsetWidth + "px";
	var bgbjHight=(document.body.scrollHeight<$(window).height())?$(window).height():document.body.scrollHeight;
	bgObj.style.height = bgbjHight + "px";
	document.body.appendChild(bgObj);

	//定义窗口
	var msgObj=document.createElement('div');
	msgObj.setAttribute('class','pow_xs_Prompt');
	msgObj.style.display="block";
	
	//标题区
	var Title=document.createElement('h1');
	Title.setAttribute('class','pow_xs_SubmitTitle');
	
	var oSpan=document.createElement('span');
	oSpan.innerHTML='温馨提示';
	Title.appendChild(oSpan);
	
	var oA=document.createElement('a');
	oA.setAttribute('href','javascript:;');
	oA.setAttribute('class','pow_xs_CloseLayerBtn');
	Title.appendChild(oA);
	if(url){
		oA.style.display='none';
	}
	
	//内容区
	var oPromptcon=document.createElement('div');
	oPromptcon.setAttribute('class','pow_xs_PromptCon');
	
	var oP1=document.createElement('p');
	oP1.setAttribute('class','pow_xs_PromptConP1 mt40');
	var oI=document.createElement('i');
	/*增加提前结清相关js 开始 1.13*/


	if( now==true || now=='1' ){
		oI.setAttribute('class','icon pow_icon_ok');
		oP1.appendChild(oI);
		oPromptcon.appendChild(oP1);
	}else if( now==false || now=='0' ){
		oI.setAttribute('class','icon pow_icon_no');
		oP1.appendChild(oI);
		oPromptcon.appendChild(oP1);
	}else if( now==2 ){
		//不需要展示图标
	}
	/*增加提前结清相关js 结束*/
	
	var oP2=document.createElement('p');
	oP2.setAttribute('class','pow_xs_PromptConP2');
	oP2.style.padding='0 40px';
	oP2.innerHTML=Err;
	
	var oP3=document.createElement('p');
	oP3.setAttribute('class','pow_xs_PromptConP3');
	
	var oBtn=document.createElement('a');
	oBtn.setAttribute('class','pow_xs_Sub');
	oBtn.setAttribute('href','javascript:;');
	oBtn.innerHTML='确定';
	oP3.appendChild(oBtn);
	
	if(json.btnlength==2){
		var oClose=document.createElement('a');
		oClose.setAttribute('class','pow_xs_Pass');
		oClose.setAttribute('href','javascript:;');
		oClose.innerHTML='取消';
		oP3.appendChild(oClose);
	}
	oPromptcon.appendChild(oP2);
	oPromptcon.appendChild(oP3);
	
	msgObj.appendChild(Title);
	msgObj.appendChild(oPromptcon);
	
	document.body.appendChild(msgObj);

	//解除绑定事件
	$('.pow_xs_CloseLayerBtn,.pow_xs_Pass,.pow_xs_Sub').unbind('click');
	//关闭
	$('.pow_xs_CloseLayerBtn,.pow_xs_Pass,.pow_xs_Sub').bind('click',function(){
		$(bgObj).fadeOut(100,function(){
			$(bgObj).remove();
		});
		$(msgObj).hide(100,function(){
			$(msgObj).remove();
		});
		
		if($(this).hasClass('pow_xs_Sub')){
			if(url){
				window.location.href=url;
			}
			if(json.fnSucc){
				json.fnSucc();
			}
		}
		/*增加提前结清相关js 开始 1.14*/
		if(now.reload=true){
			window.location.reload();
		}
		/*增加提前结清相关js 结束*/
		return false;
	})
}
//弹层组件 end

/*弹框*/
function showDetail(n) {

	//判断是否是借款详情页面
	if($('#pow_xs_SeeOld1').html()){
		var Json={
			old1:$('#pow_xs_SeeOld1').html(),
			old2:$('#text_box').val(),
			old3:$('#pow_xs_SeeOld3').html(),
			old4:$('#pow_xs_SeeOld4').html(),
			old5:$('#pow_xs_SeeOld5').html()
		}
	}
	if(typeof(n)!='undefined'){ $('.fuwuID').val(n); }
	//背景
	var bgObj=document.getElementById("bgDiv");
	bgObj.style.width = document.body.offsetWidth + "px";
	var bgbjHight=(document.body.scrollHeight<$(window).height())?$(window).height():document.body.scrollHeight
	bgObj.style.height = bgbjHight + "px";
	
	//定义窗口
	//var msgObj=document.getElementById("msgDiv");
	//var msgObj=document.getElementById("pow_xs_SubmitBox");
	var msgObj=document.getElementById("msgDiv");
	//关闭
	$('.pow_xs_SubmitTitle a , #pow_xs_Pass , .icon_guanbi, .quxiao , .msgShut').on('click',function(){
		$(bgObj).fadeOut();
		$(msgObj).hide();
		$('#pow_xs_Prompt').hide();
		$('#pow_xs_ProTwo').hide();
		$("#bgDiv").hide();
	});
	
	//确定
	$('#pow_xs_Sub').on('click',function(){
		$(msgObj).hide();
		$('#pow_xs_Prompt').fadeIn(200);
	});
	//弹出
	if(!$('#pow_xs_XieyiCheck').attr('type') || $('#pow_xs_XieyiCheck').prop('checked')){
		$(msgObj).fadeIn(500)
		$(bgObj).fadeTo(500,0.5)
		
		//借款详情页面 数据载入
		if($('#pow_xs_SeeOld1').html()){
			$('#pow_xs_SeeAgain1').html(Json.old1);
			$('#pow_xs_SeeAgain2').html(Json.old2);
			$('#pow_xs_SeeAgain3').html(parseInt(Json.old3)+'%');
			$('#pow_xs_SeeAgain4').html(Json.old4);
			$('#pow_xs_SeeAgain5').html(Json.old5);
		}
	}
}

//弹框二
function showDetail2(n) {
	if(typeof(n)!='undefined'){ $('.fuwuID').val(n); }
	//背景
	var bgObj=document.getElementById("bgDiv");
	bgObj.style.width = document.body.offsetWidth + "px";
	var bgbjHight=(document.body.scrollHeight<$(window).height())?$(window).height():document.body.scrollHeight
	bgObj.style.height = bgbjHight + "px";

	//定义窗口
	//var msgObj=document.getElementById("msgDiv");
	//var msgObj=document.getElementById("pow_xs_SubmitBox");
	var msgObj=document.getElementById("msgDiv2");
	//关闭
	$('.msgShut').on('click',function(){
		$(bgObj).fadeOut();
		$(msgObj).hide();
		$('#pow_xs_Prompt').hide();
		$('#pow_xs_ProTwo').hide();
	});
	
	//确定
	$('#pow_xs_Sub').on('click',function(){
		$(msgObj).hide();
		$('#pow_xs_Prompt').fadeIn(200);
	});
	//弹出
	//if(!$('#pow_xs_XieyiCheck').attr('type') || $('#pow_xs_XieyiCheck').prop('checked')){
		$(msgObj).fadeIn(500);
		$(bgObj).fadeTo(500,0.5);
	//}
}

//弹框三
function showDetail3(n) {
	if(typeof(n)!='undefined'){ $('.fuwuID').val(n); }
	//背景
	var bgObj=document.getElementById("bgDiv");
	bgObj.style.width = document.body.offsetWidth + "px";
	var bgbjHight=(document.body.scrollHeight<$(window).height())?$(window).height():document.body.scrollHeight;
	bgObj.style.height = bgbjHight + "px";

	//定义窗口
	//var msgObj=document.getElementById("msgDiv");
	//var msgObj=document.getElementById("pow_xs_SubmitBox");
	var msgObj=document.getElementById("msgDiv3");
	//关闭
	$('.msgShut').on('click',function(){
		$(bgObj).fadeOut();
		$(msgObj).hide();
		$('#pow_xs_Prompt').hide();
		$('#pow_xs_ProTwo').hide();
	});
	
	//确定
	$('#pow_xs_Sub').on('click',function(){
		$(msgObj).hide();
		$('#pow_xs_Prompt').fadeIn(200);
	});
	//弹出
		$(msgObj).fadeIn(500);
		$(bgObj).fadeTo(500,0.5)

}
//用户中心-邀请奖励-弹窗4
function showDetail4(n) {
	if(typeof(n)!='undefined'){ $('.fuwuID').val(n); }
	//鑳屾櫙
	var bgObj=document.getElementById("bgDiv");
	bgObj.style.width = document.body.offsetWidth + "px";
	var bgbjHight=(document.body.scrollHeight<$(window).height())?$(window).height():document.body.scrollHeight;
	bgObj.style.height = bgbjHight + "px";

	//瀹氫箟绐楀彛
	//var msgObj=document.getElementById("msgDiv");
	//var msgObj=document.getElementById("pow_xs_SubmitBox");
	var msgObj=document.getElementById("msgDiv4");
	//鍏抽棴
	$('.msgShut').on('click',function(){
		$(bgObj).fadeOut();
		$(msgObj).hide();
		$('#pow_xs_Prompt').hide();
		$('#pow_xs_ProTwo').hide();
	});
	
	//纭畾
	$('#pow_xs_Sub').on('click',function(){
		$(msgObj).hide();
		$('#pow_xs_Prompt').fadeIn(200);
	});
	//寮瑰嚭
		$(msgObj).fadeIn(500)
		$(bgObj).fadeTo(500,0.5)
}
/*我要出借 同意并阅读协议后  改变按钮的颜色*/
function DeClass(check,btn,cla){
	
	function Checked(){
		if(check.prop('checked')){
			btn.removeClass(cla);
		}else{
			btn.addClass(cla);
		}
	}
	check.change(function(){
		Checked();
	});
	Checked();
}

$(function(){
	DeClass($('#pow_xs_XieyiCheck'),$('.zs_zqbox_button'),'zs_zqbox_button_man')
});
 /* 
定利宝加减  
$(function(){
	var t = $("#text_box");
	$("#add").click(function(){		
		t.val(parseInt(t.val())+1)
		setTotal();
	})
	$("#min").click(function(){
		if(t.val()>0){
		t.val(parseInt(t.val())-1)
		setTotal();}
	})

})  */

/*input 清空*/  
 $(document).ready(function(){

   $(".input_txt").each(function(){
     var thisVal=$(this).val();
     //判断文本框的值是否为空，有值的情况就隐藏提示语，没有值就显示
     if(thisVal!=""){
       $(this).siblings("span").hide();
      }else{
       $(this).siblings("span").show();
      }

	$(this).prev('span').click(function(e) {
        $(this).hide();
		$(this).next().focus();
    });
	  
     //聚焦型输入框验证 
     $(this).focus(function(){
       $(this).siblings("span").hide();
      }).blur(function(){
        var val=$(this).val();
        if(val!=""){
         $(this).siblings("span").hide();
        }else{
         $(this).siblings("span").show();
        } 
      });
    })
   
  })  
  
//散标将文字转换成金额千分位  
var stmp = "";
function nst(t)
{
   if(t.value==stmp) return;//如果等于上次输入则返回
   var ms = t.value.replace(/[^\d\.]/g,"").replace(/(\.\d{2}).+$/,"$1").replace(/^0+([1-9])/,"$1").replace(/^0+$/,"0");
   //replace(/[^\d\.]/g,"")去掉输入当中不是数字和.的字符
   //replace(/(\.\d{2}).+$/,"$1") 
   //匹配从字符开始的第一个.后面的所有字符,由于没有使用g标记，
   //所以只匹配开始第一次   然后用小数点和后两位进行替换以确定数值最后的格式正确 高.
   //replace(/^0+([1-9])/,"$1") 匹配以多个0开头的数值替换为去掉0后的数值做为数字的第一位 也是匹配开始的一次.
   //replace(/^0+$/,"0") 匹配以0开始和结束的多个0为一个0 也就是0000000 输入->转换成一个0
   //以下确定输入的为过滤后的合法数字
   //alert(ms);
   var txt = ms.split(".");
   //alert(txt[0]);
   //如果ms值不小数点存在则txt[0]=小数点前的值否则等于ms
   //regexp:/\d{4}(,|$)/ 匹配四位数字和,的集合或者四位数字和字符结尾的集合
   while(/\d{4}(,|$)/.test(txt[0]))//如果为txt[0]=4123
     txt[0] = txt[0].replace(/(\d)(\d{3}(,|$))/,"$1,$2");
   //txt[0].replace(/(\d)(\d{3}(,|$))/,"$1,$2")是将txt[0]进行替换后再赋给它
   //regexp:/(\d)(\d{3}(,|$))/ 将四个数字份为两组第一个数字为第一位，后三位和其他结尾为每二位
   //并替换成 第一位,第二位 注意 ,的使用很好.   也就是将4123先替换成4,123
   //由于此表达式默认采用贪婪匹配所以从数值后向前匹配再通过循环进行再匹配替换从而可以将
   //12345678分成你想要的123,456,78 楼主彩用(,|$)很精典，因为它略去了第二次匹配时的,问题
   t.value = stmp = txt[0]+(txt.length>1?"."+txt[1]:"");
   //最终赋值到输入框中  
   //如果有小数点则加上并购成最终数字否则显示替换后的txt[0]
   //bbb.value = number2num1(ms-0);
   //将ms转换为数字送到number2num1去转换
}  


$(document).ready(function(){
	//input  focus效果
    $(".input_focus").focus(function(){
        $(this).css("border","1px solid #005bac");
    });
    $(".input_focus").blur(function(){
        $(this).css("border","1px solid #d6d6d6");
    });
	
	//我要借款页-提供资料弹层
	function leaveFn(e){
		var $related = $(e.relatedTarget);
		if($related.hasClass("zlFuc")){
			$related.one('mouseleave',leaveFn);
			return;
		}
		if($related.hasClass("ziliao") ){
			return
		}
		var $ts = $(this);
		$ts.parent().find('.zlFuc').eq(0).hide();
	}
	//我要借款页-提供资料弹层
	$('.lm_wyjkMxq span.ziliao').mouseenter(function(){
		$(this).next('.zlFuc').eq(0).show();
	}).mouseleave(leaveFn);
	
	//我要借款页-我要借款申请验证
	//姓名输入框
	$('.check_nameID').focus(function(){
		 if ($(this).val() == "请输入您的真实姓名"){
			$(this).val("");
			$(this).css({'color': '#000'});
		 }
	}).keyup(function(){
		$(this).val($(this).val().replace(/\s*/g,""))
	});
	$('.check_nameID').blur(function(){
		if($(this).val()==""){
			$(this).val("请输入您的真实姓名");
			$(this).css({'color':'#555'});
		}
		if(!checkName($(this))){
			addTipFn('姓名填写有误！',false,$(this).closest('form').find('.zxsq_errorPID'));
		}else{
			addTipFn('姓名填写正确！',true,$(this).closest('form').find('.zxsq_errorPID'));;
		}
	});

	//选择城市
	$('#province_id,#Borrower_province_id,#Borrower_city_id').change(function(){
		var o=$(this).closest('form');
		if(!checkProvinceCity(o.find('#province_id'),o.find('#Borrower_city_id'))){
			addTipFn('城市信息不完整',false,o.find('.zxsq_errorPID'));
		}else{
			addTipFn('选择城市正确！',true,o.find('.zxsq_errorPID'));
		}
	});
	$('#province_id,#Borrower_province_id').blur(function(){
		var o=$(this).closest('form');
		if(!checkProvinceCity(o.find('#province_id'),o.find('#Borrower_city_id'))){
			addTipFn('城市信息不完整',false,o.find('.zxsq_errorPID'));
		}else{
			addTipFn('选择城市正确！',true,o.find('.zxsq_errorPID'));
		}
	});

	//手机号输入框
	$('.check_mobileID').focus(function(){
		if($(this).val()=="请输入有效联系方式"){
			$(this).val("");
			$(this).css({'color':'#000'});
		}
	});
	$('.check_mobileID').blur(function(){
		if($(this).val()==""){
			$(this).val("请输入有效联系方式");
			$(this).css({'color':'#555'});
		}
		if(!checkmobile($(this))){
			addTipFn('手机填写错误！',false,$(this).closest('form').find('.zxsq_errorPID'));
		}else{
	//        ajax验证电话号码是否重复
			/*$.ajax({
				type:"GET",
				url:'/msg.php',
				dataType:"text",
				data:{phone:$('#check_mobile').val(),act:"ckphone"},
				success:function(data) {
					if (data == 10) {
						addTipFn('手机号码重复！',false);
					}else{
						addTipFn('手机填写正确！',true);
					}
				}
			});*/
			addTipFn('手机填写正确！',true,$(this).closest('form').find('.zxsq_errorPID'));
		}
	});
	$('.check_mobileID').keyup(function(event){
		var curVal=$(this).val();
		switch (event.keyCode){
				case 37:
				case 38:
				case 39:
				case 40:
				case 8:
				case 46:{
					break;
				}
				default :{
					$(this).val(curVal.replace(/\D|^0/g,''));
				}
			}
	});
	$('.fuwuID').change(function(e) {
		if(!checkFwnr($(this).closest('form').find('.fuwuID'))){
			addTipFn('请选择服务内容！',false,$(this).closest('form').find('.zxsq_errorPID'));
			return;
		}else{
			addTipFn('已选择服务内容！',true,$(this).closest('form').find('.zxsq_errorPID'));
		}
	});


	//返回上一级
	$('.fgs_LogoBox input[value="< 返回上一级"]').click(function(){
		history.go(-1);
	});
});
//点击换色
$(document).ready(function(){
    $('.cx_warp1 p').click(function(){
//		var ut = $(this).attr('data-user') ? $(this).attr('data-user') : 1;
//                alert(ut);
		//$("#RegisterNewForm_usertype").val(ut);
                //add by jm--start 2015.07.23
                if ( $(this).attr('data-user') &&  $(this).attr('data-user') =='2' ){
                    $("#RegisterNewForm_userfrom").val('10');
                }
                if($(this).attr('data-user') && $(this).attr('data-user') =='1'){
                    $("#RegisterNewForm_userfrom").val('0');
                }
                //add by jm--end 2015.07.23
        if ($(this).hasClass('focus')) {
            return true;
        } else {
            $('.cx_warp1 p').removeClass('focus');
            $(this).addClass('focus');
        }
    });
});

  
//点击获取验证码


/*alert统一调用弹框UI*/
function txPopupDiv(JsonOpt){
	this.flag=JsonOpt.flag||0;
	this.tipInfor=JsonOpt.tipInfor;
	this.width=JsonOpt.width||639;
	this.callBackFn=JsonOpt.callBackFn;
	this.btnCounts=JsonOpt.btnCounts||1;
	this.outerDiv=null;
	this.innit();
}
txPopupDiv.prototype={
	innit:function(){
		var _this=this;
		if(!$('.txMask_div').length){
			$('<div class="txMask_div"></div>').appendTo($(document.body));
			$('.txMask_div:first').show();
		}else{
			$('.txMask_div:first').show();
		}
		this.outerDiv=$('<div class="txPopup_outerBox"><div class="txPopup_headerBox"><span>温馨提示</span><a href="javascript:;"class="tx_closeA icon icon_guanbi"></a></div><div class="tx_popContentBox"><div class="tx_popSign"></div><div class="tx_popTextSpan">邮件已重新发送成功！请查收</div></div><div class="txFooter_Box"></div></div>');
		this.outerDiv.appendTo($(document.body));
		var _outerDiv=this.outerDiv;
		if(this.btnCounts==1){
			_outerDiv.find('.txFooter_Box').append('<input type="button"class="tx_popokBtn pow_xs_Sub"value="确认"/>');
		}else if(this.btnCounts==2){
			_outerDiv.find('.txFooter_Box').append('<input type="button"class="tx_popcancelBtn pow_xs_Pass"value="取消"/><input type="button"class="tx_popokBtn pow_xs_Sub"value="确认"/>');
		}else if(this.btnCounts==3){
			_outerDiv.find('.txFooter_Box').append('<input type="button"class="tx_popcancelBtn pow_xs_Pass"value="取消"/><input type="button" class="pow_xs_Sub" id="lendaffirm" value="确认"/>');
		}
		if(this.flag==0){
			_outerDiv.find('.tx_popSign').addClass('suc');
		}else if(this.flag==1){
			_outerDiv.find('.tx_popSign').addClass('fal');
		}else if(this.flag==2){
			_outerDiv.find('.tx_popSign').addClass('jine_bg');
		}
		_outerDiv.css({
			'width':this.width,
			'margin-left':-this.width/2
			});
		_outerDiv.find('.tx_popTextSpan').html(this.tipInfor);
		_outerDiv.find('.tx_closeA,.tx_popcancelBtn').click(function(){
			_this.closeFn();
		});
		_outerDiv.find('.tx_popokBtn').click(function(){
			_this.okBtnFn();
		});
	},
	closeFn:function(){
		var _outerDiv=this.outerDiv;
		_outerDiv.remove();
		$('.txMask_div').hide();
	},
	okBtnFn:function(){
		var _outerDiv=this.outerDiv;
		_outerDiv.remove();
		$('.txMask_div').hide();
		if(this.callBackFn){
			this.callBackFn();
		}
	}
};

function chekUsNamefor(ob,txt,cs){
	if(ob.find('div').length==0){
		ob.attr('wtext',ob.html());
	}
	ob.html(txt);
	ob.show();
}
function onblurfor(ob,cs){
	ob.find('.'+cs).css('display','none');
	var ob2=arguments[2]?arguments[2]:'z_box';
	if(ob.closest('.'+ob2).hasClass('error')){
		ob.html(ob.attr('wtext'));
	}
}


//田佳卉 移动到问号图片弹出层
function show(d1){
//document.getElementById(d1).style.display='inline-block'; //显示层
$(d1).next().css('display','inline-block');
}
function hide(d1){
//document.getElementById(d1).style.display='none'; //隐藏层
$(d1).next().css('display','none');
}




//帮助中心右侧
$(document).ready(function(){
  $(".Sshouqi").click(function(){
    $(this).siblings('div').slideToggle("slow"); 
	$(this).parent().siblings(".Simpower").find('div').slideUp();   
  });
});

//新手引导js		
$(document).ready(function(){
	var num=0;
	//点击新手指引 弹窗
	/*
	$(document).on('click',".xs_show_btn",function(){
		num=0;
		$('.xs_show_con').css({left:-(num%4)*800+'px'});
		$('.xs_show_page').find("li").removeClass("xs_show_on").eq(num).addClass('xs_show_on');
		
		$('#xs_show_tab').css({display:'block',top:$(document).scrollTop()+100+'px'})
		$('.xs_layer').css({display:'block'})
		
		$('html').css({overflow:'hidden'});
		
	})
	*/
	
	$(document).on("click",'.xs_show_right',function(){
		num++;
		if(num>3)num=0;
		$('.xs_show_con').stop().animate({left:-(num%4)*800+'px'});
		$('.xs_show_page').find("li").removeClass("xs_show_on").eq(num).addClass('xs_show_on');
	});
	$(document).on("click",'.xs_show_left',function(){
		num--;
		if(num<0)num=3;
		$('.xs_show_con').stop().animate({left:-(num%4)*800+'px'});
		$('.xs_show_page').find("li").removeClass("xs_show_on").eq(num).addClass('xs_show_on');
	});
	
	$('.xs_show_page').find("li").click(function(){
		var _thisInd = $(this).index();
		num = _thisInd;
		$('.xs_show_con').stop().animate({left:-($(this).index())*800+'px'});
		$('.xs_show_page').find("li").removeClass("xs_show_on").eq(num).addClass('xs_show_on');
	})
	
	//点击弹窗关闭按钮 关闭弹窗
	$(document).on("click",'.xs_show_close',function(){
		$('#xs_show_tab').css({display:'none'})
		$('.xs_layer').css({display:'none'})
		
		$('html').css({overflow:'auto'});
	})
	
	
})

//验证手机号
function checkPhone(phone){
	  var isPhone=/^(?:12\d|13\d|14\d|15\d|16\d|17\d|18\d|19\d)\d{5}(\d{3}|\*{3})$/;
	  if(!isPhone.test(phone)){
			return false;
	  } 
	  return true;
  }

//锁定滚动

/*domready*/
function domReady(fn){
	if(document.addEventListener){
		document.addEventListener('DOMContentLoaded',function(){
			fn && fn();
		},false);	
	}else{
		document.onreadystatechange=function(){
			if(document.readyState=='complete'){
				fn && fn();	
			}
		};
	}
}

/*通过className获取元素*/
function getClass(oParent,sClass){
	if(oParent.getElementsByClassName){
		return oParent.getElementsByClassName(sClass);
	}else{
		var arr=[];
		var reg=new RegExp('\\b'+sClass+'\\b');
		var aEle=oParent.getElementsByTagName('*');
		for(var i=0; i<aEle.length; i++){
			if(reg.test(aEle[i].className)){
				arr.push(aEle[i]);	
			}
		}
		return arr;	
	}
}



/**
 * 数字格式转换成千分位
 *@param{Object}num
 */
function commafy(num){
   if(num == ''){
      return '';
   }
   if(isNaN(num)){
      return '';
   }
   num = num.toFixed(2);
   num = num+"";
   if(/^.*\..*$/.test(num)){
      var pointIndex =num.lastIndexOf(".");
      var intPart = num.substring(0,pointIndex);
      var pointPart =num.substring(pointIndex+1,num.length);
      intPart = intPart +"";
       var re =/(-?\d+)(\d{3})/
       while(re.test(intPart)){
          intPart =intPart.replace(re,"$1,$2")
       }
      num = intPart+"."+pointPart;
   }else{
      num = num +"";
       var re =/(-?\d+)(\d{3})/
       while(re.test(num)){
          num =num.replace(re,"$1,$2")
       }
   }
   return num;
}
/**
 * 数字格式转换成千分位2
 *@param{Object}num
 */
function commafys(num){
   if(num == ''){
      return '';
   }
   if(isNaN(num)){
      return '';
   }
   num = num+"";
   if(/^.*\..*$/.test(num)){
      var pointIndex =num.lastIndexOf(".");
      var intPart = num.substring(0,pointIndex);
      var pointPart =num.substring(pointIndex+1,num.length);
      intPart = intPart +"";
       var re =/(-?\d+)(\d{3})/
       while(re.test(intPart)){
          intPart =intPart.replace(re,"$1,$2")
       }
      num = intPart+"."+pointPart;
   }else{
      num = num +"";
       var re =/(-?\d+)(\d{3})/
       while(re.test(num)){
          num =num.replace(re,"$1,$2")
       }
   }
   return num;
}
/**
 * 去除千分位
 *@param{Object}num
 */
function delcommafy(num){
   num=num.replace(/,/gi,'');
   return num;
}

//二期散标开始 

//select模拟
//$(function(){
	
	//封装Select类  
	var Select=function(id,opt){
		this.oriId=id;
		this.conOnClass=opt.conOnClass;
		this.oriSel=$("#"+this.oriId);
		this.Options=$("#"+id+" > option");
		this.length=this.Options.length;
		//动态创建外层div
		var wrapEle=document.createElement("div");
		wrapEle.className=opt.wrapperClass;
		$(wrapEle).insertAfter(this.oriSel);
		this.wrap=$(wrapEle);
		//动态创建标题div
		var titleEle=document.createElement("div");
		titleEle.className=opt.titleClass;
		this.wrap.append(titleEle);
		this.title=$(titleEle);
		//动态创建内容ul
		var conElel=document.createElement("ul");
		conElel.className=opt.conClass;
		this.wrap.append(conElel);
		this.con=$(conElel);
		//如果设定高度，设置滚动条
		if(opt["height"]){
			this.height=opt.height;
			this.con.css({"height":this.height+"px","overflow-y":"scroll"});	
		}
	};
	//Select类的初始化函数
	Select.prototype.init=function(){
		//click事件状态标识
		var flag=true;
		//保存当前指针
		var _this=this;
		//动态创建li元素，并复制val和html
		_this.Options.each(function(){
			if($(this).index()==0){
				_this.title.html($(this).html());
			}else{
				var val=$(this).val();
				var html=$(this).html();
				var liEle=document.createElement("li");
				$(liEle).attr("val",val);
				$(liEle).html(html);
				_this.con.append(liEle); 
			}		
		});	
		_this.wrap.show();
		var lis = _this.con.children("li");
		for(var i=0,len = lis.length;i<len;i++){
			//绑定li元素的点击事件
     		lis.eq(i).on("click" , function(){
      			_this.oriSel.val($(this).attr("rel"));
      			_this.con.css({"display" : "none"});
      			_this.title.html($(this).html());
     		});
			//绑定li元素的鼠标放上和移去事件
     		lis.eq(i).on("mouseenter" ,function(){$(this).addClass(_this.conOnClass);});
     		lis.eq(i).on("mouseleave" ,function(){$(this).removeClass(_this.conOnClass);});
    	}
		//绑定标题栏的点击事件
		_this.wrap.on("click",function(){
			_this.con.css({"display" : flag?"block":"none"});
			flag=!flag;
		});	
	};
	
	//Select类调用说明:
	//创建一个模拟的select,创建出的结构如下：
	/*<div class="replace">
        <div class="current"></div>
        <ul class="options">
			<li val="1" class="onli">xxxxx</li>
			<li val="2">xxxxx</li>
        </ul>
    </div>*/
	//调用方式：
	/*var select=new Select(id,{json});*/
	//参数：(id,{json});
	//id:是原本select的id
	//json:
	/*{
		height:110,   //可选参数，如果有，即设定高度，超过高度就会带有y轴滚动条
		wrapperClass:"replace",   //外容器class样式，对照以上结构看
		titleClass:"current",    //标题处class样式，对照以上结构看
		conClass:"options",      //ul的class样式，对照以上结构看
		conOnClass:"onli"	     //li鼠标放上去的class样式，对照以上结构看
	}*/

//  });



//平台、设备和操作系统
/*(function() {
	var system ={
		win : false,
		mac : false,
		xll : false
	};
	//检测平台
	var p = navigator.platform;
	system.win = p.indexOf("Win") == 0;
	system.mac = p.indexOf("Mac") == 0;
	system.x11 = (p == "X11") || (p.indexOf("Linux") == 0);
	//跳转语句，如果是手机访问就自动跳转到wap.credithc.com页面
	if(system.win||system.mac||system.xll){
		//window.location.href="http://www.credithc.com";
		return false;

	}else{
		window.location.href="http://wap.credithc.com";
	}
})();*/

//在线申请验证
//表单元素验证
//客户姓名验证
function checkName(inputObj){
    var reg = /^[\u4e00-\u9faf]+$/;
    var curVal=inputObj.val();
    if(reg.test(curVal)&&curVal.length>1&&curVal.length<6&&curVal!='请输入您的真实姓名'){
        return true;
    }else{
        return false;
    }
}
//企业名称验证
function checkQYName(inputObj){
    var curVal=inputObj.val();
    if(curVal.length>1&&curVal.length<20){
        return true;
    }else{
        return false;
    }
}

//城市必填验证(省市，市区)
function checkProvinceCity(sj,sq){
    if(sj.val()=='-1'||sq.val()=="-1"){
        return false;
    }else{
        return true;
    }
}

//手机号码验证
//返回0指手机号格式错误，返回-1指手机号重复，返回1指手机号合法
function checkmobile(curInputObj){
    var mobileReg=/^1[0-9]{10}$/;
    var mobileValue=curInputObj.val();
    if(mobileReg.test(mobileValue)){
        return true;
    }else{
        return false;
    }
}

//企业电话验证
function checkQYPhone(curInputObj){
    var mobileReg=/^\s*$/;
    var mobileValue=curInputObj.val();
    if(!mobileReg.test(mobileValue)){
        return true;
    }else{
        return false;
    }
}

//服务内容选择验证
function checkFwnr(radios){
    //var radios=$('#zxsqRadioFgBox select');
    if(radios.val()=='-1'){
        return false;
    }else{
        return true;
    }
}


//在线申请提示语
function addTipFn(tipStr,flag,Ids){
    var zxsq_errorP= typeof(Ids)=='undefined' ? $('#zxsq_errorP') : Ids;
    zxsq_errorP.removeClass('error suc');
    if (flag) {
        zxsq_errorP.addClass('suc');
    }else{
        zxsq_errorP.addClass('error');
    }
    zxsq_errorP.text(tipStr);
}

function succeedInfoCloseFunc(k){
	if(k==0){
		$('.icon_shenqing_ok').hide();
		$('.icon_shenqing_no').show();
		$('#succeedInfoID p').eq(0).html('信息提交失败');
		$('#succeedInfoID p').eq(1).html('请拨打客服电话：400-018-5566');
	}else if(k==1){
		$('.icon_shenqing_ok').show();
		$('.icon_shenqing_no').hide();
		$('#succeedInfoID p').eq(0).html('你的信息已提交成功');
		$('#succeedInfoID p').eq(1).html('我们的工作人员将会尽快联系您！');
	}

	var a=0;
	$('#zxsq_box').hide();
	$('#succeedInfoID').show();
	$('#Set_time7').html(7);
	setFunc=setInterval(function(){
		a=a+1;
		$('#Set_time7').html(parseInt(7-a));
		if(a==7){
			$('.succeedInfoCloseID').click(); 
			$('#Set_time7').html(7);
			$('#zxsq_box').show();
			$('#succeedInfoID').hide();
			clearInterval(setFunc);
		}
	},1000);
}
function succeedInfoCloseBut(){
	$('#zxsq_box').show();
	$('#succeedInfoID').hide();
	if(typeof(setFunc)!='undefined'){clearInterval(setFunc);}
}


/*三期用户中心*/
function ys_doa(mid){
	for(var i=1;i<=2;i++){
		if(i==mid){
		document.getElementById("ys_act"+i).style.display='';
		document.getElementById("ys_aho"+i).className='ys_nad1';
		
		}else{
		document.getElementById("ys_act"+i).style.display='none';
		document.getElementById("ys_aho"+i).className='ys_nad';
		
		}
	}
}

/*input placeholder兼容*/
$.extend({
    placeholder:function(options){
        var isSupportPlaceholder = (function(){
            var attr = "placeholder";
            var input = document.createElement("input");
            return attr in input;
        })();
        options = options || {};
        var cls = options.cls;
        $("input[data-placeholder]").each(function(){
            //是否支持placeholder
            var $ts = $(this);
            var tip = $(this).attr("data-placeholder");
            if(isSupportPlaceholder){
                $ts.attr("placeholder",tip);
                return;
            }
            $ts.addClass(cls);
            $ts.val(tip);
            $ts.focus(function(){
                if($ts.val()==tip){
                    $ts.val("");
                    $ts.removeClass(cls);
                }
            })
            .blur(function(){
                var $ts = $(this);
                if($.trim($ts.val())==""){
                    $ts.addClass(cls)
                    $ts.val(tip);
                }
            });
        });
    }
});


$(function(){
$.placeholder({cls:"placeholder"});
}); 
/*input placeholder兼容 end*/
/*图片点击放大JS*/
$(function(){
    $(document).on("click",".zoomImgClose",function(){
        $("#zoomImgBox").hide();
    });
    $(".zoomImg").click(function(){
        var $ts = $(this);
        if($("#zoomImgBox").length==0){
            var tpl = '<div id="zoomImgBox" class="zoomImgBox"><div class="zoomImgBg"></div><div class="zoomImgClose">×</div><img class="zoomRealImg"></div>';
            $(document.body).append(tpl);
        }
        $("#zoomImgBox").find(".zoomRealImg").attr("src",$ts.attr("src"));
        $("#zoomImgBox").show();
    });
});
//获取验证码 
(function($){
    $.fn.countdown = function(configs){
        configs = configs || {};
        var cls = configs.clazz || "";
        var stl = configs.style || "";
        var start = configs.start || 60;
        var prefix = configs.prefix || "";
        var suffix = configs.suffix || "";
        //开始倒计时
        //隐藏原元素 显示副本
        //倒计时开始的到时间  删除副本 显示原元素
        var copyList =[];
        $(this).each(function(){
            var $copy = $(this.outerHTML);
            $copy.removeAttr("onclick");
            var $this = $(this);
            var oriClass = $this.attr("class") || "";
            var oriStyle = $this.attr("style") || "";
            $copy.attr("class",oriClass+" "+cls);
            $copy.attr("style",oriStyle+stl);
            if($this.css("display")=="inline"){
                $copy.css("display","inline-block");
            }
            $this.hide();
            $this.after($copy);
            $copy.width($this.width());
            $copy.height($this.height());
            $copy.data("origin",$this);
            copyList.push($copy);
        });
        var countNum = 0;
        var timerFn = function(){
            for(var i = 0;i<copyList.length ; i++){
                var $copy = copyList[i];
                var valHtml = prefix + (start-countNum) + suffix;
                if($copy[0].tagName=="INPUT"){
                    $copy.val(valHtml)
                }else{
                    $copy.html(valHtml)
                }
                if(countNum==start){
                    var $origin = $copy.data("origin");
                    $copy.remove();
                    $origin.show();
                    clearInterval(timerId);
                }
            }
            countNum++;
        }
        timerFn();
        var timerId = setInterval(timerFn,1000);
    }
})(jQuery);
//获取验证码 end

//最新充值弹框调用
function NewPopup(a) {
//背景
  var bgObj=document.getElementById("bgDiv");
  bgObj.style.width = document.body.offsetWidth + "px";
  bgObj.style.height = document.body.scrollHeight + "px";

//定义窗口
  var msgObj=document.getElementById("msgDiv"+a);

//关闭
  $('.msgShut').on('click',function(){
		$(bgObj).fadeOut();
		$(msgObj).hide();
  })
  msgObj.style.display = bgObj.style.display = "block";
 }
