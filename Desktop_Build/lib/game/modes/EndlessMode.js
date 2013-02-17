ig.module( 
	'game.modes.endlessmode' 
)
.requires(
	'impact.game',
	'impact.font',
	'plugins.touch-button',
	'plugins.zmagic',
    'plugins.analog-stick',
	'game.entities.player',
	'game.entities.ui.healthbar',
	'game.entities.ui.distancemeter',
	'game.entities.controllers.enemycontroller',
	'game.entities.enemies.zones.islandzone.sawbladey',
	'game.entities.zones.islandzone'
)
.defines(function(){

EndlessMode = ig.Game.extend({
	
	// Load a font
	font: new ig.Font( 'media/04b03.font.png' ),
	player:null,
	flames:null,
	healthbar:null,
	distancemeter:null,
	barWidth: 1,
	
	//Game Variables
	distance:0,
	money:0,
		
	init: function() {
		// Initialize your game here; bind keys etc.
		
		//Keys
		ig.input.bind(ig.KEY.LEFT_ARROW, 'left');
        ig.input.bind(ig.KEY.RIGHT_ARROW, 'right');
        ig.input.bind(ig.KEY.UP_ARROW, 'up');
        ig.input.bind(ig.KEY.DOWN_ARROW, 'down');
        ig.input.bind(ig.KEY.Z, 'shoot');
		
		

		//Joystick
		var baseSize = 50;
   	    var stickSize = 20;
        var margin = 10;
        var y = ig.system.height - baseSize - margin;
        var x1 = baseSize + margin;

        this.stickLeft = new ig.AnalogStick( x1, y, baseSize, stickSize );
		
		
		//Init Entities
		this.spawnEntity(EntityIslandZone, 0, 0)
		this.flames = this.spawnEntity(EntityFlames, 40, ig.system.height/2);
		this.player = this.spawnEntity(EntityPlayer, 40, ig.system.height/2);
		//this.healthbar = this.spawnEntity(EntityHealthBar, 10, 10, {Unit:this.player});
		this.distancemeter = this.spawnEntity(EntityDistanceMeter, 0, 200)
		this.spawnEntity(EntityEnemyController, 0, 0);
		
		
	},
	
	update: function() {
		// Update all entities and backgroundMaps
		this.distance+= .01;
		this.parent();
		
	},
	
	draw: function() {
		// Draw all entities and backgroundMaps
		this.parent();
		if(this.player){
			//health bar
			ig.system.context.fillStyle = "rgb(255,0,0)";
	        ig.system.context.beginPath();
	        ig.system.context.rect(10, 6, this.barWidth * this.player.health, 6);
	        ig.system.context.closePath();
	        ig.system.context.fill();
	        
	        //ability bar
	        ig.system.context.fillStyle = "rgb(255,255,0)";
	        ig.system.context.beginPath();
	        ig.system.context.rect(10, 18, this.barWidth * this.player.ability, 6);
	        ig.system.context.closePath();
	        ig.system.context.fill();
		}
		
		
		if(ig.ua.mobile){
			this.stickLeft.draw();
        }
		// Add your own drawing code here
		var x = ig.system.width/2,
			y = ig.system.height/2;
		
		this.font.draw( 'Money: ' + this.money, 30, 30, ig.Font.ALIGN.CENTER );
	}
});

});