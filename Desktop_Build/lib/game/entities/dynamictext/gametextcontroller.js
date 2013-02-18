ig.module(
    'game.entities.dynamictext.gametextcontroller'
)
.requires(
    'impact.entity'
)
.defines(function(){

EntityIslandZoneText = ig.Entity.extend({
    size: {x:0, y:0},
    collides: ig.Entity.COLLIDES.NONE,
    maxVel: {x:1000, y:100},
    gravityFactor: 0,
    moveInTimer:null,
    moveOutTimer:null,
    animSheet: new ig.AnimationSheet('media/text/islandzonetxt.png', 200, 60),
    
    init:function(x,y,settings){
    	this.parent(x,y,settings);
    	this.addAnim('idle', 1, [0]);
    	this.moveOutTimer = new ig.Timer();
    	this.moveInTimer = new ig.Timer();
    },
        
    update: function() {
        this.parent();
        
        if(this.moveInTimer.delta() < 2){
        	this.vel.x = 200;
        } else {
        	this.vel.x = 0;
        }
        
        
        if(this.moveOutTimer.delta() > 3){
        	this.vel.x = 300;
        }
    },
    
    draw: function() {
        this.parent();
    }
    
});

EntityDeathAnim = ig.Entity.extend({
	size:{x:256, y:256},
	gravityFactor: 0,
	animSheet: new ig.AnimationSheet('media/text/deathanim.png', 256, 256),
	
	
	init:function(x,y,settings){
		this.parent(x,y,settings);
		this.addAnim('idle', .05, [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20], true)
	},
	
	draw:function(){
		this.parent();
	}

});

EntityBlackOverlay = ig.Entity.extend({
	gravityFactor: 0,
	animSheet: new ig.AnimationSheet('media/screens/blackscreen.png', 700, 240),
	
	
	init:function(x,y,settings){
		this.parent(x,y,settings);
		this.addAnim('idle', 1, [0], true)
	},
	
	draw:function(){
		this.parent();
	}

})

});