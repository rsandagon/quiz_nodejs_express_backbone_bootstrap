var AppRouter = Backbone.Router.extend({

    routes: {
        ""                  : "home",
        "quiz/:id"	        : "quiz",
        "assessment/:id"	    : "assessment"
    },

    initialize: function () {
        this.headerView = new HeaderView();
        $('.header').html(this.headerView.el);
    },

    home: function (id) {
        if (!this.homeView) {
            this.homeView = new HomeView();
        }
        $('#content').html(this.homeView.el);
        this.headerView.selectMenuItem('home-menu');
    },

    quiz: function (id) {
        var assessmentResult = new AssessmentResult({assessmentID: id});
        assessmentResult.fetch({success: function(){
            $("#content").html(new QuizView({model: assessmentResult}).el);
        }});
        this.headerView.selectMenuItem('quiz_menu');
    },

	assessment: function(id) {
        var assessmentResult = new AssessmentResult({assessmentID: id});
        assessmentResult.fetch({success: function(){
            $("#content").html(new AssessmentView({model: assessmentResult}).el);
        }});
        this.headerView.selectMenuItem('assessment_menu');
	}

});

utils.loadTemplate(['HomeView', 'HeaderView', 'QuizView', 'AssessmentView'], function() {
    app = new AppRouter();
    Backbone.history.start();
});