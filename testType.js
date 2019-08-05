var c, j, d, e, count, countAdd, tdLength, lbLength, ans, countS, countF, tblLength, countL,rType, response, id;
var showData = {}


function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds) {
            break;
        }
    }
}

var type1 = {
    "_id": "",
    "typeid": 1,
    "type_name": "ChargeCard",
    "type_definition":
    [
        {
            "field_name": "id",
            "field_type": "text",
            "field_value": ""

        },
        {
            "field_name": "name",
            "field_type": "text",
            "field_value": ""

        },
        {
            "field_name": "mac address",
            "field_type": "text",
            "field_value": ""

        },
        {
            "field_name": "ip address",
            "field_type": "text",
            "field_value": ""

        },


    ],
    "Logbook":
    [
        {
            "field_name": "timestamp",
            "field_type": "datetime-local",
            "field_value": ""
        },
        {
            'field_name': 'action',
            'field_type': ['Modification', 'Relocation', 'Calibration'],
            "field_value": ""
        },
          {
              'field_name': 'resultlink',
              'field_type': "file",
              "field_value": ""
          },
          {
              'field_name': 'status',
              'field_type': "text",
              "field_value": ""
          },
          {
              'field_name': 'comment',
              'field_type': "text",
              "field_value": ""
          },
    ],
    "field_statics":
    [
        {
            "field_name": "electrical-drawings",
            "field_type": "url",
            "field_value": "http://localhost:8080/LKRev01/eplan.pdf",
            "field_modifier": "READONLY"
        },
        {
            "field_name": "electrical-layout",
            "field_type": "url",
            "field_value": "http://localhost:8080/LKRev01/layout.pdf",
            "field_modifier": "READONLY"
        },
    ]
}












var url = window.location.href;
var uri = decodeURIComponent(url)
console.log("url is:- " + decodeURIComponent(url));

var n = uri.search("data=");
console.log("n is " + n)


/*str1 = data.replace(/%22/g, " "+""+" ");
str2 = str1.replace(/%20/g, " ");*/
//document.getElementById("data").innerHTML = JSON.parse(data)[0]._id;







