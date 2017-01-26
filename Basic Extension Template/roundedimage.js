window.onload = function() {
	chrome.storage.sync.get("userdata", function(item) {
		profileImage(item.userdata.picture.data.url);
	});
}
function profileImage(imgurl){
	document.getElementById("profile").src = imgurl;
}