window.onload = function() {
	//  On popup load, fetch stored user data from Facebook. Grab user picture URL from data and pass to profile image injector.
	chrome.storage.sync.get("userdata", function(item) {
		profileImage(item.userdata.picture.data.url);
	});
}
function profileImage(imgurl){
	// Inject profile image URL into popup2 html
	document.getElementById("profile").src = imgurl;
}