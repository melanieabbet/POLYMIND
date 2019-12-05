window.onload = function(){
console.log("we have launched client script");
var slider = document.getElementById("myRange");
var output = slider.value;
let style = 2;
let poolname;
let clientID;
let place =  $(window).width()/2;

//drag variable
let diffX = 0, diffY = 0, previousX = 0, previousY = 0;
let onBox = false;
let line= $("line");
let svg= $("svg");
//let isDown =false;
let startX = place +1;
let startY = 0;
let once =false;





//set up the client socket to connect to the socket.io server


$(".screenuserport").hide();
$(".userheader").hide();
$(".userheadertwo").hide();
$(".screenhome").hide();
$(".screenaddelement").hide();
$(".screensendelement").hide();




//essai touch
//document.getElementById("connection").addEventListener("touchstart",myFunction);
//function myFunction()

$("#connection").on("click", function(){
 console.log("button connection clicked");
let clientSocket = io();

clientSocket.on('connect', function(data) {
     console.log("connected");

     // put code here that should only execute once the client is connected

     $(".screenconnection").hide();
     $(".screenuserport").show();

     clientSocket.on('numberchoiceserver', function(data){
       console.log("receive usernumber!!");
       switch(data){
         case 3:
         $("#userfour").hide();
         break;
         case 4:
         break;
         default:
         $("#userfour").hide();
         $("#userthree").hide();
       }
     });
     clientSocket.on('poolnamechoiceserver',function(data){
      poolname = data;
      console.log(poolname);
     });

     $("#userone").on("click", function(){
        clientID = 1;
       clientSocket.emit('joinuser', 1);
       $(".screenuserport").hide();
       $(".screenhome").show();
       $(".userheadertwo").show();
       $(".pointonebis").css("background-color","white");
       $(".pointthreebis").css("background-color","white");
     });
     $("#usertwo").on("click", function(){
       clientID = 2;
       clientSocket.emit('joinuser', 2);
       $(".screenuserport").hide();
       $(".screenhome").show();
       $(".userheader").show();
       $(".pointone").css("background-color","white");
       $(".pointthree").css("background-color","white");
     });
     $("#userthree").on("click", function(){
       clientID = 3;
       clientSocket.emit('joinuser', 3);
       $(".screenuserport").hide();
       $(".screenhome").show();
        $(".userheadertwo").show();
     });
     $("#userfour").on("click", function(){
       clientID = 4;
       clientSocket.emit('joinuser', 4);
       $(".screenuserport").hide();
       $(".userheader").show();
       $(".screenhome").show();
     });
     $(".addthought").on("click", function(){
       $(".screenhome").hide();
       $(".screenaddelement").show();
     });

     slider.oninput = function() {
       output = this.value;
       //console.log(output);
       document.getElementById("thoughtvis").style.width = output*0.2 + "vw";
       document.getElementById("thoughtvis").style.height = output *0.2+ "vw";
       document.getElementById("thoughtvis").style.marginLeft = 50 - output*0.1 +"vw";
       document.getElementById("thoughtvis").style.marginBottom = 16 - output*0.1 +"vw";
       document.getElementById("thoughtvis").style.marginTop = 30 - output*0.1 +"vw";
     }
     document.getElementById("styleone").addEventListener("click", function(){
      document.getElementById("thoughtvis").style.backgroundColor = "white";
      style = 1;
     });
     document.getElementById("stylethree").addEventListener("click", function(){
      document.getElementById("thoughtvis").style.backgroundColor = "black";
      document.getElementById("thoughtvis").style.border = "4px dotted white";
      style = 3;
     });
     document.getElementById("styletwo").addEventListener("click", function(){
      document.getElementById("thoughtvis").style.backgroundColor = "black";
      document.getElementById("thoughtvis").style.border = "3px solid white";
      style = 2;
     });



     /*WHEN WE WANT TO INSERT INTO DB **/
  $("#insertElement").submit(function(event) {
     //stop submit the form, we will post it manually. PREVENT THE DEFAULT behaviour ...
  event.preventDefault();
  console.log("button clicked");
  let form = $('#insertElement')[0];
//prepare data to be a json obj
  let sArr = $( form ).serializeArray();
  let dataToInsert ={};
  sArr.forEach(function(element) {
    dataToInsert[`${element.name}`] = element.value;
  });

  dataToInsert["style"] = style;
  dataToInsert["pool"] = poolname;
  dataToInsert["clientid"] = clientID;





        $(".screenaddelement").hide();
        $(".screensendelement").show();
        let createbox = '<div class="box" id="c">';
        $(".screensendelement").show();
        $(".elementbox").append(createbox);
        //corriger suivant écran! faire test on iphone screen
        $(".box").text(dataToInsert["title"]);
        $(".box").css("width",dataToInsert["size"]*0.25+ "vw");
        $(".box").css("height",dataToInsert["size"]*0.25+ "vw");
        //$(".box").css("left", place - dataToInsert["size"]/2);
         $(".box").css("left", 50.3 - dataToInsert["size"]*0.25/2 + "vw");
        window.onresize =function(){
          place= $(window).width()/2;
         $(".box").css("left", 50.3 - dataToInsert["size"]*0.25/2 + "vw");
        }

         switch (style){
           case 1:
           $(".box").css("background-color","white");
           break;
           case 2:
           $(".box").css("background-color","black");
           $(".box").css("border","white solid 2px");
           $(".box").css("color","white");
           break;
           case 3:
           $(".box").css("background-color","black");
           $(".box").css("border","white dotted 2px");
           $(".box").css("color","white");
           break;
         }
         $(".box").css("padding-top",dataToInsert["size"]*0.25/2.7+ "vw");
         $(".box").css("font-size",dataToInsert["size"]*0.25/6+ "vw");
         $(".box").css("top", 41.5 - dataToInsert["size"]*0.25/2+ "vw" );

         /* function to be triggered when mouse is down */
         let handleDown = function (event){
           //if we are down & have not been down then update the prevX,Y vars
           // otherwise they will contain mouse positions from a while back
           if(onBox ==false) {
           previousX = event.pageX;
           previousY = event.pageY;
         }
           console.log("down");
           //make boolean true
           onBox =true;
           //startX = event.clientX - pOffset.left,
           //startY = event.clientY - pOffset.top;


         };
          /* function to be triggered when mouse is up */
         let handleUp = function (event){
           console.log("up");
           //make boolean true
             onBox =false;

             //get a direction vector for animate
              let theElement = document.getElementById(event.target.id);
              let rect = theElement.getBoundingClientRect();
              //console.log("rectangle X "+rect.left);
              console.log("width: "+ rect.width);
              //console.log(rect.top);
              //regle prob pas au centre de la shape ac width
              let shapePos =  new p5.Vector(rect.left+rect.width/2, rect.top+rect.width/2);
              //changer startY prendre quel hauteur div est dans la page
              let startYPos = $('svg').offset().top;


              let centerCirclePos = new p5.Vector(startX,startYPos);

              let diffVector = p5.Vector.sub(centerCirclePos,shapePos);


              diffVector.normalize();


              if(diffVector.y<0){
              dataToInsert["directiony"] = -1+diffVector.y;
              };
              if(diffVector.y>0){
              dataToInsert["directiony"] = 1+diffVector.y;
              };
              if(diffVector.x<0){
              dataToInsert["directionx"] = -1+diffVector.x;
              };
              if(diffVector.x>0){
              dataToInsert["directionx"] = 1+diffVector.x;
              };


              diffVector.x*=10;
              diffVector.y*=10;



              console.log(diffVector);
              //console.log("vector centre"+centerCirclePos)
              //console.log("vectore obj " + shapePos)

              window.requestAnimationFrame(animate);

              function animate(){
              shapePos.add(diffVector);
              theElement.style.left = ((shapePos.x-rect.width/2)+"px");
              theElement.style.top = ((shapePos.y-rect.width/2)+"px");
              $("line").hide();
              //console.log("the top limit"+theElement.style.top);
              //console.log("the toogle"+once);
              if(once==false & (shapePos.x<0 || shapePos.y<0)){
                once=true;
                $.ajax({
                 type: 'POST',
                 data: JSON.stringify(dataToInsert),
                 processData: false ,//prevents from converting into a query string
                 cache: false,
                 contentType: 'application/json',
                 url: '/insertEndPoint',
                 success: function(resultFromServer) {
                            console.log('success');
                            let mObj = JSON.parse(resultFromServer);
                            console.log("the res:: "+ mObj.message);
                  }});//ajax

                  $(".box").remove();
                  $(".screensendelement").hide();
                  $(".screenhome").show();
                  //notworkingfield already fullwhen coming back
                  //input vider a affichage de autre page? home ou addel
                  $("input").empty();


              }else if (shapePos.x>0 || shapePos.y>0){
               once=false;
               window.requestAnimationFrame(animate);
              }

             }




          };
          /* function to be triggered for move */
         let handleMove = function (event){
           if(onBox ==true)

           {
             console.log("move");
             $("line").show();
             // who is moving??
             let theElement = document.getElementById(event.target.id);
             // calculate difference between previous mouseX and current mouseX pos
             let diffX = event.pageX-previousX;
             // calculate difference between previous mouseY and current mouseY pos
             let diffY =  event.pageY-previousY;
             //store in previous the current mouse pos
             previousX = event.pageX;
             previousY = event.pageY;
             // set the element's new position:
           /*https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect*/
            let rect = theElement.getBoundingClientRect();
           // set the new left/top to the old+diff...
            theElement.style.left = ((rect.left+diffX)+"px");
            theElement.style.top = ((rect.top+diffY)+"px");

            var pOffset = svg.offset(),
                     px = event.pageX - pOffset.left,
                     py = event.pageY - pOffset.top;

           	line.attr("x1",startX)
             line.attr("x2",px)
             line.attr("y1",startY)
             line.attr("y2",py)
          }

         };

         let boxC = document.getElementById("c");
         boxC.addEventListener('mousedown', handleDown);
         boxC.addEventListener('touchstart', handleDown);

         $(boxC).on('move',handleMove);
         window.addEventListener('mouseup', handleUp);
         window.addEventListener('touchend', handleUp);







 }); //button


 });




});













}
