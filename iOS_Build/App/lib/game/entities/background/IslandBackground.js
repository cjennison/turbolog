ig.module(
	'game.entities.background.IslandBackground'
)
.requires(
	 'plusplus.core.entity'
) 
.defines(function(){
	
	//define class globals
	var _c = ig.CONFIG;
	var _ut = ig.utils;
	var zone = "island";
	
	
	EntityIslandBackground = ig.EntityExtended.extend({
		performance: _c.KINEMATIC,
		//Define Animation Sheet and Animation Settings (REQUIRED)
		animSheet: new ig.AnimationSheet(_c.PATH_TO_MEDIA + 'game_elements/worlds/' + zone + "/levelOne_background.png", 4000, 640),
		animSettings: {
			idle: {
				frameTime: 1,
				sequence: [0]
			}
		},
		//maxVel:{x:-100, y:0},

		size: {x:4000, y:640},
		zIndex:1,

		init:function(x,y,settings){
			this.parent(x,y,settings);
			this.maxVel.y = 0;
			
			//ig.game.foreground = ig.game.spawnEntity(EntityIslandForeground,0,0)
			ig.game.midgroud = ig.game.spawnEntity(EntityIslandMidground,0,0)
			ig.game.frontground = ig.game.spawnEntity(EntityIslandFrontground,-100,0)
		},
		
		update:function(){
			this.parent()
		
			var movingSpeed = ig.game.movementSpeed * -1;
			this.pos.x += movingSpeed/15;
			
			if(ig.input.state("up")){
				this.pos.y += .1;
			} else if(ig.input.state("down")){
				this.pos.y -= .1;
			}
			
			if(this.pos.x < -this.size.x + ig.system.width){
				this.pos.x = 0;
			}
		},
		
		draw:function(){
			this.parent();
		}
	})
	
	
	EntityIslandForeground = ig.EntityExtended.extend({
		performance: _c.KINEMATIC,
		//Define Animation Sheet and Animation Settings (REQUIRED)
		animSheet: new ig.AnimationSheet(_c.PATH_TO_MEDIA + 'game_elements/worlds/' + zone + "/levelOne_foregound.png", 4000, 480),
		animSettings: {
			idle: {
				frameTime: 1,
				sequence: [0]
			}
		},
			//maxVel:{x:-100, y:0},
			zIndex:10,

		size: {x:4000, y:480},

		init:function(x,y,settings){
			this.parent(x,y,settings);
			console.log("LOADED")
			this.maxVel.y = 0;
		},
		
		update:function(){
			this.parent()
		
			var movingSpeed = ig.game.movementSpeed * -1;
			this.pos.x += movingSpeed/7;
			if(ig.input.state("up")){
				this.pos.y += .2;
			} else if(ig.input.state("down")){
				this.pos.y -= .2;
			}
			
			if(this.pos.x < -this.size.x + ig.system.width){
				this.pos.x = 0;
			}
		},
		
		draw:function(){
			this.parent();
		}
	});
	
	EntityIslandMidground = ig.EntityExtended.extend({
		performance: _c.KINEMATIC,
		//Define Animation Sheet and Animation Settings (REQUIRED)
		animSheet: new ig.AnimationSheet(_c.PATH_TO_MEDIA + 'game_elements/worlds/' + zone + "/levelOne_midgound1.png", 4000, 480),
		animSettings: {
			idle: {
				frameTime: 1,
				sequence: [0]
			}
		},
			//maxVel:{x:-100, y:0},
			zIndex:2,
		size: {x:4000, y:480},

		init:function(x,y,settings){
			this.parent(x,y,settings);
			console.log("LOADED")
			this.maxVel.y = 0;
			//this.alpha = .5;
		},
		
		update:function(){
			this.parent()
		
			var movingSpeed = ig.game.movementSpeed * -1;
			this.pos.x += movingSpeed/7;
			
			
			if(this.pos.x < -this.size.x + ig.system.width){
				this.pos.x = 0;
			}
		},
		
		draw:function(){
			this.parent();
		}
	})
	
	EntityIslandFrontground = ig.EntityExtended.extend({
		performance: _c.KINEMATIC,
		//Define Animation Sheet and Animation Settings (REQUIRED)
		animSheet: new ig.AnimationSheet(_c.PATH_TO_MEDIA + 'game_elements/worlds/' + zone + "/levelOne_midground2.png", 4000, 480),
		animSettings: {
			idle: {
				frameTime: 1,
				sequence: [0]
			}
		},
			//maxVel:{x:-100, y:0},
			zIndex:2,
		size: {x:4000, y:480},

		init:function(x,y,settings){
			this.parent(x,y,settings);
			console.log("LOADED")
			this.maxVel.y = 0;
			//this.alpha = .5;
		},
		
		update:function(){
			this.parent()
		
			var movingSpeed = ig.game.movementSpeed * -1;
			this.pos.x += movingSpeed/10;
			
			
			if(this.pos.x < -this.size.x + ig.system.width){
				this.pos.x = 0;
			}
		},
		
		draw:function(){
			this.parent();
		}
	})
	
})
