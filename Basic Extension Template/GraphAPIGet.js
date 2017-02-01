// HTTP GET request function. 'theUrl' is passed from getData and consists of the desired Graph API endpoint with the user's access token appended.
function httpGetAsync(theUrl, callback, type)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        // XMLHttpRequests are Asynchronous, so this code detects when the request has successfully completed.
		if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText,type);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}

// Retrieve the user access token from chrome storage, then call httpGetAsync to send a GET using fetched token.
function getData() {
	chrome.storage.sync.get("accessToken", function(item) {
		// GET request to custom GraphAPI endpoint. Utilizes the access token stored in Google Storage
		httpGetAsync("https://graph.facebook.com/me?fields=id,cover,picture.height(100).width(100),first_name,last_name,age_range,gender,email,work,education,taggable_friends,hometown,favorite_teams&access_token="+item.accessToken, jsonParse, "data");
	});
};

function getPicture() {
	chrome.storage.sync.get("accessToken", function(item) {
		// GET request to custom GraphAPI endpoint. Utilizes the access token stored in Google Storage
		httpGetAsync("https://graph.facebook.com/me?fields=picture.height(100).width(100)&access_token="+item.accessToken, jsonParse, "img");
	});
}
// Facebook JSON formatted data is converted to an object for easier handling.
function jsonParse(json,type) {
	//var userData = JSON.parse(json);
	if (type == "img"){
		wordlistStore("userpic",json)
	} 
	else {
		wordlistStore("userdata",json);
	}
	
	//dataCleanup(userData);
}

// Deletes unnecessary data from JSON to reduce size of object for storage.
// Quick and dirty code, can be improved later.
function dataCleanup(bigData) {
	var dataValues = [];
	for (var x = 0; x < bigData.education.length; x++){
		dataValues.push(bigData.education[x].school.name);
		dataValues.push(bigData.education[x].year.name);
		delete bigData.education[x].id;
		delete bigData.education[x].school.id;
		delete bigData.education[x].year.id;
	}
	delete bigData.id;
	for (var x = 0; x < bigData.taggable_friends.data.length; x++){
		dataValues.push(bigData.taggable_friends.data[x].name);
		delete bigData.taggable_friends.data[x].id;
		delete bigData.taggable_friends.data[x].picture;
	}
	delete bigData.taggable_friends.paging;
	for (var x = 0; x < bigData.work.length; x++){
		// delete operator has issues handling undefined values, safety is implemented to avoid typeError later
		var workSafety = bigData['work'][x]['location'];
		dataValues.push(bigData['work'][x]['employer']['name']);
		delete bigData['work'][x]['employer']['id'];
		delete bigData.work[x].id;
		delete bigData.work[x].description;
		delete bigData.work[x].end_date;
		delete bigData.work[x].start_date;
		// error prevention / handling
		if (workSafety != null){
			dataValues.push(bigData['work'][x]['position']['name']);
			dataValues.push(bigData['work'][x]['location']['name']);
			delete bigData['work'][x]['location']['id'];
			delete bigData.work[x].position.id;
		}
		dataValues.push(bigData.favorite_teams[x].name);
		dataValues.push(bigData.hometown.name);
		delete bigData.favorite_teams[x].id;
		delete bigData.hometown.id;
	}
	wordlistStore(bigData);
}

// Store JSON object in Google storage to retrieve later
function wordlistStore(key, object){
	var jsonstr = JSON.stringify(object);
	var i = 0;
	var storageItem = {};
	alert(jsonstr);
	while (jsonstr.length > 0) {
		var index = key + "_" + i++;
		alert(index);
		var valueLength = chrome.storage.sync.QUOTA_BYTES_PER_ITEM - index.length - 2;
		var segment = jsonstr.substr(0, valueLength);
		alert(segment);
		//while (JSON.stringify(segment).length > valueLength)
		//	segment = jsonstr.substr(0, --valueLength);
		storageItem[index] = segment;
		alert(storageItem[index]);
		jsonstr = jsonstr.substr(valueLength);
	}
	chrome.storage.sync.set(storageItem);
}

/*function wordlistStore(jsonobject,type) {
	if (type == "data"){
		chrome.storage.sync.set({ "userdata" : jsonobject}, function() {
		if (chrome.runtime.error){
			alert("Runtime Error");
		}
		});
	}
	else if (type == "img"){
		chrome.storage.sync.set({ "userpic" : jsonobject}, function() {
		if (chrome.runtime.error){
			alert("Runtime Error");
		}
		});
	}
}
*/