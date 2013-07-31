ig.module(
	'plugins.drag-button'
)
.requires(
	'impact.system',
	'impact.input',
	'impact.font',
	'impact.image'
)
.defines(function(){
	var _c = ig.CONFIG;
	
	ig.DragButton = ig.Class.extend({
		image:null,
		image_down:null,
		tile:0,
		pos:{x:0,y:0},
		origin:{x:0, y:0},
		size:{x:0, y:0},
		area:{x1: 0, y1:0, x2:0, y2:0},
		dragging:false,
		dragPosition:{
			x:0,
			y:0
		},
		pressed:false,
		touchId:0,
		type:'null',
		enabled:true,
		settings:null,
		target_area:{
			x1:0, y1:0,x2:0,y2:0
		},
		
		init:function(action, x, y, width, height, image, tile, image_down, type, num, enabled, settings, target_area){
			var internalWidth = parseInt(ig.system.canvas.offsetWidth) || ig.system.realWidth;
			var s = ig.system.scale * (internalWidth / ig.system.realWidth);
		
			this.action = action;
			this.pos = {x: x, y: y};
			this.size = {x: width, y: height};
			this.area = {x1: x * s, y1: y * s, x2: (x + width) * s, y2: (y + height) *s};
			console.log(image)
			this.image = image || null;
			this.image_down = image_down || null;
			this.tile = tile || 0;
			this.type = type || null;
			this.num = num;
			this.enabled = enabled || true;
			this.settings = settings;
			this.target_area = {
				x1: target_area.x * s,
				y1: target_area.y * s,
				x2: (target_area.x + target_area.w) * s,
				y2: (target_area.y + target_area.h) * s
			}
			
			
			document.addEventListener( 'touchstart', this.touchStart.bind(this), false );
			document.addEventListener( 'touchend', this.touchEnd.bind(this), false );
			document.addEventListener( 'touchmove', this.touchMove.bind(this), false );
		},
		
		touchStart:function(ev){
			ev.preventDefault();
			if(this.enabled == false){ return; }; 
	 		if(this.type != null && this.type != ig.game.activeBar){
	 			return;
	 		}
			if( this.pressed ) { return; }
			var el = ig.system.canvas;
			var pos = {left: 0, top: 0};
			while( el != null ) {
				pos.left += el.offsetLeft;
				pos.top += el.offsetTop;
				el = el.offsetParent;
			}
			
			for( var i = 0; i < ev.touches.length; i++ ) {
				var x = ev.touches[i].pageX - pos.left,
					y = ev.touches[i].pageY - pos.top;
				
				if( 
					x > this.area.x1 && x < this.area.x2 &&
					y > this.area.y1 && y < this.area.y2
				) {
					console.log("touching you");
					this.dragPosition.x = x - this.size.x/2;
					this.dragPosition.y = y - this.size.y/2;
					this.pressed = true;
					this.touchId = ev.touches[i].identifier;
					this.dragging = true;
								ig.game.dragging = this.dragging;

					ig.input.actions[this.action] = true;
					if( !ig.input.locks[this.action] ) {
						ig.input.presses[this.action] = true;
						ig.input.locks[this.action] = true;
					}
					return;
				}
			}
		},
		
		touchMove:function(ev){
			ev.preventDefault();
			if(!this.pressed || !this.dragging){
				return;
			}
			
			var el = ig.system.canvas;
			var pos = {left: 0, top: 0};
			while( el != null ) {
				pos.left += el.offsetLeft;
				pos.top += el.offsetTop;
				el = el.offsetParent;
			}
			
			for( var i = 0; i < ev.touches.length; i++ ) {
				var x = ev.touches[i].pageX - pos.left,
					y = ev.touches[i].pageY - pos.top;
				
					this.dragPosition.x = x - this.size.x/2;
					this.dragPosition.y = y - this.size.y/2;
				}
			
			
			
		},
		
		touchEnd:function(ev){
			ev.preventDefault();
			if(!this.pressed){return;}
			for( var i = 0; i < ev.changedTouches.length; i++ ) {
				if( ev.changedTouches[i].identifier === this.touchId ) {
					this.pressed = false;
					this.dragging = false;
					ig.game.dragging = this.dragging;
					console.log(this.dragPosition.x);
					console.log("TARGET" + this.target_area.x1);
					
					if( 
						this.dragPosition.x > this.target_area.x1 && this.dragPosition.x < this.target_area.x2 &&
						this.dragPosition.y > this.target_area.y1 && this.dragPosition.y < this.target_area.y2
					) {
						console.log("ON TARGET")
						ig.game.installGear(this.settings);
					}
					this.touchId = 0;
					ig.input.delayedKeyup[this.action] = true;	
							
					return;
				}
			}
		},
		
		draw: function(posX, posY, target_area) {
			var newPosX = posX != null ? posX : this.pos.x;
			var newPosY = posY != null ? posY : this.pos.y;
			var internalWidth = parseInt(ig.system.canvas.offsetWidth) || ig.system.realWidth;
			var s = ig.system.scale * (internalWidth / ig.system.realWidth);
					//this.area = {x1: newPosX * s, y1: y * s, x2: (newPosX + width) * s, y2: (y + height) *s};
			this.area.x1 = newPosX * s;
			this.area.x2 = (newPosX + this.size.x) * s;
			this.area.y1 = newPosY * s;
			this.area.y2 = (newPosY + this.size.y) * s;
			
			if(target_area){
				this.target_area = {
					x1: target_area.x * s,
					y1: target_area.y * s,
					x2: (target_area.x + target_area.w) * s,
					y2: (target_area.y + target_area.h) * s
				}
			}
			
			if(this.dragging == true){
						this.image.drawTile( this.dragPosition.x, this.dragPosition.y, this.tile, this.size.x, this.size.y );
			} else {
				if( this.image ) { 
						this.image.drawTile( newPosX, newPosY, this.tile, this.size.x, this.size.y );
					} 
			}
					
				
				
				
				
			
			
		}
			
	})
})
