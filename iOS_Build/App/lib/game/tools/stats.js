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
		},

		saveGame:function(){
			localStorage.setItem("MONEY", _c.MONEY);
			localStorage.setItem("EXP", _c.EXP);
			localStorage.setItem("LEVEL", _c.LEVEL);
			
		
		},
		
		loadGame:function(){
			_c.MONEY = parseInt(localStorage.getItem("MONEY")) ? parseInt(localStorage.getItem("MONEY")) : 0;
			_c.EXP = parseInt(localStorage.getItem("EXP")) ? parseInt(localStorage.getItem("EXP")) : 0;
			_c.LEVEL = parseInt(localStorage.getItem("LEVEL")) ? parseInt(localStorage.getItem("LEVEL")) : 1;
			console.log(_c.MONEY + ": SAVE");
		}
		
		
	}
	
	
	
})
