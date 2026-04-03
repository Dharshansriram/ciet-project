function QuestionCard(question) {
  return `
    <div class="question-card">
      <h3>${question.title}</h3>

      <div class="problem">
        ${question.description}
      </div>

      <div class="input-section">
        ${InputBox(question)}
      </div>
    </div>
  `;
}
