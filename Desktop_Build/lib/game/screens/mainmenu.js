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
	background: new ig.Image('media/zones/islandzone_skylayer.png'),
	
	storybtn: new ig.Image('media/screens/mainmenu/storymode.png'),
	endbtn: new ig.Image('media/screens/mainmenu/endlessmode.png'),
	chalbtn: new ig.Image('media/screens/mainmenu/challengemode.png'),
	mylog: new ig.Image('media/screens/mainmenu/mylog.png'),
	opts: new ig.Image('media/screens/mainmenu/options.png'),

	bgX:0,
		
	init: function() {
		// Initialize your game here; bind keys etc.
		
		//Keys
		ig.input.bind(ig.KEY.ENTER, 'start');
     
	},
	
	update: function() {
		if(ig.input.pressed("start")){
			if(SAW_FIRST_CINEMATIC == false){
				ig.system.setGame(StoryIntroduction);
				SAW_FIRST_CINEMATIC = true;
			}else {
				ig.system.setGame(Map);

			}
		}
		
		this.bgX -= .3;
		if(this.bgX < -1400){
			this.bgX = 0;
		}
		this.parent();
	},
	
	draw: function() {
		// Draw all entities and backgroundMaps
		this.parent();
		

		// Add your own drawing code here
		var x = ig.system.width/2,
			y = ig.system.height/2;
		this.background.draw(this.bgX, 0);
		this.logo.draw(x - this.logo.width/2, 00);
		
		this.storybtn.draw(0, 100);
		this.endbtn.draw(x - 50, 100);
		this.chalbtn.draw(ig.system.width - 100, 100);
		this.mylog.draw(x - 100, ig.system.height-40);
		this.opts.draw(ig.system.width - 70, ig.system.height - 40)
		this.font.draw("VERSION: " + VERSION, 3, 3);
		this.font.draw( 'Press Enter to Start Trial Mode', ig.system.width/2, 195, ig.Font.ALIGN.CENTER );

		
	}
});

});