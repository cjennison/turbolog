ig.module(
	'game.entities.player'
)
.requires(
	'impact.entity',
	'impact.sound'
)
.defines(function(){

EntityPlayer = ig.Entity.extend({
	size: {x:32, y:12},
	offset: {x:0,y:8},
	maxVel: {x:100, y:100},
	friction: {x:100, y:100},
	
	acceleration: {x:80, y:50},
	
	type: ig.Entity.TYPE.A, 
	checkAgainst: ig.Entity.TYPE.B,
	collides: ig.Entity.COLLIDES.PASSIVE,
	
	animSheet: new ig.AnimationSheet('media/characters/turbologtwo.png', 32, 32),
	health:100,
	ability:80,
	rechargeRate:.01,
	maxAbility:80,
	toughness:2,
	dying:false,
	deathTimer:null,
	
	init:function(x, y, settings){
		this.parent(x, y, settings);
		this.addAnim('idle', .3, [6]);
		this.addAnim('up', 1, [2]);
		this.addAnim('down', 1, [5]);
		
		this.gravityFactor = 0;
	},
	
	update: function(){
		this.parent();
		
		
		var flame = ig.game.getEntitiesByType(EntityFlames)[0];
		if(flame){
			flame.pos.x = this.pos.x - 16;
			flame.pos.y = this.pos.y - 8;
		}
		
		
		if(this.dying){
			this.die();
			return;
		}
		
		
		if(Math.abs(this.vel.y) < 10){
			this.currentAnim = this.anims.idle;
			flame.currentAnim = flame.anims.idle;
		}
		
		
		if(this.maxAbility > this.ability){
			this.ability += this.rechargeRate;
		}
		
		this.checkInput(flame);
		this.checkLimits();

	},
	
	die:function(){
		this.pos.y += 1;
		if(this.pos.y > ig.system.height){
			
		}
		if(this.deathTimer == null){ return; }
		if(this.deathTimer.delta() > 3){
			this.deathTimer = null;
			ig.game.spawnEntity(EntityBlackOverlay, 0,0);

			ig.game.spawnEntity(EntityDeathAnim, ig.system.width/2 - 256/2, 10);

		}
	},
	
	checkInput:function(flame){
		if(ig.input.state("down")){
			this.vel.y = this.acceleration.y;
			this.currentAnim = this.anims.down;
			if(flame){flame.currentAnim = flame.anims.down; };
		}
		if(ig.input.state("up")){
			this.vel.y = -this.acceleration.y;
			this.currentAnim = this.anims.up;
			if(flame){flame.currentAnim = flame.anims.up; };
		}
		if(ig.input.state("left")){
			this.vel.x = -this.acceleration.x;
		}
		if(ig.input.state("right")){
			this.vel.x = this.acceleration.x;
		}
		
		
		if(ig.input.pressed('shoot')){
			
			if(this.ability > 10){
				this.ability--;
				ig.game.spawnEntity(EntityBullet, this.pos.x + this.size.x - 2, this.pos.y + this.size.y/2 - 2);
			}
		}
		
		ig.game.spawnEntity(EntityDeathExplosion, this.pos.x + 4, this.pos.y + 15 + (Math.random() * 15 - 7.5));

	},
	
	checkLimits:function(){
		if(this.pos.x < 0){
			this.pos.x = 1;
			this.vel.x = 0;
		}
		
		if(this.pos.x > ig.system.width - this.size.x){
			this.pos.x = ig.system.width - this.size.x - 1;
			this.vel.x = 0;
		}
		
		if(this.pos.y < 30){
			this.pos.y = 31;
			this.vel.y = 0;
		}
		
		if(this.pos.y > ig.system.height - this.size.y - 30){
			this.pos.y = ig.system.height - this.size.y - 31;
			this.vel.y = 0;
		}
	},
	
	hurt:function(amt){
		if(ig.game.shieldActive){ return; }
		this.health -= (amt - this.toughness);
		if(this.health <= 0){
			this.dying = true;
			this.deathTimer = new ig.Timer();
			ig.game.prepareToKillGame();
			
			var controller = ig.game.getEntitiesByType(EntityEnemyController)[0];
			if(controller){
				controller.killController();
			}
		}
	}
	

});


EntityFlames= ig.Entity.extend ({
			
			size: {x: 30, y: 14},
			offset: {x:2, y: 2},
			
			type: ig.Entity.TYPE.NONE,
			checkAgainst: ig.Entity.TYPE.NONE, //I hate baddies
			collides: ig.Entity.COLLIDES.PASSIVE,
			
			animSheet: new ig.AnimationSheet('media/characters/fire.png', 64, 32),
			
			init: function(x,y,settings){
				this.parent(x,y,settings);
				this.setAnimations(0);
				
			},
			
			setAnimations: function(offset){
				offset = offset * 3;
				this.addAnim('idle', .1, [0,1,2,3]);
				this.addAnim('up', .1, [6,7,8]);
				this.addAnim('down', .1, [10,11,12,13]);
				this.currentAnim = this.anims.idle;
			},
			
	});
	
EntityBullet = ig.Entity.extend({
			size: {x:7, y: 3},
			animSheet: new ig.AnimationSheet('media/projectiles/fireboltanim.png', 10, 5),
			maxVel: {x:200, y:0},
			
			//collisions
			type: ig.Entity.TYPE.NONE,
			checkAgainst: ig.Entity.TYPE.B, //I hate baddies
			collides: ig.Entity.COLLIDES.PASSIVE,
			
			init: function(x,y,settings){
				this.parent(x,y,settings);
				this.setAnimations(0);
				
			},
			
			setAnimations: function(offset){
				offset = offset * 3;
				this.addAnim('move', .8, [0,1,2]);
				this.currentAnim = this.anims.move;
			},
			
			update: function (){
				this.pos.x += 5;
				if (this.pos.x > ig.game.screen.width + 20){
					this.kill();
				}
			},
			
			kill: function(){
				this.parent();
				//ig.game.bulletsOnScreen--;
			},
			
			//Did i hit one of those type B things?
			check: function( other ){
				console.log("LOL");
				if(other.name != "BOSS"){
					other.health--;
				}
				
				other.sendHit(5);
				this.kill();
			} 
			
		});
		
		EntityDeathExplosion = ig.Entity.extend({
				//vars
				lifetime: 1,
				callBack:null,
				particles: 1,
				
				init: function(x, y, settings){
					this.parent(x, y, settings);
					for (var i = 0; i < this.particles; i++){
						ig.game.spawnEntity(EntityDeathExplosionParticle, x, y,{colorOffset: settings.colorOffset ? settings.colorOffset : 0});
						this.idleTimer = new ig.Timer();
					}
				},
				update: function() {
					if (this.idleTimer.delta() > this.lifetime){
						this.kill();
						if(this.callBack)
							this.callBack();
						return;
					}
				}, 
			});
		EntityDeathExplosionParticle = ig.Entity.extend({
		
				size: {x:2, y:2},
				maxVel: {x:160, y:200},
				lifetime: .5,
				fadetime: .3,
				bounciness: 0,
				vel: {x:100, y:30},
				friction: {x:100, y:0},
				collides: ig.Entity.COLLIDES.LITE,
				colorOffset: 0,
				totalColors: 7,
				animSheet: new ig.AnimationSheet( 'media/drops/blood.png', 2, 2),
				
				init: function(x, y, settings){
					this.parent(x, y, settings);
					
					//Figure out if its the Human blood or the Zombie blood!
					var frameID = Math.round(Math.random()*this.totalColors) + (this.colorOffset * (this.totalColors+1)); //Random pixel of the total colors(1-8) + the offset * teh size of the colors(7)[Pixel 5 of Offset 0(Human)]
					this.addAnim('idle', 0.2, [frameID]);
					
					//Random directions to make it a bit more interesting..
					this.vel.x = (Math.random()*2 - 4) * this.vel.x;
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
					this.currentAnim.alpha = this.idleTimer.delta().map(this.lifetime - this.fadetime, this.lifetime, 1, 0);
					this.parent();
				},
			});

});