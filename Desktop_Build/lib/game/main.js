var GAME_TYPE = "STORY";

//STATISTIC VARIABLES
var magnetism = 1;
var laser_time = 5;

//TEMPORARY VARIABLES
var new_money = 0;
var new_exp = 0;

//TOTAL VARIABLES
var TOTAL_MONEY = 0;
var TOTAL_EXP = 0;
var CURRENT_LEVEL = 0;

ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	'impact.font',
	'game.screens.mainmenu',
	'game.screens.introduction',
	'game.modes.endlessmode'
)
.defines(function(){

MyGame = ig.Game.extend({
	
	// Load a font
	font: new ig.Font( 'media/04b03.font.png' ),
	
	
	init: function() {
		// Initialize your game here; bind keys etc.
		
	},
	
	update: function() {
		// Update all entities and backgroundMaps
		this.parent();
		
		// Add your own, additional update code here
	},
	
	draw: function() {
		// Draw all entities and backgroundMaps
		this.parent();
		
		
		// Add your own drawing code here
		var x = ig.system.width/2,
			y = ig.system.height/2;
		
		this.font.draw( 'It Works!', x, y, ig.Font.ALIGN.CENTER );
	}
});


// Start the Game with 60fps, a resolution of 320x240, scaled
// up by a factor of 2
		 var height = 240;
         var scale = window.innerHeight / height;
         var width = window.innerWidth / scale;
         
        
         
         ig.System.drawMode = ig.System.DRAW.SMOOTH;
         //ig.Sound.use = [ig.Sound.FORMAT.CAF, ig.Sound.FORMAT.OGG, ig.Sound.FORMAT.MP3];
		ig.main( '#canvas', Introduction, 60, width, height, 1 );
});
