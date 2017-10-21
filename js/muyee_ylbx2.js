var view = (function($){
		/**
			* @fileOverview isNumber plugin,用来强制input输入数字
			* @author <a href="www.denisdeng.com">xingben1@staff.sina.com.cn</a>
			* @requires jquery.js
			* @version 0.1 
		*/
		$.fn.isNumber = function(options){
			var defaults = {
				reg:/\d+(\.\d{0,2})?/ //默认为两位小数
			};
			if (options){
				defaults = $.extend(defaults,options);
			};
			return this.each(function(){
				if($(this).is("input")){
					$(this).keyup(function (e){
						var code = e.keyCode;
						if(code !== 37 && code !== 39){
							var val = $.trim(this.value + "" );
							var matches = defaults.reg.exec(val);
							if(matches && matches[0] != undefined){
								this.value = matches[0];
							}else{
								this.value = "";
							}
						};
					});
				};
			})
		};
		var config = {
				clses:{
					btn_close:"btn-close",
					focus:'focus',
					output:['base-amount','base-accumul-amount','base-amount-min','base-amount-max','base-accumul-amount-min','base-accumul-amount-max','individual','company']
				},
				ids:{
					btn_show_region:'#btn-show-region',
					hot_city_list:"#hot-city-list",
					other_city_list:"#other-city-list",
					btn_calc:'#btn-calc',
					btn_recalc:'#btn-recalc',
					amount:"#amount",
					box_calc_wrap:"#box-calc-wrap",
					individual:"#individual",
					company:"#company"
				},
				city:{
					container:'<div id="box-city-popup-wrap"><a href="javascript:void(0);" class="btn-close" title="关闭"><i style="visibility:hidden;">X</i></a> <div id="box-hot-wrap"><h3>热门城市</h3><div class="box-city-list"><ul id="hot-city-list"></ul></div></div><div id="box-other-wrap"><h3>其他城市</h3><div class="box-city-list"><ul id="other-city-list"></ul></div></div></div>',
					tmpl:'<li data-region="<%=simply_name%>"><a href="javascript:void(0);"><%=name%></a></li>'
				},
				txt:{
					region:"请选择地区"
				}
		};
		var tool = {
				queryString: function() {
					var urlParams = {},e,
						a = /\+/g, // Regex for replacing addition symbol with a space
						r = /([^&=]+)=?([^&]*)/g,
						d = function (s) { return decodeURIComponent(s.replace(a, " ")); },
						q = window.location.search.substring(1);
					while ( (e = r.exec(q)) ) {
						urlParams[d(e[1])] = d(e[2]);
					};
					return urlParams;
				},
				tmpl:(function(){
					var cache = {};
					var tmpl = function tmpl(str, data){
					var fn = !/\W/.test(str) ?
					  cache[str] = cache[str] || tmpl(str) :
					  new Function("obj",
						"var p=[],print=function(){p.push.apply(p,arguments);};" +
						"with(obj){p.push('" +
						str
						  .replace(/[\r\t\n]/g, " ")
						  .split("<%").join("\t")
						  .replace(/((^|%>)[^\t]*)'/g, "$1\r")
						  .replace(/\t=(.*?)%>/g, "',$1,'")
						  .split("\t").join("');")
						  .split("%>").join("p.push('")
						  .split("\r").join("\\'")
					  + "');}return p.join('');");
					return data ? fn( data ) : fn;
					};
					return tmpl;
				})()
		}
		var view = {
				cache:{},
				citys:{},
				delegate:function(){
					var ids = config.ids,
						clses = config.clses;
					//强制输入数字;
					$(ids.amount).isNumber();
					//显示地区列表;
					$(ids.btn_show_region).bind("click.onShowRegion",function(e){
						var self = $(this);
						if(!view.region_popup){
							var container = $(config.city.container),
								hot_city = container.find(ids.hot_city_list),
								other_city = container.find(ids.other_city_list),
								btn_close = container.find("." + clses.btn_close);
							$.each(assurance.hot,function(key,obj){
								var html = tool.tmpl(config.city.tmpl,{simply_name:key,name:obj.name});
								hot_city.append(html);
							});
							$.each(assurance.other,function(key,obj){
								var html = tool.tmpl(config.city.tmpl,{simply_name:key,name:obj.name});
								other_city.append(html);
							});
							view.region_popup = container;
							view.region_popup.appendTo($("body")).hide();
							container.delegate("li","click.onSetValue",function(e){
								if(self.timer_blur){
									clearTimeout(timer_blur);
								};
								var name = $(this).text(),
									simply = $(this).attr("data-region");
								self.val(name).attr("data-region",simply);
								view.region_popup.hide();
							});
							btn_close.bind("click.onHide",function(e){
								view.region_popup.hide();
								e.preventDefault();
							});
						};
						var offset = $(this).offset();
						view.region_popup.css({"left":offset.left,"top":offset.top + $(this).outerHeight()}).show();
					}).bind("focus",function(){
						var val = $.trim($(this).val());
						if(val == config.txt.region){
							$(this).val('').addClass(clses.focus);
						}
					}).bind("blur",function(){
						var self = $(this);
						if(self.timer_blur){
							clearTimeout(self.timer_blur);
						};
						var timer_blur = setTimeout(function(){
							var val = $.trim(self.val());
							if(val == ''){
								self.val(config.txt.region).removeClass(clses.focus);
							}
						},100);
					});
					//计算;
					$(ids.btn_calc).bind("click.onCalc",function(e){
						var amount = $.trim($(ids.amount).val()) * 1,
							region = $(ids.btn_show_region).attr("data-region"),
							type = $(this).attr("data-type");
						if(amount > 0 && typeof region !== "undefined" && region !== config.txt.region){
							if(!view.current_calc_val !== (region + "-" + amount)){
								if(!view.calc){
									view.calc = new Calc(region,amount);
									if(typeof type == "undefined"){
										view.calc.calc();
										view.display(view.calc.get());
									}else{
										view.calc.calc(type);
										view.display(view.calc.get(),type);
									}
								}else{
									console.log(type);
									if(typeof type == "undefined"){
										view.calc.calc();
										view.calc.update({
											region:region,
											amount:amount
										});
										view.display(view.calc.get());
									}else{
										view.calc.update_item(type,{
											region:region,
											amount:amount
										});
										view.display(view.calc.get(),type);
									}
								};
								view.current_calc_val = region + "-" + amount;
							};
						};
						e.preventDefault();
					});
					//重新计算；
					$(ids.btn_recalc).bind("click.onReCalc",function(e){
						$(ids.amount).val("");
						$(ids.btn_show_region).removeAttr("data-region").val(config.txt.region).trigger("blur");
						if(view.cache){
							var _empty = function(obj){
								obj[obj.attr("tagName").toLowerCase() == "input" ? "val" : "text"]('');
							};
							$.each(view.cache,function(key,obj){
								if(key !== "items"){
									_empty(obj);
								}else{
									$.each(obj,function(iter,subobj){
										_empty(subobj);
									});
								}
							});
						}
					});
				},
				display:function(obj,type){
					var ids = config.ids,
						clses = config.clses,
						endowment = obj.base.endowment;
						accumulation = obj.base.accumulation,
						base_obj = {
								"base-amount":obj.total.base_amount,
								"base-accumul-amount":obj.total.base_accumul_amount,
								"base-amount-min":endowment.min,
								"base-amount-max":endowment.max,
								"base-accumul-amount-min":accumulation.min,
								"base-accumul-amount-max":accumulation.max,
								'individual':(typeof type !== "undefined") ? obj.total_items[type].individual : obj.total.individual,
								'company':(typeof type !== "undefined") ? obj.total_items[type].company : obj.total.company
						};
					if(!view.cache["base_amount"]){
						var box_output = $(ids.box_calc_wrap);
						$.each(clses.output,function(key,cls){
							view.cache[cls] = box_output.find("." + cls);
						});
						if(!view.type){
							//单个缴费总数;
							var items = view.cache.items = {};
							$.each(obj.total_items,function(key,item){
								$.each(item,function(iter,val){
									items[iter + "-" + key] = $("#" + iter).find("." + key);
									items[iter + "-" + key + "-total"] = $("#" + iter).find("." + key + "-total");
								})
							});
						};
					};
					//显示计算的基本数据;
					$.each(base_obj,function(key,val){
						var current_obj = view.cache[key];
						current_obj[current_obj.attr("tagName").toLowerCase() == "input" ? "val" : "text"](val.toFixed(2));
					});
					if(!view.type){
						var items = view.cache.items,
							base = obj.base;
						$.each(obj.total_items,function(key,item){
							$.each(item,function(iter,val){
								var current_key = iter + "-" + key;
								items[current_key].val((base[key][iter] * 100).toFixed(2));
								items[current_key + "-total"].text(val.toFixed(2));
							});
						});
					};
				},
				init:function(type){
					view.type = type;
					view.delegate();
					if(typeof type == "undefined"){					
						$.each(assurance.hot,function(key,obj){
							view.citys["'" + obj.name + "'"] = key;
						});
						$.each(assurance.other,function(key,obj){
							view.citys["'" + obj.name + "'"] = key;
						});
						var param = tool.queryString();
						if(param && param.city && param.amount){
							var region = view.citys["'" + param.city + "'"],
								ids = config.ids;
							$(ids.btn_show_region).val(param.city).attr("data-region",region);
							$(ids.amount).val(param.amount);
							//计算器初始化;
							if(!view.calc){
								view.calc = new Calc(region,param.amount * 1);
								view.calc.calc();
								view.display(view.calc.get());
							};
						};
					};
				}
		};
	return view;
})(jQuery);