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
		
		init:function(x,y,settings){
			this.parent(x,y,settings);
		},
		
		update:function(){
			this.parent();
		}

});


});