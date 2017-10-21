/**
	@class calc
	@description 计算五险一金的类;
	@require assurance mod
*/
var Calc = (function($){
	var Calc = function(region,amount){
			this.region = region;
			this.amount = amount;
			this.cache = {};
			this.total = {
				base_amount:0,
				base_accumul_amount:0,
				individual:0,
				company:0
			};
			this.total_items = {};
			this.base = assurance["hot"][this.region] || assurance["other"][this.region];
	};
	Calc.prototype = {
		/**
			@description 计算缴纳的总数
			@param {String} region 地区;
			@param {String} type 计算的类型;
		*/
		calc:function(type,opt){
			var opt = opt || {};
			this._reset(opt);
			var self = this;
			//计算个人和公司缴纳的总金额;
			if(typeof type == "undefined"){
				$.each(this.base,function(key,obj){
					if(key !== "name"){
						self.calc_item(key,opt);
						var total_obj = self.total_items[key];
						self.total.individual += total_obj.individual;
						self.total.company += total_obj.company;
					}
				});
				this.total.individual = this._format(this.total.individual,2);
				this.total.company = this._format(this.total.company,2);
			}else{
				this.calc_item(type,opt);
			};
		},
		/**
			@description 计算某一项缴纳的总数
			@param {String} type 计算的类型;
			@param {Object} opt 缴纳的百分比;			
		*/
		calc_item:function(type,opt){
			var item = this.base[type];
			var base_amount = this._format(this.amount >= item.max ? item.max : this.amount <= item.min ? item.min : this.amount,2);
			this.total_items[type] = {
				individual:this._format(base_amount * ((typeof opt.individual !== "undefined") ? opt.individual : item.individual),2),
				company	  :this._format(base_amount * ((typeof opt.company !== "undefined") ? opt.company : item.company),2)
			}
		},
		/**
			@description 更新某一项缴纳的总数
			@param {String} type 计算的类型;
			@param {Object} opt 缴纳的百分比;			
		*/
		update_item:function(type,opt,param){
			var opt = opt || {},
				param = param || {};
			this._reset(opt);
			var item = this.base[type],
				old_item = this.total_items[type];
			this.calc_item(type,param);
			var new_item = this.total_items[type];
			this.total.individual -= old_item.individual;
			this.total.company -= old_item.company;
			this.total.individual += new_item.individual;
			this.total.company += new_item.company;
			this.total.individual = this._format(this.total.individual,2);
			this.total.company = this._format(this.total.company,2);
		},
		_reset:function(opt){
			this.amount = opt.amount || this.amount;
			this.region = opt.region || this.region;
			this.base = assurance["hot"][this.region] || assurance["other"][this.region];
			var opt = opt || {},
				endowment_base = this.base['endowment'],
				accumulation_base = this.base['accumulation'];
			this.total.base_amount = this.amount >= endowment_base.max ? endowment_base.max : this.amount <= endowment_base.min ? endowment_base.min : this.amount;
			this.total.base_accumul_amount = this.amount >= accumulation_base.max ? accumulation_base.max : this.amount <= accumulation_base.min ? accumulation_base.min : this.amount;
		},
		/**
			@description 重置	
		*/
		reset:function(){
			this.total = {
				base_amount:0,
				base_accumul_amount:0,
				individual:0,
				company:0
			};
			this.total_items = {};
		},
		_format:function(val,decimal){
			var amt = parseFloat( val );
			return ( isNaN( amt ) )  ? "--" :  ( decimal === undefined ? amt * 1 : amt.toFixed( decimal )* 1 );
		},
		/**
			@description 更新所有的缴纳项
		*/
		update:function(opt){
			this.region = opt.region || this.region;
			this.amount = opt.amount || this.amount;
			this._reset(opt);
			this.reset();
			this.calc();
		},
		/**
			@description 获取计算的结果
		*/
		get:function(){
			var cache = this.cache[this.region + "-" + this.amount];
			return cache || (this.cache[this.region + "-" + this.amount] = {total:this.total,total_items:this.total_items,base:this.base});
		}
	};
	return Calc;
})(jQuery)