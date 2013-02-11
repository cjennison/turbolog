ig.module(
	'game.entities.player'
)
.requires(
	'impact.entity',
	'impact.sound'
)
.defines(function(){

EntityPlayer = ig.Entity.extend({
	size: {x:30, y:10},
	
	maxVel: {x:100, y:100},
	friction: {x:100, y:100},
	
	acceleration: {x:50, y:50},
	
	type: ig.Entity.TYPE.A, // Player friendly group
	checkAgainst: ig.Entity.TYPE.B,
	collides: ig.Entity.COLLIDES.PASSIVE,
	
	animSheet: new ig.AnimationSheet('media/characters/turbolog.png', 32, 14),
	
	
	init:function(x, y, settings){
		this.parent(x, y, settings);
		this.addAnim('idle', 1, [0]);
		this.addAnim('up', 1, [1]);
		this.addAnim('down', 1, [2]);
		
		this.gravityFactor = 0;
	},
	
	update: function(){
		this.parent();
		
		if(Math.abs(this.vel.y) < 10){
			this.currentAnim = this.anims.idle;

		}
		
		if(ig.input.state("down")){
			this.vel.y = this.acceleration.y;
			this.currentAnim = this.anims.down;
		}
		if(ig.input.state("up")){
			this.vel.y = -this.acceleration.y;
			this.currentAnim = this.anims.up;
		}
		if(ig.input.state("left")){
			this.vel.x = -this.acceleration.x;
		}
		if(ig.input.state("right")){
			this.vel.x = this.acceleration.x;
		}
		
		//console.log(this.vel)
	}

});

});