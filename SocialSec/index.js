var values;
window.onload = function(){
	
	chrome.storage.sync.get("userdata",build);
	
	document.getElementById("xlist").onclick = function(){
		document.getElementById("CusList").innerHTML = values;
		document.getElementById("CusList").innerHTML = values.toString().replace(/,/g,"<br>");		

}
}


function build(data){
	values = data.userdata.splice(0,4);
	values.push(data.userdata[data.userdata.length-1]);
}