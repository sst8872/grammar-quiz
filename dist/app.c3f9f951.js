// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"js/modal.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function makeModal() {
  var btn = document.querySelector('.modalBtn');
  var modalWrapper = document.querySelector('.modalWrapper');
  var body = document.querySelector('body');
  btn.addEventListener('click', function (e) {
    modalWrapper.classList.add('showModal');
    var closBtn = document.querySelector('.close');
    closBtn.addEventListener('click', function (e) {
      return modalWrapper.classList.remove('showModal');
    });
    modalWrapper.addEventListener('click', function (e) {
      return modalWrapper.classList.remove('showModal');
    });
    body.addEventListener('keydown', function (e) {
      if (e.keyCode === 27) {
        return modalWrapper.classList.remove('showModal');
      }
    });
  });
}

var _default = makeModal;
exports.default = _default;
},{}],"js/app.js":[function(require,module,exports) {
"use strict";

var _modal = _interopRequireDefault(require("./modal"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

(0, _modal.default)();

var app = function () {
  // Spreadsheet json feed
  var feedID = "1nnCrmaEtLiaVTfWmgRdaR9GW_SJE9tR-XSAEtskMWPM";
  var myData = []; // Object for spreadsheet data

  var game = {}; // Object for game data

  var tempHint = {}; // Dom elements

  var peterBox = document.querySelector(".peter-box");
  var dropDownList = document.querySelector("#dropDownList");
  var index = document.querySelector('.index');
  var output = document.querySelector(".output"); // Load jason data from spreadsheets

  function init() {
    getLength();
  }

  function getLength() {
    var url = 'https://script.google.com/macros/s/AKfycbziQxGY0Qwqp9fS0-kDmtc6cOyJekx-dxBz_B2KB-DSErzJgc2m/exec';
    fetch(url).then(function (res) {
      return res.json();
    }).then(function (data) {
      loadJSON(data);
    });
  } // Load data into Dom


  function loadOutput() {
    // Drop down list
    var select = document.createElement("select");
    select.classList.add("select-css");
    var firstRun = true;

    for (var key in myData) {
      // key: sheet name, slect option name
      var option = document.createElement("option");
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
  } // Load quiz builder


  function outputQuiz(e) {
    // e.target.value => option value
    quizBuilder(e.target.value);
  } // Making a quiz set


  function quizBuilder(quizName) {
    game.page = 0;
    game.score = 0;
    game.curQuiz = myData[quizName];
    game.totalQuestions = game.curQuiz.length; // Load actual questions

    questionBuilder();
  }

  function percentage(partialV, totalV) {
    return Math.floor(100 * partialV / totalV);
  } // Actual quiz


  function questionBuilder() {
    var holder = game.curQuiz[game.page];
    output.innerHTML = "";
    peterBox.innerHTML = "";
    index.innerHTML = '';
    document.querySelector('.box').style.borderBottomColor = '#03a9f2';

    if (game.page >= game.totalQuestions) {
      var playerScore = percentage(game.score, game.totalQuestions);
      output.innerHTML = "<div class=\"scoreOutput\">Game Over</div>";
      output.innerHTML += "<div class=\"scoreOutput\">Your score is ".concat(playerScore, "%</div>");
      document.querySelector('.box').style.borderBottomColor = '#f6f6f6';
    } else {
      var h2 = document.createElement("h2");
      var h2Text = document.createTextNode("".concat(holder.question));
      h2.appendChild(h2Text);
      output.appendChild(h2); // Build a question

      console.log(holder, 'from holder');
      var tempArray = [];
      tempHint.correct = holder['correct'];
      tempHint.kor = holder['kor'];
      tempHint.exp = holder['exp'];
      tempHint.question = holder['question'];

      for (var key in holder) {
        if (key != "question" && key != 'kor' && key != 'exp') {
          var ans = holder[key];
          var res = false;

          if (key == "correct") {
            res = true;
          }

          if (ans) {
            tempArray = [].concat(_toConsumableArray(tempArray), [{
              answer: ans,
              status: res
            }]);
          }
        }
      }

      shuffleArray(tempArray);
      var ul = document.createElement("ul");
      tempArray.forEach(function (answer, i) {
        var li = document.createElement("li");
        li.textContent = tempArray[i].answer;
        li.checkMe = tempArray[i].status;
        li.addEventListener("click", checkAnswer);
        li.insertAdjacentHTML("afterbegin", "<span>".concat(i + 1, "</span>"));
        ul.appendChild(li);
      });

      var _index = document.createElement('div');

      _index.setAttribute('class', 'index');

      _index.innerHTML = "<span class=\"index\">".concat(game.page + 1, " / ").concat(game.curQuiz.length, "</span>");
      document.querySelector('.index').appendChild(_index);
      output.appendChild(ul);
    }
  }

  function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  } // Check if the answer is correct


  function checkAnswer(e) {
    var modalBtn = document.querySelector('.modalBtn');
    modalBtn.style.display = 'block';
    modalBtn.addEventListener('click', showHint);
    var responder = "Sorry, Incorrect";
    var resClass = e.target.checkMe ? 'green' : 'red';

    if (e.target.checkMe) {
      game.score++;
      responder = "Correct";
    }

    game.page++;
    var lis = document.querySelectorAll("li");
    lis.forEach(function (li) {
      li.removeEventListener("click", checkAnswer);
    }); // EventListener for hint
    // Show responder button

    var div = document.createElement("div");
    var nextText = "Next Question";

    if (game.page >= game.totalQuestions) {
      nextText = "See Results";
    }

    div.innerHTML = " \n                <h4 class=".concat(resClass, ">").concat(responder, "</h4>\n                <p>\n                <input \n                    type=\"submit\" \n                    value=\"").concat(nextText, "\"\n                    class=\"peter-button\" \n                    /> \n                </p>");
    div.addEventListener("click", function () {
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
    var urls = [];

    for (var sheetNum = 1; sheetNum <= sheetLen; sheetNum++) {
      var jsonURL = "https://spreadsheets.google.com/feeds/list/".concat(feedID, "/").concat(sheetNum, "/public/values?alt=json");
      urls = [].concat(_toConsumableArray(urls), [jsonURL]);
    } // Promise all - fetch all spread sheets data


    Promise.all(urls.map(function (url) {
      return fetch(url).then(function (res) {
        return res.json();
      }).then(function (data) {
        var tempArray = [];
        var sheetName = data.feed.title.$t;
        data.feed.entry.forEach(function (element) {
          var holder = {};

          for (var key in element) {
            if (key.substring(0, 3) === "gsx") {
              holder[key.split("$")[1]] = element[key].$t;
            }
          }

          tempArray = [].concat(_toConsumableArray(tempArray), [holder]);
        });
        return {
          key: sheetName,
          value: tempArray //   [sheetName]: tempArray

        };
      });
    })).then(function (result) {
      // Make globaldata object from spreadsheets
      result.forEach(function (item, i) {
        myData[result[i].key] = result[i].value;
      });
      var loader = document.querySelector('.loader').style.display = 'none';
      var box = document.querySelector('.box').style.display = 'block';
      document.querySelector('.modal').style.display = 'block';
      loadOutput();
    });
  }

  return {
    init: init
  };
}();

document.addEventListener("DOMContentLoaded", app.init);
},{"./modal":"js/modal.js"}],"../../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "54681" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/app.js"], null)
//# sourceMappingURL=/app.c3f9f951.js.map