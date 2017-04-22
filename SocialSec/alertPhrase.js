window.onload = function(){
	var Surl
	chrome.runtime.sendMessage({phrase: "Giff phrase"}, function(response){
			document.getElementById("xphrase").innerHTML = response.phrase;
		});
		
		document.getElementById("WLpage").onclick = function(){
		chrome.storage.local.get("currentURL",function(item){
			Surl = JSON.stringify(item.currentURL);
			chrome.storage.local.clear;
		chrome.storage.sync.get(function(cfg) {
		if(typeof(cfg["whitepage"]) !== 'undefined' && cfg["whitepage"] instanceof Array) { 
		cfg["whitepage"].push(Surl);
		} else {
			cfg["whitepage"] = [Surl];
		}
		chrome.storage.sync.set(cfg);
		});
		});
		
		};
}