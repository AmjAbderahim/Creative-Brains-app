
function doGet (url,successFunction,errorFunction) {
	$.ajax({
		type:'GET',
		url:url,
		success:successFunction,
		error:errorFunction
	});
}
function doPost (url,data,successFunction,errorFunction) {
	$.ajax({
		type:'POST',
		url:url,
		data:data,
		success:successFunction,
		error:errorFunction
	});
}