// JavaScript Document
function clear_result() {
	$("#_debx_dkje").html(0),
	$("#_debx_dkqx").html(0),
	$("#_debx_myhk").html(0),
	$("#_debx_zflx").html(0),
	$("#_debx_hkze").html(0),
	$("#_debj_dkje").html(0),
	$("#_debj_dkqx").html(0),
	$("#_debj_syhk").html(0),
	$("#_debj_mydj").html(0),
	$("#_debj_zflx").html(0),
	$("#_debj_hkze").html(0)
}
function reset_height(a) {
	var b = 0;
}
function zhlv() {
	var a = parseFloat($("#dklv_1").val());
	if (!a) return ! 1;
}
function cal_sf() {
	$("input[name=sy_type]").length > 0 ? $("input[name=sy_gfxz]:checked").val() == 1 ? parseFloat($("#mj_1").val()) <= 90 ? obj_sfbl_sel_1.setValue(2) : obj_sfbl_sel_1.setValue(3) : obj_sfbl_sel_1.setValue(6) : $("input[name=gfxz]:checked").val() == 1 ? parseFloat($("#mj").val()) <= 90 ? obj_sfbl_sel_2.setValue(2) : obj_sfbl_sel_2.setValue(3) : obj_sfbl_sel_2.setValue(6)
}
function cal_sy_lv(a, b) {
	var c = [5.6, 6.0, 6.15, 6.4, 6.55];
	a <= 6 ? lv = c[0] : a > 6 && a <= 12 ? lv = c[1] : a > 12 && a <= 36 ? lv = c[2] : a > 36 && a <= 60 ? lv = c[3] : lv = c[4];
	var d = (lv * b).toFixed(2);
	return d
}
function cal_gjj_lv(a) {
	var b = [4.0, 4.5],
	c = 0;
	return a <= 60 ? c = b[0] : c = b[1],
	$("input[name=gjj_type]:checked").val() == 2 && $("input[name=gfxz]:checked").val() == 2 && (c = parseFloat(c) * 1.1),
	c
}
function cal_lv(a) {
	var b = parseInt($("input[name=dkqx_" + a + "]").val()),
	c = 0,
	d = 0;
	if (a == 1) d = cal_sy_lv(b, parseFloat($("input[name=lvbs_" + a + "]").val())),
	$("input[name=dklv_type]").val() == 2 ? (d /= 12, $("#dklv_" + a).val(parseFloat(d).toFixed(4) + "%")) : $("#dklv_" + a).val(parseFloat(d).toFixed(2) + "%");
	else if (a == 2) d = cal_gjj_lv(b),
	$("#dklv_" + a).val(parseFloat(d).toFixed(2) + "%");
	else if (a == 3) {
		var e = cal_gjj_lv(b),
		f = cal_sy_lv(b, parseFloat($("input[name=lvbs_" + a + "]").val()));
		$("#dklv_" + a + "_1").val(parseFloat(e).toFixed(2) + "%"),
		$("#dklv_" + a + "_2").val(parseFloat(f).toFixed(2) + "%")
	}
}
function debx(je, lv, qx, lvlx, xx)
{
    qx = parseInt(qx);
    je = parseFloat(je);
    lv = parseFloat(lv);
    lvlx = parseInt(lvlx);
    xx = parseInt(xx);
   
    //月利率
    if (lvlx == 2)
    {
        ylv = lv * 0.01;
    }
    else
    {
        ylv = lv / 12 * 0.01;
    }
   
    var t = Math.pow(1+ylv, qx);
   
    //每月还款
    var yhk=je * ylv * (t/(t -1));;
    //累计还款总额
    var hkze=yhk * qx;
    //累计支付利息
    var zlx=hkze - je;
   
    var fh = new Object();
    fh.zlx = zlx;
    fh.hkze = hkze;
    fh.yhk = yhk;
 
    if (xx == 1)
    {
        var ye = je;    //贷款余额
        var sz = [];
        for (i=1; i<=qx; i++)
        {
            var ylx = ye * ylv;
            var ybj = yhk-ylx;
            ye -= ybj;
            var xj = new Object();
            xj.bh = i;
            xj.ylx = ylx;   //月利息
            xj.ybj = ybj;   //月本金
            xj.ye = ye;     //余额
            sz[i-1] = xj;
        }
        fh.xx = sz;
    }
 
    return fh;
}
 
