ig.module(
    'game.entities.controllers.enemycontroller'
)
.requires(
    'impact.game',
    'impact.entity',
    'impact.background-map'
)
.defines(function(){
 
EntityEnemyController = ig.Entity.extend({
		
		xPos:null,
		yPos:null,
		
		sawBladeyTimer:null,
		
		init:function(x,y,settings){
			this.parent(x,y,settings);
			
			this.sawBladeyTimer = new ig.Timer();
			
			this.xPos = ig.system.width;
			
		},
		
		update:function(){
			this.parent();
			
			if(this.sawBladeyTimer.delta() > 2){
				var yPos = Math.random()*ig.system.height - 20;
				ig.game.spawnEntity(EntitySawBladey, this.xPos, yPos);
				this.sawBladeyTimer.reset();
			}
		}

});


});