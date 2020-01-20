function tbdValidate(elelist, objs) {
	var errlen = 0;
	var errlist = [];
	for(var i = 0; i < elelist.length; i++) {
		(function(eleinput, eletext, rule) {
			document.getElementById(eleinput).onblur = function() {
				var intval = this.value.replace(/(^\s*)|(\s*$)/g, "");
				for(var j = 0; j < rule.length; j++) {
					var resreg = rule[j].reg.test(intval);
					if(resreg) {
						document.getElementById(eletext).style.display = "none";
					} else {
						document.getElementById(eletext).innerHTML = rule[j].text;
						document.getElementById(eletext).style.display = "block";
						break;
					};
				};
			};
		})(elelist[i].eleinput, elelist[i].eletext, elelist[i].rule);
	};
	document.getElementById(objs.elesubmit).onclick = function() {
		errlen = 0;
		errlist = [];
		for(var i = 0; i < elelist.length; i++) {
			(function(eleinput, eletext, rule) {
				var intval = document.getElementById(eleinput).value.replace(/(^\s*)|(\s*$)/g, "");
				for(var j = 0; j < rule.length; j++) {
					var resreg = rule[j].reg.test(intval);
					if(resreg) {
						document.getElementById(eletext).style.display = "none";
					} else {
						document.getElementById(eletext).innerHTML = rule[j].text;
						document.getElementById(eletext).style.display = "block";
						errlen += 1;
						errlist.push(eleinput);
						break;
					};
				};
			})(elelist[i].eleinput, elelist[i].eletext, elelist[i].rule);
		};
		if(errlen == 0) {
			objs.funsubmit();
		} else {
			objs.funerr();
			objs.funerrlist(errlist);
		};
	};
};

function tbdnoValidate(elelist) {
	for(var i = 0; i < elelist.length; i++) {
		(function(eleinput, eletext, rule) {
			document.getElementById(eleinput).onblur = function() {
				var intval = this.value.replace(/(^\s*)|(\s*$)/g, "");
				for(var j = 0; j < rule.length; j++) {
					var resreg = rule[j].reg.test(intval);
					if(resreg) {
						document.getElementById(eletext).style.display = "none";
					} else {
						document.getElementById(eletext).innerHTML = rule[j].text;
						document.getElementById(eletext).style.display = "block";
						this.value = "";
						break;
					};
				};
			};
		})(elelist[i].eleinput, elelist[i].eletext, elelist[i].rule);
	};
};