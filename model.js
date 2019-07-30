let mongoose = require('mongoose');
mongoose.set('debug', true);
mongoose.connect('mongodb://localhost/notes', {useNewUrlParser: true});
mongoose.Promise = Promise;





// Schema
let noteSchema = new mongoose.Schema({
	title: {
		type: String,
		required: "please enter a title"
	},
	category: {
		type: String, 
		required: "select category"
	},
	content: {
		type: String
	},
	created_date: {
		type: Date,
		default: Date.now
	}
});

let Note  = mongoose.model('Note', noteSchema);


module.exports.Note = Note;