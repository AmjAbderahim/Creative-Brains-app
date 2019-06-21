
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

//project Javascript
var folderProjects="img/projects/"

function setProjectsData(){
  var idUser=$("#idUser").val();
   $.ajax({
  url: serverSideUrl+"profile.php",
  type: "POST",
  data: {id : idUser,
         getData:"projectsData"
     },
  dataType: "json",
  success:function (data){
    $("#projs .chip").remove();
    div=$("#projs");
    var html='';
for (var i =0;i<data.length;i++) {
  html+="<div class='chip' id='"+data[i].id+"' ><img src='"+folderProjects+data[i].logo+"' alt='Person' >"+data[i].nom+"<span class='iconsProject' ><a href='#ex1' rel='modal:open'><i onclick='editicon(this)' class='fa fa-user'></i></a><i style='color:#00ff97' onclick='getProject(this)' class='fa fa-edit'></i><i style='color:red' onclick='DeleteProject(this)' class='fa fa-times'></i></span><br/><span class='projectRow'>Creation Date :</span> "+GetFormattedDate(new Date(data[i].dateCreation))+"<br/><span class='projectRow'>Category :</span>"+data[i].category+"<br/><span class='projectRow'>Description:</span>"+data[i].description+"<br/></div>";     
             }
 div.append(html);
  
  },
  error:function (jqXHR, textStatus, errorThrown) {
               
            AlertSimple("Oops !", "Something went wrong !", "error");

                console.log('jqXHR:');
                console.log(jqXHR);
                console.log('textStatus:');
                console.log(textStatus);
                console.log('errorThrown:');
                console.log(errorThrown); 
            }
});
    }

function GetFormattedDate(TDate) {
    var month =  TDate.getMonth() + 1;
    var day =  TDate.getDate();
    var year =  TDate.getFullYear();
    return day + "/" + month + "/" + year;
}     
    

 

function FormProject(){
  if($("#id-project").val()=="")
  $('#mylogofileImg').css('height','0px');
  var formDiv=$("#addProject");
  var projectDiv=$("#projs");
  formDiv.removeClass("hidden");
  projectDiv.hide();
   
}

function canceladdProject(){
  $("#id-project").val('');
  $("#FormProject").attr("onclick","AddProject()")   
  $("#name-project").val('');
  $('#mylogofile').val('');   
  $('#mylogofileImg').css('height','0px');   
  $("#category-project").find('option:eq(0)').prop('selected', true);
  $("#description-project").val('');

  var formDiv=$("#addProject");
  var projectDiv=$("#projs");
  formDiv.addClass("hidden");
  projectDiv.show();
}
 
//add Project

function AddProject () {
 
    var id = $("#id-project").val();
    var name = $("#name-project").val();
    var file_data = $('#mylogofile').prop('files')[0];   
    var form_data = new FormData();
    
    form_data.append('id', id);
    form_data.append('name', name);
    form_data.append('id_User',$("#idUser").val());
    form_data.append('file',file_data);
    form_data.append('category',$("#category-project").val());
    form_data.append('description',$("#description-project").val());
    form_data.append('getData',"saveProject"); 
    (new Form()).doPostWithData("profile.php",form_data);
    canceladdProject();
    $("#projs .chip").remove();
  setTimeout(function(){ setProjectsData() }, 300);
} 

//change project

function ChangeProject () {
 
    var file_exist="false";
    var id = $("#id-project").val();
    var name = $("#name-project").val();
    var file_data = $('#mylogofile').prop('files')[0];
    console.log(file_data)   
    if(file_data != undefined)
    file_exist="true";

    var form_data = new FormData();
    form_data.append('isExist',file_exist);
    form_data.append('id', id);
    form_data.append('name', name);
    form_data.append('file',file_data);
    form_data.append('category',$("#category-project").val());
    form_data.append('description',$("#description-project").val());
    form_data.append('getData',"EditProject"); 
    (new Form()).doPostWithData("profile.php",form_data);
    canceladdProject();
    $("#projs .chip").remove();
  setTimeout(function(){ setProjectsData() }, 300);
  }



