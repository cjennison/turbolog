
ig.module(
    'game.main'
)
// now require the appropriate files
.requires(
    'plusplus.core.config',
    'plusplus.core.loader',
    'plusplus.core.game',
	
	'impact.font',
	'plugins.touch-button',
	'plugins.button',
	'game.entities.player',
	'game.entities.spike',
	
	'game.levels.test',
	'game.screen.main-menu'
)
// define the main module
.defines(function () {
    "use strict";
    var _c = ig.CONFIG;
         var buttons = [];
    // we probably want to go ahead and debug while developing
    
    // and don't forget to turn off debugging
    // in the config when releasing your game!
   
        start();
    
    function start() {
        // have your game class extend Impact++'s game class
        var game = ig.GameExtended.extend({
            
            startbtn:null,
                                      
            font: new ig.Font( 'media/04b03.font.png' ),
                 
			// get the collision map shapes for lighting and shadows
			shapesPasses: [
				{
					ignoreClimbable: true,
					discardBoundaryInner: true
				}
			],
            // override the game init function
            init: function () {
			
                this.parent();
                                          
                                          
                ig.input.bind(ig.KEY.SPACE, 'start');                       
                                          
				
                // so we can load the first level
                // which of course you didn't forget to require above
                //this.loadLevel(ig.global.LevelTest);
                                             
                if(ig.ua.mobile){
                	buttons = [
	                	new ig.TouchButton('start', 0,  _c.GAME_HEIGHT - 48, 40, 48, new ig.Image('/media/ui/start_button.png'), 0)
	                ]   
                } else {
                	
                }        
                          
                                                 
				// and lets add some atmosphere!
				this.camera.addAtmosphere(100, {r:0,g:0,b:0, a:.1});
				
            },
            
            update:function(){
            	this.parent()
            },
            
            draw: function(){
            	this.parent();

            	//console.log(buttons[0])
            	if(buttons[0]){
            		buttons[0].draw();
            	}
            	var x = ig.system.width/2,
					y = ig.system.height/2;
					
				if(ig.input.pressed('start')){
					ig.system.setGame(mainmenu);
            		this.font.draw( 'START!', x, y-20, ig.Font.ALIGN.CENTER );
				}	
				
            	this.font.draw( 'It Works!', x, y, ig.Font.ALIGN.CENTER );

            }
            
        });
        // now lets boot up impact with
        // our game and config settings
       		
		//ig.main('#canvas', MyGame, 60, width, height, 1);
		ig.System.drawMode = ig.System.DRAW.SUBPIXEL;
        ig.main(
            '#canvas',
            game,
            60,
            _c.GAME_WIDTH,
            _c.GAME_HEIGHT,
            _c.SCALE,
            ig.LoaderExtended
        );
        // and resize to make sure everything looks fine
       
    }
});
