var hw = 0;
var exam = 0;
var ta = 0;
var proj = 0;
var other = 0;
//var i = 0;

function incrementhw(){
hw += 1; /* Function for automatic increment of field's "Name" attribute. */
}

function incrementexam(){
exam += 1; /* Function for automatic increment of field's "Name" attribute. */
}

function incrementta(){
ta += 1; /* Function for automatic increment of field's "Name" attribute. */
}

function incrementproj(){
proj += 1; /* Function for automatic increment of field's "Name" attribute. */
}

var i = 0; /* Set Global Variable i */
function incrementother(){
other += 1; /* Function for automatic increment of field's "Name" attribute. */
}

function increment(){
i += 1; /* Function for automatic increment of field's "Name" attribute. */
}

/*

---------------------------------------------

Function to Remove Form Elements Dynamically
---------------------------------------------

*/
function removeElement(parentDiv, childDiv){
    if (childDiv == parentDiv){
    alert("The parent div cannot be removed.");
    }
    else if (document.getElementById(childDiv)){
        var child = document.getElementById(childDiv);
        var parent = document.getElementById(parentDiv);
    parent.removeChild(child);
    }
    else{
    alert("Child div has already been removed or does not exist.");
    return false;
    }
}

/*
----------------------------------------------------------------------------

Functions that will be called upon when user adds adiitonal field elements

----------------------------------------------------------------------------
*/

function addHomework(){
	/*
	var newhwtitle = document.createElement('div');
	newhwtitle.innerHTML = "HW" + (hw + 1) + " <br>input type = "text" >";
	*/
	var ts = document.createElement('span');
	var ti = document.createElement('Input');
	ti.setAttribute("type", "text");
	ti.setAttribute("placeholder", "HW Title");
	var tx = document.createElement("IMG");
	tx.setAttribute("src", "delete.png");
	incrementhw();
	ti.setAttribute("Name", "hwtitle_" + hw);
	ts.appendChild(ti);
	tx.setAttribute("onclick", "removeElement('sylData','hwtitle_" + hw + "'')");
	ts.appendChild(tx);
	ts.setAttribute("id", "hwtitle_" + hw);
	//break;
	
	var ms = document.createElement('span');
	var mi = document.createElement('Input');
	mi.setAttribute("type", "text");
	mi.setAttribute("placeholder", "HW Material");
	var mx = document.createElement("IMG");
	mx.setAttribute("src", "delete.png");
	mi.setAttribute("Name", "hwmaterial_" + hw);
	ms.appendChild(ti);
	mx.setAttribute("onclick", "removeElement('sylData','hwmaterial_" + hw + "'')");
	ms.appendChild(tx);
	ms.setAttribute("id", "hwmaterial_" + hw);
	//break;

	var as = document.createElement('span');
	var ai = document.createElement('Input');
	ai.setAttribute("type", "date");
	ai.setAttribute("placeholder", "Assigned");
	var ax = document.createElement("IMG");
	ax.setAttribute("src", "delete.png");
	ai.setAttribute("Name", "hwassigned_" + hw);
	as.appendChild(ti);
	ax.setAttribute("onclick", "removeElement('sylData','hwassigned_" + hw + "'')");
	as.appendChild(tx);
	as.setAttribute("id", "hwassigned_" + hw);
	//break;

	var ds = document.createElement('span');
	var di = document.createElement('Input');
	di.setAttribute("type", "date");
	di.setAttribute("placeholder", "Due Date");
	var dx = document.createElement("IMG");
	dx.setAttribute("src", "delete.png");
	di.setAttribute("Name", "hwdue_" + hw);
	ds.appendChild(ti);
	dx.setAttribute("onclick", "removeElement('sylData','hwdue_" + hw + "'')");
	ds.appendChild(tx);
	ds.setAttribute("id", "hwdue_" + hw);
	//break;

	var ws = document.createElement('span');
	var wi = document.createElement('Input');
	wi.setAttribute("type", "time");
	wi.setAttribute("placeholder", "What Time?");
	var wx = document.createElement("IMG");
	wx.setAttribute("src", "delete.png");
	wi.setAttribute("Name", "hwtime_" + hw);
	ws.appendChild(ti);
	wx.setAttribute("onclick", "removeElement('sylData','hwtime_" + hw + "'')");
	ws.appendChild(tx);
	ws.setAttribute("id", "hwtime_" + hw);
	//break;

	/*Due location to go here*/

	document.getElementById("SylData").appendChild(ts);
	document.getElementById("sylData").appendChild(ms);
	document.getElementById("sylData").appendChild(as);
	document.getElementById("SylData").appendChild(ds);
	document.getElementById("sylData").appendChild(ws);
	/*document.getElementById("myForm").appendChild(ls);*/




}

