window.onload = function(){
	var Surl //Variable that is set to current webpage stored in chrome local storage
	chrome.runtime.sendMessage({phrase: "Giff phrase"}, function(response){
			document.getElementById("xphrase").innerHTML = response.phrase;
		});
		
		/*
		When user chooses to whitelist a webpage, this function retrieves the
		url from local storage and pushes it to a new array in chrome sync storage, then
		clears the local storage.
		*/
		document.getElementById("WLpage").onclick = function(){
		chrome.storage.local.get("currentURL",function(item){
			Surl = JSON.stringify(item.currentURL);
			chrome.storage.local.clear();
		chrome.storage.sync.get(function(cfg) {
		if(typeof(cfg["whitepage"]) !== 'undefined' && cfg["whitepage"] instanceof Array) { 
		cfg["whitepage"].push(Surl);
		} else {
			cfg["whitepage"] = [Surl];
		}
		chrome.storage.sync.set(cfg);
		});
		});
		this.disabled = true;
		this.innerHTML = "Webpage whitelisted";
		};
		/*
		When user chooses to whitelist a phrase, it is sent to the
		xphrase section of the alert.html page.
		*/
		document.getElementById("WLphrase").onclick = function(){
		var phrase = document.getElementById("xphrase").innerHTML;
		chrome.runtime.sendMessage({command: phrase}, function(response){
			console.log(response.feedback);
		});
		this.disabled = true;
		this.innerHTML = "Phrase whitelisted";
	}
}
