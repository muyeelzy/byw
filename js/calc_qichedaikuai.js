function changeBD(value)
{
	if (value == 1)
	{
		$('#debj').css('display','none');
		$('#debx').css('display','inline');
	}
	else
	{
		$('#debx').css('display','none');
		$('#debj').css('display','inline');
	}
}
function GetLoanRate()
{
	var GetLoanRateUrl = '/calc/getLoanRate';
	if (document.calcform.year.value != '')
	{
		var pars = '&year='+$F('year');
	}
	else
	{
		return;	
	}
	var myAjax = new Ajax.Request( GetLoanRateUrl, { method: 'get', parameters: pars,  onComplete: setLoanRate }); 
}
function houseLoanCalc(flag)
{
	var average_monthly;
	var pay_int;
	var repay_total;
	var int_expenditure;
	var average_monthly;
	var repay_total_2;
	var details = 1;
	var g;
	
	if(!CheckElem($('#year'), "\u8d37\u6b3e\u5e74\u9650")) return false;
	if(!IsIntYear($('#year'), '', "\u8d37\u6b3e\u5e74\u9650")) return false;
		
	if(!CheckElem($('#amount'), "\u5546\u4e1a\u8d37\u6b3e\u91d1\u989d")) return false;
		if(!IsIntAmount(document.calcform.amount.value*10000, '1', "\u5546\u4e1a\u8d37\u6b3e\u91d1\u989d")) return false;
		if(!CheckElem($('#com_rate'), "\u5546\u4e1a\u8d37\u6b3e\u5229\u7387")) return false;
		if(!IsIntAmount($('#com_rate'), '3', "\u5546\u4e1a\u8d37\u6b3e\u5229\u7387")) return false;
		g	=	parseFloat(document.calcform.com_rate.value)/100;	//dai van li lv
	
	
	var c	=	document.calcform.ways.value;		//huan kuan fang shi
	var d	=	parseFloat(document.calcform.year.value);		//dai kuan qi xian
	var e	=	d*12;				//dai kuan zong yue shu
	var f	=	parseFloat(document.calcform.amount.value)*10000;	//dai kuan jin e
	
	if (c == 1)//deng e ben xi
	{
		
		//yue jun huan kuan g*f/12+g*f/(Math.pow((1+g), e)-1);
		monthly_repayment = g*f/12+(g*f/12)/(Math.pow((1+g/12), e)-1);
		//zhi fu li xi 
		pay_int = monthly_repayment*e - f;
		//huan kuan zong e
		repay_total = monthly_repayment*e;
		
		if(flag)
		{
			var template = "\u6708\u5747\u8fd8\u6b3e\uff1a"+monthly_repayment.toFixed(2)+'\n';
			template += "\u652f\u4ed8\u5229\u606f\uff1a"+pay_int.toFixed(2)+'\n';
			template += "\u8fd8\u6b3e\u603b\u989d\uff1a"+repay_total.toFixed(2)+'\n';
			alert(template);
		}
		else
		{
			var result = CalcByIntrest(f, e, g, 2);
		}
	}
	else
	{
		var x = 0;
		var sum = 0;
		template='<table class="second_list_table second_list_position"><tr><td colspan="5" class="text_center">\u8fd8\u6b3e\u660e\u7ec6</td></tr><tr><th>'+'\u671f\u6b21'+'</th><th>'+'\u507f\u8fd8\u5229\u606f'+'</th><th>'+'\u507f\u8fd8\u672c\u91d1'+'</th><th>'+'\u5f53\u671f\u6708\u4f9b'+'</th><th>'+'\u5269\u4f59\u672c\u91d1'+'</th></tr>';
		for (i=1; i<=e; i++)
		{
			p = (f-x)*g/12;				//chang huan li xi
			sum += (f-x)*g/12;	//li xi zhi chu
			y = f/e + (f-x)*g/12; 		//dang qi yue gong
			q = y -p;					//chang huan ben jin
			x += f/e;
			z = f-x;						//sheng yu ben jin
			template += '<tr><td class="text_center th_sml">'+i+'\u671f'+'</td><td class="text_center">'+p.toFixed(2)+'\u5143'+'</td><td class="text_center">'+q.toFixed(2)+'\u5143'+'</td><td class="text_center">'+y.toFixed(2)+'\u5143'+'</td><td class="text_center">'+z.toFixed(2)+'\u5143'+'</td></tr>'
		}
		template+='</table>';
		$('#info').innerHTML = template;
		
		int_expenditure = sum;
		repay_total_2 = f+ int_expenditure;
		
		if(flag)
		{
			var template = "\u5229\u606f\u652f\u51fa\uff1a"+int_expenditure.toFixed(2)+'\n';
			template += "\u8fd8\u6b3e\u603b\u989d\uff1a"+repay_total_2.toFixed(2)+'\n';
			alert(template);
		}
		else
		{
			document.calcform.int_expenditure.value = int_expenditure.toFixed(2);
			document.calcform.repay_total_2.value = repay_total_2.toFixed(2);
		}
	}
	if(details == 1)
	{
		if(c ==1)
		{
			$('#info')[0].innerHTML = result.template;
		}
		else
		{
			$('#info')[0].innerHTML = template;
		}
		$('#info').css('display','inline');
	}
	else
	{
		$('#info').innerHTML = '';
		
		$('#info').css('display','none');
	}
}