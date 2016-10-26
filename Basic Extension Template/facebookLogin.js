
window.onload = function() {
	document.getElementById("Login").onclick = function() {
		var win = window.open("https://www.facebook.com/v2.8/dialog/oauth?client_id=284227568629145&response_type=token&scope=public_profile&redirect_uri=https://www.facebook.com/connect/login_success.html");
	};
	
}
