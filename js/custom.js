//var endpointurl ="http://ec2-18-219-80-120.us-east-2.compute.amazonaws.com:8080";
var endpointurl ="http://localhost:8080";
 
function login() {
	 
	 var data = { "emailaddress": $("#txtusername").val(), "password": $("#txtpassword").val() } ;
	 $.ajax({
    type: "POST",
     url: endpointurl+"/api/loginviaemail/",
    
    data: JSON.stringify(data),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function(data){
		 var responsedata = JSON.stringify(data);
		 if((data['status']=='success'))
		 {
			window.location.href="setsession.php?q="+data['auth_token'];
		 }
		},
    failure: function(errMsg) {
        alert(errMsg);
    }
});
}

function getMySettings(authorizationToken) {
	 
	 var data = { } ;
	 $.ajax({
    type: "POST",
	beforeSend: function(request) {
    request.setRequestHeader("X-Authorization", authorizationToken);
   },
     url: endpointurl+"/userzone/mysettings/",
    
    data: JSON.stringify(data),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function(data){
		$('#mytraits').html(data.length);
		 var positive = 0;
		 var negetive = 0;
		 var neutral = 0;
		var trHTML = '';
        $.each(data, function (i, item) {
			var checked = "";
			if(item.categoryvalue==1)
			{
				checked = "checked";
			}
			var func = "applySettings(this,'"+authorizationToken+"')";
			
			trHTML += '<div class="checkbox"><label><input onclick="'+func+'" type="checkbox"  '+ checked +' value="'+item.uniqueid+'">'+ item.categoryname +'</label></div>';
            
		});
        $('#settings').append(trHTML);
		  
		},
    failure: function(errMsg) {
        alert(errMsg);
    }
});
}
function applySettings(sid, authorizationToken){
	if(sid.checked){
		var data = { "uniqueid": sid.value, "categoryvalue": 1 } ;
	}
	else
	{
		var data = { "uniqueid": sid.value, "categoryvalue": 0 } ;
	}
 $.ajax({
    type: "POST",
	beforeSend: function(request) {
    request.setRequestHeader("X-Authorization", authorizationToken);
   },
     url: endpointurl+"/userzone/changemysettings/",
    
    data: JSON.stringify(data),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function(data){
		 
         window.location.href = window.location.href; 
		  
		},
    failure: function(errMsg) {
        alert(errMsg);
    }
});
	
	}

function getMyTraits(authorizationToken) {
	 
	 var data = { } ;
	 $.ajax({
    type: "POST",
	beforeSend: function(request) {
    request.setRequestHeader("X-Authorization", authorizationToken);
   },
     url: endpointurl+"/userTraits/getMyTraits/",
    
    data: JSON.stringify(data),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function(data){
		$('#mytraits').html(data.length);
		 var positive = 0;
		 var negetive = 0;
		 var neutral = 0;
		var trHTML = '';
        $.each(data, function (i, item) {
			var func = "deleteTrait('"+authorizationToken+"','"+item.traituniqid+"')";
			var func1 = "";
			
			var func1class = "";
			if(parseInt(item.ishidden) == 0 ) {
				 
				func1 = "ChangeStatusOfTrait('"+authorizationToken+"','"+item.traituniqid+"',0)";
				func1class = "glyphicon glyphicon-remove";
			}
			else 
			{
				 
				func1 = "ChangeStatusOfTrait('"+authorizationToken+"','"+item.traituniqid+"',1)";
				func1class = "glyphicon glyphicon-ok";
			}    
            trHTML += '<tr><td>' + (i +1) + '</td><td>' + item.traitname + '</td><td><span style="cursor:pointer" onclick='+func+' class="glyphicon glyphicon-trash"></span></td><td><span style="cursor:pointer" onclick='+func1+' class=" '+func1class+'"></span></td></tr>';
			positive = positive + item.positive ;
		});
        $('#records_table').append(trHTML);
		  
		},
    failure: function(errMsg) {
        alert(errMsg);
    }
});
}

