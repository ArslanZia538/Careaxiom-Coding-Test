//Implementation of task using StepJs//

var express = require('express');
var app = express();
var Step = require('step');

app.set('view engine', 'pug');
app.set('views','./views');

var address = '';
var notvalid = '';
var param = 0;
var check = 0;
var size = 0;

function is_url(str)
{
  regexp =  /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
        if (regexp.test(str))
        {
          return true;
        }
        else
        {
          return false;
        }
}

app.get('/I/want/title', async function(req, res){
	   address = req.query.address;

Step(
  
  function checkaddress() {
	 if (Array.isArray(address)){
		 check = 1
		 return check;
	 }
	 else{
		 check = 0;
		 return check;
	}
	
  },
  function multiaddress(err, check) {
	  if (check == 0){
		  param = 1;
		if (is_url(address)){
			var temp = address.split("www.").pop();
			temp = temp.split("http://").pop();
			temp = temp.split("https://").pop();
			res.render('index', {
            name:temp,
			url:address,
			flag:param
           });
	}
	    else{
			return param;
		}
	  }
	  else{
	      var errCheck = 0;
		  param = 0;
	      size = address.length;
	
	 
	 for (var i = 0; i < size; i++) {
		if (!is_url(address[i])){
			errCheck = 1;
            return param;
            			
		}
			
	 }
	
	    if (errCheck == 0){
		   var title = [];
		   var valid = [];
		   var temp = "";
		   
		   for (var i = 0; i < size; i++) {
				   valid.push(address[i]);
				   temp = address[i].split("www.").pop();
			       temp = temp.split("http://").pop();
			       temp = temp.split("https://").pop();
				   title.push(temp);
	 }
		   
		           res.render('index', {
				   valid:valid,
				   title:title,
				   flag:param
                  });
	}
  }
	 },
	 function NoResponse(err, param){
		 if (param == 1){
			 res.render('err', {
             name: "NO RESPONSE", 
             url:address,
			 flag:param
           });
		 }
		 else{
			 var title = [];
			 var valid = [];
			 var notvalid = [];
			 var temp = ""
			 for (var i = 0; i < size; i++) {
		       if (is_url(address[i])){
				   valid.push(address[i]);
				   temp = address[i].split("www.").pop();
			       temp = temp.split("http://").pop();
			       temp = temp.split("https://").pop();
				   title.push(temp);
			   }
			   else{
				   notvalid.push(address[i]);
			   }
		
			
	 }
			       res.render('err', {
                   name: "NO RESPONSE", 
                   notvalid:notvalid,
				   valid:valid,
				   title:title,
				   flag:param
                  }); 
		 }
	 }
  
    

);

});

app.use((req, res, next) => {
    res.send('<h1>HTTP code 404<h1>');
})

app.listen(3000);