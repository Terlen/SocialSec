
var values;var phrases;window.onload=function(){chrome.storage.sync.get("userdata",build);chrome.storage.sync.get("phraseWhitelist",phraseDisplay);chrome.storage.sync.get("whitepage",pageDisplay);document.getElementById("xshow").onclick=function(){if(document.getElementById("CusList").style.display=="none"){document.getElementById("CusList").innerHTML=values.toString().replace(/,/g,"<br>");document.getElementById("CusList").style.display="inline-block";document.getElementById("ListDesc").style.display="inline-block";}else{document.getElementById("CusList").style.display="inline-block";document.getElementById("ListDesc").style.display="inline-block";}
document.getElementById("xshow").style.display="none";document.getElementById("xhide").style.display="inline";}
document.getElementById("xhide").onclick=function(){document.getElementById("CusList").style.display="none"
document.getElementById("ListDesc").style.display="none";document.getElementById("xshow").style.display="inline";document.getElementById("xhide").style.display="none";}
document.getElementById("page_show").onclick=function(){if(document.getElementById("WLpages").style.display=="none"){if(Array.isArray(pages)){document.getElementById("WLpages").innerHTML=pages.toString().replace(/,/g,"<br>");}
else{document.getElementById("WLpages").innerHTML=pages;}
document.getElementById("WLpages").style.display="block";}
else{document.getElementById("WLpages").style.display="block";}
document.getElementById("page_show").style.display="none";document.getElementById("page_hide").style.display="inline";}
document.getElementById("page_hide").onclick=function(){document.getElementById("WLpages").style.display="none"
document.getElementById("page_show").style.display="inline";document.getElementById("page_hide").style.display="none";}
document.getElementById("pshow").onclick=function(){if(document.getElementById("phraseList").style.display=="none"){if(Array.isArray(phrases)){document.getElementById("phraseList").innerHTML=phrases.toString().replace(/,/g,"<br>");}else{document.getElementById("phraseList").innerHTML=phrases;}
document.getElementById("phraseList").style.display="block";}else{document.getElementById("phraseList").style.display="block";}
document.getElementById("pshow").style.display="none";document.getElementById("phide").style.display="inline";}
document.getElementById("phide").onclick=function(){document.getElementById("phraseList").style.display="none"
document.getElementById("pshow").style.display="inline";document.getElementById("phide").style.display="none";}
document.getElementById("clearWhite").onclick=function(){var result=confirm("This will delete your custom whitelist, are you sure this is what you want?");if(result){chrome.storage.sync.remove("phraseWhitelist");chrome.runtime.sendMessage({clear:"clear"});location.reload();}}
document.getElementById("clearPages").onclick=function(){var result=confirm("This will delete your custom whitelist, are you sure this is what you want?");if(result){chrome.storage.sync.remove("whitepage")
chrome.runtime.sendMessage({clear:"clear"});location.reload();}}
function build(data){values=data.userdata.splice(0,4);values.push(data.userdata[data.userdata.length-1]);}
function phraseDisplay(whitelist){if(whitelist.phraseWhitelist){if(Array.isArray(whitelist.phraseWhitelist)){phrases=whitelist.phraseWhitelist.splice(0,whitelist.phraseWhitelist.length);}
else{phrases=whitelist.phraseWhitelist;}}
else{phrases="No whitelisted phrases!";}}
function pageDisplay(WLPages){if(WLPages.whitepage){if(Array.isArray(WLPages.whitepage)){pages=WLPages.whitepage.splice(0,WLPages.whitepage.length);}else{pages=WLPages.whitepage;}}else{pages="No whitelisted pages!";}}}