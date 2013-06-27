ig.module(
	'game.screen.main-menu'
)
.requires(
	'plusplus.core.config',
    'plusplus.core.loader',
    'plusplus.core.game',
	
	'impact.font',
	'plugins.touch-button',
	'plugins.button',
	'game.entities.player',
	'game.entities.spike',
	
	'game.worlds.island',
	
	'game.levels.test'
	
)
.defines(function (){
		
	_c = ig.CONFIG;
	buttons = [];

	mainmenu = ig.GameExtended.extend({
            
            startbtn:null,                
            font: new ig.Font( 'media/04b03.font.png' ),
            transitioning:null,
                 
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
                                          
                                          
                ig.input.bind(ig.KEY.SPACE, 'GAME');                       
                ig.input.bind(ig.KEY.M, 'MYLOG');    
                                          
				console.log("Main menu")   
                //this.loadLevel(ig.global.LevelTest);
                                             
                if(ig.ua.mobile){
                	buttons = [
	                	new ig.TouchButton('GAME', _c.GAME_WIDTH/2 + 25,  _c.GAME_HEIGHT/2 + 30, 100, 50, new ig.Image('/media/ui/main_menu/btn_play.png'), 0),
	                	new ig.TouchButton('MYLOG', 0,  _c.GAME_HEIGHT - 48, 100, 50, new ig.Image('/media/ui/main_menu/btn_mylog.png'), 0)
	                ]   
                } else {
                	
                }        
                          
                                                 
				// and lets add some atmosphere!
				this.camera.addAtmosphere(100, {r:0,g:0,b:0, a:.1});
				
            },
            
            update:function(){
            	
            	if(ig.input.pressed('GAME')){
            		console.log("INITIALIZING GAME")
            		ig.system.setGame(WorldIsland);

            	}
            	
            	if(ig.input.pressed('MYLOG')){
            		console.log("INITIALIZING MYLOG")
            	}
            	
            	
            	this.parent()
            },
            
            draw: function(){
            	this.parent();

            	for(var i = 0;i<buttons.length;i++){
            		buttons[i].draw();
            	}
            	var x = ig.system.width/2,
					y = ig.system.height/2;
					
				
				
            	this.font.draw( 'ON THE MENU!', x, y, ig.Font.ALIGN.CENTER );

            }
            
        });
      
    
	
	
})
