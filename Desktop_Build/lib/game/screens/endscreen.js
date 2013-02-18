ig.module( 
	'game.screens.endscreen' 
	
)
.requires(
	'impact.game',
	'impact.font'
	
)
.defines(function(){

EndScreen = ig.Game.extend({
	
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
			
		this.font.draw( 'Oye', 50, 50, ig.Font.ALIGN.CENTER );

		
	}
});

});