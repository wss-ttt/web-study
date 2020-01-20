var reg_info_file = document.getElementById("reg_info_file");
reg_info_file.onchange = function() {
	if(window.FileReader) {
		var file = reg_info_file.files[0];
		if(/(image\/jpeg)|(image\/png)/.test(file.type)) {
			$("#reg_info_file_text").hide();
		} else {
			$("#reg_info_file_text").html('支持图片格式JPG/PNG').show();
			return false;
		};
		if(file.size < 2 * 1024 * 1024) {
			$("#reg_info_file_text").hide();
		} else {
			$("#reg_info_file_text").html('图片大小不超过2M').show();
			return false;
		};
		var fr = new FileReader();
		fr.readAsDataURL(file);
		$("#reg_info_file_base64").removeAttr("width");
		$("#reg_info_file_base64").removeAttr("height");
		fr.onloadend = function(e) {
			$("#reg_info_file_w").hide();
			$("#reg_info_file_base64").show();
			$("#reg_info_file_base64").attr("src", e.target.result);
			$("#reg_info_file_base64")[0].onload = function() {
				var upimgw = $("#reg_info_file_base64").width();
				var upimgh = $("#reg_info_file_base64").height();
				$("#reg_info_file_base64").attr("width", imgPercentScale(165, 98, upimgw, upimgh).w);
				$("#reg_info_file_base64").attr("height", imgPercentScale(165, 98, upimgw, upimgh).h);
			};
		};
	} else {
		$("#reg_info_file_w").hide();
		$("#reg_info_file_base64").show();
		var sFilter = 'filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale,src="';
		reg_info_file.select();
		reg_info_file.blur();
		var src = document.selection.createRange().text;
		$("#reg_info_file_base64")[0].src = src;
		$("#reg_info_file_base64")[0].onload = function() {
			var upimgw = $("#reg_info_file_base64").width();
			var upimgh = $("#reg_info_file_base64").height();
			$("#reg_info_file_base64").attr("width", imgPercentScale(165, 98, upimgw, upimgh).w);
			$("#reg_info_file_base64").attr("height", imgPercentScale(165, 98, upimgw, upimgh).h);
		};
		alert("名片上传不被浏览器支持，请更换浏览器打开网站");
	};
};

function imgPercentScale(boxw, boxh, imgw, imgh) {
	var res = {};
	var wper = imgw / boxw;
	var hper = imgh / boxh;
	if(wper <= 1 && hper < 1) {
		res.w = imgw;
		res.h = imgh;
		return res;
	};
	if(wper > 1 && hper < 1) {
		res.w = boxw;
		var rhper = boxw / imgw;
		res.h = imgh * rhper;
		return res;
	};
	if(wper <= 1 && hper > 1) {
		res.h = boxh;
		var rwper = boxh / imgh;
		res.w = imgw * rwper;
		return res;
	};
	if(wper > 1 && hper > 1) {
		if(wper >= hper) {
			res.w = boxw;
			var rhper = boxw / imgw;
			res.h = imgh * rhper;
			return res;
		} else {
			res.h = boxh;
			var rwper = boxh / imgh;
			res.w = imgw * rwper;
			return res;
		};
	};
};