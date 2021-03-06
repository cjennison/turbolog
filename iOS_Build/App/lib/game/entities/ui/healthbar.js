ig.module(
    'game.entities.ui.healthbar'
)
.requires(
        'impact.game',
   		'impact.entity',
    	'plusplus.core.entity',
        'impact.background-map'
)
.defines(function(){
 	var _c = ig.CONFIG;

EntityHealthBar = ig.EntityExtended.extend({
 		performance: _c.KINEMATIC,
	    // Health Bar Size
	   maxVel:{x:500, y:2000},

		size: {x:32, y:32},
		accelModulator:{x:200, y:170},
		zIndex:5,
	 
	    // Health Bar Animation Sheet
		animSheet: new ig.AnimationSheet(_c.PATH_TO_MEDIA + 'ui/gameplay/HealthBar.png', 32, 5 ),
 		animSettings:{
 			idle:{
 				frameTime:1,
 				sequence:[0]
 			}
 		},
 		
 		gravityFactor:0,
        // Pass In Unit enity to this variable
        Unit:0,
        alpha:0,
        alphaTimer:null,
        alphaFade:5,
 
    // Add Animations for every 10 percent health lost
    // set zIndex to make sure its in front
    init: function( x, y, settings ) {
            this.parent( x, y, settings );
            this.addAnim( 'Full', 1, [0] );
            this.addAnim( 'Ninety', 1, [1] );
            this.addAnim( 'Eighty', 5, [2] );
            this.addAnim( 'Seventy', 1, [3] );
            this.addAnim( 'Sixty', 1, [4] );
            this.addAnim( 'Fifty', 1, [5] );
            this.addAnim( 'Fourty', 1, [6] );
            this.addAnim( 'Thirty', 1, [7] );
            this.addAnim( 'Twenty', 1, [8] );
            this.addAnim( 'Ten', 1, [9] );
            this.addAnim( 'NearDeath', 1, [10] );
 
            //this.zIndex = 10;
            
    },
    
    showHealthBar:function(){
    	this.alpha = 1;
    	this.alphaTimer = new ig.Timer();
    	console.log("SHOWING HEALTH")
    },
 
        update: function()
        {
        	this.parent();
        	
        	//console.log(this.Unit);
        // Used to follow the Unit its assigned to.
        if(this.Unit != 0){
        	this.pos.x = this.Unit.pos.x - this.Unit.size.x/2 + this.size.x/2;
        	this.pos.y = this.Unit.pos.y - 10;
 		}
        //Checks the Health Values
        // MaxHealth was created in the Entity and set to its initial health
        if(this.Unit.health == this.Unit.MaxHealth)
        {
            this.currentAnim = this.anims.Full;
        }
        // Unit below max not below 90%
        else if(this.Unit.health >= (this.Unit.MaxHealth * .9)
            && this.Unit.health < this.Unit.MaxHealth)
        {
            this.currentAnim = this.anims.Ninety;
        }
        // Unit below 90% not below 80%
        else if(this.Unit.health >= (this.Unit.MaxHealth * .8)
            && this.Unit.health < (this.Unit.MaxHealth * .9))
        {
            this.currentAnim = this.anims.Eighty;
        }
        // Unit Below 80% not below 70%
        else if(this.Unit.health >= (this.Unit.MaxHealth * .7)
            && this.Unit.health < (this.Unit.MaxHealth * .8))
        {
            this.currentAnim = this.anims.Seventy;
        }
        // Unit Below 70% not below 60%
        else if(this.Unit.health >= (this.Unit.MaxHealth * .6)
            && this.Unit.health < (this.Unit.MaxHealth * .7))
        {
            this.currentAnim = this.anims.Sixty;
        }
        // Unit Below 60% not below 50%
        else if(this.Unit.health >= (this.Unit.MaxHealth * .5)
            && this.Unit.health < (this.Unit.MaxHealth * .6))
        {
            this.currentAnim = this.anims.Fifty;
        }
        // Unit Below 50% not below 40%
        else if(this.Unit.health >= (this.Unit.MaxHealth * .4)
            && this.Unit.health < (this.Unit.MaxHealth * .5))
        {
            this.currentAnim = this.anims.Fourty;
        }
        // Unit Below 40% not below 30%
        else if(this.Unit.health >= (this.Unit.MaxHealth * .3)
            && this.Unit.health < (this.Unit.MaxHealth * .4))
        {
            this.currentAnim = this.anims.Thirty;
        }
        // Unit Below 30% not below 20%
        else if(this.Unit.health >= (this.Unit.MaxHealth * .2)
            && this.Unit.health < (this.Unit.MaxHealth * .3))
        {
            this.currentAnim = this.anims.Twenty;
        }
        // Unit Below 20% not below 10%
        else if(this.Unit.health >= (this.Unit.MaxHealth * .1)
            && this.Unit.health < (this.Unit.MaxHealth * .2))
        {
            this.currentAnim = this.anims.Ten;
        }
        // Unit Below 10% not DEAD
        else if(this.Unit.health > 0
            && this.Unit.health < (this.Unit.MaxHealth * .1))
        {
            this.currentAnim = this.anims.NearDeath;
        }
        else if (this.Unit.health <= 0 )
        {
            this.kill();
            this.Unit.kill();
        }
        
         this.currentAnim.alpha = this.alpha;
                if(this.alphaTimer){
                	if(this.alphaTimer.delta() > 2){
	                	this.alpha = (3 - this.alphaTimer.delta());
	                	if(this.alphaTimer.delta() >= 3){
	                		this.alphaTimer = null;
	                		this.alpha = 0;
	                	}
                	}
                }

        }
        
 
});
 
});
