var values;
window.onload = function(){
	
	chrome.storage.sync.get("userdata",build);
	
	document.getElementById("xlist").onclick = function(){
		document.getElementById("CusList").innerHTML = values;
		

}
}


function build(data){
	values = data.userdata.splice(0,4);
	values.push(data.userdata[data.userdata.length-1]);
}