// server.js
const express = require('express'),
	  mongoose = require('mongoose'),
 	  bodyParser = require('body-parser'),
 	  path = require('path');
 	  
const app = express();
const port = process.env.PORT || 4040;
const db = require('./models/model.js');

mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/notes', {useNewUrlParser: true});

app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, '/models')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


const connection = mongoose.connection;

connection.once('open', ()=>{
    console.log('MongoDB connection established successfully.')
});





app.get('/',(req, res)=>{
	res.sendFile(path.join(__dirname, "NotebookApp.html"))
})

app.get('/api', (req, res)=>{
	db.Note.find()
	.then((note)=>{
		res.json(note);
	})
	.catch((err)=>{
		console.log(err);
	})
})
app.get('/api/:_id', (req,res)=>{
	db.Note.findOne({_id: req.params._id})
	.then((note)=>{
		res.json(note);
	})
})
app.post('/api', (req,res)=>{
	db.Note.create(req.body)
	res.send(req.body.title + " has been added")
})

app.put('/api/:_id',(req, res)=>{
	db.Note.findOneAndUpdate({_id: req.params._id}, req.body, {useFindAndModify: false})
	.then((note)=>{
		console.log(`${req.body.title} has been updated.`)
		console.log(req.body.content);
		res.send(req.body);
	})
})
app.delete('/api/:_id', (req, res)=>{
	db.Note.findOne({_id: req.params._id})
	.then((data)=>{
		data.remove();
		console.log(`${data.title} has been deleted.`);
		res.send(`${data.title} has been deleted`)
	})
	.catch((err)=>{
		console.log(err);
	})
})







app.listen(port, ()=>{
	console.log(`Server is running on port: ${port}`);
})











