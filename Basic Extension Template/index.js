var values;
window.onload = function(){
	
	chrome.storage.sync.get("userdata",build);
	
	document.getElementById("xlist").onclick = function(){
		var cusList;
		for(var x =0; x < values.length; x++){
			cusList += values;
		}
		document.getElementById("CusList").innerHTML = cusList;
		

}
}


function build(data){
	alert(data.userdata[1]);
	values = data.userdata;
	alert("Values: " + values);
}