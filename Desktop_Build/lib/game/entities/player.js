ig.module(
	'game.entities.player'
)
.requires(
	'impact.entity',
	'impact.sound'
)
.defines(function(){

EntityPlayer = ig.Entity.extend({
	size: {x:42, y:22},
	
	maxVel: {x:100, y:100},
	friction: {x:100, y:100},
	
	acceleration: {x:80, y:50},
	
	type: ig.Entity.TYPE.A, 
	checkAgainst: ig.Entity.TYPE.B,
	collides: ig.Entity.COLLIDES.PASSIVE,
	
	animSheet: new ig.AnimationSheet('media/characters/turbolog.png', 32, 32),
	health:100,
	ability:80,
	rechargeRate:.01,
	maxAbility:80,
	toughness:2,
	
	init:function(x, y, settings){
		this.parent(x, y, settings);
		this.addAnim('idle', 1, [6]);
		this.addAnim('up', 1, [2]);
		this.addAnim('down', 1, [5]);
		
		this.gravityFactor = 0;
	},
	
	update: function(){
		this.parent();
		
		
		var flame = ig.game.getEntitiesByType(EntityFlames)[0];
		if(flame){
			flame.pos.x = this.pos.x + 2;
			flame.pos.y = this.pos.y + 9;
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
			this.ability--;
			ig.game.spawnEntity(EntityBullet, this.pos.x + this.size.x - 2, this.pos.y + this.size.y/2 - 2);
		}
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
		this.health -= (amt - this.toughness)
	}
	

});


EntityFlames= ig.Entity.extend ({
			
			size: {x: 30, y: 14},
			offset: {x:2, y: 2},
			
			type: ig.Entity.TYPE.NONE,
			checkAgainst: ig.Entity.TYPE.NONE, //I hate baddies
			collides: ig.Entity.COLLIDES.PASSIVE,
			
			animSheet: new ig.AnimationSheet('media/characters/flames.png', 32, 16),
			
			init: function(x,y,settings){
				this.parent(x,y,settings);
				this.setAnimations(0);
				
			},
			
			setAnimations: function(offset){
				offset = offset * 3;
				this.addAnim('idle', .1, [0,1,2,3,4]);
				this.addAnim('up', .1, [5,6,7,8,9]);
				this.addAnim('down', .1, [10,11,12,13,14]);
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
				other.health--;
				other.sendHit();
				this.kill();
			} 
			
		});


});