var currentDivId = "Creations";
var genres = [];
var genresColors = [];
var g = [
    "sound",
    "photography",
    "drawing",
    "design",
    "video",
    "painting",
    "idea",
    "writing",
    "motivation",
    "travel",
    "science",
    "books",
    "health",
    "architecture"
];

function next(from, to) {
    $("#" + from).animate( {"margin-left": "-100vw"}, 500, "linear" ); 
    $("#" + to).animate( { "opacity": "show", "margin-left": "0vw"} , 500 );
    
    if(from == "genre-choice" || from == "Profile" || from == "Creations" || from == "home") {
        $("#" + from).css("display", "none");
    }

    if(to == "searchPage") {
        $("#Creations").css("display", "none");
    }
}

function showMenu() {
    $("#float-menu").animate( {"margin-left": "0vw"}, 200, "linear" );
}

function hideMenu() {
    hide("float-menu");
}

function hide(id) {
    $("#" + id).animate( {"margin-left": "-100vw"}, 200, "linear" );
}

function switchPageTo(id) {
    hideMenu();
    $("#"+ currentDivId).css("display", "none");
    $("#"+ id).css("display", "block");
    $("#header-title").html(id);
    currentDivId = id;
}



function selectGenre(genre) {
    if (!genres.includes(genre)) {
        genres.push(genre);
        select(genre);
        if (genres.length == 5) {
            disable();
        }
    } else {
        if (genres.length == 5) {
            able();
        }
        genres = arrayRemove(genres, genre);
        deselect(genre);
    }
}

function arrayRemove(arr, value) {
    return arr.filter(function(ele){
        return ele != value;
    });
}

function disable() {
    for (var i = 0; i < g.length; i++) {
        if (!genres.includes(g[i])) {
            $("#" + g[i]).addClass("disabledbutton");
        }
    }
}

function select(id) {
    if (genres.length > 0) {
        $("#myProgress").css("display", "block");
    }
    genresColors[id] = $("#" + id + " > div").css("background-color");
    $("#" + id + " > div").css("background-color", "rgba(63, 64, 64, 0.8)");
    $("#" + id + " > div > span").html('<i class="fas fa-check-circle"></i>');
    $("#counter").html(genres.length + "/5");
    $("#myBar").css("width", genres.length * 20 + "%");
}

function deselect(id) {
    $("#" + id + " > div").css("background-color", genresColors[id]);
    $("#" + id + " > div > span").html(id);
    if (genres.length > 0) {
        $("#counter").html(genres.length + "/5");
    } else {
        $("#counter").html("");
        $("#myProgress").css("display", "none");
    }
    $("#myBar").css("width", genres.length * 20 + "%");
}

function able() {
    for (var i = 0; i < g.length; i++) {
        if (!genres.includes(g[i])) {
            $("#" + g[i]).removeClass("disabledbutton");
        }
    }
}

function checkFileAndAddPost () {
    var text = $("textarea#postText").val();
    var file_data = $('#file').prop('files')[0];   
    var form_data = new FormData();
    form_data.append('text', text);
    form_data.append('file', file_data);
    form_data.append('username',window.localStorage.getItem("username"));
    $("textarea#postText").val("");
    (new Form()).doPostWithData("addPost.php",form_data);
  
}

function openPost(idPost) {
    var form = new Form();
    form.doGet("openPost.php?idPost="+idPost+"&username="+window.localStorage.getItem("username"),openPostSuccess);
}
function openPostSuccess(result) {
    console.log("openPost"+result);
    result = JSON.parse(result);
    next(currentDivId, "postPage");
    // ghadi t geter limage w dirha hna
    var image = result["post"]["file_name"]; // hadi ghir test
    $("#postImage").attr("src","uploads/" + image);

    $("#usernamePost").text(window.localStorage.getItem("username"));
    // ghadi tgeter l text wdiro hna
    var text = result["post"]["status"];
    $("#postText").html(text);

    var feedback = '<span>'+result["commentsCount"]+' <i class="fas fa-comments"></i></span>';
        feedback += '<span class="'+result["isLiked"]+'" onclick="like('+result["post"]["id"]+')" id="p'+result["post"]["id"]+'"><span id="plikesNumber-'+result["post"]["id"]+'">'+result["likes"]+'</span> <i class="fas fa-sign-language"></i></span>';
    $("#pfeedback").html(feedback);

    document.getElementById("comments").innerHTML = "";
    for (var i = 0; i < result["comments"].length; i++) {
        var comments = '<div class="comment"><div class="uimg"><img src="img/static_img/'+result["comments"][i]["photo"]+'" width="30px" height="30px"></div>';
        comments += '<span id="commentContent">'+result["comments"][i]["comment"]+'</span></div><hr>';
        document.getElementById("comments").innerHTML+=comments;
    }
    document.getElementById("addButtonHere").innerHTML = '<div class="uimg"><img src="img/static_img/user.png" width="30px" height="30px"></div><input type="text" id="commentField" class="searchInput" placeholder="Add comment" />';
    document.getElementById("addButtonHere").innerHTML += '<span onclick="comment('+result["post"]["id"]+')"><i class="fas fa-paper-plane"></i></span>';
}

function like(postId) {
    if (!$("#" + postId).hasClass("liked")) {
        $("#" + postId).addClass("liked");
        $("#p" + postId).addClass("liked");
        $("#likesNumber-" + postId).html(parseInt($("#likesNumber-" + postId).html()) + 1);
        $("#plikesNumber-" + postId).html(parseInt($("#plikesNumber-" + postId).html()) + 1);
        var form = new Form();
        form.doGet("like.php?id="+postId+"&username="+window.localStorage.getItem("username"),likeSuccess);
    } else {
        $("#" + postId).removeClass("liked");
        $("#p" + postId).removeClass("liked");
        $("#likesNumber-" + postId).html(parseInt($("#likesNumber-" + postId).html()) - 1);
        $("#plikesNumber-" + postId).html(parseInt($("#plikesNumber-" + postId).html()) - 1);
        var form = new Form();
        form.doGet("deslike.php?id="+postId+"&username="+window.localStorage.getItem("username"),likeSuccess);
    }
}

function comment(idPost) {
    var form = new Form();
    var comment = document.getElementById("commentField").value;
    form.doGet("addComment.php?idPost="+idPost+"&username="+window.localStorage.getItem("username")+"&comment="+comment,addCommentSuccess);
}
function addCommentSuccess (result) {
    console.log(result);
    openPost(result);
}
function profile(user_id) {
    // hna l3ob d back end changer les données dl page d profile dayrha statique ana
    switchPageTo("Profile");
    next("searchPage", currentDivId);
}