/*
----------------------------------------------------------------------------

Functions that will be called upon, when user click on the HW text field.

*/

function homeworkBlock(){
    console.log('test');
	var hwBlockButton = document.createElement('div');
	hwBlockButton.id = "addHomeworkButton"
	//hwBlockButton.innerHTML = "<input type="button" value="Add a Homework" onClick ="addHomework();">";
	document.getElementById(sylData).appendChild(hwBlockButton);
	increment();
}

/*function homeworkFunction(){
var r = document.createElement('span');
var y = document.createElement("INPUT");
y.setAttribute("type", "text");
y.setAttribute("placeholder", "Homework");
var g = document.createElement("IMG");
g.setAttribute("src", "delete.png");
increment();
y.setAttribute("Name", "textelement_" + i);
r.appendChild(y);
g.setAttribute("onclick", "removeElement('myForm','id_" + i + "'')");
r.appendChild(g);
r.setAttribute("id", "id_" + i);
document.getElementById("myForm").appendChild(r);
}*/
/*/*
-----------------------------------------------------------------------------

Functions that will be called upon, when user click on the E-mail text field.

------------------------------------------------------------------------------

function taFunction(){
var r = document.createElement('span');
var y = document.createElement("INPUT");
y.setAttribute("type", "text");
y.setAttribute("placeholder", "TA");
var g = document.createElement("IMG");
g.setAttribute("src", "delete.png");
increment();
y.setAttribute("Name", "textelement_" + i);
r.appendChild(y);
g.setAttribute("onclick", "removeElement('myForm','id_" + i + "')");
r.appendChild(g);
r.setAttribute("id", "id_" + i);
document.getElementById("myForm").appendChild(r);
}

function examFunction(){
var r = document.createElement('span');
var y = document.createElement("INPUT");
y.setAttribute("type", "text");
y.setAttribute("placeholder", "Exam");
var g = document.createElement("IMG");
g.setAttribute("src", "delete.png");
increment();
y.setAttribute("Name", "textelement_" + i);
r.appendChild(y);
g.setAttribute("onclick", "removeElement('myForm','id_" + i + "')");
r.appendChild(g);
r.setAttribute("id", "id_" + i);
document.getElementById("myForm").appendChild(r);
}

function projectFunction(){
var r = document.createElement('span');
var y = document.createElement("INPUT");
y.setAttribute("type", "text");
y.setAttribute("placeholder", "Project");
var g = document.createElement("IMG");
g.setAttribute("src", "delete.png");
increment();
y.setAttribute("Name", "textelement_" + i);
r.appendChild(y);
g.setAttribute("onclick", "removeElement('myForm','id_" + i + "')");
r.appendChild(g);
r.setAttribute("id", "id_" + i);
document.getElementById("myForm").appendChild(r);
}

function otherFunction(){
var r = document.createElement('span');
var y = document.createElement("TEXTAREA");
var g = document.createElement("IMG");
y.setAttribute("cols", "17");
y.setAttribute("placeholder", "Other");
g.setAttribute("src", "delete.png");
increment();
y.setAttribute("Name", "textelement_" + i);
r.appendChild(y);
g.setAttribute("onclick", "removeElement('myForm','id_" + i + "')");
r.appendChild(g);
r.setAttribute("id", "id_" + i);
document.getElementById("myForm").appendChild(r);
}
/*
