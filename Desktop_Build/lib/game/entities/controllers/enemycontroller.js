ig.module(
    'game.entities.controllers.enemycontroller')
    .requires(
    'impact.game',
    'impact.entity',
    'impact.background-map')
    .defines(function () {

    EntityEnemyController = ig.Entity.extend({

        xPos: null,
        yPos: null,

        sawBladeyTimer: null,

        init: function (x, y, settings) {
            this.parent(x, y, settings);

            this.sawBladeyTimer = new ig.Timer();

            this.xPos = ig.system.width;

        },

        update: function () {
            this.parent();

            if (this.sawBladeyTimer.delta() > 2) {
                var yPos = Math.random() * ig.system.height - 20;
                ig.game.spawnEntity(EntitySawBladey, this.xPos, yPos);
                this.sawBladeyTimer.reset();
            }
        }

    });

    EntityCoinExplosion = ig.Entity.extend({
        //vars
        lifetime: 1,
        callBack: null,
        particles: 5,

        init: function (x, y, settings) {
            this.parent(x, y, settings);
            for (var i = 0; i < this.particles; i++) {
                if (Math.random() < .8) {
                    ig.game.spawnEntity(EntityCoin, x, y, {
                        colorOffset: settings.colorOffset ? settings.colorOffset : 0
                    });
                }
                if (Math.random() > .8 && Math.random() < .95) {
                    ig.game.spawnEntity(EntityCoin, x, y, {
                        colorOffset: settings.colorOffset ? settings.colorOffset : 1
                    });

                }
                if (Math.random() > .95 && Math.random() < 1) {
                    ig.game.spawnEntity(EntityCoin, x, y, {
                        colorOffset: settings.colorOffset ? settings.colorOffset : 2
                    });

                }
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
    
    EntityCoin = ig.Entity.extend({

		
				size: {x:2, y:2},
				maxVel: {x:160, y:200},
				lifetime: 3,
				fadetime: .3,
				bounciness: 0,
				vel: {x:100, y:30},
				friction: {x:100, y:0},
				collides: ig.Entity.COLLIDES.LITE,
				colorOffset: 0,
				totalColors: 7,
				
				type: ig.Entity.TYPE.NONE,
				checkAgainst: ig.Entity.TYPE.A, //I hate baddies
				collides: ig.Entity.COLLIDES.PASSIVE,
				
				
				animSheet: new ig.AnimationSheet( 'media/drops/coins.png', 8, 8),
				
				init: function(x, y, settings){
					this.parent(x, y, settings);
					
					//Figure out if its the Human blood or the Zombie blood!
					
					this.addAnim('idle', 0.2, [this.colorOffset]);
					
					//Random directions to make it a bit more interesting..
					this.vel.x = (Math.random()*2 - 1) * this.vel.x;
					this.vel.y = (Math.random()*2 - 1) * this.vel.y;
					
					//set the timer
					this.idleTimer = new ig.Timer();
				},
				
				update: function() {
					if (this.idleTimer.delta() > this.lifetime){
						this.kill();
						return;
					}
					//Slowly Decrease Alpha
					this.pos.x -= 1;
					
					this.currentAnim.alpha = this.idleTimer.delta().map(this.lifetime - this.fadetime, this.lifetime, 1, 0);
					this.parent();
				},
				
				check: function(other){
					this.kill();
					ig.game.money += (10 * this.colorOffset);
				}
			});			


});