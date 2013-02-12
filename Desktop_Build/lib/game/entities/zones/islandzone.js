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
	
	animSheet: new ig.AnimationSheet('media/zones/islandzone.png', 2000, 240),
		
	init:function(x,y,settings){
		this.parent(x,y,settings);
		
		this.addAnim('idle', 1, [0]);
		
	},
		
	update:function(){
		this.parent();
		this.vel.x = -60;
		
		if(this.pos.x < -this.size.x + ig.system.width){
			this.pos.x = 0;
		}
	},
		

});


});