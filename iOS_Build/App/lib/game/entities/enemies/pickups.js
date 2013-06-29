ig.module(
	'game.entities.enemies.pickups'
)
.requires(
	'plusplus.core.entity'
)
.defines(function(){
	
	var _c = ig.CONFIG;
	var _ut = ig.utils;
	EntityCoinExplosion = ig.EntityExtended.extend({
		//vars
		lifetime:1,
		callback:null,
		particles:5,
		
		
		init:function(x,y,settings){
			this.parent(x,y,settings);
			console.log(this.particles)
			for (var i = 0; i < this.particles; i++) {
                if (Math.random() < .8) {
                    ig.game.spawnEntity(EntityCoin, x, y, {
                    	value: 1,
                    	colorOffset:0

                    });
                }
                if (Math.random() >= .8 && Math.random() < .98) {
                    ig.game.spawnEntity(EntityCoin, x, y, {
                    	value: 10,
                    	colorOffset:1
                    });

                }
                if (Math.random() >= .98 && Math.random() < 1) {
                    ig.game.spawnEntity(EntityCoin, x, y, {
                    	value:25,
                    	colorOffset:2
                    });

                }
                this.idleTimer = new ig.Timer();
            }
		},
		
		update:function(){
			if (this.idleTimer.delta() > this.lifetime) {
                this.kill();
                if (this.callBack) this.callBack();
                return;
            }
		}
	});
	
	
	 EntityCoin = ig.EntityExtended.extend({

				performance: _c.KINEMATIC,

				size: {x:2, y:2},
				maxVel: {x:160, y:200},
				lifetime: 8,
				fadetime: .3,
				bounciness: 0,
				vel: {x:100, y:30},
				friction: {x:100, y:0},
				collides: ig.Entity.COLLIDES.LITE,
				colorOffset: 0,
				totalColors: 7,
				value: 1,
				hitWater:false,
				
				type: ig.Entity.TYPE.NONE,
				checkAgainst: ig.Entity.TYPE.A, //I hate baddies
				collides: ig.Entity.COLLIDES.PASSIVE,
				
				
				animSheet: new ig.AnimationSheet( 'media/game_elements/drops/coin.png', 12, 12),
				
				init: function(x, y, settings){
					this.parent(x, y, settings);
					
					//Figure out if its the Human blood or the Zombie blood!
					
					this.addAnim('idle', 0.2, [this.colorOffset]);
					
					//Random directions to make it a bit more interesting..
					this.vel.x = (Math.random()*2 - 1) * this.vel.x;
					this.vel.y = (Math.random()*2 - 1) * this.vel.y;
					
					//set the timer
					this.idleTimer = new ig.Timer();
					this.enableTimer = new ig.Timer();
				},
				
				update: function() {
					if (this.idleTimer.delta() > this.lifetime){
						this.kill();
						return;
					}
					//console.log(this.pos.y + ". " + ig.game.groundPos)
					if(this.pos.y >= ig.game.groundPos){
						
						var dist = this.pos.y - ig.game.groundPos
						this.hitWater = true;
						this.vel.y -= dist/1.1;

						//console.log("ON WATER")
						
					}
					
					if(this.hitWater){
						if(this.pos.y < ig.game.groundPos){
							this.vel.y /= 1.05;
						}
					}
					//Slowly Decrease Alpha
					this.pos.x -= 1;
					
					this.currentAnim.alpha = this.idleTimer.delta().map(this.lifetime - this.fadetime, this.lifetime, 1, 0);
					this.parent();
				},
				
				check: function(other){
					if(this.enableTimer.delta() > .3){
						this.kill();
						//ig.game.money += (this.value);
					}
					
				}
			});	
			
			
		
		EntityExpExplosion = ig.EntityExtended.extend({
			lifetime:1,
			callback:null,
			particles:5,
			
			init:function(x,y,settings){
				this.parent(x, y, settings)
				for (var i = 0; i < this.particles; i++) {
	                ig.game.spawnEntity(EntityExpBubble, this.pos.x, this.pos.y)
	                this.idleTimer = new ig.Timer();
	            }
	        },
	        update: function () {
	            if (this.idleTimer.delta() > this.lifetime) {
	                this.kill();
	                if (this.callBack) this.callBack();
	                return;
	            }
	        },
		});
		
		EntityExpBubble = ig.EntityExtended.extend({

				performance: _c.KINEMATIC,

				size: {x:8, y:8},
				maxVel: {x:200, y:200},
				lifetime: 10,
				fadetime: .3,
				bounciness: 0,
				vel: {x:100, y:30},
				friction: {x:100, y:100},
				collides: ig.Entity.COLLIDES.LITE,
				colorOffset: 0,
				totalColors: 7,
				value: 1,
				
				type: ig.Entity.TYPE.NONE,
				checkAgainst: ig.Entity.TYPE.A, //I hate baddies
				collides: ig.Entity.COLLIDES.PASSIVE,
				player:null,
				
				animSheet: new ig.AnimationSheet( 'media/game_elements/drops/expbubble.png', 8, 8),
				
				init:function(x,y,settings){
					this.parent(x,y,settings);
					this.addAnim('idle', 0.2, [0,1,2,3,4,5]);
					this.vel.x = (Math.random()*2 - 1) * this.vel.x;
					this.vel.y = (Math.random()*2 - 1) * this.vel.y;
					this.gravityFactor = 0;
					//set the timer
					this.idleTimer = new ig.Timer();
					this.enableTimer = new ig.Timer();
					this.player = ig.game.getEntitiesByType(EntityTurboLog)[0];
				},
				
				update: function() {
					if (this.idleTimer.delta() > this.lifetime){
						this.kill();
						return;
					}
					//Slowly Decrease Alpha
					this.pos.x -= 1;
					
					
					if(this.player){
						if(this.player.pos.x < this.pos.x){
							this.accel.x = -10 * _c.MAGNETISM;
						} 
						if(this.player.pos.x > this.pos.x){
							this.accel.x = 10 * _c.MAGNETISM;
						}
						if(this.player.pos.y < this.pos.y){
							this.accel.y = -10 * _c.MAGNETISM;
						} 
						if(this.player.pos.y > this.pos.y){
							this.accel.y = 10 * _c.MAGNETISM;
						}
					}
					if(this.pos.x < ig.game.screen.x){
						this.kill();
					}
					//console.log(this.pos.x)
					
					this.currentAnim.alpha = this.idleTimer.delta().map(this.lifetime - this.fadetime, this.lifetime, 1, 0);
					this.parent();
				},
				
				check: function(other){
					if(this.enableTimer.delta() > .3){
						this.kill();
						//ig.game.exp += 1;
					}
					
				}
				
		});
				
	
	
	
});
