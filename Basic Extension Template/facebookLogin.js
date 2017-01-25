// This script initiates Facebook login and handles the GET request from the Facebook GraphAPI once the user's access token is recovered.
window.onload = function() {
	// Chrome extension security policy prevents any inline scripts in HTML, so all listeners and triggers must be written in the script itself.
	document.getElementById("Login").onclick = function() {
		/* This url is a Facebook OAuth endpoint that generates an access token for the user with the desired permissions. In this request, scope defines the rights requested by the application.
		   We currently generate a token that allows access to email, public_profile information, and user_friends. The redirect_uri is the page that the user is redirected to after authentication.
		   In our case, we are using a page designed by Facebook for desktop applications which don't have a server to host a landing page. */
		var win = window.open("https://www.facebook.com/v2.8/dialog/oauth?client_id=284227568629145&response_type=token&scope=email,public_profile,user_friends,user_birthday,user_education_history,user_friends,user_hometown,user_likes,user_work_history&redirect_uri=https://www.facebook.com/connect/login_success.html");

	};

	// After the login token is stored in storage via grabAccessToken.js, the GraphAPI can be queried.
	document.getElementById("Get").onclick = function() {
		// Retrieve the user access token from chrome storage
		chrome.storage.sync.get("accessToken", function(item) {
			// Make a GET request to the graph endpoint with user access token, once request completes call jsonParse to handle the response.
			httpGetAsync("https://graph.facebook.com/me?fields=id,cover,first_name,last_name,age_range,gender,email,work,education,taggable_friends,hometown,favorite_teams&access_token="+item.accessToken, jsonParse);
		});
		
	};
		
};