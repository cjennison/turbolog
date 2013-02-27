ig.module(
    'game.entities.zones.islandzone_fore'
)
.requires(
    'impact.game',
    'impact.entity'
)
.defines(function(){
 
EntityIslandZoneForeground = ig.Entity.extend({
	size: {x:2000, y:240},
	maxVel:{x:-300, y:50},
	animSheet: new ig.AnimationSheet('media/zones/islandzone_foreground.png', 2000, 300),
	
	
	
	init:function(x,y,settings){
		this.parent(x,y,settings);
		
		this.addAnim('idle', 1, [0]);
		
	},
		
	update:function(){
		this.parent();
		this.vel.x = -100;
		if(ig.game.transitioning){
			if(ig.game.transitionTarget == "UNDERWATER"){
				if(this.pos.y > 0){
					this.vel.y = -40;
				}
				if(this.pos.y < 0 ){
					this.vel.y = 0;
				}
			}
			if(ig.game.transitionTarget == "SEALEVEL"){
				if(this.pos.y > 170){
					this.vel.y = -40;
				}
				
				if(this.pos.y < 160){
					this.vel.y = 40;
				}
				
				if(this.pos.y < 170 && this.pos.y > 160){
					this.vel.y = 0;
				}
				
			}
			if(ig.game.transitionTarget == "SKY"){
				if(this.pos.y < 300){
					this.vel.y = 40;
				}
				if(this.pos.y > 300 ){
					this.vel.y = 0;
				}
			}
			
		}
		
		
		
		//this.vel.y = -2;
		
		if(this.pos.x < -this.size.x + ig.system.width){
			this.pos.x = 0;
		}
	},
		

});


});