//For showing components
function showComp() {
    var ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

        

            console.log(this.responseText);
            //  if (this.responseText == "\"Error\"") {
            //  if (this.responseText == "Nobarcodefound[]") {
            if (this.responseText == "[]") {
                //   if (this.responseText == "canner/./img/image.jpg:Nobarcodefound") {
                //  document.getElementById("demo").innerHTML = this.responseText;
                // decodeImage();
                console.log(this.responseText);
           
            } else {
                var ans = this.responseText;

                console.log("Recieved Data is " + ans);
                var showData = JSON.parse(ans);
               

                console.log("Show data is " + showData[0].fields[1].field_name);

                var idLable = document.createElement("LABEL");
                idLable.innerHTML = "Id"
                

                idLable.className = "control-label col-sm-2";
                idLable.type = "text";
                $("#insert1").append(idLable);


                var idInput = document.createElement("input");
                idInput.type = "text";
                idInput.id = "sId";
                idInput.value = showData[0]._id;
                idInput.className = "form-control take";

                $("#insert1").append(idInput);

                        response = type1;
                                                  
                        var fsLength = type1.field_statics.length;
                        for (var k = 0; k < fsLength; k++) {
                            $("#insert1").append($("<p></p>").text(type1.field_statics[k].field_name));
                            var link1 = document.createElement("A");
                            link1.href = type1.field_statics[k].field_value;
                            link1.innerText = "Click here";
                            link1.style.color = "#00A1F9";
                            $("#insert1").append(link1);
                            $("#insert1").append("<br>");
                        }
                   
                        c = showData[0].fields.length;
                        tdLength = c;
                        console.log(c)
                    for (j = 0; j < c; j++) {

                    var inputL = document.createElement("LABEL");
                    inputL.innerHTML = showData[0].fields[j].field_name;

                    inputL.className = "control-label col-sm-2";
                    inputL.type = showData[0].fields[j].field_type;
                    inputL.id = "lablType" + j;
                    d = "lablType" + j;
                    $("#insert1").append(inputL);


                    var dd = document.createTextNode(":");


                    var inputI = document.createElement("input");
                    inputI.type = showData[0].fields[j].field_type;
                    inputI.name = showData[0].fields[j].field_name;
                    inputI.value = showData[0].fields[j].field_value;
                    inputI.id = "ipType" + j;
                    inputI.className = "form-control take";

                    $("#insert1").append(inputI);
                  

                }




                // for logbook


                // for logbook table with default row.

                var div = document.createElement("h3");
                div.innerHTML = "Logbook";
                $("#insert1").append(div);

                var countLog = response.Logbook.length;
                lbLength = countLog;
                console.log(countLog);
                console.log(response.Logbook);
                resFinal = response.Logbook;

                var tableContents = "";

                var count = Object.keys(resFinal).length;
                tableContents = "<table id=lbTable1 class=table>";
                tableContents += "<tr>";

                for (var i = 0; i < lbLength ; i++) {

                    tableContents += "<th style=width:400px>" + response.Logbook[i].field_name + "</th>";
                    //  tableContents += "<td>" + Object.values(resFinal)[i+1] + "</td>";


                }
                tableContents += "</tr>";
                var tblLength = showData[0].logbook.length;
                
                var selectedOption = [];
                for (var k = 0; k < tblLength; k++) {
                    tableContents += "<tr>";
                    for (var j = 0; j < lbLength ; j++) {

                        if (j == 0) {
                            tableContents += "<td style=width:300px ><INPUT ID= lb" + k + j + " TYPE=datetime-local style=border-style:none value=" + showData[0].logbook[k][j] + " readonly></td>";
                        }

                        else if (j == 1) {
                            var actionId = "lb" + k + 1
                            selectedOption.push(showData[0].logbook[k][j])
                            
                            tableContents += "<td style=width:100px ><SELECT TYPE=text id =" + actionId + " value=" + showData[0].logbook[k][j] + " disabled></td>";
                        } else if (j == 2) {
                            showEntry = showData[0].logbook[k][j]
                            debugger
                            console.log("type is " + typeof(showEntry))
                            if(showEntry == ""){
                                tableContents += "<td style=width:100px ><INPUT ID= elb  TYPE=text style=border-style:none value= none readonly></td>";
                            }else{
                             tableContents += "<td style=width:100px ><a id=doc href=" + showEntry + " target=_blank>Doc</a></td>";
                             }
                        }else {
                            //  tableContents += "<th>" + response.Logbook[i].field_name + "</th>";
                            showEntry = showData[0].logbook[k][j]
                            tableContents += "<td  ><INPUT ID= lb" + k + j + " TYPE=text style=border-style:none value=" + showEntry + " readonly></td>";
                        }

                    }
                    tableContents += "</tr>";
                }
                console.log("selected option is " + selectedOption)

                // tableContents += "<div id=lbAdd>";
                // tableContents += "</tr>";
                tableContents += "</table>";

                $("#lbTable").append(tableContents);


                // Button for adding new row
                var btn = document.createElement("button");
                btn.innerText = "Add logbook entry";
                btn.type = "button";
                btn.className = "ui-button ui-widget ui-corner-all";
                btn.id = "lb";
                var tableAdd;
                countF = 0 + tblLength - 1;
                countL = tblLength + countF
                btn.onclick = function () {


                    countF += 1;

                    tableAdd = "<tr>";

                    // current date-time
                    var date = new Date();
                    var d = date.toISOString().slice(0, 10) + "T" + date.getHours() + ":" + date.getMinutes() 

                    for (var n = 0; n < lbLength; n++) {

                        lbDdId = "lb" + countF + n

                        if (n == 0) {
                            tableAdd += "<td ><INPUT ID= " + lbDdId + " TYPE=datetime-local VALUE="+d+" style=border-style:none ></td>";
                        }

                        else if (n == 1) {

                            tableAdd += "<td ><SELECT TYPE=text id = " + lbDdId + "></td>";

                        } else if (n == 2) {

                          //  tableAdd += "<td style=width:100px ><a id=doc href=" + lbDdId + " target=_blank>Doc</a></td>";
                            tableAdd += "<td ><INPUT ID= " + lbDdId + " TYPE=file style=border-style:none size=15 name=doc></td>"
                        
                        } else {
                            tableAdd += "<td ><INPUT ID= " + lbDdId + " TYPE=text style=border-style:none ></td>";

                        }



                    }
                    tableAdd += "</tr>";


                    
                 //   $("#lbTable1").append(tableAdd);



                    //  for dropdown menu of action of added rows
                    $("#lbTable1").append(tableAdd);
                    var lbId = "lb" + countF + 1;

                    ddL = document.getElementById(lbId);
                    ddL.length = 0;

                    var defaultOption = document.createElement('option');
                    defaultOption.text = 'Auswaehlen';
                    defaultOption.selected = 'selected';

                    ddL.add(defaultOption);
                    ddL.selectedIndex = 0;


                    data = type1;
                   


                       
                    opLength = data.Logbook[1].field_type.length;
                    for (var m = 0; m < opLength; m++) {
                        option = document.createElement('option');
                        option.innerHTML = data.Logbook[1].field_type[m];
                        ddL.add(option);
                    }
                }

               
            //    $("#lbTable").append(tableContents);

                $("#lbTable").append(btn);




                //options for action of default row
                for (var s = 0; s < tblLength; s++ ) {
                    dId = "lb" + s + 1
                    lb01 = document.getElementById(dId);
                    lb01.length = 0;

                    var defaultOption = document.createElement('option');
                    defaultOption.text = 'Auswaehlen';
                    defaultOption.selected = 'selected';



                    lb01.add(defaultOption);
                    lb01.selectedIndex = 0;

                    data = type1;



                    // debugger;
                    opLength = data.Logbook[1].field_type.length;
                    for (var m = 0; m < opLength; m++) {
                        option = document.createElement('option');
                        option.innerHTML = data.Logbook[1].field_type[m];
                        lb01.add(option);
                        if (selectedOption[s] == option.innerHTML) {
                            defaultOption.text = selectedOption[s]
                        }
                    }
                }



                window.addElement = function () {
           //     function addElement(){
                    var button = document.getElementById("add");
                    countS = 0;
                    button.onclick = function () {
                        countS += 1;


                        var inputL = document.createElement("input");
                        inputL.type = "text";
                        inputL.className = "form-control";
                        // countAdd = e + count;
                        inputL.id = "labl" + countS;
                        ipt = inputL.id;
                        console.log("input id is: " + ipt);
                        $("#insert").append(inputL);


                        var dd = document.createTextNode(":");
                        $("#insert").append(dd);


                        var inputI = document.createElement("input");
                        inputI.type = "text";
                        inputI.className = "form-control";
                        inputI.id = "ip" + countS;
                        ipt = inputI.id;
                        console.log("input id is: " + ipt);
                        $("#insert").append(inputI);


                        name = inputI.name;




                        var dd = document.createElement("br");
                        $("#insert").append(dd);

                        var dd = document.createElement("br");
                        $("#insert").append(dd);
                        console.log("count is " + countS)
                    }

                }



                // button for submit
                var btnS = document.createElement("input");
                btnS.value = "Update";
                btnS.type = "Submit";
                btnS.className = "ui-button ui-widget ui-corner-all";
                btnS.id = "id-button";
                btnS.setAttribute("onClick", "updateInfo()");

                $("#post").append(btnS);


                var btnD = document.createElement("input");
                btnD.value = "Delete";
                btnD.type = "button";
                btnD.className = "ui-button ui-widget ui-corner-all";
                btnD.id = "id-button";
                btnD.setAttribute("onClick", "msgInfo()");

                $("#post").append(btnD);

                
            }




        }
    };

    ajax.open("POST", "http://localhost:8080/id", true);
    ajax.setRequestHeader('Content-Type', 'application/json');
    ajax.send(JSON.stringify({ id: id }));




     



}




    



    

    //For creatig components
    function createComp() {
      


        window.onload = function () {
        
            var type = []
            var dropdown
            var ajax = new XMLHttpRequest();
              ajax.onreadystatechange = function () {
                  if (this.readyState == 4 && this.status == 200) {
      
                    //  console.log(JSON.parse(this.responseText));
                      var types = JSON.parse(this.responseText)
                      //console.log(types.length);
    
    
                      var dropdown = document.getElementById("typeOfComp");
                      dropdown.length = 0;
                  
                      var defaultOption = document.createElement('option');
                      defaultOption.text = 'Typ auswählen';
                    //  defaultOption.selected = 'selected';
                  
                      dropdown.add(defaultOption);
                      dropdown.selectedIndex = 0;
    
                      
                    
                      for(var i = 0; i < types.length; i++){
                           var ids = types[i].type_name
                           type.push(ids)
                        //  console.log(ids)
    
                        option = document.createElement('option');
                     //   console.log("ids are " + ids)
                        option.innerHTML = ids
                        
                       
                        dropdown.add(option); 
    
                      }
    
                     
                  }
                  
              }
              
              
             
              ajax.open("POST", "http://localhost:8080/type", true);
              ajax.setRequestHeader('Content-Type', 'application/json');
              ajax.send(); 
                   

    
        var ss = document.getElementById('typeOfComp');
        ss.addEventListener("click", selectType);
    
        function selectType(){
            var x = ss.selectedIndex;
    
            console.log("Selected item is " + document.getElementsByTagName("option")[x].value)
            var selectedType = document.getElementsByTagName("option")[x].value

            //var value = ss.options[ss.selectedIndex].value;
                
    
            var sendType = {"type_name" : selectedType}
    
            var ajax = new XMLHttpRequest();
            ajax.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
    
                    console.log(this.responseText);
                   // console.log(typeof(this.responseText))
                    var temp = JSON.parse(this.responseText);
                    console.log(typeof(temp))
                    console.log(temp[0])
                    rType = temp[0];







                    response = rType
                    type1 = rType

                    var type = "";
                 var   value = selectedType
                 console.log("vlue is " + value);

                var type = rType.type_name;
                console.log("type is " + type)
                if (value == type) {


                    console.log("done");
                    console.log("type is:" + type);
                    console.log(response.type_definition[0].field_name);


                    c = response.type_definition.length;
                    tdLength = c;
                    console.log(c)
                    for (j = 0; j < c; j++) {

                        if (j == 1) {

                            var fsLength = type1.field_statics.length;
                            for (var k = 0; k < fsLength; k++) {
                                $("#insert1").append($("<p></p>").text(type1.field_statics[k].field_name));
                                var link1 = document.createElement("A");
                                link1.href = type1.field_statics[k].field_value;
                                link1.innerText = "Click here";
                                link1.style.color = "#00A1F9";
                                $("#insert1").append(link1);
                                $("#insert1").append("<br>");
                            }
                        }

                        function dropdown(type, id){

                            var rId = "ipType" + id;
                           var rElement = document.getElementById(rId)
                            rElement.remove()
                            var select = document.createElement("SELECT");
                         //   select.type = "text"
                            select.id = "ipType" + id;
                            select.className = "form-control"

                            $("#insert1").append(select);
                            lb01 = document.getElementById("ipType" + id);
                            lb01.length = 0;
                        //    lb01.className = "ui-selectmenu-text";
        
                            var defaultOption = document.createElement('option');
                            defaultOption.text = 'Auswaehlen';
                            defaultOption.selected = 'selected';
        
                            lb01.add(defaultOption);
                            lb01.selectedIndex = 0;
        
                            data = type1;
        
                            
        
                            // debugger;
                            opLength = response.type_definition[id].field_range.length;
                            for (var m = 0; m < opLength; m++) {
                                option = document.createElement('option');
                                option.innerHTML = response.type_definition[id].field_range[m];
                                lb01.add(option);
        
                                
                            }

                          
                        }


                        var inputL = document.createElement("LABEL");
                        inputL.innerHTML = response.type_definition[j].field_name;

                        inputL.className = "control-label col-sm-2";
                        inputL.type = response.type_definition[j].field_type;
                        inputL.id = "lablType" + j;
                        d = "lablType" + j;
                        $("#insert1").append(inputL);


                        var dd = document.createTextNode(":");
                       
                        var iType = "";
                        var inputI = document.createElement("input");
                        inputI.type = response.type_definition[j].field_type;
                        iType = inputI.type
                        inputI.name = response.type_definition[j].field_name;

                        inputI.id = "ipType" + j;
                        inputI.className = "form-control";
                       
                        $("#insert1").append(inputI);
                        
                     /*   if (iType == "range"){
                           
                            dropdown(iType, j)
                        }*/

                        if (response.type_definition[j].field_range)
                        {
                            dropdown(iType, j)
                        }
                        if (j == 0) {
                            var queryString = decodeURIComponent(window.location.search);
                            inputI.value = queryString.slice(4);
                        }

                    }
                    // for logbook




                    var div = document.createElement("h3");
                    div.innerHTML = "Logbook";
                    $("#insert1").append(div);

                    var countLog = response.Logbook.length;
                    lbLength = countLog;
                    console.log(countLog);
                    console.log(response.Logbook);
                    resFinal = response.Logbook;

                    var tableContents = "";

                    var count = Object.keys(resFinal).length;

                    //Table for logbook with default row
                    tableContents = "<table id=lbTable1 class=table>";
                    tableContents += "<tr>";

                    

                    for (var i = 0; i < lbLength ; i++) {

                        tableContents += "<th>" + response.Logbook[i].field_name + "</th>";
                        //  tableContents += "<td>" + Object.values(resFinal)[i+1] + "</td>";


                    }
                    tableContents += "</tr>";

                    tableContents += "<tr>";
                    // current date-time
                    var date = new Date();
                    var d = date.toISOString().slice(0, 10) + "T" + date.getHours() + ":" + date.getMinutes()
                    for (var j = 0; j < lbLength ; j++) {

                        if (j == 0) {
                            tableContents += "<td ><INPUT ID= lb0" + j + " TYPE=datetime-local VALUE="+d+" style=border-style:none></td>";
                        }

                        else if (j == 1) {
                            tableContents += "<td style=width:35%><SELECT TYPE=text id = lb01 ></td>";
                        } else if (j == 2) {

                            tableType = response.Logbook[j].field_type;
                            tableContents += "<td ><INPUT ID= lb0" + j + " TYPE=" + tableType + " style=border-style:none size=15 name=doc></td>";

                        } else {
                            //  tableContents += "<th>" + response.Logbook[i].field_name + "</th>";
                            tableType = response.Logbook[j].field_type;
                            tableContents += "<td ><INPUT ID= lb0" + j + " TYPE=" + tableType +" style=border-style:none size=15></td>";
                        }

                    }
                    tableContents += "</tr>";

                    // tableContents += "<div id=lbAdd>";
                    // tableContents += "</tr>";
                    tableContents += "</table>";


                    // Button for adding row
                    var btn = document.createElement("button");
                    btn.innerText = "Add logbook entry";
                    btn.type = "button";
                    btn.className = "ui-button ui-widget ui-corner-all";
                    btn.id = "lb";
                    var tableAdd;
                    countF = 0;

                    btn.onclick = function () {
                        

                        countF += 1;

                        tableAdd = "<tr>";

                        for (var n = 0; n < lbLength; n++) {

                            lbDdId = "lb" + countF + n

                            if (n == 0) {
                                tableAdd += "<td ><INPUT ID= " + lbDdId + " TYPE=datetime-local VALUE="+d+" style=border-style:none ></td>";
                            }

                            else if (n == 1) {

                                tableAdd += "<td ><SELECT TYPE=text id = " + lbDdId + "></td>";

                            } else if (n == 2) {

                                tableAdd += "<td ><INPUT ID= " + lbDdId + " TYPE=file style=border-style:none multiple></td>";
                            }


                            else {
                                tableAdd += "<td ><INPUT ID= " + lbDdId + " TYPE=text style=border-style:none ></td>";

                            }

                            

                        }
                        tableAdd += "</tr>";




                        //  for dropdown menu of action of added rows
                        $("#lbTable1").append(tableAdd);
                        var lbId = "lb" + countF + 1;

                        ddL = document.getElementById(lbId);
                        ddL.length = 0;

                        var defaultOption = document.createElement('option');
                        defaultOption.text = 'Auswaehlen';
                        defaultOption.selected = 'selected';

                        ddL.add(defaultOption);
                        ddL.selectedIndex = 0;


                        data = type1;



                       
                        opLength = data.Logbook[1].field_type.length;
                        for (var m = 0; m < opLength; m++) {
                            option = document.createElement('option');
                            option.innerHTML = data.Logbook[1].field_type[m];
                            ddL.add(option);
                        }
                    }


                    $("#lbTable").append(tableContents);

                    $("#lbTable").append(btn);

                    //dropdown menu for action of default row
                    lb01 = document.getElementById("lb01");
                    lb01.length = 0;
                //    lb01.className = "ui-selectmenu-text";

                    var defaultOption = document.createElement('option');
                    defaultOption.text = 'Auswaehlen';
                    defaultOption.selected = 'selected';

                    lb01.add(defaultOption);
                    lb01.selectedIndex = 0;

                    data = type1;

                    

                    // debugger;
                    opLength = data.Logbook[1].field_type.length;
                    for (var m = 0; m < opLength; m++) {
                        option = document.createElement('option');
                        option.innerHTML = data.Logbook[1].field_type[m];
                        lb01.add(option);







                        
                    }


                }






                  
                }
            }
            
            
           console.log(sendType)
           
            ajax.open("POST", "http://localhost:8080/typ", true);
            ajax.setRequestHeader('Content-Type', 'application/json');
            ajax.send(JSON.stringify(sendType)); 
    
          }
    
          



       
        







            selectType();
            // button for submit
            var btnS = document.createElement("input");
            btnS.value = "Submit";
            btnS.type = "Submit";
            btnS.className = "ui-button ui-widget ui-corner-all";
            btnS.id = "id-button";
            btnS.setAttribute("onClick", "postInfo()");

            $("#post").append(btnS);


        }
       
        
        window.addElement = function() {
            
            var button = document.getElementById("add");
            count = 0;
            button.onclick = function () {
                count += 1;


                var inputL = document.createElement("input");
                inputL.type = "text";
                inputL.className = "form-control";
                // countAdd = e + count;
                inputL.id = "labl" + count;
                ipt = inputL.id;
                console.log("input id is: " + ipt);
                $("#insert").append(inputL);


                var dd = document.createTextNode(":");
                $("#insert").append(dd);


                var inputI = document.createElement("input");
                inputI.type = "text";
                inputI.className = "form-control";
                inputI.id = "ip" + count;
                ipt = inputI.id;
                console.log("input id is: " + ipt);
                $("#insert").append(inputI);


                name = inputI.name;




                var dd = document.createElement("br");
                $("#insert").append(dd);

                var dd = document.createElement("br");
                $("#insert").append(dd);
            }

        }
    }
        
        function postInfo() {
           
            var labelType = [];
            var inputType = [];
            var labelLog = [];
            var inputLog = [];
            var comp = type1;

            comp = {
                '_id': '',
                'typeid': type1.typeid,
                'fields': type1.type_definition,
                'logbook': []
            };

            function sleep(milliseconds) {
                var start = new Date().getTime();
                for (var i = 0; i < 1e7; i++) {
                    if ((new Date().getTime() - start) > milliseconds) {
                        break;
                    }
                }
            }


            console.log(comp);
            // var id = document.getElementById("ipType0").value;
            var id = $("#ipType0").val();


            comp._id = id;
            tdLength = comp.fields.length;
            console.log(tdLength);



            for (var l = 1; l < tdLength; l++) {
                comp.fields[l].field_value = $("#ipType" + l).val();

            }
            //for logbook
            // lbLength = comp.Logbook.length;
            lb = [];
            comp.logbook = [];



            var countU = countF;

            for (var n = 0; n <= countU; n++){
                var tLb = []

                for(var j = 1; j <= lbLength; j++){
                    
                }
            }



            for (var m = 0; m <= countU; m++) {
                lb = [];
                var files
                // docs = [];
               //   docs = files
               

                for (var l = 0; l < lbLength; l++) {

                    if (l == 2) {
                        
                        function create_UUID() {
                            var dt = new Date().getTime();
                            var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                                var r = (dt + Math.random() * 16) % 16 | 0;
                                dt = Math.floor(dt / 16);
                                return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
                            });
                            return uuid;
                        }
                        var dtm = new Date();
                        var ms = dtm.getMilliseconds().toString() 
                        uuid = create_UUID() + "-" // + ms
                        console.log(uuid)

                        var name = document.getElementById("lb" + m.toString() + l).value;
                        var files = document.getElementById("lb" + m.toString() + l).files[0];
                       // var files = $("#lb" + m.toString() + l).value;
                        console.log("file name is " + typeof(name));
                        
                        var fileName =  name.slice(12) ;
                        var path = "http://localhost:8080/admin/";
                        var link = ""
                        
                        if(name == ""){
                            link = ""
                        }else{
                        var link = path.concat("", uuid + fileName)
                    }
                        lb.push(link);

                        var fd = new FormData();
                        fd.append('docs', files);
                        console.log( files)
                        console.log("Doc is " + fd);
                    


                        var ajax = new XMLHttpRequest();
                        ajax.onreadystatechange = function () {
                            if (this.readyState == 4 && this.status == 200) {

                                console.log(this.responseText);

                            }
                        }

                        
                      
                       
                        id = {
                            'id': uuid
                        }
                        
                        console.log(id)

                        ajax.open("POST", "http://localhost:8080/uuid", true);
                        ajax.setRequestHeader('Content-Type', 'application/json');
                       
                                            
                            ajax.send(JSON.stringify(id));
                        

                    
                        ajax.open("POST", "http://localhost:8080/admin/docs/", true);
                      //  ajax.setRequestHeader('Content-Type', 'multipart/form-data');
                        ajax.send(fd);

                        sleep(500)


                      //  docs.push(files);
                    } else {

                        id = m.toString() + l;
                        lb.push($("#lb" + id).val());

                    }
            }

       
            debugger
            console.log(lb)


            var nArray = lb.filter(function(ele){
                if(ele != "") return ele;
            })
            
            console.log(nArray)
            var i;
            if (nArray.length == 2){
                var fArray = nArray.filter(function(ele){
                    if (ele != "Auswaehlen") 
                        return ele
                    })
            
                console.log(fArray.length)
                if(fArray.length == 1){
                    console.log(fArray.length)
                }else{
                    //add to the main lb
                    comp.logbook.push(lb);
                }
            
            }else{
                //add to main LB
                comp.logbook.push(lb);
            }






            

                
               


            }
            comp.fields.splice(0, 1);
            types = comp.fields[0];


            for (var m = 1; m <= count; m++) {
                types = {}
                types.field_name = $("#labl" + m).val();
                types.field_type = "text";
                types.field_value = $("#ip" + m).val();
                comp.fields[3 + m] = types;
            }



            comp.fields.splice(3, 1);
            
            console.log("comp is " + JSON.stringify(comp));
            // console.log("Input is " + input);
            var ajax = new XMLHttpRequest();
            ajax.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {

                    console.log(this.responseText);

                }
            }


            var sendObj = comp;

         


            ajax.open("POST", "http://localhost:8080/admin/save", true);
            ajax.setRequestHeader('Content-Type', 'application/json');
            ajax.send(JSON.stringify(sendObj));
            //  console.log(sendObj);

        }
        
        function updateInfo() {

            debugger
            console.log("Data to show :-" + c);
            var labelType = [];
            var inputType = [];
            var labelLog = [];
            var inputLog = [];
            var comp = type1;

            comp = {
                '_id': '',
                'typeid': type1.typeid,
                'fields': [],
                'logbook': []
            };

           

            console.log(comp);
            // var id = document.getElementById("ipType0").value;
            var id = $("#sId").val();


            comp._id = id;
            tdLength = c
            console.log(tdLength);
            types = comp.fields;


            for (var l = 0; l < tdLength; l++) {
               

                types = {}
                types.field_name = $("#lablType" + l).text();
                types.field_type = $("#ipType" + l).attr('type');
                types.field_value = $("#ipType" + l).val();
                comp.fields[ l] = types;

            }
           
            //for logbook
            // lbLength = comp.Logbook.length;
            lb = [];
            comp.logbook = [];
            var name = ""
            for (var m = tblLength; m <= countL; m++) {
                lb = [];
                var files


                for (var l = 0; l < lbLength; l++) {

                    if (l == 2) {

                        function create_UUID() {
                            var dt = new Date().getTime();
                            var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                                var r = (dt + Math.random() * 16) % 16 | 0;
                                dt = Math.floor(dt / 16);
                                return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
                            });
                            return uuid;
                        }
                        var dtm = new Date();
                        var ms = dtm.getMilliseconds().toString()
                        uuid = create_UUID() + "-" // + ms
                        console.log(uuid)

                        var name = document.getElementById("lb" + m.toString() + l).value;
                        var files = document.getElementById("lb" + m.toString() + l).files[0];
                        // var files = $("#lb" + m.toString() + l).value;
                        console.log("file name is " + name);

                        var fileName = name.slice(12);
                        var path = "http://localhost:8080/admin/";
                        var link = path.concat("", uuid + fileName)
                        lb.push(link);

                        var fd = new FormData();
                        fd.append('docs', files);
                        console.log(files)
                        console.log("Doc is " + fd);



                        var ajax = new XMLHttpRequest();
                        ajax.onreadystatechange = function () {
                            if (this.readyState == 4 && this.status == 200) {

                                console.log(this.responseText);

                            }
                        }
                        debugger
                        id = {
                            'id': uuid
                        }
                        console.log(id)

                        ajax.open("POST", "http://localhost:8080/uuid", true);
                        ajax.setRequestHeader('Content-Type', 'application/json');
                        ajax.send(JSON.stringify(id));



                        ajax.open("POST", "http://localhost:8080/admin/docs/", true);
                        //  ajax.setRequestHeader('Content-Type', 'multipart/form-data');
                        ajax.send(fd);

                        sleep(500)


                        //  docs.push(files);
                    } else {

                        id = m.toString() + l;
                        lb.push($("#lb" + id).val());

                    }
                }

                comp.logbook.push(lb);



            }
         //   comp.fields.splice(0, 1);
            types = comp.fields;


            for (var m = 1; m <= countS; m++) {
                types = {}
                types.field_name = $("#labl" + m).val();
                types.field_type = "text";
                types.field_value = $("#ip" + m).val();
                comp.fields[c - 1 + m] = types;
            } 



    //        comp.fields.splice(3, 1);

            console.log("comp is " + JSON.stringify(comp));
            // console.log("Input is " + input);
            var ajax = new XMLHttpRequest();
            ajax.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {

                    console.log(this.responseText);

                }
            }


            var sendObj = comp;



            ajax.open("POST", "http://localhost:8080/admin/update", true);
            ajax.setRequestHeader('Content-Type', 'application/json');
            ajax.send(JSON.stringify(sendObj));
           // ajax.send(sendObj);

        }
    
    if (n !== -1) {
        var data = uri.slice(n + 5);
        var id = JSON.parse(data)[0]._id;
        console.log(id);
        
        console.log("Data is:- " + data);
        showComp()
    } else {
        createComp()
    }

    function deleteInfo() {
        
        var id = $("#sId").val();
        console.log("dID is " + id)

        var ajax = new XMLHttpRequest();
        ajax.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {

                console.log(this.responseText);
                $(function () {
                    $("#dialog-del").dialog("close");
                })
               /* $(function () {
                    $("#dialog").dialog({
                        closeOnEscape: false,
                        open: function (event, ui) { $(".ui-dialog-titlebar-close").hide(); },
                        buttons: {
                            Cancel: function () {
                                $(this).dialog("close");
                            }
                        }
                    });
                }) 

                var msgP = document.createElement("p");
                msgP.innerHTML = "Component deleted";
                msgP.id = "msg"
                $("#dialog").append(msgP); */

                sleep(1000);
                window.location.replace("http://localhost:8080/del.html")  
            }
        }
        dId = { _id: id }
        ajax.open("POST", "http://localhost:8080/admin/doc/del", true);
        ajax.setRequestHeader('Content-Type', 'application/json');
        ajax.send(JSON.stringify(dId));
        sleep(500)
        ajax.open("POST", "http://localhost:8080/admin/del", true);
        ajax.setRequestHeader('Content-Type', 'application/json');
        ajax.send(JSON.stringify(dId));
        
    }

    function msgInfo() {
        $(function () {
            $("#dialog-del").dialog({
                resizable: false,
                height: "auto",
                width: 400,
                modal: true,
                closeOnEscape: false,
                open : function(event, ui){ $(".ui-dialog-titlebar-close").hide();},
                buttons: {
                    "Delete": function () {
                        deleteInfo();
                        
                    },
                    Cancel: function () {
                        $(this).dialog("close");
                    }
                }
            })
        })
        $("#msg").remove();
        var msgP = document.createElement("p");
        msgP.id = "msg"

     /*   var msgSpan = document.createElement("span");
        msgSpan.className = "ui-icon ui-icon-alert";
        msgSpan.style = "float:left; margin:12px 12px 20px 0;";
        $("#dialog-del").append(msgP);
        $("#msg").append(msgSpan); */

        msgP.innerHTML = "This component will be deleted permanently and cannot be recovered. Are you sure?";
        
        $("#dialog-del").append(msgP);
    }

