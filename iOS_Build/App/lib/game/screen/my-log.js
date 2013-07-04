ig.module(
	'game.screen.my-log'
)
.requires(
	'plusplus.core.config',
    'plusplus.core.loader',
    'plusplus.core.game',
	
	'impact.font',
	'plugins.touch-button',
	'plugins.button'
	
)
.defines(function (){
		
	_c = ig.CONFIG;
	var buttons = [];

	MyLog = ig.GameExtended.extend({
            
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
                                          
                                          
                  
                                          
				
                                             
                if(ig.ua.mobile){
                	buttons = [
	                	new ig.TouchButton('BACK', 0,  _c.GAME_HEIGHT, 100, 50, new ig.Image('/media/ui/my_log/btn_backUP.png'), 0)
	                ]   
                } else {
                	
                }        
                          
                                                 
			
            },
            
            update:function(){
            	
            	this.parent();
            	
            	if(ig.input.pressed("BACK")){
            		ig.system.setGame(mainmenu);
            	}
            },
            
            draw: function(){
            	this.parent();

            	for(var i = 0;i<buttons.length;i++){
            		buttons[i].draw();
            	}
            	var x = ig.system.width/2,
					y = ig.system.height/2;
					
				
				
            	this.font.draw( 'MY LOG!', x, y, ig.Font.ALIGN.CENTER );

            }
            
        });
      
    
	
	
})
