var express=require('express');
var nodemailer = require("nodemailer");
var smtpTransport = require('nodemailer-smtp-transport');
var fs = require('fs');

/* Add count */
// var map = {
//     "plandata": [
//         {
//             "name": "Ultimate Plus",
//             "count": 0,
//             "price": 0,
//             "totalPrice": 0
//         },
//         {
//             "name": "Advantage",
//             "count": 0,
//             "price": 0,
//             "totalPrice": 0
//         },
//         {
//             "name": "Standard",
//             "count": 0,
//             "price": 0,
//             "totalPrice": 0
//         },
//         {
//             "name": "Junior",
//             "count": 0,
//             "price": 0,
//             "totalPrice": 0
//         }]
// };
//
// var planName = data.plans[0].name;
// var billingCycle = data.billingCycle;
// var name;
// var price;
// var username = data.firstName + " " + data.lastName;
// var totalCost = data.totalCost;
// var totalSaving = data.totalSaving;
// var subname = data.firstName;
// var freeTrial = false;
// if (data.plans[0].cycles[0].freeTrial != null && data.plans[0].cycles[0].freeTrial.numCycles != null && data.plans[0].cycles[0].freeTrial.numCycles > 0) {
//     freeTrial = true;
// }
//
// for(var i=0;i<data.plans.length;i++){
//
//     if(data.plans[i].cycles[0].months.localeCompare(billingCycle) == 0){
//         price = data.plans[i].cycles[0].price;
//         name = data.plans[i].name;
//
//         if(name.charAt(9).toUpperCase() == 'U'){
//             name = name.substring(9,22);
//         }
//         else if(name.charAt(9).toUpperCase() == 'A')
//         {
//             name = name.substring(9,18);
//         }
//         else if(name.charAt(9).toUpperCase() == 'S')
//         {
//             name = name.substring(9,17);
//         }
//         else if(name.charAt(9).toUpperCase() == 'J')
//         {
//             name = name.substring(9,15);
//         }
//         addCount(map,name,price);
//
//     }
//     else if(data.plans[i].cycles[1].months.localeCompare(billingCycle) == 0){
//         price = data.plans[i].cycles[1].price;
//         name = data.plans[i].name;
//
//         if(name.charAt(9).toUpperCase() == 'U'){
//             name = name.substring(9,22);
//         }
//         else if(name.charAt(9).toUpperCase() == 'A')
//         {
//             name = name.substring(9,18);
//         }
//         else if(name.charAt(9).toUpperCase() == 'S')
//         {
//             name = name.substring(9,17);
//         }
//         else if(name.charAt(9).toUpperCase() == 'J')
//         {
//             name = name.substring(9,15);
//         }
//         addCount(map,name,price);
//     }
// }
//
// var totalCost = data.totalCost.toFixed(2);
// var totalSaving = data.totalPromocodeSavings;
//
// var selectedPlanList = '';
// var salestax = '';
// var totalCostString = "";
//
// for(var i = 0;i< map.plandata.length;i++){
//     if(map.plandata[i].count > 0)
//         selectedPlanList +=    "<tr><td style='margin-right: 50px;width: 200px;font-family: Roboto;font-size: 14px;'>"+  map.plandata[i].name+" "+"("+map.plandata[i].count+")" +"</td>" +  "<td style='text-align: right;font-family: Roboto;font-size: 14px;'>" + "$" +  map.plandata[i].totalPrice.toFixed(2) + "</td></tr>";
// }
//
//if (data.salesTax === undefined || data.salesTax === -1) {
//    salestax = "Plus applicable sales tax.";
//} else if (data.salesTax > 0) {
//    salestax = "$" + data.salesTax.toFixed(2);
//}
//
//var promocode = data.promoCode;
//if(promocode != "" && totalSaving > 0) {
//    totalSaving = "$" + totalSaving.toFixed(2);
//}
//
//if (freeTrial) {
//    totalCost = 0;
//    totalCostString = "TOTAL Due Today $" + totalCost;
//}
//else{
//    totalCostString = "TOTAL $" + totalCost;
//}
//
//var uname = subname.charAt(0).toUpperCase() + subname.slice(1);
//
//function addCount(map, name, price){
//    for(var i = 0;i< map.plandata.length;i++){
//        if(map.plandata[i].name == name){
//            var val = map.plandata[i].count;
//            map.plandata[i].count = ++val;
//            map.plandata[i].price = price;
//            map.plandata[i].totalPrice = map.plandata[i].price * map.plandata[i].count;
//
//            break;
//        }
//    }
//}


