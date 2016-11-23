
function passwordGrab(){
	//alert(window.onload);
	// Locate input fields with type "password". Stores fields as a static NodeList object
	var password = document.querySelectorAll('input[type=password]');
	//alert(password);
	//password[0].addEventListener("focus",function(){});
	// Adds a listener on the first occurrence of a password field that triggers when field loses focus.
	password[0].addEventListener("focusout",alertContent);
		
	
	// Debugging function to create alert box with content of password field. 
	function alertContent(){
		alert(password[0].value);
	}
	
}
passwordGrab();
// This is a comment