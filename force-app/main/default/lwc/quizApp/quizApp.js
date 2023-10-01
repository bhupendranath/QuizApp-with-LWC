import { LightningElement } from 'lwc';

export default class QuizApp extends LightningElement {

    selected={};  //for storing answers
    correctAnswer = 0 //to show the no. of correct answer
    isSubmitted = false //used to show the result
    myQuestions=[
        {
            id:"Question1",
            question:"Which one of the following is not a template loop?",
            answers:{
                a:"for:each",
                b:"iterator",
                c:"map loop"
            },
            correctAnswer:"c"
        },

        {
            id:"Question2",
            question:"Which of the file is invalid in LWC component folder?",
            answers:{
                a:".svg",
                b:".apex",
                c:".js"
            },
            correctAnswer:"b"
        },

        {
            id:"Question3",
            question:"Which of the following is not a directive?",
            answers:{
                a:"for:each",
                b:"if:true",
                c:"@track"
            },
            correctAnswer:"c"
        }

    ];

    //used for disabling submit button
    get allNotSelected(){
        return !(Object.keys(this.selected).length === this.myQuestions.length)

        //Object.keys(this.selected).length >> it will check total keys (length) for that object
    }

    //for applying dynamic styling to our result
    get isScoredFull(){
        return `slds-text-heading_large ${this.myQuestions.length === this.correctAnswer?'slds-text-color_success':'slds-text-color_error'}`;
    }

    //change handler get's called on every click on the option
    changeHandler(event){
        //console.log("name", event.target.name);
        //console.log("value", event.target.value);

        // const name = event.target.name;
        // const value = event.target.value;    
        const{name, value} = event.target;   //we destructuring obj here

        this.selected = {...this.selected, [name]:value}
        //this.selected = {...this.selected, ["question1"]:"a"}
    }

    //form submit handler
    submitHandler(event){
        event.preventDefault(); //form always refresh the page. To prevent that we use: event.preventDefault()
        //here we are running filter on all question (filter runs on each items)
        //filter always return array
         let correct = this.myQuestions.filter(item=>this.selected[item.id] === item.correctAnswer);
        //ex. this.selected = {"Question1":"a", "Question2":"b", "Question3":"a"}

        this.correctAnswer = correct.length;
        this.isSubmitted = true;
        //console.log("this.correctAnswer", this.correctAnswer)
    }

    //form reset handler
    resetHandler(){
        this.selected = {};
        this.correctAnswer = 0;
        this.isSubmitted = false;
    }

}