/* ------------------- Final HTML string ---------------- */

var strVar = "<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Transitional//EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\">\n<html>\n<head>\n<title>LL - Member Confirmation</title>\n<meta http-equiv=\"Content-Type\" content=\"text/html; charset=iso-8859-1\">\n<style>img { display:block; } p { margin-bottom: 0px; margin-bottom: 0px !important }</style>\n</head>\n<body bgcolor=\"#ebebeb\" style=\"padding:0;margin:0;\">\n<table width=\"98%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" align=\"center\">\n<tr>\n    <td bgcolor=\"#ebebeb\" style=\"font-family: arial,helvetica,sans-serif; font-size: 13px;\">\n\n        <table width=\"650\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\">\n            <tr>\n                <td width=\"650\" height=\"93\" colspan=\"5\" align=\"left\" valign=\"top\" bgcolor=\"#ebebeb\">\n                    <table width=\"650\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" align=\"left\">\n                        <tr>\n                            <td width=\"235\" height=\"93\" align=\"left\" padding-top=\"40\" bgcolor=\"#ebebeb\"> <br>\n                                <img style=\"display:block;\" src=\"http://images.LL.com/dm/20140306_AnnualCredit/logo@2x.png\" width=\"180\" height=\"45\" alt=\"LL - Relentlessly Protecting Your Identity\"></td>\n                            <td width=\"415\" height=\"93\" align=\"right\" valign=\"bottom\" bgcolor=\"#ebebeb\">\n                                <table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" align=\"right\">\n                                    <tr>\n                                        <td align=\"right\" valign=\"top\" bgcolor=\"#ebebeb\">\n                                            <p style=\"font-family:arial,helvetica,sans-serif;font-weight:bold;line-height:15px;font-size:11px;color:#666666;margin:0;padding:0;\">\n                                                <a href=\"http://www.LL.com\" style=\"text-decoration:none;color:#666666;\">LL.com</a>\n                                                &nbsp; | &nbsp;\n                                                1.800.543.3562\n                                                &nbsp; | &nbsp;\n                                                <a href=\"http://www.LL.com/about-us/about-LL/contact-us\" style=\"text-decoration:none;color:#666666;\">Contact us</a>\n                                            </p><br>\n                                        </td>\n                                        <td align=\"right\" valign=\"top\" bgcolor=\"#ebebeb\">\n                                            <img style=\"display:block;\" src=\"http://images.LL.com/dm/10/07202011-member-portal/password/spacer.gif\" width=\"25\" height=\"1\" alt=\" \"></td>\n                                    </tr>\n                                </table>\n                            </td>\n                        </tr>\n                    </table>\n                </td>\n            </tr>\n            <tr>\n                <td width=\"650\" colspan=\"5\" align=\"left\" valign=\"top\" bgcolor=\"#FFFFFF\">\n                    <table width=\"650\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" align=\"left\">\n                        <tr>\n                            <td width=\"650\" align=\"left\" valign=\"top\" bgcolor=\"#FFFFFF\">\n                                <img style=\"display:block;\" src=\"https://cdn.LL.com/media/assets/secure/images/email/enroll/hero.png\" width=\"650\" height=\"300\" alt=\"Member Confirmation\"></td>\n                        </tr>\n                    </table>\n                </td>\n            </tr>\n            <tr>\n                <td width=\"1\" height=\"25\" align=\"left\" valign=\"top\" bgcolor=\"#E2E2E2\">\n                    <img style=\"display:block;\" src=\"http://images.LL.com/dm/10/07202011-member-portal/password/spacer.gif\" width=\"1\" height=\"25\" alt=\" \"></td>\n                <td width=\"29\" height=\"25\" align=\"left\" valign=\"top\" bgcolor=\"#FFFFFF\">\n                    <img style=\"display:block;\" src=\"http://images.LL.com/dm/10/07202011-member-portal/password/spacer.gif\" width=\"29\" height=\"25\" alt=\" \"></td>\n                <td width=\"590\" height=\"25\" align=\"left\" valign=\"top\" bgcolor=\"#FFFFFF\">\n                    <table width=\"590\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" align=\"left\">\n                        <tr>\n                            <td width=\"590\" height=\"28\" align=\"left\" valign=\"top\" bgcolor=\"#FFFFFF\">\n                                <img style=\"display:block;\" src=\"http://images.LL.com/dm/10/07202011-member-portal/password/spacer.gif\" width=\"590\" height=\"28\" alt=\" \"></td>\n                        </tr>\n                        <tr>\n                            <td width=\"590\" height=\"25\" align=\"left\" valign=\"top\" bgcolor=\"#FFFFFF\">\n                                <table width=\"590\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" align=\"left\">\n                                    <tr>\n                                        <td width=\"330\" align=\"left\" valign=\"top\" bgcolor=\"#FFFFFF\">\n                                            <table width=\"330\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" align=\"left\">\n                                                <tr>\n                                                    <td width=\"330\" align=\"left\" valign=\"top\" bgcolor=\"#FFFFFF\"><p style=\"font-family:arial,helvetica,sans-serif;font-weight:normal;line-height:18px;font-size:12px;color:#666666;margin:0;padding:0\">\n                                                        <strong style=\"color:#333333;font-size:15px;line-height:28px;\">Dear Amit Ashutosh,</strong><br>\n                                                        <h2 style=\"color:#0e72b7;font-family: Roboto;font-weight: bold;\">Your Application is not yet complete</h2>\n                                                        To allow us to start protecting your identity, we'll first need to have your information. click below to\n                                                        complete last enrollment step and activate your new LL ultimate Membershop today.<br><br></p></td>\n                                                </tr>\n                                                <tr>\n                                                    <td width=\"292\" align=\"left\" valign=\"top\" bgcolor=\"\">\n                                                        <a rel=\"nofollow\" style=\"color:white;min-height:40px;display:block;margin-bottom:10px;text-decoration:none;\" target=\"_blank\" href=\"https://localhost:8443/#/quiz/42d1844c-3ffd-4710-a1c4-cfe624df86cb\">\n                                                            <div style=\"width:175px;background-color:darkorange;text-align:center;padding:8px;border-radius:8px;\">COMPLETE INFORMATION</div>\n                                                        </a>\n                                                    </td>\n                                                </tr>\n                                                <tr>\n                                                    <td width=\"330\" align=\"left\" valign=\"top\" bgcolor=\"\">\n                                                        <table width=\"330\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" align=\"left\">\n\n                                                        </table>\n                                                    </td>\n                                                </tr>\n                                                <tr>\n                                                    <td width=\"330\" align=\"left\" valign=\"top\" bgcolor=\"#FFFFFF\">\n                                                        Thanks again for choosing LL.\n                                                    </td>\n                                                </tr>\n                                            </table>\n\n                                        </td><td width=\"30\" align=\"left\" valign=\"top\" bgcolor=\"#FFFFFF\">\n                                        <img style=\"display:block;\" src=\"http://images.LL.com/dm/10/07202011-member-portal/password/spacer.gif\" width=\"30\" height=\"25\" alt=\" \"></td>\n                                        <td width=\"230\" align=\"left\" valign=\"top\" bgcolor=\"#FFFFFF\">\n                                            <table width=\"230\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" align=\"left\">\n                                                <tr>\n                                                    <td width=\"230\" align=\"left\" valign=\"top\" bgcolor=\"#f9f9f9\">\n                                                        <img style=\"display:block;\" src=\"http://images.LL.com/dm/10/07202011-member-portal/password/promo-header-member-conf.gif\" width=\"230\" height=\"18\" alt=\" \"></td>\n                                                </tr>\n                                                <tr>\n                                                    <td width=\"230\" align=\"left\" valign=\"top\" bgcolor=\"#f9f9f9\">\n                                                        <table width=\"230\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" align=\"left\">\n                                                            <tr>\n                                                                <td width=\"1\" align=\"left\" valign=\"top\" bgcolor=\"#e2e2e2\">\n                                                                    <img style=\"display:block;\" src=\"http://images.LL.com/dm/10/07202011-member-portal/password/spacer.gif\" width=\"1\" height=\"10\" alt=\" \"></td>\n                                                                <td width=\"19\" align=\"left\" valign=\"top\" bgcolor=\"#f9f9f9\">\n                                                                    <img style=\"display:block;\" src=\"http://images.LL.com/dm/10/07202011-member-portal/password/spacer.gif\" width=\"19\" height=\"10\" alt=\" \"></td>\n                                                                <td width=\"198\" align=\"left\" valign=\"top\" bgcolor=\"#f9f9f9\">\n                                                                    <table width=\"198\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" align=\"left\">\n                                                                        <tr>\n                                                                            <td width=\"198\" align=\"center\" valign=\"top\" bgcolor=\"#f9f9f9\"><p style=\"font-family:arial,helvetica,sans-serif;font-weight:normal;line-height:20px;font-size:13px;color:#333333;margin:0;padding:0\"><strong>Order Summary</strong></p>\n                                                                                <br>\n                                                                            </td>\n                                                                        </tr>\n                                                                        <tr>\n                                                                            <td width=\"198\" align=\"left\" valign=\"top\" bgcolor=\"#f9f9f9\">\n                                                                                <table width=\"198\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" align=\"left\">\n\n                                                                                </table>\n                                                                            </td>\n                                                                        </tr>\n                                                                    </table>\n                                                                </td>\n                                                                <td width=\"11\" align=\"left\" valign=\"top\" bgcolor=\"#f9f9f9\">\n                                                                    <img style=\"display:block;\" src=\"http://images.LL.com/dm/10/07202011-member-portal/password/spacer.gif\" width=\"11\" height=\"10\" alt=\" \"></td>\n                                                                <td width=\"1\" align=\"left\" valign=\"top\" bgcolor=\"#e2e2e2\">\n                                                                    <img style=\"display:block;\" src=\"http://images.LL.com/dm/10/07202011-member-portal/password/spacer.gif\" width=\"1\" height=\"10\" alt=\" \"></td>\n                                                            </tr>\n                                                            <tr>\n                                                                <td width=\"230\" colspan=\"5\" align=\"left\" valign=\"top\" bgcolor=\"#f9f9f9\">\n                                                                    <img style=\"display:block;\" src=\"http://images.LL.com/dm/10/07202011-member-portal/password/promo-divider.gif\" width=\"230\" height=\"33\" alt=\" \"></td>\n                                                            </tr>\n                                                            <tr>\n                                                                <td width=\"1\" align=\"left\" valign=\"top\" bgcolor=\"#e2e2e2\">\n                                                                    <img style=\"display:block;\" src=\"http://images.LL.com/dm/10/07202011-member-portal/password/spacer.gif\" width=\"1\" height=\"10\" alt=\" \"></td>\n                                                                <td width=\"19\" align=\"left\" valign=\"top\" bgcolor=\"#f9f9f9\">\n                                                                    <img style=\"display:block;\" src=\"http://images.LL.com/dm/10/07202011-member-portal/password/spacer.gif\" width=\"19\" height=\"10\" alt=\" \"></td>\n                                                                <td width=\"198\" align=\"left\" valign=\"top\" bgcolor=\"#f9f9f9\">\n                                                                    <table width=\"198\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" align=\"left\">\n\n                                                                    </table>\n                                                                </td>\n                                                                <td width=\"11\" align=\"left\" valign=\"top\" bgcolor=\"#f9f9f9\">\n                                                                    <img style=\"display:block;\" src=\"http://images.LL.com/dm/10/07202011-member-portal/password/spacer.gif\" width=\"11\" height=\"10\" alt=\" \"></td>\n                                                                <td width=\"1\" align=\"left\" valign=\"top\" bgcolor=\"#e2e2e2\">\n                                                                    <img style=\"display:block;\" src=\"http://images.LL.com/dm/10/07202011-member-portal/password/spacer.gif\" width=\"1\" height=\"10\" alt=\" \"></td>\n                                                            </tr>\n                                                        </table>\n                                                    </td>\n                                                </tr>\n                                                <tr>\n                                                    <td width=\"230\" align=\"left\" valign=\"top\" bgcolor=\"#f9f9f9\">\n                                                        <img style=\"display:block;\" src=\"http://images.LL.com/dm/10/07202011-member-portal/password/promo-footer-member-conf.gif\" width=\"230\" height=\"27\" border=\"0\" alt=\" \"></td>\n                                                </tr>\n                                            </table>\n                                        </td>\n                                    </tr>\n                                </table>\n                            </td>\n                        </tr>\n                    </table>\n                </td>\n                <td width=\"29\" height=\"25\" align=\"left\" valign=\"top\" bgcolor=\"#FFFFFF\">\n                    <img style=\"display:block;\" src=\"http://images.LL.com/dm/10/07202011-member-portal/password/spacer.gif\" width=\"29\" height=\"25\" alt=\" \"></td>\n                <td width=\"1\" height=\"25\" align=\"left\" valign=\"top\" bgcolor=\"#E2E2E2\">\n                    <img style=\"display:block;\" src=\"http://images.LL.com/dm/10/07202011-member-portal/password/spacer.gif\" width=\"1\" height=\"25\" alt=\" \"></td>\n            </tr>\n            <tr>\n                <td width=\"650\" height=\"87\" colspan=\"5\" align=\"left\" valign=\"top\" bgcolor=\"#ebebeb\">\n                    <img style=\"display:block;\" src=\"http://images.LL.com/dm/10/07202011-member-portal/password/content-footer.gif\" width=\"650\" height=\"87\" alt=\" \"></td>\n            </tr>\n            <tr>\n                <td width=\"650\" height=\"100\" colspan=\"5\" align=\"left\" valign=\"top\" bgcolor=\"#ebebeb\">\n\n                    <table width=\"650\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" align=\"left\">\n                        <tr>\n                            <td width=\"650\" height=\"30\" align=\"center\" bgcolor=\"#ebebeb\">\n                                <table width=\"650\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" align=\"left\">\n                                    <tr>\n                                        <td width=\"19\" height=\"30\" bgcolor=\"#ebebeb\">\n                                            <img style=\"display: block;\" src=\"http://images.LL.com/dm/10/07202011-member-portal/password/spacer.gif\" width=\"19\" height=\"30\" alt=\" \"></td>\n                                        <td width=\"631\" height=\"30\" valign=\"top\" bgcolor=\"#ebebeb\">\n                                            <p style=\"font-family:arial,helvetica,sans-serif;line-height:15px;font-size:10px;color:#999999;margin:0;padding:0;text-transform:uppercase;\">\n                                                To ensure you receive your LL alert emails, please add\n                                                <a href=\"mailto:member.services@LL.com\" style=\"color:#666666;text-decoration:none;\">member.services@LL.com</a>\n                                                to your safe sender list.\n                                            </p>\n                                            <br>\n                                        </td>\n                                        <td width=\"50\" height=\"30\" bgcolor=\"#ebebeb\">\n                                            <img style=\"display: block;\" src=\"http://images.LL.com/dm/10/07202011-member-portal/password/spacer.gif\" width=\"50\" height=\"30\" alt=\" \"></td>\n                                    </tr>\n                                </table>\n                            </td>\n                        </tr>\n                        <tr>\n                            <td width=\"650\">\n                                <table width=\"650\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" align=\"left\">\n                                    <tr>\n                                        <td width=\"19\" height=\"40\" bgcolor=\"#ebebeb\">\n                                            <img style=\"display: block;\" src=\"http://images.LL.com/dm/10/07202011-member-portal/password/spacer.gif\" width=\"19\" height=\"40\" alt=\" \"></td>\n                                        <td width=\"581\" height=\"40\" valign=\"top\" bgcolor=\"#ebebeb\">\n                                            <p style=\"font-family:arial,helvetica,sans-serif;line-height:14px;font-size:10px;color:#999999;margin:0;padding:0;\">\n                                                LL, the LockMan Logo and \"Relentlessly Protecting Your Identity\" are trademarks or registered trademarks of LL, Inc.\n                                                <br><br>\n                                                PLEASE NOTE: LL does not engage in outbound telemarketing and will not attempt to collect personal, financial or identification information through an outbound telephone call. When LL does call individuals it is to alert them of activity on their accounts - these calls are for NOTIFICATION purposes only. For your protection, if we need to collect information we will always ask you to contact us at <span style=\"white-space:nowrap;\">1-800-LL (543-3562)</span> or provide your information via your secure online member portal on <a href=\"https://secure.LL.com/\" style=\"color:#999999;text-decoration:none;\">www.LL.com</a>.\n                                                <br><br><br>\n                                            </p>\n                                        </td>\n                                        <td width=\"50\" height=\"40\" bgcolor=\"#ebebeb\">\n                                            <img style=\"display: block;\" src=\"http://images.LL.com/dm/10/07202011-member-portal/password/spacer.gif\" width=\"50\" height=\"40\" alt=\" \"></td>\n                                    </tr>\n                                </table>\n                            </td>\n                        </tr>\n                        <tr>\n                            <td width=\"650\">\n                                <table width=\"650\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" align=\"left\">\n                                    <tr>\n                                        <td width=\"19\" height=\"74\" bgcolor=\"#ebebeb\">\n                                            <img style=\"display: block;\" src=\"http://images.LL.com/dm/10/07202011-member-portal/password/spacer.gif\" width=\"19\" height=\"74\" alt=\" \"></td>\n                                        <td width=\"473\" height=\"74\" valign=\"top\" bgcolor=\"#ebebeb\">\n                                            <p style=\"font-family:arial,helvetica,sans-serif;line-height:14px;font-size:10px;color:#999999;margin:0;padding:0;\">\n                                                View our Privacy Policy at\n                                                <a href=\"http://www.LL.com/privacy\" style=\"font-size:10px;color:#666666;text-decoration:none;\">www.LL.com/privacy</a><br>\n                                                View our Terms and Conditions at\n                                                <a href=\"http://www.LL.com/terms\" style=\"font-size:10px;color:#666666;text-decoration:none;\">www.LL.com/terms</a><br>\n                                                If you wish to change your email preferences, please visit\n                                                <a href=\"http://www.LL.com/subscribe\" style=\"font-size:10px;color:#666666;text-decoration:none;\">www.LL.com/subscribe</a><br>\n                                                &copy; Copyright 2011 LL, Inc. All Rights Reserved.<br><br>\n                                                LL&nbsp;&nbsp;|&nbsp;&nbsp;60 E. Rio Salado Parkway&nbsp;&nbsp;|&nbsp;&nbsp;Suite 400 Tempe, Arizona 85281\n                                            </p>\n                                        </td>\n                                        <td width=\"146\" height=\"74\" valign=\"top\" bgcolor=\"#ebebeb\">\n                                            <img style=\"display: block;\" src=\"http://images.LL.com/dm/20140306_AnnualCredit/logo@2x.png\" width=\"135\" height=\"33\" alt=\"LL - Relentlessly Protecting Your Identity\"></td>\n                                        <td width=\"12\" height=\"74\" bgcolor=\"#ebebeb\">\n                                            <img style=\"display: block;\" src=\"http://images.LL.com/dm/10/07202011-member-portal/password/spacer.gif\" width=\"12\" height=\"74\" alt=\" \"></td>\n                                    </tr>\n                                </table>\n                            </td>\n                        </tr>\n                    </table>\n\n                </td>\n            </tr>\n            <tr>\n                <td width=\"650\" height=\"15\" colspan=\"5\" align=\"left\" valign=\"top\" bgcolor=\"#ebebeb\">\n                    <img style=\"display:block;\" src=\"http://images.LL.com/dm/10/07202011-member-portal/password/spacer.gif\" width=\"650\" height=\"15\" alt=\" \"></td>\n            </tr>\n        </table>\n\n    </td>\n</tr>\n</table>\n<br clear=\"both\">\n_____________________________________________________________________________<BR>\nThe information contained in this transmission may contain privileged and confidential information. It is intended only for the use of the person(s) named above. If you are not the intended recipient, you are hereby notified that any review, dissemination, distribution or duplication of this communication is strictly prohibited. If you are not the intended recipient, please contact the sender by reply email and destroy all copies of the original message.<BR>\n_____________________________________________________________________________<BR>\n</body>\n</html>";



/*=======================Routing and connection details============================== */
var path = process.cwd() + '/email_template.html';
//var strVar = fs.readFileSync(path, 'utf8');

var app=express();
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
	//console.log(content);
	var mailOptions={
		//to : req.query.to,
		//subject : req.query.subject,
		//html : req.query.text
        to: req.query.to,
        from: "LL <noreply@LL.com>",
        subject: "Amit, you’re not done yet. Activate your New Membership Now. ",
		html: strVar
	}
	console.log(mailOptions);
	transport.sendMail(mailOptions, function(error, response){
   	 if(error){
        	console.log(error);
		res.end("error");
	 }else{
        console.log("Message sent: " + response.message);
		res.end("sent");
	}
});
});

/*--------------------Routing Over----------------------------*/

app.listen(3000,function(){
	console.log("Express Started on Port 3000");
});