function sendInvite(friendId){
	var data = [{ "friendsid": friendId }] ;
	 $.ajax({
    type: "POST",
     url: endpointurl+"/userzone/sendfriendrequest/",
    beforeSend: function(request) {
    request.setRequestHeader("X-Authorization", authorizationToken);
   },
    data: JSON.stringify(data),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function(data){
		 
		},
    failure: function(errMsg) {
        alert(errMsg);
    }
});
}
function getMyContacts() {
	 
	 var data = { } ;
	 $.ajax({
    type: "POST",
	beforeSend: function(request) {
    request.setRequestHeader("X-Authorization", authorizationToken);
   },
     url: endpointurl+"/userzone/getMyContacts/",
    
    data: JSON.stringify(data),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function(data){
		var trHTML  = "";
		var func = "";
		 $.each(data, function (i, item) {
			 if(parseInt(i, item.isregistredinwesay)==0){
				trHTML += '<tr><td>' + (i +1) + '</td><td>' + item.fullname + '</td><td>' + item.emailaddress + '</td><td>' + item.countrycode +"-"+item.mobilenumber + '</td><td><span style="cursor:pointer"   class="glyphicon glyphicon-envelope"></span></td></tr>';
			 }
			 else
			 {
				 func = "sendInvite('"+item.contactid+"')";
				 trHTML += '<tr><td>' + (i +1) + '</td><td>' + item.fullname + '</td><td>' + item.emailaddress + '</td><td>' + item.countrycode +"-"+item.mobilenumber + '</td><td><span style="cursor:pointer" onclick="'+func+'"  class="glyphicon glyphicon-heart"></span></td></tr>';
			 }
		});
        $('#records_table').append(trHTML);
		  
		},
    failure: function(errMsg) {
        alert(errMsg);
    }
});
}
function getMyFriendRequest() {
	 
	 var data = { } ;
	 $.ajax({
    type: "POST",
	beforeSend: function(request) {
    request.setRequestHeader("X-Authorization", authorizationToken);
   },
     url: endpointurl+"/userzone/checkfriendrequest/",
    
    data: JSON.stringify(data),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function(data){
		var trHTML  = "";
		var func = "";
		 
		 
        $('#friendrequest').html(data.friend_request);
		  
		},
    failure: function(errMsg) {
        alert(errMsg);
    }
});
}


function getMyFriends(){
	
 
	var data = {} ;
	 $.ajax({
    type: "POST",
	beforeSend: function(request) {
    request.setRequestHeader("X-Authorization", authorizationToken);
   },
     url: endpointurl+"/userzone/myFriends/",
    
    data: JSON.stringify(data),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function(data){
		 var trHTML = '';
        $.each(data, function (i, item) {
			var func = "addTrait('"+authorizationToken+"','"+item.traitname+"')";
            trHTML += '<tr><td>' + (i +1) + '</td><td>' + item.traitname + '</td><td><span style="cursor:pointer" onclick='+func+' class="glyphicon glyphicon-plus"></span></td></tr>';
        });
        $('#records_table2').append(trHTML);
		},
    failure: function(errMsg) {
        alert(errMsg);
    }
});
 
}
function saveConatct()
{
	var data = [{ "emailaddress" : $("#txemail").val(),"countrycode" : $("#txtcountrycode").val(),"mobilenumber" : $("#txtmobilenumber").val(),"fullname" : $("#txtname").val()}] ;
	 $.ajax({
    type: "POST",
	beforeSend: function(request) {
    request.setRequestHeader("X-Authorization", authorizationToken);
   },
     url: endpointurl+"/userzone/addContacts/",
    
    data: JSON.stringify(data),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function(data){
		  window.location.href = window.location.href; 
		  
		},
    failure: function(errMsg) {
        alert(errMsg);
    }
});
}

