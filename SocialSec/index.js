var values;
var phrases;
window.onload = function(){
	chrome.storage.sync.get("userdata",build);
	chrome.storage.sync.get("phraseWhitelist", phraseDisplay);
	
	document.getElementById("xshow").onclick = function(){
		if (document.getElementById("CusList").style.display == "none"){
			document.getElementById("CusList").innerHTML = values.toString().replace(/,/g,"<br>");
			document.getElementById("CusList").style.display = "block";
		}else{
			document.getElementById("CusList").style.display = "block";
		}
		document.getElementById("xshow").style.display = "none";
		document.getElementById("xhide").style.display = "inline";

		
	}
	
	document.getElementById("xhide").onclick = function(){
		document.getElementById("CusList").style.display = "none"
		document.getElementById("xshow").style.display = "inline";
		document.getElementById("xhide").style.display = "none";
	}
	
	document.getElementById("pshow").onclick= function(){
		if (document.getElementById("phraseList").style.display == "none"){
			if (Array.isArray(phrases)){
				document.getElementById("phraseList").innerHTML = phrases.toString().replace(/,/g,"<br>");
			}else{
				document.getElementById("phraseList").innerHTML = phrases;
			}
			document.getElementById("phraseList").style.display = "block";
		}else{
			document.getElementById("phraseList").style.display = "block";
		}
		document.getElementById("pshow").style.display = "none";
		document.getElementById("phide").style.display = "inline";
	}
	
	document.getElementById("phide").onclick = function(){
		document.getElementById("phraseList").style.display = "none"
		document.getElementById("pshow").style.display = "inline";
		document.getElementById("phide").style.display = "none";
	}
	
	document.getElementById("clearWhite").onclick = function(){
		var result = confirm("This will delete your custom whitelist, are you sure this is what you want?");
		if (result){
			chrome.storage.sync.remove("phraseWhitelist");
			chrome.runtime.sendMessage({clear: "clear"});
			location.reload();
		}
	}
}
function build(data){
	values = data.userdata.splice(0,4);
	values.push(data.userdata[data.userdata.length-1]);
}

function phraseDisplay(whitelist){
		if (Array.isArray(whitelist.phraseWhitelist)){
			phrases = whitelist.phraseWhitelist.splice(0,whitelist.phraseWhitelist.length);
		}else{
			phrases = whitelist.phraseWhitelist;
		}
	}else{
		phrases = "No custom whitelist!";
	}
	
}