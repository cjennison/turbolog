ig.module(
	'game.tools.stats'
)
.requires(
	'impact.system'
)
.defines(function() {
	
	_c = ig.CONFIG;
	
	ig.TOOLS = {
		
		recalculateStats:function(){
			console.log("STATS")

		},
		
		increaseBaseStats:function(){
			var base_abilities = _c.SELECTED_TREE.base_abilities;
			for(var i = 0;i < base_abilities.length;i++){
				var ab = base_abilities[i];
				_c[ab.mod] += ab.amt;
			}
			
			console.log(_c.DAMAGE)
		}
		
		
	}
	
	
	
})
