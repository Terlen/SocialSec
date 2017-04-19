// This is a content script that runs on all webpages visited by the user.
function passwordGrab(){
	// Locate input fields with type "password". Stores list of fields as a static NodeList object
	var password = document.querySelectorAll('input[type=password]');
	// Adds a listener on the each occurrence of a password field that triggers when field loses focus. This is intended to trigger when user clicks on the submit button for a login form.
	for (var x=0; x < password.length; x++){
			//password[x].addEventListener("focusout", alertContent);
			var parentForm = password[x].form;
			parentForm.addEventListener("submit", function(){alertContent(parentForm)});
			
	}

	function alertContent(form){
		//alert(this.value);
		var detectedPass = form.querySelector('input[type=password]').value;
		chrome.runtime.sendMessage({passvalue: detectedPass.toLowerCase()}, function(response){
			console.log(response.complete);
		});
		}
	}
passwordGrab();
dataLoad();
function dataLoad(){
	chrome.storage.sync.get("userdata", function(item){
		if (item.userdata){
		chrome.runtime.sendMessage({greeting: "secure"}, function(response){
			console.log(response.complete);
		});
	}
	else{
		chrome.runtime.sendMessage({greeting: "insecure"}, function(response){
			console.log(response.complete);
		});
	}
	
	});
}