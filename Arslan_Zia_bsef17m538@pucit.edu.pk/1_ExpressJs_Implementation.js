//Implementation of the task using ExpressJs//


var express = require('express');
var app = express();
var validUrl = require('valid-url');

app.set('view engine', 'pug');
app.set('views','./views');


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
	 var address  = req.query.address;
	 var errCheck = 0;
	 var param = 0;
	 
	 if (Array.isArray(address)){
	 
	 var size = address.length;
	/////////////////////////////////////
	 for (var i = 0; i < size; i++) {
		if (!is_url(address[i])){
			errCheck = 1;
            break;     			
		}	
	 }
	 
	 if (errCheck == 1){
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
		 
	////////////////////////////////////
	 else {
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
	else{
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
			res.render('err', {
            name: "NO RESPONSE", 
            url:address,
			flag:param
           });
		}
	}
	
});

app.use((req, res, next) => {
    res.send('<h1>HTTP code 404<h1>');
})


app.listen(3000);