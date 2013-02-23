ig.module(
    'game.entities.powerup.powerup'
)
.requires(
    'impact.entity'
)
.defines(function(){

EntityPowerup = ig.Entity.extend({
	
});

EntityLaser = ig.Entity.extend({
	size:{x:32, y:32},
	gravityFactor: 0,
	animSheet: new ig.AnimationSheet('media/powerups/laser.png', 32, 32),
	player:null,
	
	
	
	init:function(x,y,settings){
		this.parent(x,y,settings);
		this.addAnim('start', .1, [0,1,2], true);
		this.addAnim('retract', .1, [3,2,1,0], true);
		this.currentAnim = this.anims.start;
		
		ig.game.spawnEntity(EntityLaserBeam, this.pos.x, this.pos.x, {laser:this});
	},
	
	update:function(){
		this.parent();
		if(this.player){
			this.pos.x = this.player.pos.x;
			this.pos.y = this.player.pos.y - 10;
		}
	}
	
});

EntityLaserBeam = ig.Entity.extend({
	size:{x:3000, y:32},
	gravityFactor: 0,
	animSheet: new ig.AnimationSheet('media/projectiles/laserbeam.png', 32, 32),
	laser:null,
	
	checkAgainst: ig.Entity.TYPE.B,
	collides: ig.Entity.COLLIDES.PASSIVE,
	
	init:function(x,y,settings){
		this.parent(x,y,settings);
		this.addAnim('start', .01, [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15], true);
		this.addAnim('retract', .1, [3,2,1,0], true);
		this.currentAnim = this.anims.start;
	},
	
	update:function(){
		this.parent();
		if(this.laser){
			this.pos.x = this.laser.pos.x + 28;
			this.pos.y = this.laser.pos.y;
		}
		
		
	},
	
	check:function(other){
		other.health--;
		other.sendHit();
	},
	
	draw:function(){
		this.parent();
		
		var img = new ig.Image('media/projectiles/laserbeamimage.png');
		img.draw(this.pos.x + 16, this.pos.y+5, 0, 0,800, 15);
	}
})

});