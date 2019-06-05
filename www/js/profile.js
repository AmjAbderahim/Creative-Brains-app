//change UserData
 
 function updateUser(){
	var idUser=$("#idUser").val();
	var dataUser={"username": $("#username-setting").val(),"email": $("#email-setting").val(), "old_pass":$("#old-password-setting").val(),"new_pass":$("#new-password-setting").val(), "confirm_pass": $("#confirm-password-setting").val()};     
      
	  console.log(dataUser);
	  var profile= {
      "idProfile":$("#idProfile").val(),
      "age":$("input[name=age]").val(),
      "gender":$("select[name=gender]").val(),
      "about":$("#description").val()
	  }
  
	 
	  $.ajax({
  url: serverSideUrl+"profile.php",
  type: "POST",
  data: {id : idUser,
         getData:"UserDataChange",
		 account:dataUser,
		 profile:profile
     },
  dataType: "json",
  success:function (data){
	  console.log(data)
if(data!="success" && data["success"] != true){
		
		
		
		Swal.fire({
		  type: 'error',
		  title: 'Oops...',
		  text: data
		});

}
else{
	Swal.fire(
		'Good job!',
		"Your Data is Saved with success..!!",
		'success'
	);
	
	//if informations of profile setted for the First Time
   	  if(data["id"] != null)
      $("#idProfile").val(data["id"])		
	
	  $("#confirm-password-setting").val("");
      $("#new-password-setting").val("");
      $("#old-password-setting").val("");

}

  },
  error:function (jqXHR, textStatus, errorThrown) {
	  
	  Swal.fire({
		  type: 'error',
		  title: 'Oops...',
		  text: "Something went wrong !"
		});
               

                console.log('jqXHR:');
                console.log(jqXHR);
                console.log('textStatus:');
                console.log(textStatus);
                console.log('errorThrown:');
                console.log(errorThrown); 
            }
}); 

}

  
  
  function setUserData(idUser){

   $.ajax({
  url: serverSideUrl+"/profile.php",
  type: "POST",
  data: {id : idUser,
         getData:"UserData"
     },
  dataType: "json",
  success:function (data){

      $("input[name=username-setting]").val(data.username);
      $("input[name=email-setting]").val(data.email);
      $("#idUser").val(data.id);

  //check if user has anay profile Data
if(data.profile != null){
	  $("#idProfile").val(data.profile.id);
      $("select[name=gender]").val(data.profile.sexe);
      $("input[name=age]").val(data.profile.age);
      $("textArea[name=description]").val(data.profile.About);
}



  },
  error:function (jqXHR, textStatus, errorThrown) {
               
			Swal.fire({
			  type: 'error',
			  title: 'Oops...',
			  text: "Something went wrong !"
			});

                console.log('jqXHR:');
                console.log(jqXHR);
                console.log('textStatus:');
                console.log(textStatus);
                console.log('errorThrown:');
                console.log(errorThrown); 
            }
			
			

 
    
   
});
    } 
	function displayDataSetting(){
	   $("#confirm-password-setting").val("");
       $("#new-password-setting").val("");
       $("#old-password-setting").val("");
		setUserData(window.localStorage.getItem('id')+"");
	}

displayDataSetting();