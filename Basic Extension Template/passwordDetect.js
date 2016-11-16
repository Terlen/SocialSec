window.onload = function(){
	// Locate input fields with type "password". Stores fields as a static NodeList object
	var password = document.querySelectorAll('input[type=password]');
	// Adds a listener on the first occurance of a password field that triggers when field focus is lost. Calls alertContent on trigger
	password[0].addEventListener("focusout",alertContent);
	
	// Debugging function to create alert box with content of password field. 
	function alertContent(){
		alert(password[0].value);
	}
	
}