ig.module(
    'game.entities.enemies.zones.islandzone.speedysaw'
)
.requires(
    'impact.game',
    'impact.entity'
)
.defines(function(){
 
EntitySpeedySaw = ig.Entity.extend({
	size:{x:32, y:32},
	maxVel:{x:400, y:100},
	friction: {x:100, y:5000},

	type: ig.Entity.TYPE.B, 
	checkAgainst: ig.Entity.TYPE.A,
	collides: ig.Entity.COLLIDES.PASSIVE,
	
	animSheet: new ig.AnimationSheet('media/enemies/rocketsawblade.png', 32, 32),
	healthbar:null,
	health:4,
	MaxHealth:4,
	
	idleTimer:null,
	afterTurboLog:false,
	attackingPlayer:false,
	player:null,
		
	init:function(x,y,settings){
		this.parent(x,y,settings);
		this.player = ig.game.getEntitiesByType(EntityPlayer)[0];
		this.addAnim('idle', .05, [0,1,2,3]);
		this.healthbar = ig.game.spawnEntity(EntityHealthBar, 10, 10, {Unit:this});
	},
		
	update:function(){
		this.parent();
		if(!this.afterTurboLog && this.idleTimer == null && !this.attackingPlayer){
			this.vel.x = -200;
			if(this.pos.x < ig.system.width - 50){
				this.vel.x = 0;
				this.afterTurboLog = true;
				this.idleTimer = new ig.Timer();
			}
		}
		
		if(this.afterTurboLog){
			if(this.pos.y > this.player.pos.y){
				this.accel.y = -50;
			} else {
				this.accel.y = 50;
			}
		}
		if(this.idleTimer == null){return};
		if(this.idleTimer.delta() > 3){
			this.afterTurboLog = false;
			this.accel.y = 0;
			this.friction.y = 100000;
			this.vel.x = -200;
		}
		
		if(ig.game.bombExploded){
					this.kill();
				}
	},
	
	check:function(other){
		console.log("HIT");
		this.kill();
		this.healthbar.kill();
		other.hurt(30);
	},
	
	sendHit:function(){
		this.healthbar.showHealthBar();
	},
	
	kill:function(){
		this.parent();
		ig.game.spawnEntity(EntityCoinExplosion, this.pos.x, this.pos.y)
		if(GAME_TYPE == "STORY"){
			ig.game.spawnEntity(EntityExpExplosion, this.pos.x, this.pos.y, {particles:3})
		}
	}

});


});