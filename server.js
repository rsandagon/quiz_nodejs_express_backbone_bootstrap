var express = require('express'),
	assessment = require('./routes/assessment'),
	fs = require("fs");

var app = express();

app.configure(function(){
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.static(__dirname + '/public'));
});

app.get('/', function(req, res) {
        fs.readFile(__dirname + '/public/index.html', 'utf8', function(err, text){
            res.send(text);
        });
    });

app.get('/content/assessment_details/:accountID/:type', assessment.findAssessmentDetails);
app.get('/content/assessment/:assessmentID', assessment.findAssesmentResultById);
app.put('/content/assessment/:assessmentID', assessment.updateAssessmentResult);

app.get('/content/questions', assessment.findAllQuestions);
//app.post('/content/question', assessment.addQuestion);
//app.delete('/content/question/:id', assessment.deleteQuestion);

app.listen(3200);	
console.log('Listening on port 3200...');