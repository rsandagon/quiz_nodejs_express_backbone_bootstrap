var mongo = require('mongodb');

var Server = mongo.Server,
	Db = mongo.Db,
	BSON = mongo.BSONPure;

var server = new Server('198.199.106.247',27017,{auto_reconnect: true});
db = new Db('assessmentdb',server);

db.open(function(err, db){
	if(!err){
		console.log("Connected to 'assessmentdb' database");
		db.collection('assessments',{strict:true},function(err,collection){
			if(err){
				console.log("The 'assessments' collection doesn't exist. Creating it with sample data..");
				populateDB();
			}
		});
	}
});

exports.findAssessmentDetails = function(req,res){
	var accountID = req.params.accountID;
	var type = req.params.type;

	//	For demo, alwaus return assessment 1
	console.log('Retrieving assessment details for accnt:' + id);
	db.collection('assessments',function(err, collection){
		collection.findOne({'assessmentID': 1},function(err,item){
			res.send(item);			
		});
	});
};

exports.findAssesmentResultById = function(req,res){
	var assessmentID = req.params.assessmentID;

	console.log('Retrieving assessment Result' + assessmentID);
	db.collection('assessment_results',function(err, collection){
		collection.findOne({'assessmentID': assessmentID},function(err,item){
			res.send(item);			
		});
	});
};

exports.findAllQuestions = function(req,res){
	console.log('Retrieving all questions');

	db.collection('questions',function(err,collection){
		collection.find().toArray(function(err,items){
			res.send(items);
		});
	});
}

exports.addQuestion = function(req,res){
	var question = req.body;
	console.log('Adding question:' + JSON.stringify(question));
	db.collection('questions',function(err,collection){
		collection.insert(question,{safe:true},function(err,result){
			if(err){
				res.send({'error':'An error has occurred'});
			}else{
				console.log('Success:' + JSON.stringify(result[0]));
				res.send(result[0]);
			}
		});
	});
}

exports.updateWine = function(req,res){
	var id = req.params.id;
	var wine = req.body;
	console.log('Updating wine:' + id);
	console.log(JSON.stringify(wines));
	db.collection('wines',function(err,collection){
		collection.update({'_id':new BSON.ObjectID(id)}, wine, {safe:true}, function(err, result){
			if(err){
				console.log('Error updating wine:' + err);
				res.send({'error':'An error has occurred'});
			}else{
				console.log('' + result + ' document(s) updated');
				res.send(wine);
			}
		});
	});
}

exports.deleteWine = function(req,res){
	var id = req.params.id;
	console.log('Deleting wine:' + id);
	db.collection('wines',function(err,collection){
		collection.remove({'_id':new BSON.ObjectID(id)},{safe:true},function(err,result){
			if(err){
				res.send({'error':'An error has occurred'});
			}else{
				console.log('' + result + ' document(s) deleted');
				res.send(req.body);
			}
		});
	});
}

//	==== REMOVE THIS IN ACTUAL USAGE
//	Populate the data for demo

var populateDB = function(){

	var assessments = [
	{
		assessmentID: 1,
		title: "Vocabulary Placement Test 1",
		description: "This is a test of your vocabulary knowledge. This test will help you find the best words for you to study. In this part of the test, select the best word to match the definition."
	},
	{
		assessmentID: 2,
		title: "Vocabulary Placement Test 2",
		description: "This is a test of your vocabulary knowledge. This test will help you find the best words for you to study. In this part of the test, select the best word to match the definition."
    }];

    var assessment_results = [
	{
		assessmentID: 1,
		total: 3,
		correct: 0,
		questionID: 1
	},
	{
		assessmentID: 2,
		total: 3,
		correct: 0,
		questionID: 1
    }];


    var questions = [
    {
    	questionID: 1,
    	text: "to speak words",
    	answers:[{
    		answerID:3, 
    		questionID : 1, 
    		text :"make",
    		isCorrect:false
    	},{
    		answerID: 4,
    		questionID: 1,
    		text:"say",
    		isCorrect:true
    	},{
    		answerID:5,
    		questionID:1,
    		text:"see",
    		isCorrect:false
    	},{
    		answerID :6,
    		questionID :1,
    		text : "work",
    		isCorrect :false
    	}]
    },
    {
    	questionID: 2,
    	text: "to learn about something",
    	answers:[{
    		answerID : 7, 
    		questionID : 2, 
    		text :"call",
    		isCorrect :false
    	},{
    		answerID : 8,
    		questionID : 2,
    		text : "change",
    		isCorrect : false
    	},{
    		answerID : 9,
    		questionID : 2,
    		text :"show",
    		isCorrect : false
    	},{
    		answerID : 10,
    		questionID : 2,
    		text : "study",
    		isCorrect : true
    	}]
    },
	{
    	questionID : 3,
    	text: "to ask someone if they would like something",
    	answers:[{
    		answerID : 11, 
    		questionID : 3, 
    		text :"believe",
    		isCorrect : false
    	},{
    		answerID : 12,
    		questionID : 3,
    		text : "hope",
    		isCorrect : false
    	},{
    		answerID : 13,
    		questionID : 3,
    		text : "market",
    		isCorrect : false
    	},{
    		answerID : 13,
    		questionID : 3,
    		text : "offer",
    		isCorrect : true
    	}]
    }];

    db.collection('assessments', function(err,collection){
    	collection.insert(assessments, {safe:true}, function(err,result){
    		if(err){
				console.log("The 'assessments' collection cannot be added..");
				console.log(err);
			}
    	})
    });

    db.collection('assessment_results', function(err,collection){
    	collection.insert(assessment_results, {safe:true}, function(err,result){
    		if(err){
				console.log("The 'assessment_results' collection cannot be added..");
				console.log(err);
			}
    	})
    });

    db.collection('questions', function(err,collection){
    	collection.insert(questions, {safe:true}, function(err,result){
    		if(err){
				console.log("The 'questions' collection cannot be added..");
				console.log(err);
			}
    	})
    });

}