ig.module( 
	'game.screens.mainmenu' 
)
.requires(
	'impact.game',
	'impact.font',
	'game.modes.endlessmode',
	'plugins.touch-button'
	
)
.defines(function(){

MainMenu = ig.Game.extend({
	
	// Load a font
	font: new ig.Font( 'media/04b03.font.png' ),
	
		
	init: function() {
		// Initialize your game here; bind keys etc.
		
		//Keys
		ig.input.bind(ig.KEY.ENTER, 'start');
     
	},
	
	update: function() {
		if(ig.input.pressed("start")){
			ig.system.setGame(EndlessMode);
		}
		this.parent();
	},
	
	draw: function() {
		// Draw all entities and backgroundMaps
		this.parent();
		

		// Add your own drawing code here
		var x = ig.system.width/2,
			y = ig.system.height/2;
			
		this.font.draw( 'Press Enter to Start Trial Mode', ig.system.width/2, 100, ig.Font.ALIGN.CENTER );

		
	}
});

});