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
		
		init:function(x,y,settings){
			this.parent(x,y,settings);
			
			
			this.xPos = ig.system.width;
			
			ig.game.spawnEntity(EntitySawBladey, this.xPos, 100);
		},
		
		update:function(){
			this.parent();
		}

});


});