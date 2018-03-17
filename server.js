var express=require('express');
var nodemailer = require("nodemailer");
var smtpTransport = require('nodemailer-smtp-transport');
var fs = require('fs');

/* Reading content from a file */

var path = process.cwd() + '/email_template.html';
var content = fs.readFileSync(path, 'utf8');

/* End of reading content */

var app = express();
/*
	Here we are configuring our SMTP Server details.
	STMP is mail server which is responsible for sending and recieving email.
*/
var transport = nodemailer.createTransport((smtpTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  secureConnection: false, // use SSL
  port: 465, // port for secure SMTP
  auth: {
    user: "babblenaut@gmail.com",
    pass: "@Amit@Sumit"
  }
})));

/*------------------SMTP Over-----------------------------*/

/*------------------Routing Started ------------------------*/

app.get('/',function(req,res){
	res.sendfile('index.html');
});
app.get('/send',function(req,res){
	var mailOptions={
		to : req.query.to,
		subject : req.query.subject,
		//html : req.query.text
		html: content
	}
	console.log(mailOptions);
	transport.sendMail(mailOptions, function(error, response){
   	 if(error){
        	console.log(error);
		res.end("error");
	 }else{
        //console.log("Message sent: " + response.message);
		 console.log("Message sent");
		res.end("sent");
	}
});
});

/*--------------------Routing Over----------------------------*/

app.listen(3000,function(){
	console.log("Express Started on Port 3000");
});

