Patterns = new Mongo.Collection('patterns');





// Bootstrap the Pattens library
if (Meteor.isServer && Patterns.find().count() === 0) {
    Meteor.startup(function() {
        _.each(PatternData, function(pattern) {
            Patterns.insert(pattern);
        });
    });
}