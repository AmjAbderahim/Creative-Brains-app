var serverSideUrl = "http://192.168.1.11/Creative/www/php/";
function doGet (uri,successFunction,errorFunction) {
	showLoader();
	$.ajax({
		type:'GET',
		url:serverSideUrl+uri,
		success:successFunction,
		error:errorFunction
	});
}
function doPost (uri,data,successFunction,errorFunction) {
	showLoader();
	$.ajax({
		type:'POST',
		url:serverSideUrl+uri,
		data:data,
		success:successFunction,
		error:errorFunction
	});
}