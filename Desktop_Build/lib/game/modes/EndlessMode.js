ig.module( 
	'game.modes.endlessmode' 
)
.requires(
	'impact.game',
	'impact.font',
	'plugins.touch-button',
	'plugins.zmagic',
    'plugins.analog-stick',
    'plugins.savegame',
    'game.data.data',
	'game.screens.endscreen', 
	'game.entities.player',
	'game.entities.ui.healthbar',
    'game.entities.bosses.supersawblademan',
	'game.entities.ui.distancemeter',
	'game.entities.powerup.powerup',
	'game.entities.dynamictext.gametextcontroller',
	'game.entities.controllers.enemycontroller',
	'game.entities.enemies.zones.islandzone.sawbladey',
	'game.entities.enemies.zones.islandzone.bigbirdy',
	'game.entities.enemies.zones.islandzone.speedysaw',
	'game.entities.zones.islandzone_fore',

	'game.entities.zones.islandzone'
)
.defines(function(){

EndlessMode = ig.Game.extend({
	
	
	
	// Load a font
	font: new ig.Font( 'media/04b03.font.png' ),
	
	transitioning:false,
	transitionTarget:"none",
	transitionTimer:null,
	
	//Objects
	player:null,
	flames:null,
	healthbar:null,
	distancemeter:null,
	barWidth: 1.8,
	
	//Game Variables
	distance:0,
	money:0,
	exp:0,
	multiplier:1,
	laserActive:false,
	laser:null,
	laserBeam:null,
	laserTimer:null,
	
	//Shield
	shieldActive:false,
	shield:null,
	shieldTimer:null,
	
	//Bomb
	bombExploded:false,
	bombTimer:null,
	bombAlpha:0,
	bombLaunched:false,

	enemyController:null,
	enemyInitTimer:null,
	
	bossFight:false,
	boss:null,
	
	gameWinTimer:null,
	gameWinDelay: 10,
		
	init: function() {
		this.transitionTimer = new ig.Timer();

		// Initialize your game here; bind keys etc.
		//Keys
		ig.input.bind(ig.KEY.LEFT_ARROW, 'left');
        ig.input.bind(ig.KEY.RIGHT_ARROW, 'right');
        ig.input.bind(ig.KEY.UP_ARROW, 'up');
        ig.input.bind(ig.KEY.DOWN_ARROW, 'down');
        ig.input.bind(ig.KEY.Z, 'shoot');
        
        //Powerups
        ig.input.bind(ig.KEY.L, 'laser');
        ig.input.bind(ig.KEY.K, 'shield');
		ig.input.bind(ig.KEY.J, 'bomb');
		
		//Debug
		ig.input.bind(ig.KEY.U, 'spawnboss');
		
		this.enemyInitTimer = new ig.Timer();
		//Joystick
		var baseSize = 50;
   	    var stickSize = 20;
        var margin = 10;
        var y = ig.system.height - baseSize - margin;
        var x1 = baseSize + margin;

        this.stickLeft = new ig.AnalogStick( x1, y, baseSize, stickSize );
		
		var data = new ig.Data();
		console.log(data.test)
		//Init Entities
		this.spawnEntity(EntityIslandZone, 0, 0)
		this.spawnEntity(EntityIslandZoneForeground, 0, 230)

		this.flames = this.spawnEntity(EntityFlames, 40, ig.system.height/2);
		this.player = this.spawnEntity(EntityPlayer, 40, ig.system.height/2);
		//this.healthbar = this.spawnEntity(EntityHealthBar, 10, 10, {Unit:this.player});
		this.distancemeter = this.spawnEntity(EntityDistanceMeter, 0, 200)
		this.spawnEntity(EntityIslandZoneText, -200, 100)
		
		this.transitionTimer.reset();

	},
	
	update: function() {
		// Update all entities and backgroundMaps
		this.distance+= .01;
		if(this.enemyInitTimer){
			if(this.enemyInitTimer.delta() > 4){
				this.enemyController = this.spawnEntity(EntityEnemyController, 0, 0);
				this.enemyInitTimer = null;
			}
		}
		
		
		if(this.killGameTimer){
			if(this.killGameTimer.delta() > 6){
				new_money = this.money;
				new_exp = this.exp;
				ig.system.setGame(EndScreen)
			}
		}
		
		if(ig.input.pressed('spawnboss')){
			this.startBossBattle();
		}
		
		if(this.gameWinTimer){
			if(this.gameWinTimer.delta() > this.gameWinDelay){
				new_money = this.money;
				new_exp = this.exp;
				ig.system.setGame(EndScreen);
			}
		}
		this.transitions();
		this.updatePowerups();
		this.parent();
		
	},
	
	
	transitions:function(){
		if(this.transitionTimer == null || this.bossFight){return};
		if(this.transitionTimer.delta() > 30){
			this.transitioning = true;
			this.transitionTarget = this.getTransition();
			console.log(this.transitionTarget)
			this.transitionTimer.reset();
			
		}
	},
	
	getTransition:function(){
				var rand = Math.random();
				if(rand < .3){
					return("SKY");
				}
				else if(rand >= .3 && rand < .6){
					return("SEALEVEL");
				} else {
					return("UNDERWATER");
				}
			},
			
	updatePowerups:function(){
		//Laser
		if(!this.laserActive){
			if(ig.input.pressed("laser")){
				if(NUM_LASERS > 1){
					NUM_LASERS--;
					this.laserActive = true;
					this.laserTimer = new ig.Timer();
					this.laser = this.spawnEntity(EntityLaser, this.player.pos.x, this.player.pos.y, {player:this.player})
					this.laserBeam = this.getEntitiesByType(EntityLaserBeam)[0];
				}
			}
		}
		
		if(this.laserTimer){
			if(this.laserTimer.delta() > laser_time){
				this.laser.kill();
				this.laserBeam.kill();
				this.laserTimer = null;
				this.laserActive = false;
			}
		}
		
		//Shield
		if(!this.shieldActive){
			if(ig.input.pressed("shield")){
				if(NUM_SHIELDS > 1){
					NUM_SHIELDS--;
					this.shieldActive = true;
					this.shieldTimer = new ig.Timer();
					this.shield = this.spawnEntity(EntityShield, this.player.pos.x, this.player.pos.y, {player:this.player})
				}
			}
		}
		if(this.shieldTimer){
			if(this.shieldTimer.delta() > shield_time){
				this.shield.kill();
				this.shieldActive = false;
				this.shieldTimer = null;
			}
		}
		
		//Bomb
		if(!this.bombLaunched){
			if(ig.input.pressed("bomb")){
				if(NUM_BOMBS > 1){
					NUM_BOMBS--;
					this.bombLaunched = true;
					this.spawnEntity(EntityBomb, this.player.pos.x, this.player.pos.y)
				}
				
			}
		}
		
		
		if(this.bombTimer){
			if(this.bombTimer.delta() > 1){
				this.bombExploded = false;
				this.bombTimer = null;
			}
		}
		
	},
	
	startBossBattle:function(){
		this.boss = this.spawnEntity(EntitySawBladeMan, ig.system.width, 30);
		this.enemyController.kill();
		this.bossFight = true;
		this.transitionTimer == null
	},
	
	endBossBattle:function(){
		this.gameWinTimer = new ig.Timer();
		
	},
	
	destroyAllEnemies:function(){
		this.bombExploded = true;
		this.bombTimer = new ig.Timer();
		this.bombLaunched = false;
	},
	
	prepareToKillGame:function(){
		this.killGameTimer = new ig.Timer();
	},
	
	draw: function() {
		// Draw all entities and backgroundMaps
		this.parent();
		if(this.player && this.player.dying == false){
			var img = new ig.Image('media/ui/HealthBarTwo.png');
			img.draw(10,1, 0, 0, this.barWidth * this.player.health, 25);	        
	        if(this.player.ability > 0){
	        	var aimg = new ig.Image('media/ui/AbilityBar.png');
				aimg.draw(10,20, 0, 0, this.barWidth * this.player.ability, 25);
	        }
	        this.font.draw( 'Money: ' + this.money, 50, 50, ig.Font.ALIGN.CENTER );
		}
		
		this.drawBomb();
		
		if(this.bossFight && this.boss && this.boss.health > 1){
			var img = new ig.Image('media/ui/bossHealth.png');
			img.draw(ig.system.width/2 - 90 ,150, 0, 0, this.boss.health/1.32, 50);
		}
		
		if(ig.ua.mobile){
			this.stickLeft.draw();
        }
		// Add your own drawing code here
		var x = ig.system.width/2,
			y = ig.system.height/2;
		
	},
	
	drawBomb:function(){
		var explodeAnimSheet = new ig.AnimationSheet( 'media/screens/whitescreen.png', 800, 240 );
		var explodeAnim = new ig.Animation( explodeAnimSheet, 1, [0] );
		if(this.bombExploded){
			if(this.bombAlpha < 1){this.bombAlpha += .1;}
		} else {
			if(this.bombAlpha > 0.2){this.bombAlpha -= .02;} else { this.bombAlpha = 0;}
		}
		explodeAnim.alpha = this.bombAlpha;
		explodeAnim.update();
		explodeAnim.draw(0,0);
	}
});

});