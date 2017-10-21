/*个人申请、主页轮播图表单提交*/

     $('#regis').on('click', function() {

    $('#get_muyee_sq').on('submit', function() {
        var muyee_e = $('input[name=muyee_e]').val(),
        muyee_x = $('input[name=muyee_x]').val(),
        raido=$('input[name=radio]').val(),
        mobile = $('input[name=mobile]').val(),
         yz = $('input[name=yz]').val(),
         codelast = $('input[name=codelast]').val();
        
   

        $(this).ajaxSubmit({
            type: 'post', // 提交方式 get/post
            url: 'xx', // 需要提交的 url
            data: {
                'muyee_e': muyee_e,
                'muyee_x':muyee_x,
                'moblie':moblie,
                'radio':radio,
                'yz':yz,
                'codelast':codelast
            },
            success: function(data) { // data 保存提交后返回的数据，一般为 json 数据
                // 此处可对 data 作相关处理
                alert('提交成功！');
                window.href="muyee_personal_enterprise.html";
            }
          /*  $('regis').resetForm(); // 提交后重置表单*/
        });
        return false; // 阻止表单自动提交事件
    
});
});
/*贷款搜索表单提交*/

     $('#muyee_sear').on('click', function() {

    $('#get_muyee_dk').on('submit', function() {
        var muyee_memonth = $('input[name=muyee_memonth]').val(),
        issued_sub_key_d = $('#issued_sub_key_d').val(),
        issued_sub_key_e = $('#issued_sub_key_e').val();
        
        
   

        $(this).ajaxSubmit({
            type: 'post', // 提交方式 get/post
            url: 'xx', // 需要提交的 url
            data: {
                'muyee_memonth': muyee_memonth,
                'issued_sub_key_d':issued_sub_key_d,
                'issued_sub_key_e':issued_sub_key_e
               
            },
            success: function(data) { // data 保存提交后返回的数据，一般为 json 数据
                // 此处可对 data 作相关处理
                alert('提交成功！');
                window.href="muyee_medk.html";
            }
          /*  $('regis').resetForm(); // 提交后重置表单*/
        });
        return false; // 阻止表单自动提交事件
    
});
});
/*我要贷款表单提交*/

     $('.muyee_tj').on('click', function() {

    $('#get_muyee_search').on('submit', function() {
        var muyee_st = $('input[name=muyee_st]').val(),
        issued_sub_key_b = $('#issued_sub_key_b').val(),
        issued_sub_key_b = $('#issued_sub_key_c').val();
        
        
   

        $(this).ajaxSubmit({
            type: 'post', // 提交方式 get/post
            url: 'xx', // 需要提交的 url
            data: {
                'muyee_st': muyee_st,
                'issued_sub_key_b':issued_sub_key_b,
                'issued_sub_key_c':issued_sub_key_c
               
            },
            success: function(data) { // data 保存提交后返回的数据，一般为 json 数据
                // 此处可对 data 作相关处理
                alert('提交成功！');
                window.href="muyee_medk.html";
            }
          /*  $('regis').resetForm(); // 提交后重置表单*/
        });
        return false; // 阻止表单自动提交事件
    
});
});
/*主页muyee_city.html表单提交*/
     $('#regis').on('click', function() {

    $('#muyeecity').on('submit', function() {
        var muyee_x1 = $('input[name=muyee_x1]').val(),
        muyee_je1 = $('input[name=muyee_je1]').val(),
        muyee_num1 = $('inpur[name=muyee_num1]').val(),
        radio=$('input[name=radio]').val(),
         yz1 = $('input[name=yz]').val();
     
        
   

        $(this).ajaxSubmit({
            type: 'post', // 提交方式 get/post
            url: 'xx', // 需要提交的 url
            data: {
                'muyee_x1': muyee_x1,
                'muyee_je1':muyee_je1,
                'muyee_num1':muyee_num1,
                'radio':radio,
                'yz1':yz1
                
            },
            success: function(data) { // data 保存提交后返回的数据，一般为 json 数据
                // 此处可对 data 作相关处理
                alert('提交成功！');
                window.href="muyee_personal_enterprise.html";
            }
          /*  $('regis').resetForm(); // 提交后重置表单*/
        });
        return false; // 阻止表单自动提交事件
    
});
});
