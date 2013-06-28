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
		accelModulator:{x:130, y:70},
		
		//Animsheet
		animSheet: new ig.AnimationSheet(_c.PATH_TO_MEDIA + 'game_elements/logs/turbolog.png', 32, 32 ),
		animSettings:{
			idle: {
				frameTime: 1,
				sequence: [6]
			}
		},
		
		
		init:function(x, y, settings){
			this.parent(x,y,settings);
			this.gravityFactor = 0;	
		},
		
		update:function(){
			this.parent();
			this.vel.x = ig.game.stickLeft.input.x * this.accelModulator.x;
        	this.vel.y = ig.game.stickLeft.input.y * this.accelModulator.y;
		
		}
	
	})
})
