
//function Shape(clientid,pool,size,speed,positionx,positiony,style,title,keywordone,keywordtwo, keywordthree,text,connectedto)

function Shape(clientid,size,positionx,positiony,directionx,directiony,title,style,keywordone,keywordtwo,keywordthree,text){
this.clientid =clientid;
this.size=size;
this.speed=1;
this.positionx=positionx;
this.positiony=positiony;
this.title=title;
this.style=style;
console.log(this.style);
this.keywordone=keywordone;
this.keywordtwo=keywordtwo;
this.keywordthree=keywordthree;
this.text=text;
//this.connectedto=connectedto;

switch (this.clientid=clientid){
  case 1:
  this.directionx=-directionx;
  this.directiony=-directiony;
  break;
  case 2:
  this.directionx=directionx;
  this.directiony=directiony;
  break;
  case 3:
  this.directionx=directiony;
  this.directiony=-directionx;
  break;
  case 4:
  this.directionx=-directiony;
  this.directiony=directionx;
  break;
  default:
  this.directionx=directionx;
  this.directiony=directiony;
}




this.createShape = function(){

  

  console.log(this.text);
  let ncontainer = $("<div>");
  $(ncontainer).prependTo(".screenuserport");
  $(ncontainer).css("position", "absolute");
  $(ncontainer).css("top",this.positiony +"px");
  $(ncontainer).css("left",this.positionx +"px");
  let nForm = $("<div>");
  let ntext = $("<h1>");
  $(ntext).html(this.title);
  //$(nForm).addClass(this.title);
  $(nForm).addClass("poolelement");
  $(nForm).appendTo(ncontainer);
  $(ntext).addClass("ttelement");
  $(ntext).appendTo(nForm);
  $(nForm).css("width",this.size*0.15+ "vw");
  $(nForm).css("height",this.size*0.15+ "vw");
  $(nForm).css("margin-left",3+ "vw");
  $(ntext).css("padding-top",this.size*0.15/2.6 + "vw");
  $(ntext).css("font-size",this.size*0.15/6+ "vw");

  let nBloc =$("<div class='elementinfo'>");

  let ntextone=$("<h3 class='nkey'>");
  let ntexttwo=$("<h3 class='nkey'>");
  let ntextthree=$("<h3 class='nkey'>");
  $(ntextone).appendTo(nBloc);
  $(ntexttwo).appendTo(nBloc);
  $(ntextthree).appendTo(nBloc);
  $(nBloc).appendTo(ncontainer);
  $(nBloc).css("width",this.size*0.15+6+ "vw");
  $(ntextone).html("# "+this.keywordone);
  $(ntexttwo).html("# "+this.keywordtwo);
  $(ntextthree).html("# "+this.keywordthree);
  $(nBloc).css("height:10vw");

  let para = $("<p>");
  $(para).appendTo(nBloc);
  $(para).html(this.text);





  switch (parseInt(this.style)){
    case 1:
    $(nForm).css("background-color","white");
    $(nForm).css("color","black");
    break;
    case 2:
    console.log(this.style);
    $(nForm).css("background-color","black");
    $(nForm).css("border","white solid 2px");
    $(nForm).css("color","white");
    break;
    case 3:
    $(nForm).css("background-color","black");
    $(nForm).css("border","white dotted 2px");
    $(nForm).css("color","white");
    break;
  };


  return ncontainer;
  //where clickfonction?here?
}
this.shape =this.createShape();




}
