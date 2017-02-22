var values;
window.onload = function(){
	
	chrome.storage.sync.get("userdata",build);
	
	document.getElementById("xlist").onclick = function(){
		document.getElementById("CusList").innerHTML = values;
		

}
}


function build(data){
	alert(data.userdata[1]);
	values = data.userdata;
	alert("Values: " + values);
}