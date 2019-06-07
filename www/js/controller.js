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
    
    if(from == "genre-choice" || from == "Profile") {
        $("#" + from).css("display", "none");
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
    var text = $("#postText").val();
    var file_data = $('#file').prop('files')[0];   
    var form_data = new FormData();
    form_data.append('text', text);
    form_data.append('file', file_data);
    form_data.append('username',window.localStorage.getItem("username"));
    (new Form()).doPostWithData("addPost.php",form_data);
}


function openPost(idPost) {
    next(currentDivId, "postPage");
    // ghadi t geter limage w dirha hna
    var image = idPost; // hadi ghir test
    $("#postImage").attr("src","img/posts/" + image);
    // ghadi tgeter l text wdiro hna
    var text = "Sometime we can feel a bit dull in the morning and we need to produce our own sunshine energy."
    $("#postText").html(text);
}

/*function like(postId) {
    if (!$("#" + postId).hasClass("liked")) {
        $("#" + postId).addClass("liked");
        $("#p" + postId).addClass("liked");
        $("#likesNumber-" + postId).html(parseInt($("#likesNumber-" + postId).html()) + 1);
        $("#plikesNumber-" + postId).html(parseInt($("#plikesNumber-" + postId).html()) + 1);
        // hna l3ob dl backend
    } else {
        $("#" + postId).removeClass("liked");
        $("#p" + postId).removeClass("liked");
        $("#likesNumber-" + postId).html(parseInt($("#likesNumber-" + postId).html()) - 1);
        $("#plikesNumber-" + postId).html(parseInt($("#plikesNumber-" + postId).html()) - 1);
        // hna l3ob dl backend
    }
}*/

function profile(user_id) {
    // hna l3ob d back end changer les données dl page d profile dayrha statique ana
    switchPageTo("Profile");
    next("searchPage", currentDivId);
}