/* var video = document.getElementById('video');
//alert('Hello');
// Get access to the camera!
if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    // Not adding `{ audio: true }` since we only want video now
    navigator.mediaDevices.getUserMedia({ video: true }).then(function (stream) {
        //  video.src = window.URL.createObjectURL(stream);
        video.srcObject = stream;


        video.play();
    });
}
// Elements for taking the snapshot
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var video = document.getElementById('video');
*/




var width = window.screen.availWidth;
var height = screen.height;
console.log(height);
document.getElementById("screen").innerHTML = width;
;
var height = window.screen.availHeight;
var desktop = window.matchMedia("(min-width: 1281px)");
var mql = window.matchMedia("(orientation: portrait)");
//var winWidth = window.matchMedia("(device-width: 480px)");
//var winPortrait = window.matchMedia("(orientation: portrait)");

if (desktop.matches) {
    // desktop orientation

    videoCaptureFront();
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    var video = document.getElementById('video');
    document.getElementById("vid").style.width = "400px";
    document.getElementById("vid").style.height = "400px";
    document.getElementById("snap").addEventListener("click", decodeImage);
} else if (mql.matches) {
    // Portrait orientation
    videoCaptureBack();
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    var video = document.getElementById('video');
    /* if (width <= 720) {
         document.getElementById("vid").style.width = "300px";
         document.getElementById("vid").style.height = "300px";
     } else {
         document.getElementById("vid").style.width = "300px";
         document.getElementById("vid").style.height = "300px";
        
 
     } */
    document.getElementById("snap").addEventListener("click", decodeImage);

} else {
    // Landscape orientation
    videoCaptureBack();
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    var video = document.getElementById('video');
    /*  if(width <= 720){
      document.getElementById("vid").style.width = "300px";
      document.getElementById("vid").style.height = "300px";
      } else  {
          document.getElementById("vid").style.width = "400px";
          document.getElementById("vid").style.height = "400px";
      } */
    document.getElementById("snap").addEventListener("click", decodeImage);

}

function videoCaptureFront() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        // Not adding `{ audio: true }` since we only want video now
        navigator.mediaDevices.getUserMedia({ audio: false, video: { facingMode: "user" } }).then(function (stream) {
            //  video.src = window.URL.createObjectURL(stream);
            video.srcObject = stream;


            video.play();
        });
    }
}

function videoCaptureBack() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        // Not adding `{ audio: true }` since we only want video now
        navigator.mediaDevices.getUserMedia({ audio: false, video: { facingMode: { exact: "environment" } } } , { video: { frameRate: { ideal: 10, max: 15 } }} ).then(function (stream) {
            //  video.src = window.URL.createObjectURL(stream);
            video.srcObject = stream;


            video.play();
        });
    }
   /* var s = screen.width;
    document.getElementById("screen").innerHTML = s; */

}

function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds) {
            break;
        }
    }
}



