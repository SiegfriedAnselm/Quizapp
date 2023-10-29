let currentQuestion = 0;
let rightQuestions = 0;
let AUDIO_SUCCESS = new Audio('./sounds/right.mp3');
let ADUIO_FAIL = new Audio('./sounds/wrong.mp3');
let AUDIO_DONE = new Audio('./sounds/done.mp3');

function render() {
    document.getElementById('sumQuestion').innerHTML = Schöpfung.length;
    document.getElementById('sumQuestion2').innerHTML = Schöpfung.length;
    showQuestion()
}

function showQuestion() {
    if(currentQuestion >= Schöpfung.length) {
        document.getElementById('card').classList.add('d-none');
        document.getElementById('finish-card').classList.remove('d-none');
        document.getElementById('right-questions').innerHTML = rightQuestions;
        AUDIO_DONE.play();
    } else {

    let percent = (currentQuestion + 1) / Schöpfung.length;
    percent = Math.round(percent * 100);
    document.getElementById('progress-bar').innerHTML = `${percent} %`;
    document.getElementById('progress-bar').style = `width: ${percent}%`;
    let question = Schöpfung[currentQuestion];
    document.getElementById('questionText').innerHTML = question['question'];
    document.getElementById('answer_1').innerHTML = question['answer_1'];
    document.getElementById('answer_2').innerHTML = question['answer_2'];
    document.getElementById('answer_3').innerHTML = question['answer_3'];
    document.getElementById('answer_4').innerHTML = question['answer_4'];
    document.getElementById('activeQuestion').innerHTML = currentQuestion+1;
    }
}

function answer(selection) {
    let question = Schöpfung[currentQuestion];
    let selectedQuestionNumber = selection.slice(-1);
    let idOfRightAnswer = `answer_${question['correct_answer']}`

    if(selectedQuestionNumber == question['correct_answer']){
        document.getElementById(selection).parentNode.classList.add('bg-success');
        rightQuestions++;
        AUDIO_SUCCESS.play();
    } else {
        document.getElementById(selection).parentNode.classList.add('bg-danger');
        document.getElementById(idOfRightAnswer).parentNode.classList.add('bg-success');
        ADUIO_FAIL.play();
    }
    document.getElementById('next-button').disabled = false;
    disableAnswers();
}

function nextQuestion() {
    currentQuestion++;
    document.getElementById('next-button').disabled = true;
    resetAnswerButtons();
    showQuestion();
    enableAnswers();
}

function resetAnswerButtons() {
    document.getElementById('answer_1').parentNode.classList.remove('bg-success');
    document.getElementById('answer_2').parentNode.classList.remove('bg-success');
    document.getElementById('answer_3').parentNode.classList.remove('bg-success');
    document.getElementById('answer_4').parentNode.classList.remove('bg-success');
    document.getElementById('answer_1').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_2').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_3').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_4').parentNode.classList.remove('bg-danger');
}

function retry() {
    currentQuestion = 0;
    rightQuestions = 0;
    document.getElementById('card').classList.remove('d-none');
    document.getElementById('finish-card').classList.add('d-none');
    render();
}


function disableAnswers() {
    for (let i = 1; i < 5; i++) {
      document.getElementById(`answer_${i}`).parentNode.style.pointerEvents = 'none';
    }
}

function enableAnswers() {
    for (let i = 1; i < 5; i++) {
        document.getElementById(`answer_${i}`).parentNode.style.pointerEvents = 'auto';
    }
}