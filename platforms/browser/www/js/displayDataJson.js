


function displayData () {
	doGet(
		"http://127.0.0.1/Creative/www/php/displayData.php",
		function (data) {
			document.getElementById("toDisplay").innerHTML = data;
		},
		function (data) {
			console.log(data);
		}
	);
}