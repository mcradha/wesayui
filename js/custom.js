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
		 else
		 {
			$("#erremsg").html(responsedata);
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

	
function getMyFriendsTraits(id) {
	 
	 var data = { "id" : id} ;
	  
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
			 if(parseInt(item.positive)==99999)
			 {
				 positive="";
			 }
			else
			{
				positive = item.positive;
			}
 if(parseInt(item.negetive)==99999)
			 {
				 negetive="";
			 }
			else
			{
				negetive = item.negetive;
			}
 if(parseInt(item.nutral)==99999)
			 {
				 neutral="";
			 }
			else
			{
				neutral = item.nutral;
			}			
		     trHTML += '<tr><td>' + (i +1) + '</td><td>' + item.traitname + '</td><td>' + positive + '</td><td>' + negetive + '</td><td>' + neutral + '</td></tr>';
			 
		});
        $('#friends_table').append(trHTML);
		  
		},
    failure: function(errMsg) {
        alert(errMsg);
    }
});
}

	
function getMyTraits() {
	 
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
			var func = "deleteTrait('"+item.traituniqid+"')";
			var func1 = "";
			
			var func1class = "";
			if(parseInt(item.ishidden) == 0 ) {
				 
				func1 = "ChangeStatusOfTrait('"+item.traituniqid+"',0)";
				func1class = "glyphicon glyphicon-remove";
			}
			else 
			{
				 
				func1 = "ChangeStatusOfTrait('"+item.traituniqid+"',1)";
				func1class = "glyphicon glyphicon-ok";
			}    
            trHTML += '<tr><td>' + (i +1) + '</td><td>' + item.traitname + '</td><td>' + item.positive + '</td><td>' + item.negetive + '</td><td>' + item.nutral + '</td><td><span style="cursor:pointer" onclick='+func+' class="glyphicon glyphicon-trash"></span></td><td><span style="cursor:pointer" onclick='+func1+' class=" '+func1class+'"></span></td></tr>';
			 
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

function acceptInviation(uid){
	var data = [ {'id':uid} ] ;
	 $.ajax({
    type: "POST",
	beforeSend: function(request) {
    request.setRequestHeader("X-Authorization", authorizationToken);
   },
     url: endpointurl+"/userzone/acceptfriendrequest/",
    
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

function getMyFriends(){
	
 
	var data = {} ;
	 $.ajax({
    type: "POST",
	beforeSend: function(request) {
    request.setRequestHeader("X-Authorization", authorizationToken);
   },
     url: endpointurl+"/userzone/getMyFriendList/",
    
    data: JSON.stringify(data),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function(data){
		 var trHTML = '';
        $.each(data, function (i, item) {
			if(parseInt(item.accept_status) == 2 ) {
			var func = "acceptInviation('"+item.id+"')";
				trHTML += '<tr><td>' + (i +1) + '</td><td>' + item.fullname + '</td><td>' + item.addeddate + '</td><td>' + item.invitationacceptdate + '</td><td><span style="cursor:pointer" onclick='+func+' class="glyphicon glyphicon-ok"></span></td></tr>';
			}
			else if(parseInt(item.accept_status) == 3 ) {
				trHTML += '<tr><td><input type="radio" onclick="getMyFriendsTraits(this.value)"  name="friend" value="'+item.friendsid+'"/></td><td>' + item.fullname + '</td><td>' + item.addeddate + '</td><td>' + item.invitationacceptdate + '</td><td><span style="cursor:pointer"   class="glyphicon glyphicon-user"></span></td></tr>';
			}
			
			else
			{
				trHTML += '<tr><td>' + (i +1) + '</td><td>' + item.fullname + '</td><td>' + item.addeddate + '</td><td>' + item.invitationacceptdate + '</td><td><span  class="glyphicon glyphicon-time"></span></td></tr>';
			}
		});
        $("#records_table").append(trHTML);
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

function ChangeStatusOfTrait(traituniqid, statusValue ){
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
function getPopuler(type) {
	 
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
			
            if(type!=1){
			var func = "addTrait('"+item.traitname+"',999999,0)";
			var func1 = "addTrait('"+item.traitname+"',999999,1)";
			var func2 = "addTrait('"+item.traitname+"',999999,2)";
			trHTML += '<tr><td>' + (i +1) + '</td><td>' + item.traitname + '</td><td><span style="cursor:pointer" onclick='+func+' class="glyphicon glyphicon-align-left"></span></td><td><span style="cursor:pointer" onclick='+func1+' class="glyphicon glyphicon-align-right"></span></td><td><span style="cursor:pointer" onclick='+func2+' class="glyphicon glyphicon-align-center"></span></td></tr>';
			}
			else
			{
				var func = "addTrait('"+item.traitname+"',0,0)";
				trHTML += '<tr><td>' + (i +1) + '</td><td>' + item.traitname + '</td><td><span style="cursor:pointer" onclick='+func+' class="glyphicon glyphicon-plus"></span></td></tr>';		
			}
		});
        $('#records_table1').append(trHTML);
		  
		},
    failure: function(errMsg) {
        alert(errMsg);
    }
});
}
function deleteTrait(traituniqid){
	
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

function addTrait(traitname, userid, type){
	var data =  "";
 if(userid == 999999)
 {
	 	  data = [{ "traitname" :  traitname,"traitgivenfor":$('input[name=friend]:checked').val(), "typeofvote": type}] ;
 }
else { 
	  data = [{ "traitname" :  traitname,"traitgivenfor":userid, "typeofvote": type}] ;
}	
console.log(data);
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
		 
		// window.location.href = window.location.href;
		},
    failure: function(errMsg) {
        alert(errMsg);
    }
});
 
}

function allTrait(type){
	
 
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
			if(type==1){
			var func = "addTrait('"+item.traitname+"',0,0)";
            trHTML += '<tr><td>' + (i +1) + '</td><td>' + item.traitname + '</td><td><span style="cursor:pointer" onclick='+func+' class="glyphicon glyphicon-plus"></span></td></tr>';
			}
			else
			{
				var func = "addTrait('"+item.traitname+"',999999,0)";
			var func1 = "addTrait('"+item.traitname+"',999999,1)";
			var func2 = "addTrait('"+item.traitname+"',999999,2)";
			trHTML += '<tr><td>' + (i +1) + '</td><td>' + item.traitname + '</td><td><span style="cursor:pointer" onclick='+func+' class="glyphicon glyphicon-align-left"></span></td><td><span style="cursor:pointer" onclick='+func1+' class="glyphicon glyphicon-align-right"></span></td><td><span style="cursor:pointer" onclick='+func2+' class="glyphicon glyphicon-align-center"></span></td></tr>';
			}		
		});
        $('#records_table2').append(trHTML);
		},
    failure: function(errMsg) {
        alert(errMsg);
    }
});
 
}
