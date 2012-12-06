/**	Skye Klein 05/2012  v0.1
 */

function TextureMask(id, args) {

	this.Init = function(){
		var self = this;
		if(!self.CanRun()) return false;
		
		// Scratch workspace
		self.scratch = document.createElement('div');
		self.scratch.style.width = 0;
		self.scratch.style.height = 0;
		self.scratch.style.overflow = 'hidden';
		document.body.appendChild(self.scratch);
		
		// Mask image
		self.imask = document.createElement('img');
		self.imask.onload = function(){
			self.maskloaded = true;
		}
		self.imask.setAttribute('src', self.args.mask.src);
		self.scratch.appendChild(self.imask);
		
		// Texture image
		self.itexture = document.createElement('img');
		self.itexture.onload = function(){
			self.textureloaded = true;
		}
		self.itexture.setAttribute('src', self.args.texture.src);
		self.scratch.appendChild(self.itexture);
		
		// Wait until all images loaded
		self.interval = window.setInterval(function(){
			if(self.maskloaded && self.textureloaded) {
				window.clearInterval(self.interval);
				self.SetupCanvas();
			}
		}, 10);
		
		return self;
	};
	
	this.CanRun = function(){
		var test = document.createElement('canvas');
		if(typeof(test.getContext) != 'undefined') {
			return true;
		}
		else {
			return false;
		}	
	};
	
	this.SetMask = function(id){
		var self = this;
		self.imask = document.getElementById(id);
		self.bm.drawImage(self.imask, 0, 0);
	};
	
	this.SetTexture = function(id){
		var self = this;
		self.itexture = document.getElementById(id);
		self.bt.drawImage(self.itexture, 0, 0);
	};
		
	this.SetupCanvas = function(){
		var self = this;
		
		self.width = self.imask.width;
		self.height = self.imask.height / self.args.mask.frames;
		
		// Mask buffer
		var bmask = document.createElement('canvas');
		bmask.setAttribute('width', self.imask.width);
		bmask.setAttribute('height', self.imask.height);
		self.bm = bmask.getContext('2d');
		self.bm.drawImage(self.imask, 0, 0);
		self.scratch.appendChild(bmask);
		
		// Texture buffer
		var btexture = document.createElement('canvas');
		btexture.setAttribute('width', self.itexture.width);
		btexture.setAttribute('height', self.itexture.height);
		self.bt = btexture.getContext('2d');
		self.bt.drawImage(self.itexture, 0, 0);
		self.scratch.appendChild(btexture);
		
		// Output canvas
		if(!self.target.getElementsByTagName('canvas').length) {
			self.output = document.createElement('canvas');
			self.output.setAttribute('width', self.width);
			self.output.setAttribute('height', self.height);
			self.target.appendChild(self.output);
		}
		else {
			self.output = self.target.getElementsByTagName('canvas')[0];
		}
		self.cc = self.output.getContext('2d');
		self.target.className+= ' texturemask';
		
		self.Render();
	};
	
	this.Render = function(){
		var self = this;
		self.running = true;
		self.mframe = 0;
		self.tframe = 0;
		self.runtime = 0;
		
		var millis = (1 / self.args.fps) * 1000;
		
		self.interval = window.setInterval(function(){
			self.cc.clearRect(0, 0, self.width, self.height);
			self.runtime+= millis;
			
			var twidth = self.args.width ? self.args.width : self.width;
			var theight = self.args.height ? self.args.height : self.height;
			
			var mdata = self.bm.getImageData(0, (self.mframe * self.height), self.width, self.height);
			var tdata = self.bt.getImageData(0, (self.tframe * self.height), self.width, self.height);
			
			// Mask data hook
			if(self.args.onMaskData) {
				mdata = self.args.onMaskData.apply(false, [mdata, self]);
			}
			self.mdata = mdata;
			
			// Scan current mask pixels
			var w2 = self.width;
			for(y = 0; y < self.height; y++) {
				inpos = y * self.width * 4;
				outpos = inpos + w2 * 4
				for(x = 0; x < w2; x++) {
					r = mdata.data[inpos++];
					g = mdata.data[inpos++];
					b = mdata.data[inpos++];
					a = mdata.data[inpos++];
					// Set alpha of texture pixel to combined r/g/b of mask
					tdata.data[inpos-1] = (r + g + b) / 3;
				}
			}
			
			// Texture data hook
			if(self.args.onTextureData) {
				tdata = self.args.onTextureData.apply(false, [tdata, self]);
			}
			self.tdata = tdata;
			
			self.cc.putImageData(tdata, 0, 0);
			
		
			// Increment/reset/loop mask frame
			if(self.mframe < self.args.mask.frames - 1) {
				self.mframe++;
			}
			else if(self.args.loop !== false) {
				if(self.args.onLoop) {
					self.args.onLoop.apply(false, [self]);
				}
				self.mframe = self.args.loop !== true ? self.args.loop - 1 : 0;
			}
			else {
				if(self.args.onComplete && self.running) {
					self.args.onComplete.apply(false, [self]);
					self.running = false;
				}
			}
			
			// Increment/reset texture frame
			if(self.tframe < self.args.texture.frames - 2) {
				self.tframe++;
			}
			else {
				self.tframe = 0;
			}
			
			if(self.args.onFrame) {
				self.args.onFrame.apply(false, [self]);
			}
			
		}, millis);
			
	};
	
	this.Cleanup = function() {
		var self = this;
		self.scratch.parentNode.removeChild(self.scratch);
		self.target.className = self.target.className.replace('texturemask', '');
		window.clearInterval(self.interval);
	}
	
	this.Destroy = function(){
		var self = this;
		self.CleanUp();
		self.output.parentNode.removeChild(self.output);
	};

	this.target = document.getElementById(id);
	this.args = args;
	this.maskloaded = false;
	this.textureloaded = false;
	this.Init();
};