ig.module(
	'game.entities.screens.gear'
)
.requires(
	'plusplus.core.entity'
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
		gearDropZoneCols:4,
		gearArea:{
			x:200,
			width:300,
			y:0,
			height:300,
			touched:false,
			lastY:0,
			change:0,
			firstTouch:true,
		},
		animSheet: new ig.AnimationSheet(_c.PATH_TO_MEDIA + 'ui/my_log/win_Gear.png', 480, 320),
		animSettings: {
			idle: {
				frameTime: 1,
				sequence: [0]
			}
		},
		
		init:function(x,y,settings){
			this.parent(x,y,settings);
			this.gravityFactor = 0;
			
			for(var r = 0;r < this.gearDropZoneRows;r++){
				for(var c = 0;c < this.gearDropZoneCols;c++){
					var obj = this.gearDrop;
					obj.x = this.gearArea.x + (90 * c);
					obj.y = this.gearArea.y + (90 * r);
					console.log(obj.x);
					this.gearDropZones.push(obj);
				}
			}
			
			console.log(this.gearDropZones[2].x)
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
				}
				
			}
			
		},
		
		draw:function(){
			this.parent();
			//console.log(this.gearDropZones[9].x)
			
			for(var i = 0;i < this.gearDropZones.length;i++){
				//console.log(this.gearDropZones[i].x);
				this.gearDropZones[i].image.draw(this.gearDropZones[i].x, this.gearDropZones[i].y)
			}
			
		}
		
	})
	
	
	
	
})
