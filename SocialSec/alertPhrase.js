window.onload = function(){
	chrome.runtime.sendMessage({phrase: "Giff phrase"}, function(response){
			alert("Response Received");
			document.getElementById("xphrase").innerHTML = response.phrase;
		});
}
