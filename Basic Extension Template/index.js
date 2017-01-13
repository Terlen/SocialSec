window.onload = function(){
	document.getElementById("xlist").addEventListener("onclick",inject);
}



		
function inject(){
	chrome.storage.sync.get("userdata", function(item) {
			document.getElementById("CusList").innerHTML = "text!";
		});
}