function next(from, to) {
    $("#" + from).animate( {"margin-left": "-100vw"}, 500, "linear" ); 
    $("#" + to).animate( { "opacity": "show", "margin-left": "0vw"} , 500 );
}