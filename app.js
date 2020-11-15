const express = require("express");

const bodyParser = require("body-parser");
const https = require("https")

const request = require("request");
const { response } = require("express");



const app = express();

app.use(bodyParser.urlencoded({extended:true}))

app.use(express.static("public"));

app.get("/", (req, res)=>{
    res.sendFile(__dirname + "/signup.html" ) 
})


app.post("/", (req, res)=> {
    const firstName = req.body.fname;
    const lastName = req.body.lname;
    const email = req.body.email;

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
    
            }
        ]
       
    };

    const JSONData = JSON.stringify(data)


    const url = "https://us2.api.mailchimp.com/3.0/lists/3870362f4c"

    const options = {
        method: "POST",
        auth: "Pete:fd746d8e897b57dbf5e7ec6c33d65ad4-us2"
    }
    


 const request =  https.request(url, options, (response) => {
        response.on("data", (data) => {
            
    
    if(response.statusCode === 200){
        res.sendFile(__dirname + "/success.html")
    }
    else {
        res.sendFile(__dirname + "/failure.html")
    }
        
        })
    })


    request.write(JSONData)
    request.end()
})

app.post("/failure", (req, res) => {
    res.redirect("/")
})

app.listen(process.env.PORT || 3000, () => {
    console.log("Server running on port 3000")
})

// API Key

// fd746d8e897b57dbf5e7ec6c33d65ad4-us2
// list id
// 3870362f4c