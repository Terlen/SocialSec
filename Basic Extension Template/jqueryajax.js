$(document).ready(function(){
		$("button").click(function(){
			$.ajax({url: "xmlhttp_info.txt", success:
	function(result){
				$("#demo").html(result);
		}});
	});
	});