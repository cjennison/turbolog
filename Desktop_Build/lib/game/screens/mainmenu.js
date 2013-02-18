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
	logo: new ig.Image('media/screens/splash/logo.png'),
	background: new ig.Image('media/zones/islandzone.png'),
	bgX:0,
		
	init: function() {
		// Initialize your game here; bind keys etc.
		
		//Keys
		ig.input.bind(ig.KEY.ENTER, 'start');
     
	},
	
	update: function() {
		if(ig.input.pressed("start")){
			ig.system.setGame(EndlessMode);
		}
		
		this.bgX -= .3;
		this.parent();
	},
	
	draw: function() {
		// Draw all entities and backgroundMaps
		this.parent();
		

		// Add your own drawing code here
		var x = ig.system.width/2,
			y = ig.system.height/2;
		this.background.draw(this.bgX, 0);
		this.logo.draw(x - this.logo.width/2, 30);
			
		this.font.draw( 'Press Enter to Start Trial Mode', ig.system.width/2, 160, ig.Font.ALIGN.CENTER );

		
	}
});

});