var values;
window.onload = function(){
	
	chrome.storage.sync.get("userdata",build);
	
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
	
	document.getElementById("WLphrase").onclick = function(){
		var phrase = document.getElementById("xphrase").innerHTML;
		chrome.runtime.sendMessage({command: phrase}, function(response){
			console.log(response.feedback);
		});
		
	}
}
function build(data){
	values = data.userdata.splice(0,4);
	values.push(data.userdata[data.userdata.length-1]);
}