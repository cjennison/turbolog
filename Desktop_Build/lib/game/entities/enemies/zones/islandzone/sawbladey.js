ig.module(
    'game.entities.enemies.zones.islandzone.sawbladey'
)
.requires(
    'impact.game',
    'impact.entity'
)
.defines(function(){
 
EntitySawBladey = ig.Entity.extend({
	size:{x:16, y:16},
	
	type: ig.Entity.TYPE.B, 
	checkAgainst: ig.Entity.TYPE.A,
	collides: ig.Entity.COLLIDES.PASSIVE,
	
	animSheet: new ig.AnimationSheet('media/enemies/sawblade.png', 16, 16),
	healthbar:null,
	health:2,
	MaxHealth:2,
	
		
	init:function(x,y,settings){
		this.parent(x,y,settings);
		
		this.addAnim('idle', .3, [0,1,2,3]);
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