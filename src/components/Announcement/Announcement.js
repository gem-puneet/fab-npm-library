// Sample array of question-answer objects
const questionsAnswers = [
    { question: "Data types in JavaScript?", answer: "Data types in JavaScript define the data type that a variable can store. JavaScript includes primitive and non-primitive data types." },
    { question: "object-oriented programming (OOP)?", answer: "OOP) is a programming paradigm that allows us to model real-world objects in our code. OOP in JavaScript is based on creating objects that have properties (features) and methods (functions that can perform actions)." },
    { question: "Scope ?", answer: "Scope determines the accessibility of variables, objects, and functions from different parts of the code." },
    { question: "Data types in JavaScript?", answer: "Data types in JavaScript define the data type that a variable can store. JavaScript includes primitive and non-primitive data types." },
    { question: "object-oriented programming (OOP)?", answer: "OOP) is a programming paradigm that allows us to model real-world objects in our code. OOP in JavaScript is based on creating objects that have properties (features) and methods (functions that can perform actions)." },
    { question: "Scope ?", answer: "Scope determines the accessibility of variables, objects, and functions from different parts of the code." },
    { question: "Data types in JavaScript?", answer: "Data types in JavaScript define the data type that a variable can store. JavaScript includes primitive and non-primitive data types." },
    { question: "object-oriented programming (OOP)?", answer: "OOP) is a programming paradigm that allows us to model real-world objects in our code. OOP in JavaScript is based on creating objects that have properties (features) and methods (functions that can perform actions)." },
    { question: "Scope ?", answer: "Scope determines the accessibility of variables, objects, and functions from different parts of the code." },
    // Add more objects as needed
  ];
  
  document.getElementById('openModalBtn').addEventListener('click', function() {
    // Clear previous content
    const modalContent = document.querySelector('.modal-content');
    modalContent.innerHTML = '';
  
    // Populate modal with dynamic content
    questionsAnswers.forEach(item => {
      const qaSection = document.createElement('div');
      qaSection.classList.add('qa-section');
      const question = document.createElement('h3');
      question.textContent = item.question;
      const answer = document.createElement('p');
      answer.textContent = item.answer;
      qaSection.appendChild(question);
      qaSection.appendChild(answer);
      modalContent.appendChild(qaSection);
    });
  
    // Show modal
    document.getElementById('customModal').style.display = 'block';
    document.getElementById('overlay').style.display = 'block';
    document.body.style.overflow = 'hidden'; // Disable scrolling
  });
  
  document.querySelector('.close').addEventListener('click', function() {
    closeCustomModal();
  });
  
  document.getElementById('overlay').addEventListener('click', function() {
    closeCustomModal();
  });
  
  function closeCustomModal() {
    document.getElementById('customModal').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
    document.body.style.overflow = ''; // Enable scrolling
  }
  