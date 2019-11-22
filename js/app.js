import makeModal from "./modal";
makeModal();

const app = (function() {
  // Spreadsheet json feed
  const feedID = "1nnCrmaEtLiaVTfWmgRdaR9GW_SJE9tR-XSAEtskMWPM";
  let myData = []; // Object for spreadsheet data
  let game = {}; // Object for game data
  let tempHint = {};

  // Dom elements
  const peterBox = document.querySelector(".peter-box");
  const dropDownList = document.querySelector("#dropDownList");
  const index = document.querySelector('.index');
  const output = document.querySelector(".output");

  // Load jason data from spreadsheets
  function init() {
      getLength();
  }

  function getLength() {
    let url = 'https://script.google.com/macros/s/AKfycbziQxGY0Qwqp9fS0-kDmtc6cOyJekx-dxBz_B2KB-DSErzJgc2m/exec';
    fetch(url)
        .then(res => res.json())
        .then(data => {
          loadJSON(data);
        });
  }

  // Load data into Dom
  function loadOutput() {
    // Drop down list
    let select = document.createElement("select");
    select.classList.add("select-css");
    let firstRun = true;
    for (let key in myData) {
        // key: sheet name, slect option name
      let option = document.createElement("option");
      option.value = key;
      option.textContent = key;
      select.appendChild(option);
      if (firstRun) {
        firstRun = false;
        quizBuilder(key);
      }
    }
    select.addEventListener("change", outputQuiz);
    dropDownList.appendChild(select);
  }

  // Load quiz builder
  function outputQuiz(e) {
      // e.target.value => option value
    quizBuilder(e.target.value);
  }

  // Making a quiz set
  function quizBuilder(quizName) {
    game.page = 0;
    game.score = 0;
    game.curQuiz = myData[quizName];
    game.totalQuestions = game.curQuiz.length;

    // Load actual questions
    questionBuilder();
  }

  function percentage(partialV, totalV) {
    return Math.floor((100*partialV) / totalV);
  }

    // Actual quiz
  function questionBuilder() {
    let holder = game.curQuiz[game.page];
    output.innerHTML = "";
    peterBox.innerHTML = "";
    index.innerHTML = '';
    document.querySelector('.box').style.borderBottomColor = '#03a9f2';

    if (game.page >= game.totalQuestions) {
        let playerScore = percentage(game.score, game.totalQuestions);
        output.innerHTML = `<div class="scoreOutput">Game Over</div>`;
        output.innerHTML += `<div class="scoreOutput">Your score is ${playerScore}%</div>`
        document.querySelector('.box').style.borderBottomColor = '#f6f6f6';
    } else {
      let h2 = document.createElement("h2");
      let h2Text = document.createTextNode(`${holder.question}`);
      h2.appendChild(h2Text);
      output.appendChild(h2);
      // Build a question
      console.log(holder, 'from holder');
      let tempArray = [];
      tempHint.correct = holder['correct'];
      tempHint.kor  = holder['kor'];
      tempHint.exp = holder['exp'];
      tempHint.question = holder['question'];
      for (let key in holder) {
        if (key != "question" && key != 'kor' && key != 'exp') {
          let ans = holder[key];
          let res = false;
          if (key == "correct") {
            res = true;
          }
          if (ans) {
            tempArray = [...tempArray, { answer: ans, status: res }];
          }
        }
      }
      shuffleArray(tempArray);
      let ul = document.createElement("ul");
      tempArray.forEach((answer, i) => {
          let li = document.createElement("li");
          li.textContent = tempArray[i].answer;
          li.checkMe = tempArray[i].status;
          li.addEventListener("click", checkAnswer);
          li.insertAdjacentHTML("afterbegin", `<span>${i + 1}</span>`);
          ul.appendChild(li);
      });
      const index = document.createElement('div');
      index.setAttribute('class', 'index');
      index.innerHTML = `<span class="index">${game.page + 1} / ${game.curQuiz.length}</span>`
      document.querySelector('.index').appendChild(index);
      output.appendChild(ul);
    }
  }

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  }

  // Check if the answer is correct
  function checkAnswer(e) {
    const modalBtn = document.querySelector('.modalBtn');
    modalBtn.style.display = 'block';
    modalBtn.addEventListener('click', showHint);
    let responder = "Sorry, Incorrect";
    let resClass = e.target.checkMe ? 'green' : 'red';
    if (e.target.checkMe) {
      game.score++;
      responder = "Correct";
    }
    game.page++;
    let lis = document.querySelectorAll("li");
    lis.forEach(li => {
      li.removeEventListener("click", checkAnswer);
    });
    // EventListener for hint
    // Show responder button
    let div = document.createElement("div");
    let nextText = "Next Question";
    if (game.page >= game.totalQuestions) {
      nextText = "See Results";
    }
    div.innerHTML = ` 
                <h4 class=${resClass}>${responder}</h4>
                <p>
                <input 
                    type="submit" 
                    value="${nextText}"
                    class="peter-button" 
                    /> 
                </p>`;
    div.addEventListener("click", function() {
      document.querySelector('.modalBtn').style.display = 'none';
      document.querySelector('.h2').textContent = '';
      document.querySelector('.question').textContent = '';
      document.querySelector('.kor').textContent = '';
      document.querySelector('.exp').textContent = '';
      document.querySelector('.modalWrapper').classList.remove('showModal');
      questionBuilder();
    });
    peterBox.appendChild(div);
  }

  function showHint(e) {
      document.querySelector('.h2').textContent = '정답 ' + tempHint.correct;
      document.querySelector('.question').textContent = '[문제] ' + tempHint.question;
      document.querySelector('.kor').textContent = tempHint.kor;
      document.querySelector('.exp').textContent = tempHint.exp;

      return;
  }

  function loadJSON(sheetLen) {
    let urls = [];
    for (let sheetNum = 1; sheetNum <= sheetLen; sheetNum++) {
      let jsonURL = `https://spreadsheets.google.com/feeds/list/${feedID}/${sheetNum}/public/values?alt=json`;
      urls = [...urls, jsonURL];
    }
    // Promise all - fetch all spread sheets data
    Promise.all(
      urls.map(url => {
        return fetch(url)
          .then(res => res.json())
          .then(data => {
            let tempArray = [];
            let sheetName = data.feed.title.$t;
            data.feed.entry.forEach(element => {
              let holder = {};
              for (let key in element) {
                if (key.substring(0, 3) === "gsx") {
                  holder[key.split("$")[1]] = element[key].$t;
                }
              }
              tempArray = [...tempArray, holder];
            });
            return {
              key: sheetName,
              value: tempArray
              //   [sheetName]: tempArray
            };
          });
      })
    ).then(result => {
      console.log(result);
      // Make globaldata object from spreadsheets
      result.forEach((item, i) => {
        myData[result[i].key] = result[i].value;
      });
      const loader = document.querySelector('.loader').style.display = 'none';
      const box = document.querySelector('.box').style.display = 'block';
      document.querySelector('.modal').style.display = 'block';
      loadOutput();
    });
  }

  return { init };
})();

document.addEventListener("DOMContentLoaded", app.init);