function getProject (thisP) {
var idP=thisP.parentElement.parentElement.id;
 $.ajax({
  url: serverSideUrl+"/profile.php",
  type: "POST",
  data: {id : idP,
         getData:"getProject"
     },
  dataType: "json",
  success:function (data){
    $("#FormProject").attr("onclick","ChangeProject()");  
    $('#mylogofileImg').removeAttr("style");
    $("#id-project").val(data.id);
    $("#name-project").val(data.nom);
    $('#mylogofileImg').attr("src",folderProjects+data.logo);       
    $("#category-project").val(data.category);
    $("#description-project").val(data.description);
    FormProject(); 
}
,
error:function (jqXHR, textStatus, errorThrown) {
               
            AlertSimple("Oops !", "Something went wrong !", "error");
                console.log('jqXHR:');
                console.log(jqXHR);
                console.log('textStatus:');
                console.log(textStatus);
                console.log('errorThrown:');
                console.log(errorThrown); 
}
               
})


}


function DeleteProject(thisP){
var divParent=thisP.parentElement.parentElement;
var idP=divParent.id;
 $.ajax({
  url: serverSideUrl+"/profile.php",
  type: "POST",
  data: {id : idP,
         getData:"DeleteProject"
     },
  dataType: "json",
  success:function (data){
console.log(data);
 if(data=="deleted"){
      divParent.remove();
  AlertSimple("Good !", "Project deleted with success !", "success");

    }
    else
 AlertSimple("Oops !", "Something went wrong !", "error");


}
,
error:function (jqXHR, textStatus, errorThrown) {
               
            AlertSimple("Oops !", "Something went wrong !", "error");
                console.log('jqXHR:');
                console.log(jqXHR);
                console.log('textStatus:');
                console.log(textStatus);
                console.log('errorThrown:');
                console.log(errorThrown); 
}
               
})


}


function addMembers(field){
var value=field.value;
 
 $.ajax({
  url: serverSideUrl+"/profile.php",
  type: "POST",
  data: {val : value,
         idP :$("#inviteToProject").val(),
         getData:"addMember"
     },
  dataType: "json",
  success:function (data){
    $('#search-result-container').html('')

if(data.length==0)
 $('#search-result-container').append("<div class='search-result'><b> No Users Found...!! </b></div>");
else{
for (var i =0; i<data.length ; i++) {

     $('#search-result-container').append("<div class='search-result'> <i class='fas fa-user'></i>  "+data[i].username+" <input style='float:right' id='"+data[i].id+"' type='checkbox'></div>");
}
}

}
,
error:function (jqXHR, textStatus, errorThrown) {
               
            AlertSimple("Oops !", "Something went wrong !", "error");
                console.log('jqXHR:');
                console.log(jqXHR);
                console.log('textStatus:');
                console.log(textStatus);
                console.log('errorThrown:');
                console.log(errorThrown); 
}
               
})


}

  function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            
            reader.onload = function (e) {
                $('#mylogofileImg').removeAttr("style");
                $('#mylogofileImg').attr('src', e.target.result);
            }
            reader.readAsDataURL(input.files[0]);
        }
    }
    
 function editicon(thisI){
  var jquery_object = jQuery(thisI);
    var value=jquery_object.closest(".chip").attr("id");
    $("#inviteToProject").val(value);
}

function inviteUsers(){
    var idP=$("#inviteToProject").val();
    var result=$(".search-result").find("input:checked");
    var  array=[];
    result.each(function( index ) {
        array.push($(this).attr('id'));
});


$.ajax({
  url: serverSideUrl+"/profile.php",
  type: "POST",
  data: {id : idP,
         users:array,
         getData:"addMemberToProject"
     },
  dataType: "json",
  success:function (data){
    
if(data!="success")
        AlertSimple("Oops !",data, "error");
else{
            //find close modal button and click it automaticly
            $("#ex1").find(".close-modal").click();
            $(".search-result").remove();
            $("#search-data").val("");
            AlertSimple("Good Job !","Members Invited with success..!!", "success");
            
}
   }
,
error:function (jqXHR, textStatus, errorThrown) {
               
            AlertSimple("Oops !", "Something went wrong !", "error");
                console.log('jqXHR:');
                console.log(jqXHR);
                console.log('textStatus:');
                console.log(textStatus);
                console.log('errorThrown:');
                console.log(errorThrown); 
}
               
})



}