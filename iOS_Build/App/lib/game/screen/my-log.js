ig.module(
	'game.screen.my-log'
)
.requires(
	'plusplus.core.config',
    'plusplus.core.loader',
    'plusplus.core.game',
    
    'game.entities.screens.skills',
    'game.entities.screens.stats',
    'game.entities.screens.gear',
    
    'game.tools.stats',
	
	'impact.font',
	'plugins.touch-button',
	'plugins.drag-button',
	'plugins.touch-joystick-zone',
	//'plugins.tween',
	'plugins.button'
	
)
.defines(function (){
		
	_c = ig.CONFIG;
	_t = ig.TOOLS;
	var buttons = [];

	MyLog = ig.GameExtended.extend({
			statsChanged:false,
            canSwipe:true,
            startbtn:null,                
            font: new ig.Font( 'media/04b03.font.png' ),
            popup_font:new ig.Font('media/fonts/temp_font.png'),
            transitioning:null,
            
            buttonSettings:null,
            gearSettings:null,
            dragging:false,
            
            WindowGroup:[],
            SwipeZone:null,
            
            skillPopup:{
            	enabled:false,
            	pos:{
            		x:0,
            		y:0
            	},
            	ability_id:null,
            	title:null,
            	text:null,
            	stageImg:new ig.Image('/media/ui/my_log/stage_img.png'),
            	image:new ig.Image('/media/ui/my_log/confirm_window.png'),
            	okbtn:null,  //new ig.TouchButton('CONFIRM', 0,  0, 82, 40, new ig.Image('/media/ui/my_log/yes_btn.png'), 0),
            	cancelbtn:null  //new ig.TouchButton('CONFIRM', 0,  0, 82, 40, new ig.Image('/media/ui/my_log/cancel_btn.png'), 0)
            
            },
            
            confirmationPopup:{
            	enabled:false,
            	pos:{
            		x:0,
            		y:0
            	},
            	image:new ig.Image('/media/ui/my_log/confirm_window.png'),
            	title:null,
            	change_var:null,
            	end_var:null,
            	text:null,
            	okbtn:null,  //new ig.TouchButton('CONFIRM', 0,  0, 82, 40, new ig.Image('/media/ui/my_log/yes_btn.png'), 0),
            	cancelbtn:null  //new ig.TouchButton('CONFIRM', 0,  0, 82, 40, new ig.Image('/media/ui/my_log/cancel_btn.png'), 0)
            },
            
                 
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
                                          
                //prepare all windows
                var x = _c.GAME_WIDTH/2 - 450/2;              
                this.WindowGroup[0] = this.spawnEntity(EntitySkills, ig.system.width/2 - 240, ig.system.height/2 - 160)
                this.WindowGroup[1] = this.spawnEntity(EntityGear, (ig.system.width/2 - 240) + ig.system.width, ig.system.height/2 - 160)
                this.WindowGroup[2] = this.spawnEntity(EntityStats, (ig.system.width/2 - 240) + (ig.system.width*2), ig.system.height/2 - 160)
                
                console.log("WINDOWS")         	
                this.SwipeZone = new TouchJoystickZone(0,0,ig.system.width, ig.system.height, 150);
				
                                             
                if(ig.ua.mobile){
                	buttons = [
	                	new ig.TouchButton('BACK', 0,  _c.GAME_HEIGHT + 30, 100, 50, new ig.Image('/media/ui/my_log/btn_backUP.png'), 0)
	                ]   
                } else {
                	
                }        

                if(_c.FIRST_LOG){
                	console.log("Player's first log.");
                	//this.canSwipe = false;
                }
                
                                                 
				
            },
            
            update:function(){
            	
            	this.parent();
            	
            	if(ig.input.pressed("BACK")){
            		//recalculate stats
            		ig.system.setGame(mainmenu);
            	}
            	
            	//Check for input on all levels
            	this.checkInput();
            	
            	
            	
            	
            	//Swipe Controller
            	if(this.SwipeZone.complete == true && this.canSwipe && this.dragging == false){
            		this.SwipeZone.complete = false;
            		//console.log("Successful Swipe")
            		var dir = (this.SwipeZone.dir  == "right") ? 1 : -1;
            		for(var i = 0;i < this.WindowGroup.length;i++){
            			this.WindowGroup[i].targetPos = (this.WindowGroup[i].pos.x + (ig.system.width) * dir);
            			this.WindowGroup[i].tweening = true;
            		}
            		
            	}
            	
            },
            
            draw: function(){
            	this.parent();

            	for(var i = 0;i<buttons.length;i++){
            		buttons[i].draw();
            	}
            	
            	if(this.skillPopup.enabled){
            		this.skillPopup.image.draw(this.skillPopup.pos.x, this.skillPopup.pos.y)
            		
            		this.skillPopup.cancelbtn.draw();
            		for(var ab = 0;ab < _c.SELECTED_TREE.abilities.length;ab++){
            			if(_c.SELECTED_TREE.abilities[ab].id == this.buttonSettings.id){
            				this.popup_font.draw(_c.SELECTED_TREE.abilities[ab].stage + "/" + _c.SELECTED_TREE.abilities[ab].max_stage, this.skillPopup.pos.x + 170, this.skillPopup.pos.y + 130, ig.Font.ALIGN.CENTER)
            				if(_c.SELECTED_TREE.abilities[ab].stage < _c.SELECTED_TREE.abilities[ab].max_stage){
            					this.skillPopup.okbtn.draw();
            				}
            				for(var st = 0;st < _c.SELECTED_TREE.abilities[ab].stage;st++){
            					console.log(st)
            					this.skillPopup.stageImg.draw((this.skillPopup.pos.x + 170) + (40 * st), this.skillPopup.pos.y + 90, 16, 59)
            				}
            				
            			}
            		}
            		this.popup_font.draw(this.skillPopup.title, this.skillPopup.pos.x + 170, this.skillPopup.pos.y + 40, ig.Font.ALIGN.CENTER)
            		this.popup_font.draw(this.skillPopup.text, this.skillPopup.pos.x + 170, this.skillPopup.pos.y + 100, ig.Font.ALIGN.CENTER)
            	}
            	
            	
            	if(this.confirmationPopup.enabled){
            		this.confirmationPopup.image.draw(this.confirmationPopup.pos.x, this.confirmationPopup.pos.y)
            		this.confirmationPopup.okbtn.draw();
            		this.confirmationPopup.cancelbtn.draw();
            		this.popup_font.draw(this.confirmationPopup.title, this.confirmationPopup.pos.x + 170, this.confirmationPopup.pos.y + 40, ig.Font.ALIGN.CENTER)
            		this.popup_font.draw(this.confirmationPopup.text, this.confirmationPopup.pos.x + 170, this.confirmationPopup.pos.y + 100, ig.Font.ALIGN.CENTER)
            	}

            },
            
            //Misc Update Functions
            checkInput:function(){
            	//Setting the player's first talent tree
            	if(_c.FIRST_LOG){
                	if(ig.input.pressed("CHOOSE_FIRE")){
                		this.setConfirmation("DOES IT BURN WHEN.. ?", "Are you sure you want \n to be a fire element log?", "SELECTED_TREE", _c.TREES[0]);
	                }
	                if(ig.input.pressed("CHOOSE_EARTH")){
                		this.setConfirmation("FEELING HARD?", "Are you sure you want \n to be an earth element log?", "SELECTED_TREE", _c.TREES[1]);
	                }
	                if(ig.input.pressed("CHOOSE_AIR")){
                		this.setConfirmation("FEEL THE BREEZE?", "Are you sure you want \n to be an air element log?", "SELECTED_TREE", _c.TREES[2]);
	                }
                }
                
                if(this.confirmationPopup.enabled){
                	if(ig.input.pressed("CANCEL")){
                		this.confirmationPopup.enabled = false;
                		this.canSwipe = true;

                	}
                	if(ig.input.pressed("CONFIRM")){
                		//_t.recalculateStats();
                		this.confirmationPopup.enabled = false;
                		_c[this.confirmationPopup.change_var] = this.confirmationPopup.end_var;
                		//console.log(_c.SELECTED_TREE.name);
                		if(this.confirmationPopup.change_var == "SELECTED_TREE"){
                			_t.increaseBaseStats();
                			this.WindowGroup[0].buildIcons();
                		}
                		 
                		this.canSwipe = true;
                		_c.FIRST_LOG = false;
                		
                	}
                }
                
                if(ig.input.pressed("UPGRADE_SKILL")){
					
					//this.WindowGroup[0].skillIcons;
					for(var i = 0;i < this.WindowGroup[0].skillIcons.length;i++){
						if(this.WindowGroup[0].skillIcons[i].settings.id == this.buttonSettings.id){
							this.WindowGroup[0].skillIcons[i].selected = true;
						} else{
							this.WindowGroup[0].skillIcons[i].selected = false;
						}
					}
					
					this.setSkillPopup(this.buttonSettings.name, "something", this.buttonSettings.id);
					
					
				}
				
				
				if(ig.input.pressed("CANCEL_SKILL")){
					this.skillPopup.enabled = false;
					this.canSwipe = true;
				}
				
				if(ig.input.pressed("CONFIRM_SKILL")){
					for(var ab = 0; ab < _c.SELECTED_TREE.abilities.length;ab++){
						if(this.buttonSettings.id == _c.SELECTED_TREE.abilities[ab].id){
							if(_c.SELECTED_TREE.abilities[ab].stage < _c.SELECTED_TREE.abilities[ab].max_stage){
								_c.SELECTED_TREE.abilities[ab].stage++;
								if(_c.SELECTED_TREE.abilities[ab].type == "MODIFIER"){
									_c.SELECTED_TREE.abilities[ab].amt += _c.SELECTED_TREE.abilities[ab].amt_mod;
									_c[_c.SELECTED_TREE.abilities[ab].mod] += _c.SELECTED_TREE.abilities[ab].amt_mod;
									
								}
								
								
							}
							
						}
					}
				}
            	
            },
            
            setSkillPopup:function(title, text, id){
            	this.skillPopup.pos.x = ig.system.width/2 - 175;
            	this.skillPopup.pos.y = ig.system.height/2 - 100;
            	this.skillPopup.title = title;
            	this.skillPopup.text = text;
            	this.skillPopup.id = id;
            	this.skillPopup.okbtn = new ig.TouchButton('CONFIRM_SKILL', this.skillPopup.pos.x + 10,  this.skillPopup.pos.y + 150, 82, 40, new ig.Image('/media/ui/my_log/yes_btn.png'), 0),
            	this.skillPopup.cancelbtn = new ig.TouchButton('CANCEL_SKILL', this.skillPopup.pos.x + 260,  this.skillPopup.pos.y + 150, 82, 40, new ig.Image('/media/ui/my_log/cancel_btn.png'), 0)
            	
            	this.canSwipe = false;
            	this.skillPopup.enabled = true;
            },
            
            
            setConfirmation:function(title, text, change_var, end_var){
            	this.confirmationPopup.pos.x = ig.system.width/2 - 175;
            	this.confirmationPopup.pos.y = ig.system.height/2 - 100;
            	this.confirmationPopup.title = title;
            	this.confirmationPopup.text = text;
            	this.confirmationPopup.change_var = change_var;
            	this.confirmationPopup.end_var = end_var;
            	this.confirmationPopup.okbtn = new ig.TouchButton('CONFIRM', this.confirmationPopup.pos.x + 10,  this.confirmationPopup.pos.y + 150, 82, 40, new ig.Image('/media/ui/my_log/yes_btn.png'), 0),
            	this.confirmationPopup.cancelbtn = new ig.TouchButton('CANCEL', this.confirmationPopup.pos.x + 260,  this.confirmationPopup.pos.y + 150, 82, 40, new ig.Image('/media/ui/my_log/cancel_btn.png'), 0)
            	
            	this.canSwipe = false;
            	
            	this.confirmationPopup.enabled = true;
            	
            },
            
            installGear:function(settings){
            	console.log(settings)
            	_c.EQUIPPED_GEAR[settings.component] = settings;
            	console.log("EQUIPPED SOME: " + settings.component)
            },
            
            
            
            
        });
	
})