//等额本金还款法
//je贷款金额
//lv年利率%，如年利率5.6%就为5.6
//qx还款年限
function debj(je, lv, qx, lvlx, xx){
    qx=parseInt(qx);
    je=parseFloat(je);
    lv=parseFloat(lv);
    lvlx = parseInt(lvlx);
    xx = parseInt(xx);
   
    //月利率
    if (lvlx == 2)
    {
        ylv = lv * 0.01;
    }
    else
    {
        ylv = lv / 12 * 0.01;
    }
  
    //累计还款总额
    var hkze=0;
    var ybj = je / qx;
 
    var fh = new Object();
    fh.ybj = ybj;
 
    var ye = je;
    var sz = [];
    for(i = 1; i <= qx; i++)
    {
        yhk = je/qx + (je-je*(i-1)/qx)*ylv;//第i月还款额
        if (i == 1)
        {
            fh.syhk = yhk;
        }
        if (i == 2)
        {
            fh.mydj = fh.syhk - yhk;
        }
        hkze = hkze + yhk;
        ylx = yhk - ybj;
        ye = ye - ybj;
    
        var xj = new Object();
        xj.bh = i;
        xj.ylx = ylx;   //月利息
        xj.yhk = yhk;   //月还款
        xj.ye = ye;     //余额
        sz[i-1] = xj;
    }
 
    if (xx == 1)
    {
        fh.xx = sz;
    }
 

    fh.zlx = hkze - je;
    fh.hkze = hkze;
 
    return fh;
}
 
/**
 * xz 房屋性质, 1:普通住宅, 2:非普通住宅
 * m5n 是否满5年, 1:是, 0:否 
 * mj 面积
 * zj 总价(元)
 */
function esfsf(xz, m5n, mj, zj)
{
    xz = parseInt(xz);
    m5n = parseInt(m5n);
    mj = parseFloat(mj);
    zj = parseFloat(zj);
    
    //契税税率
    var qssl = 0;
    if (xz == 2)
    {
        qssl = 3.0;
    }else
    {
        if (mj > 90)
        {
            qssl = 1.5;
        }
        else
        {
            qssl = 1.0;
        }
    }
    var qs = zj * qssl / 100;   //契税
 
    //营业税税率
    var yyssl = 0.0;
    if (m5n == 0)
    {
        yyssl = 5.55;
    }
    var yys = zj * yyssl / 100; //营业税
 
    //城建税
    var cjs = yys * 0.07;
 
    //教育附加费
    var jyfjf = yys * 0.03;
 
    //个人所得税税率
    var grsds = zj * 0.01;
 
    //印花税
    var yhs = 0;
 
    var fh = new Object();
    fh.qs = qs;
    fh.yys = yys;
    fh.cjs = cjs;
    fh.jyfjf = jyfjf;
    fh.grsds = grsds;
    fh.yhs = yhs;
    fh.total = qs + yys + cjs + jyfjf + grsds + yhs;
 
    return fh;
}
 
 
function cal_zh() {
	var a = $("input[name=dkqx_3]").val(),
	b = parseFloat($("#dkje_3_1").val()),
	c = parseFloat($("#dklv_3_1").val()),
	d = parseFloat($("#dkje_3_2").val()),
	e = parseFloat($("#dklv_3_2").val());
	if (!b || isNaN(b) || b > 1e7) return alert("请输入正确的公积金贷款金额");
	if (!c || isNaN(c) || c > 100) return alert("请输入正确的公积金贷款利率");
	if (!d || isNaN(d) || d > 1e7) return alert("请输入正确的商业贷款金额");
	if (!e || isNaN(e) || e > 100) return alert("请输入正确的商业贷款利率");
	var f = 1,
	g = 1,
	h = debx(b, c, a, f, g),
	i = debx(d, e, a, f, g);
	$("#_debx_dkje").html(fmoney(b + d, 2)),
	$("#_debx_dkqx").html(a),
	$("#_debx_myhk").html(fmoney(h.yhk + i.yhk, 2)),
	$("#_debx_zflx").html(fmoney(h.zlx + i.zlx, 2)),
	$("#_debx_hkze").html(fmoney(h.hkze + i.hkze, 2));
	var j = debj(b, c, a, f, g),
	k = debj(d, e, a, f, g);
	return $("#_debj_dkje").html(fmoney(b + d, 2)),
	$("#_debj_dkqx").html(a),
	$("#_debj_syhk").html(fmoney(j.syhk + k.syhk, 2)),
	$("#_debj_mydj").html(fmoney(j.mydj + k.mydj, 2)),
	$("#_debj_zflx").html(fmoney(j.zlx + k.zlx, 2)),
	$("#_debj_hkze").html(fmoney(j.hkze + k.hkze, 2)),
	!0
}
 
