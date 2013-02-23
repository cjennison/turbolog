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
		if(other.name != "BOSS"){
			other.health--;

		}
		other.sendHit(.1);
	},
	
	draw:function(){
		this.parent();
		
		var img = new ig.Image('media/projectiles/laserbeamimage.png');
		img.draw(this.pos.x + 16, this.pos.y+5, 0, 0,800, 15);
	}
});

EntityShield = ig.Entity.extend({
	size:{x:40, y:100},
	gravityFactor:0,
	animSheet: new ig.AnimationSheet('media/powerups/shield.png', 32, 32),
	player:null,
	
	init:function(x,y,settings){
		this.parent(x,y,settings);
		this.addAnim('idle', 1, [0], true);
	},
	
	update:function(){
		this.parent();
		if(this.player){
			this.pos.x = this.player.pos.x + 15;
			this.pos.y = this.player.pos.y - 4;
		}
	},
	
});

EntityBomb = ig.Entity.extend({
	size:{x:32, y:32},
	gravityFactor:0,
	animSheet: new ig.AnimationSheet('media/projectiles/bombthrow.png', 32, 32),
	bombTimer:null,
	bombExplodeTime: 5,
	
	checkAgainst: ig.Entity.TYPE.B,
	
	
	init:function(x,y,settings){
		this.parent(x,y,settings);
		this.addAnim('idle', .1, [0,1,2,3,4,5,6,7,8,9,10,11,12,13], false);
		this.bombTimer = new ig.Timer();
		
	},
	
	update:function(){
		this.parent();
		this.vel.x = 50;
		if(this.bombTimer){
			if(this.bombTimer.delta() > this.bombExplodeTime){
				ig.game.destroyAllEnemies();
				this.kill();
			}
		}
	},
	
	check:function(other){
		ig.game.destroyAllEnemies();
		this.kill();
	},
	
	kill:function(){
		var player = ig.game.getEntitiesByType(EntityPlayer)[0];
		if(this.distanceTo(player) < 100){
			player.hurt(25);
		}
		this.parent();
	}
	
});

});