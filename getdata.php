<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>getdata</title>
<xml ID="timingsXML" SRC="a_timings - Copy.xml"></xml>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
<script>
function gettime(){
	var a;
	$.post( $("#destinationForm").attr("action"), $("#destinationForm :input").serializeArray(), function(info){
	 });
	 callmyFunction();
	return false;
}
function callmyFunction(){
	var xhttp = new XMLHttpRequest();
	var filename="511files/".document.getElementById("mode").value+"_timings.xml";	
	//xhttp.open("GET", filename, true);
	xhttp.open("GET", "a_timings - Copy.xml", true);
	xhttp.send();
	xhttp.onreadystatechange = function() {
		if (xhttp.readyState == 4 && xhttp.status == 200) {
			myFunction(xhttp);
		}
	}
}
function myFunction(xml) {
    var xmlDoc = xml.responseXML;
	var m=0,n=0;
	var timings=[[]];
	var i,j;
	var k=[];
	var s=0;
	var timings1=[];
	var routeNames=[],routeDirectionNames=[],k=[];
	var route = xmlDoc.getElementsByTagName('Route');
	for(i=0;i<route.length;i++){
		routeNames[i]=route.item(i).getAttributeNode("Name").value;
	}
	var routeDirection = xmlDoc.getElementsByTagName('RouteDirection');
	for(i=0;i<routeDirection.length;i++){
		routeDirectionNames[i]=routeDirection.item(i).getAttributeNode("Name").value;
	}
	var x = xmlDoc.getElementsByTagName('RouteDirection');
	var attnode1 = x.item(0).getAttributeNode("Code");
	var attnode2 = x.item(0).getAttributeNode("Name");
	//for(i=0;x.item(0).getAttributeNode("Code")!=null;i++){
	//	attnode1 = x.item(i).getAttributeNode("Name");
	//	alert(attnode1.value);
	//}
	//for(j=0;j<xmlDoc.getElementsByTagName("DepartureTimeList").length;j++){
		//for(i=0;i<xmlDoc.getElementsByTagName("DepartureTime").length;i++){		
			//alert("Value: "+xmlDoc.getElementsByTagName("DepartureTime")[i].childNodes[0].nodeValue);
		//}
	//}
	//myXML= document.all("timingsXML").XMLDocument;
	// x = xmlDoc.documentElement.childNodes;
	 /*alert("HI");
	 var x = xmlDoc.getElementsByTagName("DepartureTimeList")[0];
	 alert(x);
	 y=x.childNodes[8];
	 alert("length"+y.length);
	 z=y.childNodes[0];
	 alert("value"+z.nodeValue);
	 for (i = 0; i < y.length; i++) { 
        if (y.item(i).nodeType == 1) {
          // alert(y.item(i).nodeValue);
        }
    }
	 for (i = 0; i < x.length; i++) { 
        if (x.item(i).nodeType == 1) {
          // alert(x.item(i).nodeValue);
        }
    }
	 alert(x.value);
	 
	 alert("XML Root Tag Name: " + xmlDoc.NodeList[0]);
	
	//alert(" Code: "+attnode1.value+" Name: "+ attnode2.value);
	*/
	 var $str= new XMLSerializer().serializeToString(xmlDoc.documentElement);
	// alert($str);
	xmlDoc1 = $.parseXML( $str );
  $xml = $( xmlDoc1 );
   // alert("hi1");
   $xml.find( "Route" ).each(function(){
   var $route = $(this);
   document.write($route.attr("Name"));
   document.write("\t");
   $route.find( "RouteDirectionList" ).each(function(){
               var $routedrlist = $(this);
               $routedrlist.find( "RouteDirection" ).each(function(){
                 var $routedr = $(this);
                 $routedr.find( "StopList" ).each(function(){
                   var $stoplist = $(this);
                   $stoplist.find( "Stop" ).each(function(){
                     var $stop = $(this);
                     $stop.find( "DepartureTimeList" ).each(function(){
                       var $dptimelist = $(this);
                       $dptimelist.find( "DepartureTime" ).each(function(){
                         var $dptime = $(this);
                           document.write($dptime.text());
						  // timings[n][m]=$dptime.text();
						  //  alert("n "+n+" m "+m+" timings "+timings[n][m]);
						 //  m+=1;
						   timings1[s]=$dptime.text();
						   s+=1;
                       });
                    });
                 });
               });
             });
           });
		   timings1[s]="x";
		   s+=1;
		  // n+=1;
		  // m=0;
		  // alert("time"+timings[0][0]);
  });
  //alert(timings[0][0]);
  //alert("hi");
  for(i=0;i<timings1.length;i++)
  	{
		//alert(i+""+j);
		alert(timings1[i]);
	}
  for(i=0;i<routeDirection.length;i++)
  	{
		for(j=0;j<k[i];j++)
  	{
		//alert(i+""+j);
		alert(timings[i][j]);
	}}
	 return false;
}
</script>
</head>

<body>
  <form id="destinationForm" onsubmit="return gettime();" method="post" action="outdata.php" > 
  	Mode<input type="text" name="mode" id="mode"></input><br>
  	Source<input type="text" name="source" id="source"></input><br>
  	<input type="submit" value="gettime"></input>    
  </form>
</body>
</html>