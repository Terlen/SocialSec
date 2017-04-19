window.onload = function(){
	chrome.runtime.sendMessage({phrase: "Giff phrase"}, function(response){
			document.getElementById("xphrase").innerHTML = response.phrase;
		});
		document.getElementById("WLpage").onclick = function(){
		chrome.storage.local.get("currentURL",function(item){
			var Surl = JSON.stringify(item.currentURL);
			alert(Surl)
		});
}
}