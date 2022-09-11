const question = document.querySelector("#question");
const answersBox = document.querySelector("#answers-box");
const quizzContainer = document.querySelector("#quizz-container");
const scoreContainer = document.querySelector("#score-container");
const letters = ["a", "b", "c", "d"];
let points = 0;
let actualQuestion = 0;

// Perguntas
const questions = [
	{
		question: "PHP foi desenvolvido para qual fim?",
		answers: [
			{
				answer: "back-end",
				correct: true,
			},
			{
				answer: "front-end",
				correct: false,
			},
			{
				answer: "Sistema operacional",
				correct: false,
			},
			{
				answer: "Banco de dados",
				correct: false,
			},
		],
	},
	{
		question: "Uma forma de declarar variável em JavaScript:",
		answers: [
			{
				answer: "$var",
				correct: false,
			},
			{
				answer: "var",
				correct: true,
			},
			{
				answer: "@var",
				correct: false,
			},
			{
				answer: "#let",
				correct: false,
			},
		],
	},
	{
		question: "Qual o seletor de id no CSS?",
		answers: [
			{
				answer: "#",
				correct: true,
			},
			{
				answer: ".",
				correct: false,
			},
			{
				answer: "@",
				correct: false,
			},
			{
				answer: "/",
				correct: false,
			},
		],
	},
];

// Substituição do quizz para a primeira pergunta
function init() {
	// criar a priemira pergunta
	createQuestion(0);
}

// Cria uma pergunta
function createQuestion(i) {
	// Limpar a questão anterior
	const oldButtons = answersBox.querySelectorAll("button");
	oldButtons.forEach(function (btn) {
		btn.remove();
	});

	// Alterar o texto da pergunta
	const questionText = question.querySelector("#question-text");
	const questionNumber = question.querySelector("#question-number");

	questionText.textContent = questions[i].question;
	questionNumber.textContent = i + 1;
	// insere as alternativas
	questions[i].answers.forEach(function (answer, i) {
		// Cria o template od botão
		const answerTemplate = document.querySelector(".answer-template").cloneNode(true);
		const letterBtn = answerTemplate.querySelector(".btn-letter");
		const answerText = answerTemplate.querySelector(".question-answer");

		letterBtn.textContent = letters[i];
		answerText.textContent = answer["answer"];
		answerTemplate.setAttribute("correct-answer", answer["correct"]);
		// Remove hide e template class
		answerTemplate.classList.remove("hide");
		answerTemplate.classList.remove("answer-template");
		// inserir a alternativa na tela
		answersBox.appendChild(answerTemplate);

		// inserir um evento de click no botão
		answerTemplate.addEventListener("click", function () {
			checkAnswer(this);
		});
	});
	// incrementar o numero da questão
	actualQuestion++;
}

// verificando resposta do usuario
function checkAnswer(btn) {
	const buttons = answersBox.querySelectorAll("button");

	// verifica se a reposta está correta e add classe nos botões
	buttons.forEach(function (button) {
		if (button.getAttribute("correct-answer") == "true") {
			button.classList.add("correct-answer");
			if (btn == button) {
				// incrementa os pontos
				points++;
			}
		} else {
			button.classList.add("wrong-answer");
		}
	});

	// Exibir proxima pergunta
	nextQuestion();
}

// exibe prox pergunta
function nextQuestion() {
	// timer para usuario ver resposta
	setTimeout(function () {
		// verifica se ainda há perguntas
		if (actualQuestion >= questions.length) {
			showSucccesMessage();
			return;
		}
		createQuestion(actualQuestion);
	}, 700);
}

// exibe a tela final
function showSucccesMessage() {
	hideOrShowQuizz();

	// trocar dados da tela de sucesso

	// calcular score
	const score = ((points / questions.length) * 100).toFixed(2);
	const displayScore = document.querySelector("#display-score span");
	displayScore.textContent = score.toString();

	// alterar o numero de perguntas corretas

	const correctAnswers = document.querySelector("#correct-answers");
	correctAnswers.textContent = points;

	// alterar o total de perguntas
	const totalQuestions = document.querySelector("#questions-qty");
	totalQuestions.textContent = questions.length;
}

// mostra ou esconde o score
function hideOrShowQuizz() {
	quizzContainer.classList.toggle("hide");
	scoreContainer.classList.toggle("hide");
}

// reiniciar quizz
const restartBtn = document.querySelector("#restart");
restartBtn.addEventListener("click", function () {
    actualQuestion = 0;
    points = 0;
    hideOrShowQuizz();
    init();
})

init();
