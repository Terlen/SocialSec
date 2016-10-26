$(document).ready(function(){
		$("pullfile").click(function(){
			$.ajax({url: "xmlhttp_info.txt", success:
	function(result){
				$("#demo").html(result);
		}});
	});
	});