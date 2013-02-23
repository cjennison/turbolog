ig.module(
    'game.entities.enemies.zones.islandzone.bigbirdy'
)
.requires(
    'impact.game',
    'impact.entity'
)
.defines(function(){
 
EntityBigBirdy = ig.Entity.extend({
	size: {x: 32, y: 32},
			
			animSheet: new ig.AnimationSheet('media/enemies/seagull.png', 32, 32),

			maxVel: {x:200, y:300},
			
			y_start: null,
			flyState: "DOWN",
			health:1,
			//collisions
			type: ig.Entity.TYPE.B,
			checkAgainst: ig.Entity.TYPE.A, //I hate goodies
			collides: ig.Entity.COLLIDES.PASSIVE,
	
		
	init:function(x,y,settings){
		this.parent(x,y,settings);
				this.y_start = y;
				this.addAnim('idle', .1, [0,1,2,3,4,5,6,7,8]);
				this.currentAnim = this.anims.idle;
				if (Math.random() < .5){
					this.flyState = "UP";
				}
	},
		
	update: function(){
				this.pos.x -= 2;
				if (this.pos.x < ig.game.screen.x - 100){
					this.kill();
				}
				
				if (this.flyState == "DOWN"){
					this.accel.y = 20;
					if (this.pos.y > this.y_start + 10){
						this.flyState = "UP";
					}
				}
				if (this.flyState == "UP"){
					this.accel.y = -20;
					if (this.pos.y < this.y_start){
						this.flyState = "DOWN";
					}
				}
				
				if(ig.game.bombExploded){
					this.kill();
				}

				this.parent();
			},
	
	check:function(other){
		this.kill();
	},
	
	sendHit:function(){
		this.kill();
	},
	
	kill:function(){
		this.parent();
		ig.game.spawnEntity(EntityCoinExplosion, this.pos.x, this.pos.y)
		if(GAME_TYPE == "STORY"){
			ig.game.spawnEntity(EntityExpExplosion, this.pos.x, this.pos.y, {particles:2})
		}

	}

});


});