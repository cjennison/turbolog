ig.module(
	'game.entities.screens.gear'
)
.requires(
	'plusplus.core.entity',
	'impact.font'
)
.defines(function(){
	
	var _c = ig.CONFIG;
	
	EntityGear = ig.EntityExtended.extend({
		performance: _c.KINEMATIC,
		maxVel:{x:10000, y:100},
		size: {x:2000, y:240},
		//vel:{x:-10, y:0},
		targetPos:0,
		tweening:false,
		gearPosition:0,
		gearIcons:[],
		gearDropZones:[],
		gearDrop:{
			image: new ig.Image("/media/ui/my_log/gear/gear_spot.png"),
			x:0,
			y:0,
		},
		gearDropZoneRows:5,
		gearDropZoneCols:5,
		gearArea:{
			x:20,
			width:300,
			y:20,
			height:300,
			touched:false,
			lastY:0,
			change:0,
			firstTouch:true,
		},
		
		preview_window:new ig.Image('/media/ui/my_log/gear/dropzone.png'),
		turbolog:new ig.Image('/media/ui/my_log/gear/turbolog.png'),
		unequip_head:null,
		unequip_body:null,
		unequip_legs:null,
		animSheet: new ig.AnimationSheet(_c.PATH_TO_MEDIA + 'ui/my_log/win_Gear.png', 480, 320),
		animSettings: {
			idle: {
				frameTime: 1,
				sequence: [0]
			}
		},
		inventory:[],
		
		init:function(x,y,settings){
			this.parent(x,y,settings);
			this.gravityFactor = 0;
			this.gearArea.y = 0;
			this.gearArea.x = this.pos.x + 30;
			this.gearArea.width = 300;
			this.gearArea.height = ig.system.height;
			this.gearPosition = this.pos.y;
			
			//this.inventory = _c.INVENTORY;
			
			this.unequip_head = new ig.TouchButton("UNEQUIP_HEAD", this.pos.x + 380, 180, 20, 20, new ig.Image('/media/ui/my_log/gear/unequip_btn.png')),
			this.unequip_body = new ig.TouchButton("UNEQUIP_BODY", this.pos.x + 350, 180, 20, 20, new ig.Image('/media/ui/my_log/gear/unequip_btn.png')),
			this.unequip_legs = new ig.TouchButton("UNEQUIP_LEGS", this.pos.x + 330, 180, 20, 20, new ig.Image('/media/ui/my_log/gear/unequip_btn.png')),

			document.addEventListener('touchstart', this.touchStart.bind(this), false);
			document.addEventListener('touchend', this.touchEnd.bind(this), false);
			document.addEventListener('touchmove', this.touchMove.bind(this), false);
			
			var i = 0;
			for(var r = 0;r < this.gearDropZoneRows;r++){
				for(var c = 0;c < this.gearDropZoneCols;c++){
					var obj = this.gearDrop;
					obj.x = this.gearArea.x + (10 * c);
					obj.y = this.gearArea.y + (10 * r);
					
					i++;
				}
			}
			
			var r = 0, c = 0;
			for(var inv = 0;inv < _c.INVENTORY.length;inv++){
				
				var item = _c.INVENTORY[inv];
				console.log(item.icon);
				var target_area = {
					x:this.pos.x + 300,
					y:90,
					w:160,
					h:200
				}
				this.inventory[inv] = new ig.DragButton("GEAR_PICKUP", this.gearArea.x + (50 * c), this.gearArea.y + (50 * r), 35, 35, new ig.Image('/media/ui/my_log/gear/gear_icons/' + item.icon), 0, null, null, 0, true, item, target_area);
				c++;
				if(c > this.gearDropZoneCols){
					c = 0;
					r++;
				}
					
				
			}
			
			
		},
		
		touchStart:function(ev){
			ev.preventDefault();
			console.log("TOUCH START")
			
			var el = ig.system.canvas;
			var pos = {left: 0, top: 0};
			while( el != null ) {
				pos.left += el.offsetLeft;
				pos.top += el.offsetTop;
				el = el.offsetParent;
			}
			var x = ev.touches[0].pageX - pos.left,
				y = ev.touches[0].pageY - pos.top;
				
			if(x > this.gearArea.x && x < this.gearArea.x + this.gearArea.width){
				console.log("IN DA AREA")
				this.gearArea.touched = true;
			}
		},
		
		touchMove:function(ev){
			ev.preventDefault();
			if(ig.game.dragging == true){return};
			if(this.gearArea.touched){
				var el = ig.system.canvas;
				var pos = {left: 0, top: 0};
				while( el != null ) {
					pos.left += el.offsetLeft;
					pos.top += el.offsetTop;
					el = el.offsetParent;
				}
				
				//console.log(this.skillPosition)
				
				var x = ev.touches[0].pageX - pos.left,
					y = (ev.touches[0].pageY - (pos.top));
					
				//y += this.skillPosition;
				//console.log(y);
				if(this.gearArea.firstTouch == false){
					this.gearArea.change = this.gearArea.lastY - y;
				} else {
					//this.skillPosition = 0;
					
				}
				console.log("[SKILLPOS]: " + this.gearPosition)
					console.log("[CHANGE]: " + this.gearArea.change)
				this.gearArea.firstTouch = false;
				//console.log(this.skillArea.change);
				this.gearArea.lastY = y;
			}
		},
		
		touchEnd:function(ev){
			ev.preventDefault();
			this.gearArea.change = 0;
			this.gearArea.lastY = this.gearPosition;
			//console.log("OUT")
			this.gearArea.firstTouch = true;
			this.gearArea.touched = false;
		},
		
		update:function(){
			this.parent();
			
			
			if(this.tweening == false){return;}
			//console.log(this.targetPos - this.pos.x)
			if(this.pos.x != this.targetPos){
				//console.log("WHY ME")
				if(this.pos.x < this.targetPos){
					this.vel.x  = (this.targetPos - this.pos.x) * 5;
					
				}
				if(this.pos.x > this.targetPos){
					this.vel.x  = (this.targetPos - this.pos.x) * 5;
				}
				
				
				if(Math.abs(this.vel.x) < 1){
					this.tweening = false;
					this.vel.x = 0;
					this.pos.x = this.targetPos;
					ig.game.canSwipe = true;
				}
				
			}
			
			
			
			
		},
		
		draw:function(){
			this.parent();
			//console.log(this.gearDropZones[9].x)
			
			this.preview_window.draw(this.pos.x + 300, 90);
			this.turbolog.draw(this.pos.x + 350, 180);
			
			if(_c.EQUIPPED_GEAR.head){
				this.unequip_head.draw(this.pos.x + 380, 150)
				_c.EQUIPPED_GEAR.head.obj.draw(this.pos.x + 380, 180)
			}
			if(_c.EQUIPPED_GEAR.body){
				this.unequip_body.draw(this.pos.x + 350, 150)
				_c.EQUIPPED_GEAR.body.obj.draw(this.pos.x + 350, 180)
			}
			if(_c.EQUIPPED_GEAR.legs){
				this.unequip_legs.draw(this.pos.x + 340, 150)
				_c.EQUIPPED_GEAR.legs.obj.draw(this.pos.x + 340, 180)
			}
			
			
			
			this.gearPosition -= this.gearArea.change;
			this.gearPosition = Clamp(this.gearPosition, 0, -200)
			
			var i = 0;
			for(var r = 0;r < this.gearDropZoneRows;r++){
				for(var c = 0;c < this.gearDropZoneCols;c++){
					var obj = this.gearDrop;
					obj.x = this.gearArea.x + (50 * c);
					obj.y = this.gearArea.y + (50 * r);
					var icY = this.gearPosition + obj.y;
					obj.image.draw(obj.x, icY);
					
					
					
					i++
				}
			}
			
			var target_area = {
					x:this.pos.x + 300,
					y:90,
					w:160,
					h:200
				}
			
			var r = 0, c = 0;
			for(var inv = 0;inv < this.inventory.length;inv++){
				this.inventory[inv].draw(this.gearArea.x + (50 * c), this.gearPosition + (this.gearArea.y + (50 * r)), target_area);
				c++;
				if(c > this.gearDropZoneCols){
					c = 0;
					r++;
				}	
			}
			
			
			this.gearArea.x = this.pos.x + 30;
			this.gearArea.change = 0;
			
			
			var equipped = _c.EQUIPPED_GEAR;
			var str = "No Equipped Gear!";
			if(_c.EQUIPPED_GEAR.head != null || _c.EQUIPPED_GEAR.body != null || _c.EQUIPPED_GEAR.legs != null){
				str = "";
				if(_c.EQUIPPED_GEAR.head != null){
					str += ("Head: " + _c.EQUIPPED_GEAR.head.mod + "+" + _c.EQUIPPED_GEAR.head.amt) 
				}
				if(_c.EQUIPPED_GEAR.body != null){
					str += ("\nBody: " + _c.EQUIPPED_GEAR.body.mod + "+" + _c.EQUIPPED_GEAR.body.amt) 
				}
				if(_c.EQUIPPED_GEAR.legs != null){
					str += ("\nLegs: " + _c.EQUIPPED_GEAR.legs.mod + "+" + _c.EQUIPPED_GEAR.legs.amt) 
				}
			}
			
			ig.game.font.draw(str, this.pos.x + 200, ig.system.height - 30, ig.Font.ALIGN.CENTER)
		}
		
	})
	
	
	
	
})
