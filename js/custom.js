var endpointurl ="http://ec2-18-219-80-120.us-east-2.compute.amazonaws.com:8080";
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
		var trHTML = '';
        $.each(data, function (i, item) {
			var func = "deleteTrait('"+authorizationToken+"','"+item.traituniqid+"')";
            trHTML += '<tr><td>' + (i +1) + '</td><td>' + item.traitname + '</td><td><span style="cursor:pointer" onclick='+func+' class="glyphicon glyphicon-remove"></span></td></tr>';
        });
        $('#records_table').append(trHTML);
		  
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
		 
		 window.location.href = window.location.href;
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
