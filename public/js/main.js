var AppRouter = Backbone.Router.extend({

    routes: {
        ""                  : "home",
        "home"              : "home",
        "quiz"              : "quizDefault",
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

    quizDefault: function () {
        //  starts at assessment id 1 -- change this to proper id soon
        var assessmentResult = new AssessmentResult({assessmentID: 1});
        assessmentResult.fetch({success: function(){
            $("#content").html(new QuizView({model: assessmentResult}).el);
        }});
        this.headerView.selectMenuItem('quiz_menu');
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