function ChangeStatusOfTrait(authorizationToken,traituniqid, statusValue ){
	var ePoint = "";
	if(statusValue ==0) {
		ePoint = "/traitapi/hideTrait/";
	}
	else
	{
		ePoint = "/traitapi/unhideTrait/";
	}
	  
	var data = { "traituniqueid" : traituniqid} ;
	 $.ajax({
    type: "POST",
	beforeSend: function(request) {
    request.setRequestHeader("X-Authorization", authorizationToken);
   },
	 
     url: endpointurl+ePoint,
    
    data: JSON.stringify(data),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function(data){
		window.location.href = window.location.href; 
		  
		},
    failure: function(errMsg) {
        alert(errMsg);
    }
});
}


function addCustomTrait(authorizationToken) {
	 
	 var data = [{ "traitname" : $("#txtCustomTrait").val(),"traitgivenfor" : "0"}] ;
	 $.ajax({
    type: "POST",
	beforeSend: function(request) {
    request.setRequestHeader("X-Authorization", authorizationToken);
   },
     url: endpointurl+"/traitapi/addTrait/",
    
    data: JSON.stringify(data),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function(data){
		  window.location.href = window.location.href; 
		  
		},
    failure: function(errMsg) {
        alert(errMsg);
    }
});
}
function getPopuler(authorizationToken) {
	 
	 var data = { } ;
	 $.ajax({
    type: "POST",
	beforeSend: function(request) {
    request.setRequestHeader("X-Authorization", authorizationToken);
   },
     url: endpointurl+"/traitapi/getListOfPoulerTraits/",
    
    data: JSON.stringify(data),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function(data){
		var trHTML = '';
        $.each(data, function (i, item) {
			var func = "addTrait('"+authorizationToken+"','"+item.traitname+"')";
            trHTML += '<tr><td>' + (i +1) + '</td><td>' + item.traitname + '</td><td><span style="cursor:pointer" onclick='+func+' class="glyphicon glyphicon-plus"></span></td></tr>';
        });
        $('#records_table1').append(trHTML);
		  
		},
    failure: function(errMsg) {
        alert(errMsg);
    }
});
}
function deleteTrait(authorizationToken, traituniqid){
	
var c = confirm("Are you sure to delete ?");
if(c) {
	var data = { "traituniqueid" :  traituniqid,"traitgivenfor":"0"} ;
	 $.ajax({
    type: "POST",
	beforeSend: function(request) {
    request.setRequestHeader("X-Authorization", authorizationToken);
   },
     url: endpointurl+"/traitapi/deleteTrait/",
    
    data: JSON.stringify(data),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function(data){
		 
		 window.location.href = "index.php?q=welcome";
		},
    failure: function(errMsg) {
        alert(errMsg);
    }
});
}
}

function addTrait(authorizationToken, traitname){
	
 
	var data = [{ "traitname" :  traitname,"traitgivenfor":"0"}] ;
	 $.ajax({
    type: "POST",
	beforeSend: function(request) {
    request.setRequestHeader("X-Authorization", authorizationToken);
   },
     url: endpointurl+"/traitapi/addTrait/",
    
    data: JSON.stringify(data),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function(data){
		 
		 window.location.href = window.location.href;
		},
    failure: function(errMsg) {
        alert(errMsg);
    }
});
 
}

function allTrait(authorizationToken){
	
 
	var data = {} ;
	 $.ajax({
    type: "POST",
	beforeSend: function(request) {
    request.setRequestHeader("X-Authorization", authorizationToken);
   },
     url: endpointurl+"/traitapi/getActiveTraits/",
    
    data: JSON.stringify(data),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function(data){
		 var trHTML = '';
        $.each(data, function (i, item) {
			var func = "addTrait('"+authorizationToken+"','"+item.traitname+"')";
            trHTML += '<tr><td>' + (i +1) + '</td><td>' + item.traitname + '</td><td><span style="cursor:pointer" onclick='+func+' class="glyphicon glyphicon-plus"></span></td></tr>';
        });
        $('#records_table2').append(trHTML);
		},
    failure: function(errMsg) {
        alert(errMsg);
    }
});
 
}
