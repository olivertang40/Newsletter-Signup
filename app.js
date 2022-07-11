// jshint esversion: 6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const mailChimp = require("@mailchimp/mailchimp_marketing");
const app= express();


app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true }));

app.get("/",function(req,res){
  res.sendFile(__dirname + "/signup.html");});

  mailChimp.setConfig({
    apiKey:"cf78767c204aa27528a309852c02a657-us10",
    server: "us10"
  });

app.post("/", (req,res) => {
  const  firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;


const run = async () => {
  const response = await mailChimp.lists.batchListMembers("02aa2e9b9b",{
    members:[
      {
      email_address:email,
      status:"subscribed",
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName
      }
    }
  ],});
  if (response.error_count > 0){
    res.sendFile(__dirname + "/failure.html");

  }else{
    res.sendFile(__dirname+ "/success.html");
  }};
  run();

});

app.post("/failure", function(req, res){
  res.redirect("/");
});


app.listen(process.env.PORT || 3000,function(){
  console.log("Server is running on port 3000.");
});

//
// const jsonData = JSON.stringify(data);

// const options = {
//   method: "POST",
//   auth: "oliver:cf78767c204aa27528a309852c02a657-us10"
//
// }

// const request = https.request(url, options, function(response) {
//   response.on("data", function(data){
//     console.log(JSON.parse(data));
//
//   })


// API Key
// cf78767c204aa27528a309852c02a657-us10

// List Id
// 02aa2e9b9b
