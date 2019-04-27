function Menu(defaultMenu) {
    this.currentDivId = defaultMenu;
}

Menu.prototype.show = function (id) {
    $("#" + this.currentDivId).style("display", "none");
    $("#" + id).display("block");
    this.currentDivId = id;
}

/*******************************************************************************/

function showFloatMenu(id) {
    $("#" + id).reverseDisplay();
}

/*******************************************************************************/

function Dom(selector) { // "#id" | "div"
    if (selector.startsWith("#")) {
        this.elements = [document.getElementById(selector.substring(1))];
    }
    else{
        var result = document.getElementsByTagName(selector);
        this.elements = [];
        for (var i = 0; i < result.length; i++) {
            this.elements.push(result.item(i));
        }
    }
}

Dom.prototype.html = function (content) {
    if (content == undefined) {
        var s = "";
        for (var i = 0; i < this.elements.length; i++) {
            s += this.elements[i].innerHTML;
        }
        return s;
    }
    else {
        for (var i = 0; i < this.elements.length; i++) {
            this.elements[i].innerHTML = content;
        }
    }
}

Dom.prototype.style = function (property, value) {
    for (var i = 0; i < this.elements.length; i++) {
        this.elements[i].style[property] = value;
    }
}

Dom.prototype.display = function (value) {
    if (value == undefined) {
        return this.elements[0].style["display"];
    }
    for (var i = 0; i < this.elements.length; i++) {
        this.elements[i].style["display"] = value;
    }
}

Dom.prototype.value = function (value) {
    if (value == undefined) {
        return this.elements[0].value;
    }
    this.elements[0].value = value;
}

Dom.prototype.reverseDisplay = function () {
    for (var i = 0; i < this.elements.length; i++) {
        if (this.elements[i].style["display"] == "none" || this.elements[i].style["display"] == "") {
            this.elements[i].style["display"] = "block";
        }
        else {
            this.elements[i].style["display"] = "none";
        }
    }
}

var $ = function (selector) {
    return new Dom(selector);
}