function fmoney(a, b) {
	b = b > 0 && b <= 20 ? b: 2,
	a = parseFloat((a + "").replace(/[^\d\.-]/g, "")).toFixed(b) + "";
	var c = a.split(".")[0].split("").reverse(),
	d = a.split(".")[1];
	t = "";
	for (i = 0; i < c.length; i++) t += c[i] + ((i + 1) % 3 == 0 && i + 1 != c.length ? ",": "");
	return t.split("").reverse().join("") + "." + d
}
 
/**
 * 下拉框,替代select
 * 
 * @param {[string]} containerId  外层divID, 用于存放combox
 * @param * {[string]} textDivId    
 * @param * {[type]} listDiv      
 * @param {[type]} inputName    生成的input标签的name属性
 * @param {[type]} option       选项数组,每个元素为{text:'xx',value:'xxx' }
 * @param {[type]} defaultValue 默认值
 * @param {[type]} width        宽度
 * @param {[type]} height       高度
 * @param {[object]} options    可选参数
 *   options.onchange       change回调函数, 传入当前值
 *   options.oninit         初始化回调函数, 传入默认值
 *   options.textDivId      显示当前选项的div id
 *   options.listDivId      列表div id
 */
function Combox(containerId, inputName, data, defaultValue, width, height, options){
  var me = this;
  me.divId_ = containerId;
  me.options = options || {};
  me.option_ = data;
  me.textDiv_ = me.options.textDivId || 't' + (+new Date);
  me.listDiv_ = me.options.listDivId || 'l' + (+new Date);
  me.inputName_ = inputName;
  me.currentValue_ = defaultValue;
  me.width_ = width;
  me.height_ = height;
  me.div_ = $('#' + containerId);
  me.disible_ = null;
  me.nodes_ = [];
  //外层元素不存在
  if(! me.div_[0]){
    return;
  }
  me.initialize();
}
 
Combox.prototype.initialize = function(){
  var lDiv,
    me = this,
    tDiv = me.text_ = $('<div></div>')
      .addClass('yt-text')
      .attr('id',me.textDiv_)
      .height(me.height_ - 2)
      .css('lineHeight', (me.height_ - 2) + 'px' )
      .width(me.width_)
      .click(function(evt){
        evt.stopPropagation();
        lDiv.toggle()
          .children().removeClass('list-div-hover');
        lDiv.find('[ivalue="'+me.currentValue_+'"]').addClass('list-div-hover');
      });
  //设置显示文本
  $.each(me.option_, function(idx, val){
    if(val.value == me.currentValue_){
      tDiv.html(val.text);
    }
  });
  tDiv.appendTo(this.div_);
  /*
  var img = me.img_ = $('<img />')
    .attr('src', '/static/img/v2/searchbox_select.png')
    .addClass('sb_select_img');
  img.appendTo(tDiv);
   */
 
  lDiv = $('<div></div>')
    .attr('panes', 'layer')
    .attr('id', me.listDiv_)
    .addClass('yt-list')
    .css('top', me.height_ - 1)
    .css('left', 0)
    .width(me.width_ + 8)
    .hide();
  lDiv.appendTo(me.div_);
 
  $.each(me.option_, function(idx, val){
    var nodeDiv = $('<div></div>')
      .attr('ivalue', val.value)
      .width(me.width_ - 12)
      .height(25)
      .css('lineHeight', 25 + 'px')
      .css('cursor','pointer')
      .html(val.text)
      .hover(function(){
        $(this).toggleClass('item-on-hover');
      })
      .click(function(evt){
        //evt.stopPropagation();
        lDiv.hide();
        tDiv.html($(this).html());
        //tDiv.append(me.img_);
        var oldValue = me.currentValue_;
        me.inp_.val(me.currentValue_ = $(this).attr('ivalue'));
        /*
        if(me.setHighLight){
          me.setHighLight(me.currentValue_);
        }
        */
        if (me.options.onchange && (oldValue != me.currentValue_)) {
          me.options.onchange(me.currentValue_, oldValue);
        };
      })
      ;
    if(me.currentValue_ == val.value){
      nodeDiv.addClass('list-div-hover');
    }
	if(me.options.dataTrack){
		nodeDiv.attr('data-track',me.options.dataTrack+'|'+val.value);
	}
    nodeDiv.appendTo(lDiv);
    me.nodes_.push(nodeDiv);
  });
  var inp = me.inp_ = $('<input type="hidden" name="' + this.inputName_ +'"/>')
    .attr('id','_combox_inp_'+me.divId_)
    .val(me.currentValue_);
  inp.appendTo(me.div_);
  if(me.options.oninit){
    me.options.oninit(me.currentValue_);
  }
};
 
