
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());


const bodyParser = require('body-parser');




const mysql =require('mysql2');


app.use(express.static('abc'));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
//whether you want nested objects support  or not

let dbobj ={
	host: 'Localhost',
	user:'',
	password: '',
	database: '',
	port: 3306
}

const connection = mysql.createConnection(dbobj);

app.get("/getbookdetails", (req, resp) => {
	console.log("inside getbook function");

	let bookid = req.query.bookid;
	let output = {status: false, bookdetails: {bookid: 0, bookname : "", price: 0}}

	connection.query('select Bookid, Bookname, price from book where bookid =?',[bookid],
	 (error, rows) => {
		if(error){
			console.log(error);
		}
		else{
			if(rows.length >0){
			console.log("Book found");
			console.log(rows[0]);
			output.status = true;
			output.bookdetails = rows[0];

		}
		else{
			console.log("book not found")
		}
		
	 }

	 console.log(output);
	 resp.send(output);
	});

});
var result;


app.post('/poc1', function (req, res) {
	
		console.log("reading input " + req.body.v1 +  "  second " + req.body.v2)
		
    	var xyz ={ v1:37, v2:35};
        res.send(xyz);
    });


app.get('/poc2', function (req, res) {
    
	
        console.log("reading input " + req.query.xyz);
		
    	var xyz ={ v1:37, v2:35};

		res.send(xyz);

		});




app.listen(8081, function () {
    console.log("server listening at port 8081...");
});