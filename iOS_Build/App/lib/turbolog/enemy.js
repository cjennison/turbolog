ig.module(
	'turbolog.enemy'
)
.requires(
	'plusplus.core.entity',
	'game.entities.enemies.pickups'
)
.defines(function(){
	var _c = ig.CONFIG;
	var _ut = ig.utils;
	
	
	ig.Enemy = ig.EntityExtended.extend({
		
		type: ig.Entity.TYPE.B,
		checkAgainst: ig.Entity.TYPE.A, //check against da log
		collides: ig.Entity.COLLIDES.PASSIVE,
		performance: _c.KINEMATIC,
		//Amount of money dropped
		money_worth:1,
		
		//Amount of EXP dropped
		exp_worth:1,
		
		//Amount of pain inflicted
		pain:0,
		
		
		
		
		zIndex:10,
		healthbar:null,
		health:10,
		MaxHealth:10,
		
		init:function(x,y,settings){
			this.parent(x,y,settings)
			this.gravityFactor = 0;
			this.type =  ig.Entity.TYPE.B;
			this.checkAgainst =  ig.Entity.TYPE.A; //check against da log
			this.collides =  ig.Entity.COLLIDES.PASSIVE;
			
			this.healthbar = ig.game.spawnEntity(EntityHealthBar, 10, 10, {Unit:this});
		
		},
		
		update:function(){
			this.parent();
			
			//Too far left - kill
			if (this.pos.x < ig.game.screen.x - 100){
					this.kill();
				}
		},
		
		check:function(other){
			console.log("hit")
			this.kill();
		},
		
		sendHit:function(amt){
			console.log(amt);
			this.healthbar.showHealthBar();
			this.health -= amt;
			if(this.health <= 0){
				this.kill();
			}
		},
		
		kill:function(){
			this.parent();
			ig.game.spawnEntity(EntityCoinExplosion, this.pos.x, this.pos.y, {particles:this.money_worth})
			ig.game.spawnEntity(EntityExpExplosion, this.pos.x, this.pos.y, {particles:this.exp_worth})

		}
		
				
	})

})
