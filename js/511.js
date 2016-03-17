function gettime(){
			  var e = document.getElementById("mode");
			  var strUser = e.options[e.selectedIndex].value;
			  document.getElementById("stopListMessage").innerHTML ="";
			  var e1 = document.getElementById("stopsListNames");
			  if(strUser=="--"){
				  document.getElementById("validationMessage").innerHTML ="Please select Mode of Transport";
				  return false;
			  }
			  $.post( $("#destinationForm").attr("action"), $("#destinationForm :input").serializeArray(), function(info){
			   });
			   callmyFunction();
			  return false;
		  }
		  function callmyFunction(){
			  var xhttp = new XMLHttpRequest();
			 // alert(document.getElementById("source").value);
			  var e = document.getElementById("stopsListNames");
			  var strUser = e.options[e.selectedIndex].value;
			   var stops=strUser.split(",");
			   var filename="511files/"+stops[0]+"_timings.xml";
			 // var filename=document.getElementById("source").value+"_timings.xml";
			  xhttp.open("GET", filename, true);
			  xhttp.setRequestHeader("Cache-Control", "no-cache");
			  xhttp.send();
			  xhttp.onreadystatechange = function() {
				  if (xhttp.readyState == 4 && xhttp.status == 200) {
					  myFunction(xhttp);
				  }
			  }
		  }
		  function myFunction(xml) {
			  flag=0;
			  document.getElementById("myTable").innerHTML="<tr><th>Route No.</th><th>Route</th><th>Time</th></tr>";
			  var xmlDoc = xml.responseXML;
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
			   var $str= new XMLSerializer().serializeToString(xmlDoc.documentElement);
			  xmlDoc1 = $.parseXML( $str );
			 $xml = $( xmlDoc1 );
			 $xml.find( "Route" ).each(function(){
			 var $route = $(this);
			// document.write($route.attr("Name"));
			// document.write("\t");
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
			});
			 var table = document.getElementById("myTable");
   			 var temp=0;
			 var cell1,cell2,cell3;
			 var str="";				 
			 for(i=0;i<routeDirection.length;i++){
				 var row = table.insertRow(1);
				 cell1 = row.insertCell(0);
   			 	 cell2 = row.insertCell(1);
				 cell3 = row.insertCell(2);			 
				 for(j=temp;timings1[j]!='x';j++){
					 if(timings1[j+1]!='x')
					 {	str+=timings1[j]+" minutes, ";
					 }
					 else
					 	str+=timings1[j]+" minutes";											 
					 temp=j;
				 }
				 if(str!=""){
					 document.getElementById('myTable').className = "visibleRouteTable";
					 cell1.innerHTML = "&nbsp"+routeNames[i]+"&nbsp";
  		    		 cell2.innerHTML = "&nbsp"+routeDirectionNames[i]+"&nbsp";
					 cell3.innerHTML = "&nbsp"+str+"&nbsp";
					 flag=1;
				 }
				 temp+=1;
					
				 str=""; 
			  }  	
			  if(flag==0){
				  document.getElementById('myTable').className = "hiddenRouteTable";
			  	  document.getElementById("stopListMessage").innerHTML ="There are currently no inbound/outbound transport for the stops";  
			  }
			 return false;
		  }
		  function getStopsForMode(){
			  var e = document.getElementById("mode");
			  var strUser = e.options[e.selectedIndex].value;
			  strUser=strUser.replace(" ","_");
			  $.ajax({
			  type: "POST",
			  url: "getStops.php",
			  data: { mode: strUser },
			  dataType:"html",
			  success: function (data) {
			  	  var stops=data.split("|"); 
				  var stopListDropdown ='<label for="source" id="stopListLabel">Source:</label><select name="stopsListNames" id="stopsListNames" required>';
				  for(i=0;i<stops.length-1;i++){
					  stopListDropdown+="<option>"+stops[i]+"</option>";
				  }
				  stopListDropdown+="</select><br>";				  
				  document.getElementById("stopsList").innerHTML =stopListDropdown;
				  }
			  });
		  }
$( document ).ready(function() {
$('#destinationForm').trigger("reset");
     var e = document.getElementById("mode");
	 var strUser = e.options[e.selectedIndex].value;
		 e.options[e.selectedIndex].value="--";
});
$('#destinationForm').on('reset', function(e)
{
   document.getElementById('stopsListNames').className = "hiddenRouteTable";
   document.getElementById('stopListLabel').className = "hiddenRouteTable";
});



		  /*$(document).ready(function(){
			   $(".mode").click(function(){
				  alert("inside ajax");
			  }
			$(".mode").on("click", function (e) {
				alert("inside ajax");
			e.preventDefault();
			$.ajax({
			  type: "POST",
			  url: "http://bayareatransitsolutions.com/getdata.php",
			  data: $("#form").serialize(),
			  dataType:"html",
			  success: function (data) {
				  alert("hi");
			  }
			  });
	
			});
	
		  });*/