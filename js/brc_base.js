/*
 *	bankrate base javascript
 *	author: yuemin@huojo.cn
 *	version: $Id: brc_base.js,v 1.1 2008/07/15 08:59:39 wjliu Exp $
 */
function MM_preloadImages() { //v3.0
  var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
    var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)
    if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
}
function MM_swapImgRestore() { //v3.0
  var i,x,a=document.MM_sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
}
function MM_findObj(n, d) { //v4.01
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
  if(!x && d.getElementById) x=d.getElementById(n); return x;
}

function MM_swapImage() { //v3.0
  var i,j=0,x,a=MM_swapImage.arguments; document.MM_sr=new Array; for(i=0;i<(a.length-2);i+=3)
   if ((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}
}
function MM_nbGroup(event, grpName) { //v6.0
  var i,img,nbArr,args=MM_nbGroup.arguments;
  if (event == "init" && args.length > 2) {
    if ((img = MM_findObj(args[2])) != null && !img.MM_init) {
      img.MM_init = true; img.MM_up = args[3]; img.MM_dn = img.src;
      if ((nbArr = document[grpName]) == null) nbArr = document[grpName] = new Array();
      nbArr[nbArr.length] = img;
      for (i=4; i < args.length-1; i+=2) if ((img = MM_findObj(args[i])) != null) {
        if (!img.MM_up) img.MM_up = img.src;
        img.src = img.MM_dn = args[i+1];
        nbArr[nbArr.length] = img;
    } }
  } else if (event == "over") {
    document.MM_nbOver = nbArr = new Array();
    for (i=1; i < args.length-1; i+=3) if ((img = MM_findObj(args[i])) != null) {
      if (!img.MM_up) img.MM_up = img.src;
      img.src = (img.MM_dn && args[i+2]) ? args[i+2] : ((args[i+1])? args[i+1] : img.MM_up);
      nbArr[nbArr.length] = img;
    }
  } else if (event == "out" ) {
    for (i=0; i < document.MM_nbOver.length; i++) {
      img = document.MM_nbOver[i]; img.src = (img.MM_dn) ? img.MM_dn : img.MM_up; }
  } else if (event == "down") {
    nbArr = document[grpName];
    if (nbArr)
      for (i=0; i < nbArr.length; i++) { img=nbArr[i]; img.src = img.MM_up; img.MM_dn = 0; }
    document[grpName] = nbArr = new Array();
    for (i=2; i < args.length-1; i+=2) if ((img = MM_findObj(args[i])) != null) {
      if (!img.MM_up) img.MM_up = img.src;
      img.src = img.MM_dn = (args[i+1])? args[i+1] : img.MM_up;
      nbArr[nbArr.length] = img;
  } }
}

function corrdinatewh(a,b,c,d,e)
{
	this.x=a;
	this.y=b;
	this.w=c;
	this.h=d;
	this.coordinateFrame=e
}
corrdinatewh.prototype.contains=function(a)
{
	return this.x<=a.x&&a.x<this.x+this.w&&this.y<=a.y&&a.y<this.y+this.h
};
corrdinatewh.prototype.toString=function()
{
	return"[R "+this.w+"x"+this.h+"+"+this.x+"+"+this.y+"]"
};
corrdinatewh.prototype.clone=function()
{
	return new corrdinatewh(this.x,this.y,this.w,this.h,this.coordinateFrame)
};

/**
 * //E(a)
 * @param {Object} a
 */
function getElementCoordWH(a)
{
	var d=0;
	var e=0;
	for(var f=a;f.offsetParent;f=f.offsetParent)
	{
		d+=f.offsetLeft;
		e+=f.offsetTop
	}
	return new corrdinatewh(d,e,a.offsetWidth,a.offsetHeight,window)
}

function InitConfig(action)
{
	var url = getConfigUrl;
	var pars = 'ac=' + action;
	var myAjax = new Ajax.Request( url, { method: 'get', parameters: pars, asynchronous: false, onComplete: ReturnJson }); 
}

function ReturnJson(E)
{
	JSONinfo = eval('('+E.responseText+')');
}

function InitConfigGold(action , url)
{
	//var pars = 'act=' + action;
	url+='/act/'+action;
	alert(url);
	var myAjax = new Ajax.Request( url, { method: 'get', asynchronous: false, onComplete: ReturnGoldJson }); 
}

function InitConfigGold2(url)
{
	//alert(url);
	var myAjax = new Ajax.Request( url, { method: 'get', asynchronous: false, onComplete: ReturnGoldJson }); 
}

function ReturnGoldJson(E)
{
	//alert(E.responseText);
	Temp = eval('('+E.responseText+')');
}

function removeSelectOption(SelectId , SelectValue)
{
	var ob = $(SelectId);
	ob.value = SelectValue;
	ob.remove(ob.selectedIndex);
}

function AddSelectOption(InputId , Array , Default , Clear)
{
	ob = $(InputId);
	if(Clear == true)
	{
		ob.length = 0;
	}
	if(Default != '')
	{
		ob.options.add(new Option(Default , 0));
	}
	if(!Array) return ;
	Array.each(function(option){
		Flag = true;
		for(n=0;n<ob.length;n++)
		{
			if(ob.options[n].value == option.id)
			{
				Flag = false;
			}
		}
		if(Flag)
		{
			ob.options.add(new Option(option.name , option.id));
		}
	});
}

function AddSelectOptionObject(InputId , ObjectArray , Default , Clear)
{
	ob = $(InputId);
	if(Clear == true)
	{
		ob.length = 0;
	}
	if(Default != '')
	{
		ob.options.add(new Option(Default , 0));
	}
	for(id in ObjectArray)
	{
		ob.options.add(new Option(ObjectArray[id] , id));
	}
}

var Temp;
var JSONinfo;
function getAddData()
{
	pid = $F('id');
	ptype = $F('product_type');
	//get areas
	url = dispAddedAreaUrl;
	pars = 'pid=' + pid + '&ptype=' + ptype;
	var myAjax = new Ajax.Request( url, { method: 'get', parameters: pars, asynchronous: false, onComplete: ReturnGoldJson }); 
	AddedArea = Temp;
	
	DisplayAddedAear();
}

function isDigit(s) //check the number
{
	var partn=/^[0-9]+$/;
	if (!partn.exec(s))
		return false
	return true
}

function isnumeric(p)
{
 if (p == "")
  return false;
 var l = p.length;
 var count=0;
 for(var i=0; i<l; i++)
 {
  var digit = p.charAt(i);
  if(digit == "." )
 {
    ++count;
    if(count>1) return false;
   }
  else if(digit < "0" || digit > "9")
  return false;
 }
 return true;
}
var dispAddedAreaUrl	= '/areainfo/getAddedArea';

function WocalTemplate(a,b)
{
	if(!b)
	{
		a=a.replace(/>(\s+)</g,"><");
		a=a.replace(/\s{2,}/g," ")
	}
	this.D=[];
	this.Ee=0;
	this.Va={};
	var c=a.match(/\$\{\w+\}/g)||[];
	var d=0;
	for(var e=0;e<c.length;++e)
	{
		var f=c[e];
		var g=a.indexOf(f,d);
		if(d!=g)
		{
			this.D.push(a.substring(d,g))
		}
		d=g+f.length;
		f=f.substring(2,f.length-1);
		var h=this.Va[f];
		if(!h)
		{
			h=[];
			this.Va[f]=h;
			++this.Ee;
			this["put_"+f]=this.Mf(this,f)
		}
		h.push(this.D.length);
		this.D.push(undefined)
	}
	if(d!=a.length)
	{
		this.D.push(a.substring(d))
	}
	this.ld=0
}
WocalTemplate.prototype.Mf=function(a,b)
{
	return function(c){return a.put(b,c)}
};
WocalTemplate.prototype.put=function(a,b)
{
	var c=this.Va[a];
	if(this.D[c[0]]===undefined)
		++this.ld;
	if(c.length===1)
	{
		this.D[c[0]]=b
	}
	else
	{
		for(var d=0;d<c.length;++d)
		{
			this.D[c[d]]=b
		}
	}
};
WocalTemplate.prototype.toString=function()
{
	if(!this.R())
	{
		this.debug(false,"some keys are missing values: "+this.wg())
	}
	return this.D.join("")
};
WocalTemplate.prototype.wg=function()
{
	var a=[];
	for(var b in this.kg())
		a.push(b);
	return a.join()
};
WocalTemplate.prototype.eh=function(a)
{
	return a&&a in this.Va
};
WocalTemplate.prototype.lh=function()
{
	return this.ld
};
WocalTemplate.prototype.R=function()
{
	return this.ld==this.Ee
};
WocalTemplate.prototype.ih=function()
{
	var a={};
	for(var b in this.Va)
		a[b]=null;
	return a
};
WocalTemplate.prototype.kg=function()
{
	var a={};
	for(var b in this.Va)
	{
		if(this.D[this.Va[b][0]]===undefined)
		{
			a[b]=null
		}
	}
	return a
}
WocalTemplate.prototype.debug=function(a,b)
{
	if (a==false)
	{
		alert(b);
	}
}
function _CheckDate(str)
{
	var date = str.split('-');
	var newDate = new Date(date[0], date[1]-1, date[2]);
	if(newDate.getMonth()+1 != date[1] || newDate.getDate() != date[2] || newDate.getFullYear() != date[0] || date[0].length != 4)
	{
		return false;
	}
	return true;
}
function _ReloadPage()
{
	window.location.reload();
}
function newWindow(url,name,w,h,scroll,resize, additionalSettings)
{
	var left = (screen.width-w)/2;
	var top = (screen.height-h)/2;
	var settings  ='height='+h+',';
	    settings +='width='+w+',';
	    settings +='top='+top+',';
	    settings +='left='+left+',';
	if(scroll==true)
	{
	    settings += 'scrollbars,';
	}
	if(resize==true)
	{
		settings += 'resizable,';
	}
	win = window.open(url,name,settings+additionalSettings);
	win.focus();
}

function _log(msg)
{
	alert(msg)
}

function LTrim(str)
{
	var whitespace = new String(" tnr");
	var s = new String(str);
	if (whitespace.indexOf(s.charAt(0)) != -1)
	{
		var j=0, i = s.length;
		while (j < i && whitespace.indexOf(s.charAt(j)) != -1)
		{
			j++;
		}
		s = s.substring(j, i);
	}
	return s;
}

/*
 * initial the calendar for input type of date
 * @param object {InputId:ButtonId}
 */
function initDateInputArea(obj)
{
	for(var key in obj)
	{
		Calendar.setup({inputField : key, 
						ifFormat : "%Y-%m-%d ", 
						daFormat : "%Y-%m-%d ",
						button : obj[key], 
						showsTime : false });
	}
}

/*
 *	navigation
 *	@param string div navigation's name	
 *	@param string num number of navigation's tabs 	
 */
 function BrcNavigation(div, num, path)
 {
 	this.div = div;
 	this.num = num;
 	this.path = path;
 }
 BrcNavigation.prototype.init=function()
 {
 	this.initListener();
 }
 BrcNavigation.prototype.initListener=function()
 {
 	for(var i=0; i < this.num; i++)
 	{
 		YAHOO.util.Event.addListener(this.div+'_img_'+i, "click", this.callback, {'div':this.div, 'num':this.num, 'cur':i, 'path':this.path}); 
		Element.setStyle(this.div+'_img_'+i, {'cursor':'pointer'});
 	}
 }
 BrcNavigation.prototype.callback=function(e, obj)
 {
 	//_log(this.id);
 	//_log(obj.div);
	for(var i=0; i<obj.num; i++)
	{
		if(i == obj.cur)
		{
			$(obj.div+'_con_'+obj.cur).style.display="";
			var oo = $(obj.div+'_img_'+i);
			oo.src = obj.path+obj.div+'_'+i+'_blue.gif';
			continue;
		}
		//_log(obj.cur);
		//_log(obj.div+'_img_'+i);
		var oo = $(obj.div+'_img_'+i);
		oo.src = obj.path+obj.div+'_'+i+'.gif';
		//_log(obj.div+'_img_'+i+'_off.gif');
		$(obj.div+'_con_'+i).style.display="none";
	}
 }

/*
 *	open new windows with given attr
 *
 */
function newWindow(url,name,w,h,scroll,resize, additionalSettings)
{
	var left = (screen.width-w)/2;
	var top = (screen.height-h)/2;
	var settings  ='height='+h+',';
	    settings +='width='+w+',';
	    settings +='top='+top+',';
	    settings +='left='+left+',';
	if(scroll==true)
	{
	    settings += 'scrollbars,';
	}
	if(resize==true)
	{
		settings += 'resizable,';
	}
	win = window.open(url,name,settings+additionalSettings);
	win.focus();
}

/*
 *	add current page to favourate
 *
 */
function addBookmark(title, url) {
	if (window.sidebar) 
	{ 
		window.sidebar.addPanel(title, url,""); 
	} 
	else if( document.all ) 
	{
		window.external.AddFavorite( url, title);
	} else if( window.opera && window.print ) 
	{
		return true;
	}
}

function GeneralOnChange(typeid)
{
	window.location = '/category/inputGeneralInfo/typeid/'+typeid;
}



function clearForm(formName)
{
	var formObj = document.forms[formName];
	var formEl = formObj.elements;
	for (var i=0; i<formEl.length; i++)
	{
		var element = formEl[i];
		if (element.type == 'submit') { continue; }
		if (element.type == 'reset') { continue; }
		if (element.type == 'button') { continue; }
		if (element.type == 'hidden') { continue; }
		
		if (element.type == 'text') { element.value = ''; }
		if (element.type == 'textarea') { element.value = ''; }
		if (element.type == 'checkbox') { element.checked = false; }
		//if (element.type == 'radio') { element.checked = false; }
		if (element.type == 'select-multiple') { element.selectedIndex = -1; }
		if (element.type == 'select-one') { element.selectedIndex = 0; }
	}
} 
function resultPageInfoHandle(e, obj)
{
	showResultPageInfo(obj.div);
}
function showResultPageInfo(div)
{
	if($(div).style.display == 'none')
	{
		$(div).style.display = '';
		$(div+'_arrow').src = 'images/collapseon.gif';
	}
	else
	{
		$(div).style.display = 'none';
		$(div+'_arrow').src = 'images/expandon.gif';
	}
}

/*-- set result page width --*/
function setResultPageWidth(e, obj)
{
	var oDim = Element.getDimensions('result_table_full');
	var cellWidth = (oDim.width-180)/obj.col;
	for (var i=0; i<(obj.col-1); i++)
	{
		Element.setStyle('result_table_th_'+i, {'width':Math.floor(cellWidth)+'px'})
	}
}

/*-- call google analytics --*/
function runGoogleAnalytics()
{
	var len = module.length;
	for (var i = 0; i < len; i++)
	{
		var pageTracker = _gat._getTracker("UA-3314105-"+module[i]);
		pageTracker._initData();
		pageTracker._trackPageview();	
	}
}

/*-- changing article font size --*/
function changeFontSize(size)
{
	YAHOO.util.Dom.setStyle(['entry_content'], 'font-size', size+'px'); 
}

/*-- trac --*/
function trac()
{
	//window.href="mailto:chinasupport@bankrate.com"
	preUrl = window.location;
	window.location="mailto:chinasupport@bankrate.com?subject=Bug report: " + preUrl
}

/*-- check comment submit --*/
function check_comment(author, email)
{
	var s_author = $(author).value;
	
	if(s_author=='')
	{
		$(author).value = check_comment_msg[1];
	}
	
	var i_comment_author = check_comment_author.length;
	var b_pass = true;
	for (var i=0; i<i_comment_author; i++)
	{
		if(s_author == check_comment_author[i])
		{
			b_pass = false;
		}
	}
	
	if(!b_pass)
	{
		alert(check_comment_msg[0]);
	}
	
	return b_pass;
}

/* search */
function _search(o)
{
	if(!o.checked)
	{
		o.value="";
		o.checked=true;
	}
}

/* global msg */
var filter_menu_msg = ['\u76f8\u5173\u5de5\u5177'];
var check_comment_msg = ['\u5bf9\u4e0d\u8d77\uff0c\u6635\u79f0\u4e0d\u80fd\u4f7f\u7528\u201c\u94f6\u7387\u3001\u94f6\u7387\u7f51\u3001bankrate\u201d\u7b49\u5b57\u6837\u3002', '\u533f\u540d\u7528\u6237'];
var check_comment_author = ['bankrate', '\u94f6\u7387', '\u94f6\u7387\u7f51'];