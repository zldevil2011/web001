var dialogUtil = {
	eventUtil:{
		open: function(){
			var $shadow = $(".p_dialog-shadow");
			var $dialog = $(".p_dialog");
			$shadow.show();
			$dialog.show();
		},
		close:function(){
			var $shadow = $(".p_dialog-shadow");
			var $dialog = $(".p_dialog");
			$shadow.hide();
			$dialog.hide();
		}
	},
	alert:function(text, func, config){
		if(Object.prototype.toString.call(func) == '[object Function]'){
			func = {
				ok: func,
				other: function(){

				}
			}
		}
		func = func || {};
		func.ok = func.ok || function(){};
		func.other = func.other || function(){};
		config = config || {};
		config.type = 'confirm';
		this._show(text, func, config);
	},
	_show:function(text, func, config){
		config.title = config.title || '提示';
		config.okText = config.okText || '确认';
		config.cancelText = config.cancelText || '取消';
		var _html = '<div class="p_dialog-hd"></div><div class="p_dialog-bd"></div><div class="p_dialog-ft"></div>';
		var $body = $("body");
		$dialog = $(".p_dialog");
		$shadow = $(".p_dialog-shadow");
		var shadow = '<div class="p_dialog-shadow"></div>';
		if(!$shadow.length){
			$body.append(shadow);
			$shadow = $(".p_dialog-shadow");
		}
		if(!$dialog.length) {
			$body.append('<div class="p_dialog">' + _html + '</div>');
			$dialog = $(".p_dialog");
		} else {
			$dialog.html(_html);
		}
		if(config.title){
			$dialog.find(".p_dialog-hd").html(config.title);
		}else{
			$dialog.find(".p_dialog-hd").remove();
		}
		$dialog.find('.p_dialog-bd').html(text);
		$dialog.find('.p_dialog-ft').html('<span class="dialog-btn dialog-btn-ok">' + config.okText + '</span>');
		if(config.type == 'confirm') {
			$dialog.find('.p_dialog-ft').prepend('<span class="dialog-btn dialog-btn-cancel">' + config.cancelText + '</span>');
		}
		$dialog.off("click", 'dialog-btn-ok');
		$dialog.off("click", 'dialog-btn-cancel');
		$dialog.on("click", ".dialog-btn-ok", function(e){
			var flag = func.ok();
			if(flag == false){
				return false;
			}
			dialogUtil.eventUtil.close();
		});
		$dialog.on("click", ".dialog-btn-cancel", function(e){
			var flag = func.cancel();
			if(flag == false){
				return false;
			}
			dialog.eventUtil.close();
		})

		func.other();
	}
}
