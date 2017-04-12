var values;
window.onload = function(){
	
	chrome.storage.sync.get("userdata",build);
	
	document.getElementById("xshow").onclick = function(){
		if (document.getElementById("CusList").style.display == "none"){
			document.getElementById("CusList").innerHTML = values.toString().replace(/,/g,"<br>");
			document.getElementById("CusList").style.display = "inline-block";
			document.getElementById("ListDesc").style.display = "inline-block";

		}else{
			document.getElementById("CusList").style.display = "inline-block";
			document.getElementById("ListDesc").style.display = "inline-block";
		}
		document.getElementById("xshow").style.display = "none";
		document.getElementById("xhide").style.display = "inline";

		
	}
	
	document.getElementById("xhide").onclick = function(){
		document.getElementById("CusList").style.display = "none"
		document.getElementById("ListDesc").style.display = "none";
		document.getElementById("xshow").style.display = "inline";
		document.getElementById("xhide").style.display = "none";
	}
}
function build(data){
	values = data.userdata.splice(0,4);
	values.push(data.userdata[data.userdata.length-1]);
}