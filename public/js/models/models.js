window.Assessment = Backbone.Model.extend({

    urlRoot: "/content/assessment_details/",

    idAttribute: "_id",

    defaults: {
        _id: null,
        assessmentID: null,
        title: "Assessment title",
        description: " Assessment description"
    }
});

window.AssessmentResult = Backbone.Model.extend({

    urlRoot: "/content/assessment/",
    idAttribute: "assessmentID",

    defaults: {
        _id: null,
        assessmentID: null,
        total: 0,
        correct: 0,
        params:null,
        knowledge:null,
        answers:null,
        question: { questionID: null,
            text: "question text",
            answers:[{
                answerID:null, 
                questionID : null, 
                text :"answer 1",
                isCorrect:false
            },{
                answerID: null,
                questionID: null,
                text:"answer 2",
                isCorrect:true
            },{
                answerID:null,
                questionID:null,
                text:"answer 3",
                isCorrect:false
            },{
                answerID :null,
                questionID :null,
                text : "answer 4",
                isCorrect :false
            }]
        }
    }
});