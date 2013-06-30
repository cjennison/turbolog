ig.module(
	'game.entities.enemies.island.rocketsaw'
)
.requires(
	'turbolog.enemy'
)
.defines(function(){
	
	EntityRocketsaw = ig.Enemy.extend({
		
		size: {x:32, y:32},
		animSheet: new ig.AnimationSheet('media/game_elements/enemies/rocketsawblade.png', 32, 32),
		animSettings:{
			idle:{
				frameTime:.07,
				sequence:[0,1,2,3]
			}
		},
		
		maxVel:{x:400, y:100},
		vel:{x:-90, y:0},
		friction:{x:100, y:5000},
		health:10,
		MaxHealth:10,
		
		
		money_worth:4,
		exp_worth:4,
		
		idleTimer:null,
		afterTurboLog:false,
		attackingPlayer:false,
		player:null,
		
		init:function(x,y,settings){
			this.parent(x,y,settings);
			this.player = ig.game.getEntitiesByType(EntityTurboLog)[0];

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
			
			var speedMod = ig.game.movementSpeed/35 * this.vel.x ;
			this.vel.x = speedMod;
			
			
		},
		
		check:function(other){
			this.kill();
			other.hurt(30);
		}
		
		
	})
	
})
