/**
 *	Skye Klein 05/2012 - v0.1
 *	TODO: Convert inline image strip, image strip animation fallback
 */

function PNGAnim(id, src, frames, options) {
	
	this.defaults = {
		startframe: 0,
		framerate: 25,
		canvas: true,
		fallback: false
	};
	
	this.Init = function(){
		for(var x in this.defaults) {
			if(typeof(this.options[x]) == 'undefined') {
				this.options[x] = this.defaults[x];
			}
		}
		var self = this;
		
		this.canvas = this.UseCanvas();
		this.outer = document.getElementById(this.id);
		
		if(this.canvas) {
			this.wrap = document.createElement('div');
			this.wrap.style.width = 0;
			this.wrap.style.height = 0;
			this.wrap.style.overflow = 'hidden';
			this.image = document.createElement('img');
			if(this.image.addEventListener){
				this.image.addEventListener('load', function(){
					self.RenderCanvas();
				}, true);
			} 
			else {
				this.image.attachEvent('onload', function(){
					self.RenderCanvas();
				});
			}
			this.image.setAttribute('src', this.src);
			this.wrap.appendChild(this.image);
			this.outer.appendChild(this.wrap);
		}
		else {
			this.RenderFallback();
		}
		
		return this;
	};
		
	this.RenderCanvas = function(){		
		
		// Set up frame buffer
		this.buffer = document.createElement('canvas');
		this.buffer.setAttribute('width', this.image.width);
		this.buffer.setAttribute('height', this.image.height);
		this.wrap.appendChild(this.buffer);
		var bc = this.buffer.getContext('2d');
		bc.drawImage(this.image, 0, 0);
		
		// Set up output canvas
		this.canvas = document.createElement('canvas');
		this.canvas.setAttribute('width', this.image.width);
		this.canvas.setAttribute('height', this.image.height / this.frames);
		this.outer.appendChild(this.canvas);
		var cc = this.canvas.getContext('2d');
		
		// Start the animation
		var cwidth = this.image.width;
		var cheight = this.image.height / this.frames;
		var frame = this.options.startframe;
		this.interval = window.setInterval(function(){
			cc.width = cc.width;
			var imgdata = bc.getImageData(0, frame * cheight, cwidth, cheight);
			cc.putImageData(imgdata, 0, 0);
			if(frame < frames - 1) {
				frame++;
			}
			else {
				frame = 0;
			}
		}, this.options.framerate);

	};
	
	this.RenderFallback = function(){
		if(this.options.fallback) {
			// Animated GIF fallback
			this.method = 'gif';
			this.image = document.createElement('img');
			this.image.setAttribute('src', this.options.fallback);
			this.image.className = 'pnganim-fallback';
			this.outer.appendChild(this.image);
		}
		else {
			this.method = 'imagestrip';
			// Animated imagestrip fallback, TODO
		}
	};
	
	this.UseCanvas = function(){
		var test = document.createElement('canvas');
		if(typeof(test.getContext) == 'undefined') {
			return false;
		}
		else {
			return this.options.canvas;
		}
	};
	
	this.Destroy = function(){
		window.clearInterval(this.interval);
		if(this.canvas) {
			this.wrap.parentNode.removeChild(this.wrap);
			this.canvas.parentNode.removeChild(this.canvas);
		}
		else {
			this.image.parentNode.removeChild(this.image);
		}
	};

	// Constructor
	this.id = id;
	this.src = src;
	this.frames = frames;
	this.options = options ? options : {};
	this.interval = false;
	this.Init();
};


