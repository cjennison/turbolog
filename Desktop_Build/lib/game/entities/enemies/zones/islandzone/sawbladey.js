ig.module(
    'game.entities.enemies.zones.islandzone.sawbladey'
)
.requires(
    'impact.game',
    'impact.entity'
)
.defines(function(){
 
EntitySawBladey = ig.Entity.extend({
	size:{x:32, y:32},
	
	type: ig.Entity.TYPE.B, 
	checkAgainst: ig.Entity.TYPE.A,
	collides: ig.Entity.COLLIDES.PASSIVE,
	
	animSheet: new ig.AnimationSheet('media/enemies/saw.png', 32, 32),
	healthbar:null,
	health:2,
	MaxHealth:2,
	
		
	init:function(x,y,settings){
		this.parent(x,y,settings);
		
		this.addAnim('idle', .05, [0,1,2,3,4,5,6]);
		this.healthbar = ig.game.spawnEntity(EntityHealthBar, 10, 10, {Unit:this});
	},
		
	update:function(){
		this.parent();
		this.vel.x = -90;
	},
	
	check:function(other){
		console.log("HIT");
		this.kill();
		this.healthbar.kill();
		other.hurt(10);
	},
	
	sendHit:function(){
		this.healthbar.showHealthBar();
	},
	
	kill:function(){
		this.parent();
		ig.game.spawnEntity(EntityCoinExplosion, this.pos.x, this.pos.y)
	}

});


});