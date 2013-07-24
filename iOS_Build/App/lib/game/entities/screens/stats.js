ig.module(
	'game.entities.screens.stats'
)
.requires(
	'plusplus.core.entity'
)
.defines(function(){
	
	var _c = ig.CONFIG;
	
	EntityStats = ig.EntityExtended.extend({
		performance: _c.KINEMATIC,
		maxVel:{x:10000, y:100},
		size: {x:2000, y:240},
		//vel:{x:-10, y:0},
		targetPos:0,
		tweening:false,
		animSheet: new ig.AnimationSheet(_c.PATH_TO_MEDIA + 'ui/my_log/win_Stats.png', 480, 320),
		animSettings: {
			idle: {
				frameTime: 1,
				sequence: [0]
			}
		},
		
		init:function(x,y,settings){
			this.parent(x,y,settings);
			this.gravityFactor = 0;
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
		}
		
	})
	
	
	
	
})
