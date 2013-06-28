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
		maxVel:{x:500, y:2000},
		//
		size: {x:32, y:32},
		zIndex:4,
		accelModulator:{x:200, y:170},
		zIndex:5,
		
		//Dash
		startY:null,
		endY:null,
		threshold:150,
		dashing:false,
		dash_dir:null,
		
		//Log Variables
		health:100,
		magic:100,
		dying:false,
				
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
			document.addEventListener( 'touchstart', this.touchStart.bind(this), false );
			document.addEventListener( 'touchmove', this.touchMove.bind(this), false );
			document.addEventListener( 'touchend', this.touchEnd.bind(this), false );
		},
		
		update:function(){
			this.parent();
			
			
			//Set velocity
			if(this.dashing == false){
        		this.vel.y = ig.game.stickLeft.input.y * this.accelModulator.y;
			} else {
				
				if(this.dash_dir == "down"){
					this.vel.y -= 10;
					if(this.vel.y < 20){
						this.dashing = false;
					}
				}
				if(this.dash_dir == "up"){
					this.vel.y += 10;
					if(this.vel.y > -20){
						this.dashing = false;
					}
				}
				
				
			}
			
			this.vel.x = ig.game.stickLeft.input.x * this.accelModulator.x;

			//Clamp Position
			this.pos.x = Clamp(this.pos.x, ig.system.width - this.size.x + 200, 0);
			this.pos.y = Clamp(this.pos.y, ig.system.height - this.size.y + 310, 0);
			
			this.determineRotation();		
			
			
			if(this.magic < 100){
				this.magic += .01;
			}
			
			
			//Check for firing
			if(ig.input.pressed("shoot") && this.magic > 1){
				this.magic--;
				ig.game.spawnEntity(EntityFirebolt, this.pos.x + this.size.x, this.pos.y + this.size.y/2 - 3)
				ig.game.sortEntitiesDeferred();
			}
				
		},
		
		touchStart:function(ev){
			console.log(ig.system.width/2)
			ev.preventDefault();
			
			if(this.dashing){return;}
			console.log("START: " + ev.touches[0].pageX)
			if(ev.touches[0].pageX > ig.system.width/2 && ev.touches[0].pageY < ig.system.height - 60){
				this.startY = ev.touches[0].pageY;
			} else {
				this.starty = null;
			}
			
		},
		
		touchMove:function(ev){
			ev.preventDefault();
			console.log("END: " + ev.touches[0].pageY)
			if(this.startY){
				this.endY = ev.touches[0].pageY;
			}
		},
		
		touchEnd:function(ev){
			ev.preventDefault();
			if(!this.startY || this.dashing){ return; }
			if(this.startY < this.endY - this.threshold){
				console.log("DASH DOWN")
				this.startY = null;
				this.endY = null;
				this.dashing = true;
				this.vel.y = 500;
				this.dash_dir = "down";
				
				//this.accel.x = 100;
			} else if(this.startY > this.endY + this.threshold){
				console.log("DASH DOWN")
				this.startY = null;
				this.endY = null;
				this.dashing = true;
				this.vel.y = -500;
				this.dash_dir = "up";
			}
			
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
	
	//PROJECTILES
	EntityFirebolt = ig.EntityExtended.extend({
		performance: _c.KINEMATIC,
		size: {x:10,y:5},
		animSheet: new ig.AnimationSheet(_c.PATH_TO_MEDIA + "/game_elements/projectiles/proj_fire.png", 10, 5),
		animSettings: {
			idle: {
				frameTime: 0.2,
				sequence: [0,1,2]
			}
		},
		zIndex:6,
		damage:10,
		
		init:function(x,y,settings){
			this.parent(x,y,settings);
			this.gravityFactor = 0;	
			console.log("FIRE")
		},
		
		update:function(){
			this.parent();
			this.pos.x += 5;
		}
	})
	
	//EFFECTS
	EntityFlames = ig.EntityExtended.extend({
		performance: _c.KINEMATIC,
		size:{x:64, y:32},
		animSheet: new ig.AnimationSheet('media/game_elements/logs/effects/flames.png', 64, 32),
		animSettings: {
			idle: {
				name:"idle",
				frameTime:0.1,
				sequence:[0,1,2,3,4]
			},
			up:{
				name:'up',
				frameTime:0.1,
				sequence: [5,6,7,8,9]
			},
			down:{
				name:'down',
				frameTime:0.1,
				sequence [10,11,12,13,14]
			}
			
		}
	})
})
