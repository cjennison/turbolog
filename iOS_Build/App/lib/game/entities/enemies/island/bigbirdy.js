ig.module(
	'game.entities.enemies.island.bigbirdy'
)
.requires(
	'turbolog.enemy'
)
.defines(function(){
	
	EntityBigbirdy = ig.Enemy.extend({
		
		size: {x:32, y:32},
		animSheet: new ig.AnimationSheet('media/game_elements/enemies/seagull.png', 32, 32),
		animSettings:{
			idle:{
				frameTime:.2,
				sequence:[0,1,2,3,4,5,6,7,8]
			}
		},
		
		maxVel:{x:200, y:300},
		y_start:null,
		flyState:"DOWN",
		health:1,
		
		
		init:function(x,y,settings){
			this.parent(x,y,settings);
			this.y_start = y;
			if(Math.random() < .5){
				this.flyState = "UP"
			}
		},
		
		update:function(){
			this.parent();
			
			
				
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
			
			
			this.pos.x -= 2;
		},
		
		check:function(other){
			this.kill();
		}
		
		
	})
	
})
