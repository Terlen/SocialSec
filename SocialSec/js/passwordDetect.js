
chrome.storage.sync.get("whitepage",function(item){if(typeof(item["whitepage"])!=='undefined'&&item["whitepage"]instanceof Array&&item.whitepage.indexOf('"'+window.location.href+'"')!=-1)
{console.log("Page has been whitelisted.")}
else{passwordGrab();};});dataLoad();function passwordGrab(){var password=document.querySelectorAll('input[type=password]');for(var x=0;x<password.length;x++){var parentForm=password[x].form;parentForm.addEventListener("submit",function(){alertContent(parentForm)});}
function alertContent(form){var detectedPass=form.querySelector('input[type=password]').value;chrome.runtime.sendMessage({passvalue:detectedPass.toLowerCase()},function(response){console.log(response.complete);});}}
function dataLoad(){chrome.storage.sync.get("userdata",function(item){if(item.userdata){chrome.runtime.sendMessage({greeting:"secure"},function(response){console.log(response.complete);});}
else{chrome.runtime.sendMessage({greeting:"insecure"},function(response){console.log(response.complete);});}});}