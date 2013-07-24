ig.module(
	'plugins.touch-button'
)
.requires(
	'impact.system',
	'impact.input',
	'impact.font',
	'impact.image'
)
.defines(function(){
 var _c = ig.CONFIG;
 
ig.TouchButton = ig.Class.extend({	
	action: 'undefined',
	image: null,
	image_down:null,
	tile: 0,
	pos: {x: 0, y: 0},
	size: {x: 0, y: 0},
	area: {x1: 0, y1:0, x2: 0, y2:0},
 	num:0,
	pressed: false,	
	touchId: 0,
	type:'null',
	enabled:true,
	font: new ig.Font( 'media/04b03.font.png' ),
	settings:null,
	selectorbtn:false,
	selected:false,
	selected_image:null,
	
	init: function( action, x, y, width, height, image, tile, image_down, type, num, enabled, settings, selectorbtn, selected_image ) {
		var internalWidth = parseInt(ig.system.canvas.offsetWidth) || ig.system.realWidth;
		var s = ig.system.scale * (internalWidth / ig.system.realWidth);
		
		this.action = action;
		this.pos = {x: x, y: y};
		this.size = {x: width, y: height};
		this.area = {x1: x * s, y1: y * s, x2: (x + width) * s, y2: (y + height) *s};
		
		this.image = image || null;
		this.image_down = image_down || null;
		this.tile = tile || 0;
		this.type = type || null;
		this.num = num;
		this.enabled = enabled || true;
		this.settings = settings;
		this.selectorbtn = selectorbtn;
		this.selected_image = selected_image;
		
		document.addEventListener( 'touchstart', this.touchStart.bind(this), false );
		document.addEventListener( 'touchend', this.touchEnd.bind(this), false );
	},
	
	touchStart: function( ev ) {
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
				this.pressed = true;
				this.touchId = ev.touches[i].identifier;
				if(this.settings){
					ig.game.buttonSettings = this.settings;
				}	
 
				ig.input.actions[this.action] = true;
				if( !ig.input.locks[this.action] ) {
					ig.input.presses[this.action] = true;
					ig.input.locks[this.action] = true;
				}
				return;
			}
		}
	},
	
	touchEnd: function( ev ) {
		ev.preventDefault();
 
		if( !this.pressed ) { return; }
				
		for( var i = 0; i < ev.changedTouches.length; i++ ) {
			if( ev.changedTouches[i].identifier === this.touchId ) {
				this.pressed = false;
				this.touchId = 0;
				ig.input.delayedKeyup[this.action] = true;	
						
				return;
			}
		}
	},
	
	draw: function(posX, posY) {
		var newPosX = posX != null ? posX : this.pos.x;
		var newPosY = posY != null ? posY : this.pos.y;
		var internalWidth = parseInt(ig.system.canvas.offsetWidth) || ig.system.realWidth;
		var s = ig.system.scale * (internalWidth / ig.system.realWidth);
				//this.area = {x1: newPosX * s, y1: y * s, x2: (newPosX + width) * s, y2: (y + height) *s};
		this.area.x1 = newPosX * s;
		this.area.x2 = (newPosX + this.size.x) * s;
		this.area.y1 = newPosY * s;
		this.area.y2 = (newPosY + this.size.y) * s;
		if(this.selectorbtn){
			if(this.selected){
				this.image.drawTile( newPosX, newPosY, this.tile, this.size.x, this.size.y );
				//this.selected_image.drawTile( newPosX, newPosY, this.tile, this.size.x, this.size.y );
			}else {
				if(this.pressed == false){
					if( this.image ) { 
						this.image.drawTile( newPosX, newPosY, this.tile, this.size.x, this.size.y );
					} 
				}
				
				
				if(this.pressed){
					if(this.image_down){
						this.image_down.drawTile( newPosX, newPosY, this.tile, this.size.x, this.size.y );
					}
				}
			}
		} else {
			if(this.pressed == false){
				if( this.image ) { 
					this.image.drawTile( newPosX, newPosY, this.tile, this.size.x, this.size.y );
				} 
			}
			
			
			if(this.pressed){
				if(this.image_down){
						this.image_down.drawTile( newPosX, newPosY, this.tile, this.size.x, this.size.y );
				}
			}
		}
		
		
	}
});
 
 
});