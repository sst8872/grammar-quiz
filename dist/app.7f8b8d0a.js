parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"RSqK":[function(require,module,exports) {
"use strict";function e(){var e=document.querySelector(".modalBtn"),t=document.querySelector(".modalWrapper"),o=document.querySelector("body");e.addEventListener("click",function(e){t.classList.add("showModal"),document.querySelector(".close").addEventListener("click",function(e){return t.classList.remove("showModal")}),t.addEventListener("click",function(e){return t.classList.remove("showModal")}),o.addEventListener("keydown",function(e){if(27===e.keyCode)return t.classList.remove("showModal")})})}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var t=e;exports.default=t;
},{}],"QdeU":[function(require,module,exports) {
"use strict";var e=t(require("./modal"));function t(e){return e&&e.__esModule?e:{default:e}}function n(e){return c(e)||r(e)||o()}function o(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function r(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}function c(e){if(Array.isArray(e)){for(var t=0,n=new Array(e.length);t<e.length;t++)n[t]=e[t];return n}}(0,e.default)();var a=function(){var e="1nnCrmaEtLiaVTfWmgRdaR9GW_SJE9tR-XSAEtskMWPM",t=[],o={},r={},c=document.querySelector(".peter-box"),a=document.querySelector("#dropDownList"),u=document.querySelector(".index"),i=document.querySelector(".output");function l(e){s(e.target.value)}function s(e){o.page=0,o.score=0,o.curQuiz=t[e],o.totalQuestions=o.curQuiz.length,d()}function d(){var e,t,a=o.curQuiz[o.page];if(i.innerHTML="",c.innerHTML="",u.innerHTML="",document.querySelector(".box").style.borderBottomColor="#03a9f2",o.page>=o.totalQuestions){var l=(e=o.score,t=o.totalQuestions,Math.floor(100*e/t));i.innerHTML='<div class="scoreOutput">Game Over</div>',i.innerHTML+='<div class="scoreOutput">Your score is '.concat(l,"%</div>"),document.querySelector(".box").style.borderBottomColor="#f6f6f6"}else{var s=document.createElement("h2"),d=document.createTextNode("".concat(a.question));s.appendChild(d),i.appendChild(s),console.log(a);var p=[];for(var f in r.correct=a.correct,r.kor=a.kor,r.exp=a.exp,r.question=a.question,a)if("question"!=f&&"kor"!=f&&"exp"!=f){var v=a[f],y=!1;"correct"==f&&(y=!0),v&&(p=[].concat(n(p),[{answer:v,status:y}]))}!function(e){for(var t=e.length-1;t>0;t--){var n=Math.floor(Math.random()*(t+1)),o=e[t];e[t]=e[n],e[n]=o}}(p);var h=document.createElement("ul");p.forEach(function(e,t){var n=document.createElement("li");n.textContent=p[t].answer,n.checkMe=p[t].status,n.addEventListener("click",m),n.insertAdjacentHTML("afterbegin","<span>".concat(t+1,"</span>")),h.appendChild(n)});var q=document.createElement("div");q.setAttribute("class","index"),q.innerHTML='<span class="index">'.concat(o.page+1," / ").concat(o.curQuiz.length,"</span>"),document.querySelector(".index").appendChild(q),i.appendChild(h)}}function m(e){var t=document.querySelector(".modalBtn");t.style.display="block",t.addEventListener("click",p);var n="Sorry, Incorrect",r=e.target.checkMe?"green":"red";e.target.checkMe&&(o.score++,n="Correct"),o.page++,document.querySelectorAll("li").forEach(function(e){e.removeEventListener("click",m)});var a=document.createElement("div"),u="Next Question";o.page>=o.totalQuestions&&(u="See Results"),a.innerHTML=" \n                <h4 class=".concat(r,">").concat(n,'</h4>\n                <p>\n                <input \n                    type="submit" \n                    value="').concat(u,'"\n                    class="peter-button" \n                    /> \n                </p>'),a.addEventListener("click",function(){document.querySelector(".modalBtn").style.display="none",document.querySelector(".h2").textContent="",document.querySelector(".question").textContent="",document.querySelector(".kor").textContent="",document.querySelector(".exp").textContent="",document.querySelector(".modalWrapper").classList.remove("showModal"),d()}),c.appendChild(a)}function p(e){document.querySelector(".h2").textContent="정답 "+r.correct,document.querySelector(".question").textContent=r.question,document.querySelector(".kor").textContent=r.kor,document.querySelector(".exp").textContent=r.exp}return{init:function(){fetch("https://script.google.com/macros/s/AKfycbziQxGY0Qwqp9fS0-kDmtc6cOyJekx-dxBz_B2KB-DSErzJgc2m/exec").then(function(e){return e.json()}).then(function(o){!function(o){for(var r=[],c=1;c<=o;c++){var u="https://spreadsheets.google.com/feeds/list/".concat(e,"/").concat(c,"/public/values?alt=json");r=[].concat(n(r),[u])}Promise.all(r.map(function(e){return fetch(e).then(function(e){return e.json()}).then(function(e){var t=[],o=e.feed.title.$t;return e.feed.entry.forEach(function(e){var o={};for(var r in e)"gsx"===r.substring(0,3)&&(o[r.split("$")[1]]=e[r].$t);t=[].concat(n(t),[o])}),{key:o,value:t}})})).then(function(e){e.forEach(function(n,o){t[e[o].key]=e[o].value}),document.querySelector(".loader").style.display="none",document.querySelector(".box").style.display="block",document.querySelector(".modal").style.display="block",function(){var e=document.createElement("select");e.classList.add("select-css");var n=!0;for(var o in t){var r=document.createElement("option");r.value=o,r.textContent=o,e.appendChild(r),n&&(n=!1,s(o))}e.addEventListener("change",l),a.appendChild(e)}()})}(o)})}}}();document.addEventListener("DOMContentLoaded",a.init);
},{"./modal":"RSqK"}]},{},["QdeU"], null)
//# sourceMappingURL=app.7f8b8d0a.js.map