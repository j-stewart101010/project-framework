FR.IntroScreen = {

	Init: function(){
	
		/*
		var main = $('#main');
		var intro = $('#introduction');
		main.css('-moz-perspective', '2000px');
		var r = 0;
		window.setInterval(function(){
			intro.css('-moz-transform', 'rotateY(' + r + 'deg)');
			r++;
		}, 33);
		*/
	
		/*
		var self = this;
		var intro = $('#introduction');
		this.width = parseInt(intro.width());
		this.height = parseInt(intro.height());
		this.elwidth = $('#introduction a').width();
		this.elheight = $('#introduction a').height();
		
		$('#introduction a').each(function(){
			var elem = $(this);
			self.AnimateEmber(elem);
		});
		*/
	},
	
	AnimateEmber: function(elem){
		var self = this;
		var time = Math.floor(Math.random() * 4000) + 4000;
		elem.animate({path: self.MakePath(elem)}, time, 'linear');
		window.setTimeout(function(){
			elem.stop();
			self.AnimateEmber(elem);
		}, time / 2);
	},
	
	MakePath: function(elem){
		var self = this;
		var pos = elem.position();
		var range = 100;
		var sx = elem.position().left;
		var sy = elem.position().top;
		var sa = Math.random() * 30;
		var sl = Math.random() * 1;
		//var ex = Math.random() * self.width;
		//var ey = Math.random() * self.height;
		var ex = pos.left + ((Math.random() * range) - (range / 2));
		var ey = pos.top + ((Math.random() * range) - (range / 2));
		var ea = Math.random() * 30;
		var el = Math.random() * 1;
		
		if(ex < 0) {
			ex = 0;
		}
		else if(ex > this.width - this.elwidth) {
			ex = this.width - this.elwidth;
		}
		if(ey < 0) {
			ey = 0;
		}
		else if(ey > this.height - this.elheight) {
			ey = this.height - this.elheight;
		}
		
		var path = new $.path.bezier({
			start: {x: sx, y: sy, angle: sa, length: sl},
			end:   {x: ex, y: ey, angle: ea, length: el}
		});
		return path;
	}

};