Combox.prototype.setValue = function(value){
  var me = this;
  $.each(me.nodes_, function(idx, val){
    if(val.attr('ivalue') == value){
      me.text_.html(val.html());
      //me.text_.append(me.img_);
      //me.inp_.val(value);
 
      var oldValue = me.currentValue_;
      me.inp_.val(me.currentValue_ = value);
      if (me.options.onchange && (oldValue != me.currentValue_)) {
        me.options.onchange(me.currentValue_, oldValue);
      };
    }
  });
}
 
function zhlv() {
    var a = parseFloat($("#dklv_1").val());
    if (!a) return ! 1;
    if ($("input[name=dklv_type]").val() == 1) {
        var b = a * 12;
        $("#dklv_1").val(parseFloat(b).toFixed(2) + "%")
    } else {
        var b = a / 12;
        $("#dklv_1").val(parseFloat(b).toFixed(4) + "%")
    }
}
function cal_sf() {
    $("input[name=sy_type]").length > 0 ? $("input[name=sy_gfxz]:checked").val() == 1 ? parseFloat($("#mj_1").val()) <= 90 ? obj_sfbl_sel_1.setValue(2) : obj_sfbl_sel_1.setValue(3) : obj_sfbl_sel_1.setValue(6) : $("input[name=gfxz]:checked").val() == 1 ? parseFloat($("#mj").val()) <= 90 ? obj_sfbl_sel_2.setValue(2) : obj_sfbl_sel_2.setValue(3) : obj_sfbl_sel_2.setValue(6)
}
function cal_sy_lv(a, b) {
    var c = [5.6, 6.0, 6.15, 6.4, 6.55];
    a <= 6 ? lv = c[0] : a > 6 && a <= 12 ? lv = c[1] : a > 12 && a <= 36 ? lv = c[2] : a > 36 && a <= 60 ? lv = c[3] : lv = c[4];
    var d = (lv * b).toFixed(2);
    return d
}
function cal_gjj_lv(a) {
    var b = [4.0, 4.5],
    c = 0;
    return a <= 60 ? c = b[0] : c = b[1],
    $("input[name=gjj_type]:checked").val() == 2 && $("input[name=gfxz]:checked").val() == 2 && (c = parseFloat(c) * 1.1),
    c
}
function cal_lv(a) {
}
function cal_zh() {
    var a = $("input[name=dkqx_3]").val(),
    b = parseFloat($("#dkje_3_1").val()),
    c = parseFloat($("#dklv_3_1").val()),
    d = parseFloat($("#dkje_3_2").val()),
    e = parseFloat($("#dklv_3_2").val());
    if (!b || isNaN(b) || b > 1e7) return alert("请输入正确的公积金贷款金额");
    if (!c || isNaN(c) || c > 100) return alert("请输入正确的公积金贷款利率");
    if (!d || isNaN(d) || d > 1e7) return alert("请输入正确的商业贷款金额");
    if (!e || isNaN(e) || e > 100) return alert("请输入正确的商业贷款利率");
    var f = 1,
    g = 1,
    h = debx(b, c, a, f, g),
    i = debx(d, e, a, f, g);
    $("#_debx_dkje").html(fmoney(b + d, 2)),
    $("#_debx_dkqx").html(a),
    $("#_debx_myhk").html(fmoney(h.yhk + i.yhk, 2)),
    $("#_debx_zflx").html(fmoney(h.zlx + i.zlx, 2)),
    $("#_debx_hkze").html(fmoney(h.hkze + i.hkze, 2));
    var j = debj(b, c, a, f, g),
    k = debj(d, e, a, f, g);
    return $("#_debj_dkje").html(fmoney(b + d, 2)),
    $("#_debj_dkqx").html(a),
    $("#_debj_syhk").html(fmoney(j.syhk + k.syhk, 2)),
    $("#_debj_mydj").html(fmoney(j.mydj + k.mydj, 2)),
    $("#_debj_zflx").html(fmoney(j.zlx + k.zlx, 2)),
    $("#_debj_hkze").html(fmoney(j.hkze + k.hkze, 2)),
    !0
}
function gocal(a) {
    if (a == 3) return cal_zh();
    if (a == 2 && $("input[name=gjj_type]:checked").val() == 2) {
        var b = parseFloat($("#pmdj").val()),
        c = parseFloat($("#mj").val());
        if (!b || isNaN(b) || b > 2e5) return alert("请输入房屋平米单价");
        if (!c || isNaN(c) || c > 500) return alert("请输入正确的房屋面积");
        var d = b * c,
        e = d * (1 - parseInt($("input[name=sfbl_2]").val()) * .1)
    }
    if (a == 1 && $("input[name=sy_type]").length > 0 && $("input[name=sy_type]:checked").val() == 2) {
        var b = parseFloat($("#pmdj_1").val()),
        c = parseFloat($("#mj_1").val());
        if (!b || isNaN(b) || b > 2e5) return alert("请输入房屋平米单价");
        if (!c || isNaN(c) || c > 500) return alert("请输入正确的房屋面积");
        var d = b * c,
        e = d * (1 - parseInt(3) * .1)
    } else var e = parseFloat($("#dkje_" + a).val());
    var f = parseFloat($("#dklv_" + a).val()),
    g = $("#dkqx_sel_1").val();
    if (!e || isNaN(e) || e > 1e8) return alert("请输入正确的贷款金额");
    if (!f || isNaN(f) || f > 100) return alert("请输入正确的贷款利率");
    var h = 1;
    a == 1 && $("input[name=dklv_type]").val() == 2 && (h = 2);
    var i = 0,
    j = debx(e, f, g, h, i);
    $("#_debx_dkje").val(fmoney(e, 2)),
    $("#_debx_dkqx").val(g),
    $("#_debx_myhk").val(fmoney(j.yhk, 2)),
    $("#_debx_zflx").val(fmoney(j.zlx, 2)),
    $("#_debx_hkze").val(fmoney(j.hkze, 2));
    var k = debj(e, f, g, h, i);
	return $("#_debj_dkje").val(fmoney(e, 2)),
	$("#_debj_dkqx").val(g),
	$("#_debj_syhk").val(fmoney(k.syhk, 2)),
	$("#_debj_mydj").val(fmoney(k.mydj, 2)),
	$("#_debj_zflx").val(fmoney(k.zlx, 2)),
	$("#_debj_hkze").val(fmoney(k.hkze, 2)),
	!0
}
function fmoney(a, b) {
    b = b > 0 && b <= 20 ? b: 2,
    a = parseFloat((a + "").replace(/[^\d\.-]/g, "")).toFixed(b) + "";
    var c = a.split(".")[0].split("").reverse(),
    d = a.split(".")[1];
    t = "";
    for (i = 0; i < c.length; i++) t += c[i] + ((i + 1) % 3 == 0 && i + 1 != c.length ? ",": "");
    return t.split("").reverse().join("") + "." + d
}
$(document).ready(function() {
    reset_height(1),
    $(".menu ul li").each(function() {
        $(this).click(function() {
            $(".menu ul li").each(function() {
                $(this).removeClass("here")
            }),
            $(this).addClass("here");
            for (i = 1; i <= 3; i++) i == $(this).attr("lid") ? $(".div" + i).show() : $(".div" + i).hide();
            cal_lv($(this).attr("lid")),
            reset_height($(this).attr("lid")),
            clear_result()
        })
    });
    var a = [{
        value: 1,
        text: "年利率"
    },
    {
        value: 2,
        text: "月利率"
    }];
    obj_dklv_type = new Combox("dklv_type", "dklv_type", a, 1, 55, 29, {
        listDivId: "dklv_type_list",
        onchange: function() {
            zhlv()
        }
    });
    var b = [{
        value: 6,
        text: "6个月"
    },
    {
        value: 12,
        text: "1年"
    },
    {
        value: 24,
        text: "2年"
    },
    {
        value: 36,
        text: "3年"
    },
    {
        value: 48,
        text: "4年"
    },
    {
        value: 60,
        text: "5年"
    },
    {
        value: 120,
        text: "10年"
    },
    {
        value: 180,
        text: "15年"
    },
    {
        value: 240,
        text: "20年"
    },
    {
        value: 300,
        text: "25年"
    },
    {
        value: 360,
        text: "30年"
    }];
    obj_dkqx_sel_1 = new Combox("dkqx_sel_1", "dkqx_1", b, 240, 66, 29, {
        listDivId: "dkqx_list_1",
        onchange: function() {
            cal_lv(1)
        }
    }),
    obj_dkqx_sel_2 = new Combox("dkqx_sel_2", "dkqx_2", b, 240, 66, 29, {
        listDivId: "dkqx_list_2",
        onchange: function() {
            cal_lv(2)
        }
    }),
    obj_dkqx_sel_3 = new Combox("dkqx_sel_3", "dkqx_3", b, 240, 66, 29, {
        listDivId: "dkqx_list_3",
        onchange: function() {
            cal_lv(3)
        }
    });
    var c = [{
        value: .7,
        text: "最新基准利率7折"
    },
    {
        value: .8,
        text: "最新基准利率8折"
    },
    {
        'value': 0.85,
        'text': '最新基准利率8.5折'
    },
    {
        value: .9,
        text: "最新基准利率9折"
    },
    {
        value: 1,
        text: "最新基准利率"
    },
    {
        value: 1.1,
        text: "最新基准利率1.1倍"
    },
    {
        value: 1.2,
        text: "最新基准利率1.2倍"
    },
    {
        value: 1.3,
        text: "最新基准利率1.3倍"
    }];
    obj_dklv_sel_1 = new Combox("dklv_sel_1", "lvbs_1", c, 1, 120, 29, {
        listDivId: "dklv_list_1",
        onchange: function() {
            cal_lv(1)
        }
    }),
    obj_dklv_sel_3 = new Combox("dklv_sel_3", "lvbs_3", c, 1, 120, 29, {
        listDivId: "dklv_list_3",
        onchange: function() {
            cal_lv(3)
        }
    });
    var d = [{
        value: 2,
        text: "2成"
    },
    {
        value: 3,
        text: "3成"
    },
    {
        value: 4,
        text: "4成"
    },
    {
        value: 5,
        text: "5成"
    },
    {
        value: 6,
        text: "6成"
    },
    {
        value: 7,
        text: "7成"
    },
    {
        value: 8,
        text: "8成"
    },
    {
        value: 9,
        text: "9成"
    }];
    obj_sfbl_sel_2 = new Combox("sfbl_sel_2", "sfbl_2", d, 3, 66, 29, {
        listDivId: "sfbl_list_2"
    }),
    $("input[name=sy_type]").length > 0 && (obj_sfbl_sel_1 = new Combox("sfbl_sel_1", "sfbl_1", d, 3, 66, 29, {
        listDivId: "sfbl_list_1"
    })),
    cal_lv(1),
    $(".cal-btn").each(function() {
        $(this).click(function() {
            var a = $(this).attr("did");
            gocal(a) && reset_height(a)
        })
    }),
    $("input[name=gjj_type]").change(function() {
        var a = $(this).val();
        $(".div2_" + 2 / parseInt(a)).each(function() {
            $(this).hide()
        }),
        $(".div2_" + a).each(function() {
            $(this).show()
        }),
        reset_height(2),
        clear_result()
    }),
    $("input[name=sy_type]").length > 0 && ($("input[name=sy_type]").change(function() {
        var a = $(this).val();
        $(".div1_" + 2 / parseInt(a)).each(function() {
            $(this).hide()
        }),
        $(".div1_" + a).each(function() {
            $(this).show()
        }),
        reset_height(1),
        clear_result()
    }), $("input[name=sy_gfxz]").change(function() {
        cal_sf(),
        cal_lv(1)
    })),
    $("input[name=gfxz]").change(function() {
        cal_sf(),
        cal_lv(2)
    }),
    $("#mj").change(function() {
        cal_sf(),
        cal_lv(2)
    }),
    $(".help").each(function() {
        $(this).click(function(a) {
            a.stopPropagation(),
            $("#" + $(this).attr("id") + "_help").toggle()
        })
    }),
    $(".close").each(function() {
        $(this).click(function() {
            $(this).parent().hide()
        })
    }),
    $(document).click(function() {
        $(".tsk").each(function() {
            $(this).hide()
        }),
        $(".yt-list").each(function() {
            $(this).hide()
        })
    })
})