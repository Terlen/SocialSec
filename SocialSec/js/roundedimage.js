
window.onload=function(){chrome.storage.sync.get("userpic",function(item){profileImage(item.userpic.picture.data.url);});}
function profileImage(imgurl){document.getElementById("profile").src=imgurl;}