var simonGame = {
	COUNT: 0,
	PATTERN: [],
	SOUND:[{file:'sounds/sa.mp3'},{file:'sounds/re.mp3'},{file:'sounds/ga.mp3'},{file:'sounds/ma.mp3'},{file:'sounds/pa.mp3'},{file:'sounds/dha.mp3'},{file:'sounds/nee.mp3'}],
	patternGen: function(){
		var randomId;
		randomId = Math.floor(Math.random() * 7);
		simonGame.PATTERN.push(randomId);
		if(simonGame.COUNT > 20){
			alert("You have won the game!!");
			window.location.reload(true);
		}
		simonGame.COUNT += 1;
		//debugger;
		//console.log("increase count true calling count display " + simonGame.COUNT);
		handler.countDisplay();
		//console.log("count gen true calling patternPlayer with PATTERN " + simonGame.PATTERN );
		handler.patternRepeatPlayer();
	}, //close patternGen
	patternMatcher: function(param){
		//console.log("inside patternMatch");
		var genPattern = simonGame.patternGen;
			//calling user input
			console.log("calling user Input");
			var result =  handler.userInput();
			 setTimeout(function(){
				if(param == undefined && result == true){
				 genPattern();
				}
			 },simonGame.COUNT*2000);			
			 /*
			setTimeout(function(){
				if(param.repeat !== 'yes'){  //execute count gen only if repeat flag is false inside user INPUT
					console.log("calling pattern Gen");
					genPattern();
				}
			},simonGame.COUNT*2000);*/
	}, //close patternMatcher

} //close simonGame

var handler = {
	countRepPlayer: 0,
	repeatFlag: false,
	patternRepeatPlayer: function(param){
		var repeater = setInterval(function(){
				handler.effect(simonGame.PATTERN[handler.countRepPlayer]);
				handler.countRepPlayer += 1;
				if(handler.countRepPlayer > simonGame.COUNT){ //If all ids inside pattern has been played, clearInterval, reset repeat count and call patternMatch.
					clearInterval(repeater);
						handler.countRepPlayer = 0;
						simonGame.patternMatcher(param);
				}
			},1000);//close sestInterval
	}, //close patternRepeatPlayer
	effect: function(id){
	   var img = document.getElementById(id);
	   if(img !== null && id !== undefined){
			$( img ).fadeIn(100).fadeOut(100).fadeIn(100);//fadeOut(200).fadeIn(200);
			//debugger;
			var audio = new Audio(simonGame.SOUND[id].file);
			audio.play();
			//console.log("id inside effect " + id)
		}
	},//close effect
	countDisplay: function(){
		document.getElementById("count").innerHTML = "Count: " + simonGame.COUNT;
	}, //close countIncrease
	userInput: function(){
		var userPattern = new Array();var id;var success = true;
		 function handleWrongInput(){
			console.log(" WRONG USER INPUT ");
					if($('.chkStrict:checked').val() === "on"){
						var audio = new Audio('sounds/wrong.mp3');
						audio.play();
						setTimeout(function(){window.location.reload(true)},1000);
					} else {
						console.log("inside else " );
						//debugger;
						var audio = new Audio('sounds/wrong.mp3');
						audio.play();
						handler.repeatFlag = true;
						handler.patternRepeatPlayer({repeat: "yes"}); //this is getting called recursivelly rather	 
						 
					}
		}
		 $('img').click(function(e){	
				id = parseInt(this.id,10);
				userPattern.push(id);
				handler.effect(id);
				console.log(" user " + userPattern); 
				console.log(" pattern " + simonGame.PATTERN);
				if(userPattern.indexOf(id) !== simonGame.PATTERN.indexOf(id)){
					success = false;
					handleWrongInput();
					userPattern.length = 0;
					e.stopImmediatePropagation(); 
					e.preventDefault();
					return;
				}
				if(userPattern.length === simonGame.PATTERN.length){
					userPattern.length = 0;
				}
				
		 });	//close click.
		return success;		
	
	}//close useInput 		 
				/*
				id = parseInt(this.id,10);
				userPattern.push(id);
				handler.effect(id);
				console.log(" user " + userPattern); 
				console.log(" pattern " + simonGame.PATTERN);
				if(userPattern.indexOf(id) !== simonGame.PATTERN.indexOf(id)){
					console.log(" WRONG USER INPUT ");
					if($('.chkStrict:checked').val() === "on"){
						var audio = new Audio('sounds/wrong.mp3');
						audio.play();
						setTimeout(function(){window.location.reload(true)},1000);
					} else {
						console.log("inside else " );
						debugger;
						var audio = new Audio('sounds/wrong.mp3');
						audio.play();
						userPattern.length = 0;
						handler.repeatFlag = true;
						handler.patternRepeatPlayer(); //this is getting called recursivelly rather	 
						return ;
					}
				}
				//reset the userPattern Array
				if(userPattern.length === simonGame.PATTERN.length){
					userPattern.length = 0;
				}
				e.stopImmediatePropagation(); 
				e.preventDefault();
			//close click. */
					
	
	
	
} //close handler