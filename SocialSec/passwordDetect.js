/* This is a content script that runs on all webpages visited by the user. It searches for password input fields and captures the input of the field
   when the user submits the form. */
   
// If the user has whitelisted the current webpage, don't run the detection script.   
chrome.storage.sync.get("whitepage",function(item){
	if(typeof(item["whitepage"]) !== 'undefined' && item["whitepage"] instanceof Array && item.whitepage.indexOf('"'+window.location.href+'"') != -1)
	{console.log("Page has been whitelisted.")}
	else{
		passwordGrab();
	};
});
dataLoad();

function passwordGrab(){
	// Locate input fields with type "password". Stores list of fields as a static NodeList object
	var password = document.querySelectorAll('input[type=password]');
	// Adds a listener on the each occurrence of a password field that triggers when the parent form is submitted.
	for (var x=0; x < password.length; x++){
			var parentForm = password[x].form;
			parentForm.addEventListener("submit", function(){alertContent(parentForm)});
	}

	// Function that sends the detected password value to the background script for comparison and alert creation if matched.
	function alertContent(form){
		var detectedPass = form.querySelector('input[type=password]').value;
		chrome.runtime.sendMessage({passvalue: detectedPass.toLowerCase()}, function(response){
			console.log(response.complete);
		});
		}
}
// Function that checks if user has previously stored personal information from a Facebook login. This allows a persistent login.
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
