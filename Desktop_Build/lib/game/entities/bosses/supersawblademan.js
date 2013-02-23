ig.module(
    'game.entities.bosses.supersawblademan'
)
.requires(
    'impact.game',
    'impact.entity'
)
.defines(function(){
 
EntitySawBladeMan = ig.Entity.extend({
	size:{x:256, y:256},
	type: ig.Entity.TYPE.B, 
	checkAgainst: ig.Entity.TYPE.A,
	collides: ig.Entity.COLLIDES.PASSIVE,
	
	name:"BOSS",
	
	animSheet: new ig.AnimationSheet('media/bosses/sawboss_complete_resized.png', 192, 192),
	health:1,
	MaxHealth:300,
	immortal:true,
	
	State: {
		ENTER:true,
		SAWFURY:false,
		RUNBLADE:false,
		IDLE:false,
		DEAD:false,
	},
	
	readyToChangeState:false,
	stateChangeTimer:null,
	stateChangeDelay: 8,
	
	furyTimer:null,
	furyTime:.5,
	furyRotations:5,
	
	runPhase:1,
	
	readyToDie:false,
	deathTimer:null,
		
	init:function(x,y,settings){
		this.parent(x,y,settings);
		console.log("SAW BOSS SPAWNED")
		this.addAnim('idle', .1, [0,1,2,3,4]);
		this.addAnim('spin', .03, [8,9,10,11,12,13,14,15,16,17,18,19, 20, 21,22,23,24,25,26,27,28]);
		this.addAnim('fury', .05, [32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47]);
		this.addAnim('dead', .6, [48,49,50,51,52,53,54,55,56,57]);
	//this.healthbar = ig.game.spawnEntity(EntityHealthBar, 10, 10, {Unit:this});
		this.stateChangeTimer = new ig.Timer();
		this.deathTimer = new ig.Timer();
	},
		
	update:function(){
		this.parent();
		
		if(this.State.DEAD){
			this.currentAnim = this.anims.dead;
			this.accel.x = 0;
			this.vel.x = 0;
			if(this.deathTimer.delta() > 4){
				this.readyToDie = true;
				this.kill();
			}
			return;
		}
		
		if(this.State.ENTER){
			if(this.health < this.MaxHealth){
				this.health++;
			}
			this.currentAnim = this.anims.spin;
			this.vel.x = -50;
			if(this.pos.x < ig.system.width - 192){ 
				this.State.ENTER = false;
				this.State.IDLE = true; 
			}
		}
		
		if(this.State.IDLE){
			this.readyToChangeState = true;
			this.immortal = false;
			this.currentAnim = this.anims.idle;

			this.vel.x = 0;
		}
		if(this.readyToChangeState){
			if(this.stateChangeTimer.delta() > this.stateChangeDelay){
				this.readyToChangeState = false;
				this.stateChangeTimer.reset();
				
				//if Phase 2
				if(this.health < this.MaxHealth - 100){
					if(Math.random() < .5){
						this.State.IDLE = false;
						this.State.RUNBLADE = true;
					}else{
						this.State.IDLE = false;
						this.State.SAWFURY = true;
						this.furyTimer = new ig.Timer();
					}
				} 
				//Phase 1
				else {
					this.State.IDLE = false;
						this.State.SAWFURY = true;
						this.furyTimer = new ig.Timer();
				}
				
				
				
			}
		}
		
		
		if(this.State.SAWFURY){
			this.sawFury();
		}
		
		if(this.State.RUNBLADE){
			this.runBlade();
		}
		
		
		if(this.health < 1 && !this.immortal){
			this.State.DEAD = true;
			this.State.IDLE = false;
			this.State.RUNBLADE = false;
			this.State.SAWFURY = false;
			this.readyToChangeState = false;
			this.immortal = true;
			this.deathTimer.reset();
			this.accel.x = 0;
			this.currentAnim = this.anims.dead;
			console.log("BOSS KILLED")
		}
		
		
	},
	
	runBlade:function(){
		this.currentAnim = this.anims.spin;
					//this.immortal = true;

		if(this.runPhase == 1){
			this.accel.x = -90;
			if(this.pos.x < 0){
				this.runPhase = 2;
			}
		}
		
		if(this.runPhase == 2){
			this.accel.x = 90;
			if(this.pos.x > ig.system.width - 192){
				this.runPhase = 3;
			}
		}
		
		if(this.runPhase == 3){
			this.accel.x = -90;
			if(this.pos.x < ig.system.width - 192){
				this.accel.x = 0;
				this.State.RUNBLADE = false;
				this.State.IDLE = true;
				this.runPhase = 1;
							this.immortal =false;

			}	
		}
		
	},
	
	sawFury:function(){
		this.currentAnim = this.anims.fury;
		if(this.furyRotations <= 0){ 
			this.State.SAWFURY = false;
			this.State.IDLE = true;
			this.furyRotations = 5;
			//this.currentAnim.rewind();
			return; 
			
		}
		if(this.furyTimer.delta() > this.furyTime){
			this.furyRotations--;
			
			var velX = (Math.random() * -90) + 45;
			var velY = (Math.random() * -90) + 45;
			var mY = 100;
			if(velY < 0){
				mY = -100
			}
			ig.game.spawnEntity(EntitySawBladey, this.pos.x + 20, this.pos.y + 86, {vel:{x:velX, y:velY}});
		}
	},
	
	check:function(other){
		//other.hurt(1);
	},
	
	sendHit:function(damage){
		//this.healthbar.showHealthBar();
		if(this.immortal) {return;}
		
		this.health -= damage;
	},
	
	kill:function(){
		if(!this.readyToDie){return;}
		
		ig.game.spawnEntity(EntityCoinExplosion, this.pos.x, this.pos.y, {particles:30})
		if(GAME_TYPE == "STORY"){
			ig.game.spawnEntity(EntityExpExplosion, this.pos.x, this.pos.y, {particles:30})
		}
		ig.game.endBossBattle();
		this.parent();
	}


});

});