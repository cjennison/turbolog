ig.module( 
	'game.modes.endlessmode' 
)
.requires(
	'impact.game',
	'impact.font',
	'plugins.touch-button',
	'plugins.zmagic',
    'plugins.analog-stick',
	'game.entities.player'
)
.defines(function(){

EndlessMode = ig.Game.extend({
	// Load a font
	font: new ig.Font( 'media/04b03.font.png' ),
	player:null,
	
	init: function() {
		// Initialize your game here; bind keys etc.
		//keys
		 ig.input.bind(ig.KEY.LEFT_ARROW, 'left');
         ig.input.bind(ig.KEY.RIGHT_ARROW, 'right');
         ig.input.bind(ig.KEY.UP_ARROW, 'up');
         ig.input.bind(ig.KEY.DOWN_ARROW, 'down');
		
		
		//Joystick
		var baseSize = 50;
   	    var stickSize = 20;
        var margin = 10;
        var y = ig.system.height - baseSize - margin;
        var x1 = baseSize + margin;

        this.stickLeft = new ig.AnalogStick( x1, y, baseSize, stickSize );
		
		
		//Init Entities
		var player = this.spawnEntity(EntityPlayer, 40, ig.system.height/2);
		
		
		
	},
	
	update: function() {
		// Update all entities and backgroundMaps
		this.parent();
		
		// Add your own, additional update code here
	},
	
	draw: function() {
		// Draw all entities and backgroundMaps
		this.parent();
		
		if(ig.ua.mobile){
			this.stickLeft.draw();
        }
		// Add your own drawing code here
		var x = ig.system.width/2,
			y = ig.system.height/2;
		
		//this.font.draw( 'It Works!', x, y, ig.Font.ALIGN.CENTER );
	}
});

});