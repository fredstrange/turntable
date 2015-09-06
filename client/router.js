Router.configure({
    layoutTemplate: 'appBody',
    notFoundTemplate: 'notFound'
});


HomeController = RouteController.extend({
    onBeforeAction: function() {
        console.log('I am in the home controller');
        this.next();

    }
});

CanvasController = RouteController.extend({
    onBeforeAction: function() {
        console.log('I am in the Canvas controller');
        Meteor.subscribe('patterns');
        this.next();
    }
});


Router.map(function() {
    this.route('home', {path: '/'});
    this.route('canvas', {template: 'tabletCanvas'});
});