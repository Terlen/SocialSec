window.onload = function(){
	//Variable that is set to current webpage stored in chrome local storage
	var Surl
	// Fetch the detected phrase from the background script and display it on the page.
	
	chrome.runtime.sendMessage({phrase: "Giff phrase"}, function(response){
			document.getElementById("xphrase").innerHTML = response.phrase;
	});
	
	// When user whitelists page, add page to whitelist
	document.getElementById("WLpage").onclick = function(){
		chrome.storage.local.get("currentURL",function(item){
			Surl = JSON.stringify(item.currentURL);
			chrome.storage.local.clear();
			chrome.storage.sync.get(function(cfg) {
				if(typeof(cfg["whitepage"]) !== 'undefined' && cfg["whitepage"] instanceof Array) { 
					cfg["whitepage"].push(Surl);
				} 
				else {
					cfg["whitepage"] = [Surl];
				}
				chrome.storage.sync.set(cfg);
			});
		});
		this.disabled = true;
		this.innerHTML = "Webpage whitelisted";
	};

	
	// When user adds phrase to whitelist, update trie and disable the button.
	document.getElementById("WLphrase").onclick = function(){
		var phrase = document.getElementById("xphrase").innerHTML;
		chrome.runtime.sendMessage({command: phrase}, function(response){
			console.log(response.feedback);
		});
		this.disabled = true;
		this.innerHTML = "Phrase whitelisted";
	}	
}
