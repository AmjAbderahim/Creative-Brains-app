function User (inputs) {
	this.arguments;
	for(var i=0;i<inputs.length;i++){
    	this.arguments[inputs[i].name] = inputs[i].value;
    }
}