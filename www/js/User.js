function User (username) {
	this.username = username;
	for(var i=0;i<this.inputs.length;i++){
    	this.dataString.append(this.inputs[i].name,this.inputs[i].value);
    }
}