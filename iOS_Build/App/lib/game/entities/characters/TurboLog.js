ig.module(
	'game.entities.characters.TurboLog'
)
.requires(
	'plusplus.core.entity'
)
.defines(function(){
	var _c = ig.CONFIG;
	var _ut = ig.utils;
	
	//Base Turbo Log - Needs to be extended
	EntityTurboLog = ig.EntityExtended.extend({
		performance: _c.KINEMATIC,
		
		//
		size: {x:32, y:32},
		zIndex:4,
		accelModulator:{x:130, y:110},
		
		//Animsheet
		animSheet: new ig.AnimationSheet(_c.PATH_TO_MEDIA + 'game_elements/logs/turbolog.png', 32, 32 ),
		animSettings:{
			idle: {
				name:"idle",
				frameTime: 1,
				sequence: [6]
			},
			
			up_one: {
				name:"up_one",
				frameTime: 1,
				sequence: [0]
			},
			up_two: {
				name:"up_two",
				frameTime: 1,
				sequence: [1]
			},
			up_three: {
				name:"up_three",
				frameTime: 1,
				sequence: [2]
			},
			down_one: {
				name:"down_one",
				frameTime: 1,
				sequence: [3]
			},
			down_two: {
				name:"down_two",
				frameTime: 1,
				sequence: [4]
			},
			down_three: {
				name:"down_three",
				frameTime: 1,
				sequence: [5]
			}
		},
		
		
		init:function(x, y, settings){
			this.parent(x,y,settings);
			this.gravityFactor = 0;	
		},
		
		update:function(){
			this.parent();
			//Set velocity
			this.vel.x = ig.game.stickLeft.input.x * this.accelModulator.x;
        	this.vel.y = ig.game.stickLeft.input.y * this.accelModulator.y;
			
			//Clamp Position
			this.pos.x = Clamp(this.pos.x, ig.system.width - this.size.x, 0);
			this.pos.y = Clamp(this.pos.y, ig.system.height - this.size.y, 0);
			
			this.determineRotation();			
		},
		
		determineRotation:function(){
			if(this.vel.y > 50){
				this.currentAnim = this.anims.down_three;
			}
			else if(this.vel.y <= 50 && this.vel.y > 20){
				this.currentAnim = this.anims.down_two;
			}
			else if(this.vel.y <= 20 && this.vel.y > 0){
				this.currentAnim = this.anims.down_one;
			}
			else if(this.vel.y <= 0 && this.vel.y > -20){
				this.currentAnim = this.anims.up_one;
			}
			else if(this.vel.y <= -20 && this.vel.y > -50){
				this.currentAnim = this.anims.up_two;
			}
			else if(this.vel.y <= 50){
				this.currentAnim = this.anims.up_three;
			} else {
				this.currentAnim = this.anims.idle;
			}
			
			
		}
	
	})
})
