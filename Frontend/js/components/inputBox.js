function InputBox(question) {
  if (question.type === "numeric") {
    return `<input type="text" id="answer" placeholder="Enter your answer">`;
  }

  if (question.type === "logic") {
    return `
      <textarea rows="6" id="answer"
        placeholder="Write your solution / logic here"></textarea>
    `;
  }

  return "";
}
