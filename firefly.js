﻿/*fireflyDomSniffer code written By - Tarun Gupta 

*Just need to call the _fireflyDomSniffer("some Selecter id").Method 
* you can chain as many methods as you want and will not harm your exection as it was in problem defination 
*/

//creating the Main function which will take the parameter for the library function
var cObj;
var cJson;
var cSel=-1;
var cHov=0; 
function _fireflyDomSniffer(z) {
    var dflt = { Product: "FireFly" };
    if (z) {
        if (window === this) {
            return new _fireflyDomSniffer(z);
        }
        this.e = document.getElementById(z);
        return this
    } else {
        return dflt
    }
}
//prototype of the function

_fireflyDomSniffer.prototype =
{
    //function to override 
    //z=> data for the element
    //c=> type of element 
    appendChild: function (z, c) {
        var d = document.createElement(c);
        var delta = this.e.outerHTML;
        d.innerHTML = "<br />Newly created Element <br>" + z;
        d.style.backgroundColor = "black";
        d.style.color = "white";
        this.e.appendChild(d);
        this.createWhatYouDid("appendChild", delta); //this will be used for all the methods
        return d;
    },
    removeChild: function (childDiv) {
        var child = document.getElementById(childDiv);
        var parent = document.getElementById(this.e.id);
        parent.removeChild(child);
        this.createWhatYouDid("removeChild", child.outerHTML); //this will be used for all the methods
        return this
    },
    removeAttribute: function (tag, name) {
        var exclude = this.excludeList();
        if (exclude.indexOf(name) == -1) {
            tag.removeAttribute(name);
        }
        else {
            alert("Cannot remove \"" + name + "\" as it exists in FireFly excluded Attribute list.");
        }
        this.createWhatYouDid("removeAttribute", tag.outerHTML);
        return this
    },
    insertAttribute: function (z, val) {
        this.e.removeAttribute(z);
        this.e.setAttribute(z, val);
        this.createWhatYouDid("insertAttribute", this.e.outerHTML);
        return this

    },
    bgcolor: function (z) {
        this.e.style.background = z;
        this.e.innerHTML += "Shit got hacked by Firefly";
        return this
    },
    includeList: function () {
        var includeList = ["style", "class", "name", "title", "id"];
        //var includeList = ["style", ["class", "/^[a-zA-Z0-9\s,\-_]+$/"], "name", "title", ["id", "/^[a-zA-Z0-9\:\-_\.]+$/"], ["other", "/^.*$/"]];
        return includeList;
    },
    excludeList: function () {
        return ['onclick', 'id'];
    },
    collectTextNodes: function (document) {
        var arr = document.getElementsByTagName("input");
        var inputArray = new Array();
        for (var i = 0; i < arr.length; i++) {
            var input = arr[i];
            if (input.type == 'text') {
                //alert(input.parentNode.id);
                inputArray.push(input.parentNode.id + ":" + input.value);
                arr[i].style.backgroundColor = "red";
            }
        }
        var json = JSON.stringify(inputArray);
        this.createWhatYouDid("collectTextNodes", json);

    },
    sanitizeHTML: function (name, attrVal) {
        switch (name) {
            case "class":
                var regex = /^[a-zA-Z0-9\s,\-_]+$/;
                var result = regex.test(attrVal);
                return result;
                break;
            case "id":
                var regex = /^[a-zA-Z0-9\:\-_\.]+$/;
                var result = regex.test(attrVal);
                return result;
                break;

            default:
                var regex = /^.*$/;
                var result = regex.test(attrVal);
                return result;

        }
        this.createWhatYouDid("sanitizeHTML", this.e.outerHTML);

    }, createWhatYouDid: function (func, delta) {
        var str = "Received Overridden function Call!!";
        str += "<br>Function : <b>" + func + "</b>";
        str += "<br>HtmlDelta: <b><xmp>" + delta + "</xmp></b>";
        document.getElementById("whatYouDid").innerHTML = str;
    },
    collectSelectNode: function () {
        /*TO collect All select Node and return complete JSON object with its text and  values*/
        var arr = document.getElementsByTagName("select");
        var inputSelectId = {};
        var idCount = 1;
        var givenSelector = this.e;
        for (var i = 0; i < arr.length; i++) {
            this.e = arr[i];
            this.insertAttribute("onclick", "_fireflyDomSniffer(\"result\").getAllSelectNodesValues(this);");

            //="" onMouseout="popup()"
            if (!arr[i].hasAttribute("id")) {
                var newID = "fireflyselect" + idCount;
                this.insertAttribute("id", newID);
                idCount++;
            }
        }
        var json = "Done scanning and added ID's to all element where it was not present + added onlick listner.";
        this.createWhatYouDid("collectSelectNode", json);
        return json;
    },
    collectData: function (arrayElements) {
        /*TO collect any of an array and return a json object*/
        var main = [];

        for (var i = 0; i < arrayElements.length; i++) {
            var data = {};
            this.e = arrayElements[i];
            this.insertAttribute("class", "dropoptions");
            this.insertAttribute("onmouseover", "_fireflyDomSniffer('result').getSelectOnMouseOver(this);");
            this.insertAttribute("onmouseout", "_fireflyDomSniffer('result').getSelectOnMouseOut(this);");
            //data[arrayElements[i].text] = arrayElements[i].value;
            data.text = arrayElements[i].text;
            data.val = arrayElements[i].value;
            main[i] = data;
        }
        return main;
    },
    getAllSelectNodesValues: function (arr) {
        this.e = arr;
        this.insertAttribute("onChange", "_fireflyDomSniffer('result').getSelectOnChange(this);");
        var inputArray = new Array();
        var inputSelectId = {};
        var givenSelector = this.e;
        var dataArr = this.collectData(arr);
        //alert(JSON.stringify(dataArr));
        inputSelectId[arr.id] = dataArr;
        var json = JSON.stringify(inputSelectId);
        this.createWhatYouDid("collectSelectNode", json);
        console.log(json);
        d = document.getElementById("result");
        this.DummySelect(d, json, cSel, cHov);
        return json;
    },
    getSelectOnChange: function (obj) {
        console.log("Selected value is :" + obj.value + " and selected index is : " + obj.selectedIndex);
        this.DummySelect(cObj, cJson, cSel, obj.selectedIndex);
        cSel = obj.selectedIndex;
        cHov = -1;
    },
    getSelectOnMouseOver: function (obj) {
        console.log("Hover index is :" + obj.index);

        this.DummySelect(cObj, cJson, cSel, obj.index);
        cHov = obj.index;

    },
    getSelectOnMouseOut: function (obj) {
        console.log("Hover Out from  :" + obj.id);
        //this.DummySelect(cObj, cJson, cSel, cHov);
    },
    resetAndOutFromSelect: function () {

    }, DummySelect: function (obj, json, currentlyhovered, currentlyselected) {
        this.e = obj
        var o = JSON.parse(json); //conerted the string into JSON object
        var s;
        for (t in o) {
            s = t; //getting id of selected element
        }
        //alert(s);
        $.each(o, function () {
            inner = this;

            s = "<ul>";
            $.each(inner, function (index) {
                if (index == currentlyselected && index == currentlyhovered) {
                    s += "<li class='active'>@" + this.text + "</li>";
                }
                else if (index == currentlyselected) {
                    s += "<li class='active'>" + this.text + "</li>";
                }
                else if (index == currentlyhovered) {
                    s += "<li>@" + this.text + "</li>";
                }
                else {
                    s += "<li>" + this.text + "</li>";
                }
            });
            console.log(s);
            s += "</ul>";
        });
        document.getElementById("result").innerHTML = "";
        var newEl = this.appendChild(s, "div");
        newEl.setAttribute("class", "ffselectbox");
        cObj = obj;
        cJson = json;


    }
}


