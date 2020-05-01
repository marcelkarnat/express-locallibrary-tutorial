var mongoose = require('mongoose')
  , Schema = mongoose.Schema

var authorSchema = Schema({
  name    : String,
  stories : [{ type: Schema.Types.ObjectId, ref: 'Story' }]
});

var storySchema = Schema({
  author : { type: Schema.Types.ObjectId, ref: 'Author' },
  title    : String
});

var Story  = mongoose.model('Story', storySchema);
var Author = mongoose.model('Author', authorSchema);


var bob = new Author( {name: "Bob Smith"} );

bob.save(function(err) {
    if(err) return handleError(err);
});

var story = new Story( {
    title: "Bob goes sleep",
    author: bob._id
})

story.save(function(err) {
    if(err) return handleError(err);
});


Story.findOne({ title: "Bob goes sleep" })
    .populate('author')
    .exec(function (err, story){
        if(err) return handleError(err);
        console.log("The author is %s", story.author.name);
    });































// var mongoose = require("mongoose");

// var Schema = mongoose.Schema;

// var someModelSchema = new Schema({
//     a_string: String,
//     a_date: Date
// });


// var someModel = mongoose.model('SomeModel', someModelSchema);



// var instance = new someModel( { name: "awesome" });

// instance.save(function(err) {
//     if(err) return handleError(err);
// });

// someModel.create({ name: "dsadsa"}, function (err, instance) {
//     if(err) return handleError(err);
// })


// instance.name = "dsad";

// instance.save(function (err) {
//     if(err) return handleError(err);
// })


// var Athlete = mongoose.model("Athlete", yourSchema);


// Athlete.find({ 'sport': 'Tennis'}, 'name age', function(err,athletes) {
//     if(err) return handleError(err);
// })


v