function decodeImage() {

    if (width >= 720) {
     //   context.drawImage(video, 131, 131, 400, 400, -70, -70, 1000, 1000);

        context.drawImage(video, 122, 122, 400, 400, -20, -20, 400, 400);
        //console.log(video.s)
    }
    else if (width <= 720) {
        context.drawImage(video, 116, 116, 300, 300, 3, 3 , 400, 400);
        
    } 

  /*  if (width >= 720) {
        context.drawImage(video, 0, 0, 400, 400, 0, 0, 400, 400);

    }
    else if (width <= 720) {
        context.drawImage(video, 0, 0, 300, 300, 0, 0, 600, 600);

    }/*

  /*  var c = Caman("#canvas", function () {
     //   this.brightness(-20).render();
        this.contrast(20).render();
    })
    Caman.Event.listen(c, "processComplete", function (job) {
        console.log(job.name);
       
    }); 

    sleep(200); */
   
  //  context.drawImage(video, 0, 0, 640, 480);
    var img = document.getElementById("canvas");
    var imgData = img.toDataURL('image/jpeg', 0.92, 0);
    //var imageDataWoGarbage = String(ImageData).match(/,(.*)$/);
    var imageData = imgData.split("data:image/jpeg;base64,");
    
    // var imageData = imgData.split(";base64,");
    var obj = { "data": imageData[1] };
    var jImageData = JSON.stringify(obj);
    console.log(jImageData.length);
    document.getElementById("size").innerHTML = jImageData.length;
    var c1 = "{";
    var c2 = "}";

    var text = c1.concat("", jImageData);
    var sendText = text.concat("", c2);


    var length = imageData[1].length;
    document.getElementById("info").innerHTML = length;

    //  console.log(sendText);
    //  console.log(typeof imgData);
    var ajax = new XMLHttpRequest();

    ajax.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

           
           sendData = this.responseText;
            console.log(this.responseText);
            var recData = JSON.parse(this.responseText);

            console.log("recData is:- " + recData);

            var noObj = recData.slice(0, 14);
            var id = recData.slice(14);
            var showId = recData[0]._id;
           
            console.log("Id is:- " + id);
            //  if (this.responseText == "\"Error\"") {
            //  if (this.responseText == "Nobarcodefound[]") {
            if (this.responseText == "[]") {
         //   if (this.responseText == "canner/./img/image.jpg:Nobarcodefound") {
              //  document.getElementById("demo").innerHTML = this.responseText;
                decodeImage();
                sleep(400);
            } else if (noObj == "No_Object_for_") {
                document.getElementById("noObject").innerHTML = "Komponente existiert nicht. Möchten Sie eine neue Komponente anlegen? ";
                var hyperLink = document.createElement("a");
                hyperLink.href = "http://localhost:8080/reg.html?id=" + id;
                hyperLink.innerText = "Hier Klicken";
                
                var dd = document.createTextNode(", Neue Komponente anzulegen");
                $("#klick").append(hyperLink);
                $("#klick").append(dd);

            } else {

                window.location.href = "http://localhost:8080/reg.html?id=" + showId + "?data=" + sendData;
            
            } 
        }
    }; 

    ajax.open("POST", "http://localhost:8080/img", true);
    ajax.setRequestHeader('Content-Type', 'application/json');
    ajax.send(jImageData);
    

}




// Trigger photo take
document.getElementById("snap").addEventListener("click", decodeImage);

function getInfo() {
    debugger
    var id = document.getElementById("id").value;
    console.log(id);
    var ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

           

            console.log(this.responseText);
            var sendData = this.responseText
                var recData = JSON.parse(this.responseText)
                var showId = recData[0]._id;
            //  if (this.responseText == "\"Error\"") {
            //  if (this.responseText == "Nobarcodefound[]") {
            if (this.responseText == "[]") {
                //   if (this.responseText == "canner/./img/image.jpg:Nobarcodefound") {
                //  document.getElementById("demo").innerHTML = this.responseText;
          //      decodeImage();
            //    sleep(400);
        //    } else if (noObj == "No_Object_for_") {
                document.getElementById("noObject").innerHTML = "Komponente existiert nicht. Möchten Sie eine neue Komponente anlegen? ";
                var hyperLink = document.createElement("a");
                hyperLink.href = "http://localhost:8080/reg.html?id=" + id;
                hyperLink.innerText = "Hier Klicken";

                var dd = document.createTextNode(", Neue Komponente anzulegen");
                $("#klick").append(hyperLink);
                $("#klick").append(dd);

            } else {
                
                window.location.href = "http://localhost:8080/reg.html?id=" + showId + "?data=" + sendData;

            }
                
                
                
                
                
                
                
                
                
                
                /*{
                var ans = this.responseText;
                var pos = ans.search("Parsedresult");
              

                var posFinal = ans.search("Found4resultpoints");
                var resFinal = JSON.parse(ans.slice(pos + 2, posFinal));

                document.getElementById("full").style.visibility = 'hidden';
          
                var tableContents = "";
                var count = Object.keys(resFinal).length;
                tableContents = "<table>";
                for (var i = 0; i < count; i++)
                {
                    tableContents += "<tr>";
                    tableContents += "<th>" + Object.keys(resFinal)[i] + "</th>";
                    tableContents += "<td>" + Object.values(resFinal)[i] + "</td>";
                    tableContents += "</tr>";
                }
               

                tableContents += "</table>";
                document.getElementById("demo").innerHTML = tableContents;
            } */
        }
    };

    ajax.open("POST", "http://localhost:8080/id", true);
    ajax.setRequestHeader('Content-Type', 'application/json');
    ajax.send(JSON.stringify({ id: id }));
    
  //  console.log(JSON.stringify({id: id}));
}


