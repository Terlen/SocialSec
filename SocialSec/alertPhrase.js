window.onload = function(){
	chrome.runtime.sendMessage({phrase: "Giff phrase"}, function(response){
			document.getElementById("xphrase").innerHTML = response.phrase;
		});
}
