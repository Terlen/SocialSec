window.onload = function(){
	chrome.runtime.sendMessage({phrase: "Giff phrase"}, function(response){
			document.getElementById("xphrase").innerHTML = response.phrase;
		});
	document.getElementById("WLphrase").onclick = function(){
		var phrase = document.getElementById("xphrase").innerHTML;
		chrome.runtime.sendMessage({command: phrase}, function(response){
			console.log(response.feedback);
		});
		this.disabled = true;
		this.innerHTML = "Phrase whitelisted";
	}
	
}
