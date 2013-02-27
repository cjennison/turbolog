ig.module(
    'game.entities.zones.islandzone'
)
.requires(
    'impact.game',
    'impact.entity'
)
.defines(function(){
 
EntityIslandZone = ig.Entity.extend({
	size: {x:2000, y:240},
	maxVel:{x:-300, y:50},
	animSheet: new ig.AnimationSheet('media/zones/islandzone_skylayer.png', 2000, 240),
		
	init:function(x,y,settings){
		this.parent(x,y,settings);
		
		this.addAnim('idle', 1, [0]);
		
	},
		
	update:function(){
		this.parent();
		this.vel.x = -70;
		/*
		if(ig.game.transitioning){
			if(ig.game.transitionTarget == "UNDERWATER"){
				if(this.pos.y > 90){
					this.vel.y = -40;
				}
				if(this.pos.y < 90 ){
					this.vel.y = 0;
				}
			}
			if(ig.game.transitionTarget == "SEALEVEL"){
				if(this.pos.y > 50){
					this.vel.y = -40;
				}
				
				if(this.pos.y < 40){
					this.vel.y = 40;
				}
				
				if(this.pos.y < 50 && this.pos.y > 40){
					this.vel.y = 0;
				}
				
			}
			if(ig.game.transitionTarget == "SKY"){
				if(this.pos.y < 0){
					this.vel.y = -40;
				}
				if(this.pos.y > 0 ){
					this.vel.y = 0;
				}
			}
			
		}
		*/
		
		
		if(this.pos.x < -this.size.x + ig.system.width){
			this.pos.x = 0;
		}
	},
		

});


});