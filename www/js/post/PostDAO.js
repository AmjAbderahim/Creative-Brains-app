function PostDAO () {
	
}

PostDAO.prototype.addPost = function(post) {
	var form = new Form();
    dataString = "text="+text.val()+"&file="+file.name;
    form.doPostWithData("addPost.php",dataString);
    getPosts();
};