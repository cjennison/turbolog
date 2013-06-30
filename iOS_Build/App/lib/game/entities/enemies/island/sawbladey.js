ig.module(
	'game.entities.enemies.island.sawbladey'
)
.requires(
	'turbolog.enemy'
)
.defines(function(){
	
	
	//The Ultimate Basic Enemy!
	EntitySawbladey = ig.Enemy.extend({
		
		//Define your size bounds
		size: {x:32, y:32},
		
		//Animation sheet and settings
		animSheet: new ig.AnimationSheet('media/game_elements/enemies/saw.png', 32, 32),
		animSettings:{
			idle:{
				frameTime:.07,
				sequence:[0,1,2,3,4,5,6]
			}
		},
		
		//Max velocity and velocity
		maxVel:{x:-600, y:100},
		vel:{x:-90, y:0},
		
		//health
		health:2,
		MaxHealth:2,
		
		//Worth
		money_worth:2,
		exp_worth:1,
		
		//mod
		mod:100,
		
		init:function(x,y,settings){
			this.parent(x,y,settings);
			
			//SPEED MODIFIER
			var speedMod = ig.game.movementSpeed/this.mod * this.vel.x ;
			this.vel.x = speedMod;
			

		},
		
		update:function(){
			this.parent();
			
			
		},
		
		//Hurt the player on touch
		check:function(other){
			this.kill();
			other.hurt(10);
		}
		
		
	})
	
})
