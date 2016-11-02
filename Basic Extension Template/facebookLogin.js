
window.onload = function() {
	document.getElementById("Login").onclick = function() {
		var win = window.open("https://www.facebook.com/v2.8/dialog/oauth?client_id=284227568629145&response_type=token&scope=email,public_profile,user_friends&redirect_uri=https://www.facebook.com/connect/login_success.html");
	};
	document.getElementById("Get").onclick = function() {
		chrome.storage.sync.get("accessToken", function(item) {
			httpGetAsync("https://graph.facebook.com/me?fields=id,cover,first_name,last_name,age_range,gender,email&access_token="+item.accessToken, GetAlert);
		});
		
	};
	
};


	
