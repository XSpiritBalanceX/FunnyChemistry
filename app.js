"use strict";
//загрузка страницы
window.onload = function () {
  document.body.classList.add('loaded_hiding');
  window.setTimeout(function () {
    document.body.classList.add('loaded');
    document.body.classList.remove('loaded_hiding');
  }, 500);
}

//анимация на начальном экране 
TweenMax.set("#kolb", {visibility:"visible"});
TweenMax.staggerTo('#bubble-group circle', 4, {
  attr: {
    cy: 200
  },
  ease:Power2.easeIn,
  repeat: -1
}, 0.6)
var bubbles = document.getElementsByClassName("steam-bubble");
var tlSteam = new TimelineMax({ repeat: -1 });
function animateBubbles() {
  for (var i = 0; i < bubbles.length; i++) {
    var b = bubbles[i];
    var tl = new TimelineMax({ repeat: -1 });
    tl
      .to(b, 1, {
        attr: {
          r: "+=7"
        },
        ease: Linear.easeNone
      })
      .to(b, 1, {
        attr: {
          r: "-=7"
        },
        ease: Linear.easeNone
      });
    tlSteam.add(tl, i/2);
  }
}
animateBubbles();

//анимация для текста на начальном экране
gsap.to('#nadp', {color: '#E95F32',fontSize: 48, duration:2, delay: .5, repeat:Infinity, repeatDelay: 4 }); Infinity
gsap.to('#funny', {color: '#E95F32',fontSize: 48, duration:2, delay: .5, repeat:Infinity, repeatDelay: 4, visibility: 'visible'})


var audioMy=new Audio();
const play = document.getElementById('circle-fill');
const facePage=document.getElementById('facePage');
const sandwichmenu = document.querySelector('#sandwichmenu');
var js_menu = document.querySelector('.js_menu');

//открытие меню по кнопке и делаем анимацию меню по горизантали
var menuPos={
  posX: 0,
  posY: 0,
  speedX:0,
  update: function(){
    let men=document.querySelector('.js_menu');
    men.style.left=this.posX+"px";
    men.style.top=this.posY+"px";
  }
}
menuPos.update();
requestAnimationFrame(start);
function start(){  
    menuPos.update();
    menuPos.posX+=menuPos.speedX;
  if (menuPos.posX>document.documentElement.clientWidth/2-js_menu.getBoundingClientRect().width/2){
    menuPos.posX=(js_menu.getBoundingClientRect().width/2)+window.pageXOffset;
    menuPos.speedX=0;    
  }
  if (menuPos.posY>js_menu.getBoundingClientRect().top){
    menuPos.posY=window.pageYOffset; 
  }
  requestAnimationFrame(start);
}
var showOsnovy=document.getElementById('generalContent');
var dark=document.getElementById('dark');
sandwichmenu.addEventListener('click', showMenu, false);
function showMenu(EO) {
  EO=EO||window.event;
  EO.preventDefault();  
  window.scrollTo(0, 0);
  sandwichmenu.classList.toggle('active');
  js_menu.classList.toggle('active');  
  dark.classList.toggle('overlay');
  document.body.classList.toggle('noScroll');
  audioMy.src = 'sound/click.mp3';
  audioMy.autoplay = true;  
  menuPos.speedX=5;
};
//меняем закладку в URL
const first=document.getElementById('first');
const first2=document.getElementById('first2');
const second=document.getElementById('second');
const third=document.getElementById('third');
const fourth=document.getElementById('fourth');
var rulHTTP;
window.onhashchange=switchToStateFromURLHash;
var SPAState={};
function switchToStateFromURLHash() {
var URLHash=window.location.hash;
var stateStr=URLHash.substr(1);
if ( stateStr!="" ) { // если закладка непустая, читаем из неё состояние и отображаем
  var parts=stateStr.split("_")
  SPAState={ pagename: parts[0] }; // первая часть закладки - номер страницы
}
else
SPAState={pagename:'Main'}; // иначе показываем главную страницу

switch ( SPAState.pagename ) {
  case 'Main':
    showOsnovy.style.display='block';
    first.style.display='none';
    first2.style.display='none';
    second.style.display='none';
    third.style.display='none';
    fourth.style.display='none';
    document.getElementById('showScore').style.display='block';
    rulHTTP="http://fe.it-academy.by/Sites/0038890/mainInfo.html";
    break;
  case 'QualityOrgan':    
    first.style.display='block';
    showOsnovy.style.display='none';
    first2.style.display='none';
    second.style.display='none';
    third.style.display='none';
    fourth.style.display='none';
    document.getElementById('showScore').style.display='block';
    rulHTTP="http://fe.it-academy.by/Sites/0038890/qualityOrgan.html";
    break;
  case 'Compose':
    first2.style.display='block';
    showOsnovy.style.display='none';
    first.style.display='none';
    second.style.display='none';
    third.style.display='none';
    fourth.style.display='none';
    document.getElementById('showScore').style.display='none';
    rulHTTP="http://fe.it-academy.by/Sites/0038890/quality2.html";
    break;
  case 'ReactionOrgan':
    second.style.display='block';
    showOsnovy.style.display='none';
    first.style.display='none';
    first2.style.display='none';
    third.style.display='none';
    fourth.style.display='none';
    document.getElementById('showScore').style.display='block';
    rulHTTP="http://fe.it-academy.by/Sites/0038890/receiveOrgan.html";
    break;
  case 'ChainReaction':
    third.style.display='block';
    showOsnovy.style.display='none';
    first.style.display='none';
    first2.style.display='none';
    second.style.display='none';
    fourth.style.display='none';
    document.getElementById('showScore').style.display='block';
    rulHTTP="http://fe.it-academy.by/Sites/0038890/chainReaction.html";
    break;
  case 'MemoryGame':
    fourth.style.display='block';
    showOsnovy.style.display='none';
    first.style.display='none';
    first2.style.display='none';
    second.style.display='none';
    third.style.display='none';
    document.getElementById('showScore').style.display='none';
    rulHTTP="http://fe.it-academy.by/Sites/0038890/memoryGame.html";
    break;
}
//подгружаем каждый раз новую информацию в правила игры в зависимости от закладки
$.ajax(rulHTTP,
    { type:'GET', dataType:'html', 
    cache:false, success: function(data){
      document.getElementById('insertData').innerHTML=data;
    }, 
    error:errorFunc,
    xhrFields: { onprogress: progressShow },
    complete: function(){
      $("#hidePreload").hide();
    }});
    function progressShow(){
      $("#hidePreload").show();
      document.getElementById('insertData').innerHTML='';
    }
    function errorFunc(jqXHR,statusStr,errorStr) {
      alert(statusStr+' '+errorStr);
    }
}    
 // устанавливает в закладке УРЛа новое состояние приложения
// и затем устанавливает+отображает это состояние
function switchToState(newState) {
  var stateStr=newState.pagename;        
  location.hash=stateStr;
}
function hideMenu(){
  sandwichmenu.classList.remove('active');
  js_menu.classList.remove('active');
  dark.classList.remove('overlay');
  document.body.classList.remove('noScroll');
}
function switchToMain() {
  switchToState( { pagename:'Main' } );
  hideMenu();
}    
function switchToQuality() {
  switchToState( { pagename:'QualityOrgan' } );
  hideMenu();
}    
function switchToQuality2() {
  switchToState( { pagename:'Compose' } );
  hideMenu();
}
function switchToOrgan() {
  switchToState( { pagename:'ReactionOrgan' } );
  hideMenu();
}
function switchToChainReaction() {
  switchToState( { pagename:'ChainReaction' } );
  hideMenu();
}
function switchToMemoryGame() {
  switchToState( { pagename:'MemoryGame' } );
  hideMenu();
}
    
switchToStateFromURLHash();


//подписываемся на событие mouseenter и mouseleave чтобы посмотреть правила игры
var showRule=document.getElementById('showRule');
var rule=document.getElementById('rule');
showRule.addEventListener('mouseenter', shRule, false);
function shRule(EO){
  EO=EO||window.event;
  EO.preventDefault();
  rule.style.display='block';
  dark.classList.toggle('overlay');
  document.body.classList.toggle('noScroll');
}
showRule.addEventListener('mouseleave', hideRule, false);
function hideRule(EO){
  EO=EO||window.event;
  EO.preventDefault();
  rule.style.display='none';
  dark.classList.remove('overlay');
}


//игра на память
//функция для виброотклика при неправильном перевороте карт
function vibro(){
  if ( navigator.vibrate ) {
    window.navigator.vibrate(200);
  }
}
// массив с изображениями
var fonSound=document.getElementById('audio');
const deckCards = ["flask.png",
 "flask.png", 
 "atom.png", 
 "atom.png", 
 "round_flask.png", 
 "round_flask.png", 
 "benzol.png", 
 "benzol.png", 
 "molecul.png", 
 "molecul.png", 
 "sciens.png", 
 "sciens.png", 
 "tube.png", 
 "tube.png", 
 "boom.png", 
 "boom.png",
 "teach.png", 
 "teach.png"];

const deck = document.querySelector(".deck");
const modal = document.getElementById("modal");
const reset = document.querySelector(".reset-btn");
const playAgain = document.querySelector(".play-again-btn");
const movesCount = document.querySelector(".moves-counter");
const star = document.getElementById("star-rating").querySelectorAll(".star");
const timeCounter = document.querySelector(".timer");
// массив для перевернутых карт
var opened = [];
// массив для совпавших карт
var matched = [];
// подсчет ходов(переворота карт)
var moves = 0;
// переменная для отслеживания оставшихся звезд
var starCount = 3;
// переменные для подсчета времени и остановки его
var minutes = 0;
var seconds = 0;
var time;
// отслеживание времени при клике карты
var timeStart = false;
//функция случайного выбора карты
function randomCard(array) {
  let currentIndex = array.length, temporaryValue, randomIndex;

  while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
  }
  return array;
}
//начинаем игру, перетасовываем карты и создаем картинки с новым соедржимым
function startGame() {
	var shuffledDeck = randomCard(deckCards); 
	for (let i = 0; i < shuffledDeck.length; i++) {
		var liTag = document.createElement('LI');
		liTag.classList.add('card');
		var addImage = document.createElement("IMG");
		liTag.appendChild(addImage);
		// устанавливаем src созданным изображениям
		addImage.setAttribute("src", "image/" + shuffledDeck[i] + "?raw=true");
		addImage.setAttribute("alt", "картинки на химическую тематику");
		deck.appendChild(liTag);
	}
}
startGame();
//функция для обновления таймера
function timer() {
	time = setInterval(function() {
		seconds++;
			if (seconds === 60) {
				minutes++;
				seconds = 0;
			}
		timeCounter.innerHTML = "<i class='fa fa-hourglass-start'></i>" + " Время: " + minutes + " мин " + seconds + " сек" ;
	}, 1000);
}
//останавливаем таймер, когда пользователь найдет все совпадения
function stopTime() {
	clearInterval(time);
}
//счетчик ходов
function movesCounter() {
	movesCount.innerHTML ++;
	moves ++;
}
//Обновляем рейтинг звезд в зависимости от количества дохов
function starRating() {
	if (moves === 14) {
		star[2].firstElementChild.classList.remove("fa-star");
		starCount--;
	}
	if (moves === 18) {
		star[1].firstElementChild.classList.remove("fa-star");
		starCount--;
	}
}
// функция для сравнения двух карт по src
function compareTwo() {
	if (opened.length === 2) {
  		document.body.style.pointerEvents = "none";
  }
	if (opened.length === 2 && opened[0].src === opened[1].src) {
		match();
	} else if (opened.length === 2 && opened[0].src != opened[1].src) {
		noMatch();
	}
} 
// если карты совпали оставляем их открытыми 
function match() {
	setTimeout(function() {
		opened[0].parentElement.classList.add("match");
		opened[1].parentElement.classList.add("match");
		matched.push(...opened);
		document.body.style.pointerEvents = "auto";
		// если все пары совпали вызываем функцию победы
		winGame();
		opened = [];
    audioMy.src = 'sound/card_match.mp3';
    audioMy.autoplay = true;
	}, 600);
	movesCounter();
	starRating();
}
// если карты не совпали переварачиваем их
function noMatch() {
	setTimeout(function() {
		opened[0].parentElement.classList.remove("flip");
		opened[1].parentElement.classList.remove("flip");
		document.body.style.pointerEvents = "auto";
		opened = [];
    audioMy.src = 'sound/card2.mp3';
    audioMy.autoplay = true;
    vibro();
	}, 700);
	movesCounter();
	starRating();
  
}
//функция для обновления модального окна когда игра окончена
function updateStat() {
	const stats = document.querySelector(".modal-cont");
	for (let i = 1; i <= 3; i++) {
		const statsElement = document.createElement("p");
		statsElement.classList.add("stats");
		stats.appendChild(statsElement);
	}
	let p = stats.querySelectorAll("p.stats");
		p[0].innerHTML = "Потраченное время: " + minutes + " мин и  " + seconds + " сек";
		p[1].innerHTML = "Количество перевернутых карт: " + moves;
		p[2].innerHTML = "Твой рейтинг: " + starCount + " из 3";
}
// и показываем модальное окно
function showModal() {
  if (fonSound.play()){
    fonSound.pause();
  }   
  audioMy.src = 'sound/triumph.mp3';
  audioMy.autoplay = true;  
  modal.style.display= "block";
  var line3 = document.getElementById('lineSwipe3');
  var modalClose = document.getElementById("close");
  line3.style.display='none';
	modalClose.onclick=function(){
      modal.style.display = "none";
      audioMy.src = 'sound/click.mp3';
      audioMy.autoplay = true;
    }
	
	window.onclick = function(event) {
		if (event.target == modal) {
			modal.style.display = "none";
      audioMy.src = 'sound/click.mp3';
      audioMy.autoplay = true;
		}
	};
 
}
// если игра выйграна
function winGame() {
	if (matched.length === 16) {
		stopTime();
		updateStat();
		showModal();
	}
}
//подписываемся на событие клика по карам
deck.addEventListener("click", clickCard, false); 
function clickCard(EO){
  EO = EO || window.event;
  EO.preventDefault();
  if (timeStart === false) {
    timeStart = true; 
    timer();
  }
  flipCard();
  //переворачиваем карту
  function flipCard() {
    EO.target.classList.add("flip");
    addToOpened();
    audioMy.src = 'sound/card.mp3';
    audioMy.autoplay = true;
  } 
  //добавляем перевернутые карты в массив открытых карт
  function addToOpened() {
    if (opened.length === 0 || opened.length === 1) {
      opened.push(EO.target.firstElementChild);
    }
    compareTwo();
  }
}
//подписываемся на событие щелчка по кнопке Перезапустить
reset.addEventListener('click', resetAll, false);
function resetAll() {
	stopTime();
	timeStart = false;
	seconds = 0;
	minutes = 0;
	timeCounter.innerHTML = "<i class='fa fa-hourglass-start'></i>" + " Время: 00:00";
	// Сбрасываем все звезды
	star[1].firstElementChild.classList.add("fa-star");
	star[2].firstElementChild.classList.add("fa-star");
	starCount = 3;
	moves = 0;
	movesCount.innerHTML = 0;
	matched = [];
	opened = [];
	// очищаем доску
	removeCard();
  function removeCard() {
    while (deck.hasChildNodes()) {
      deck.removeChild(deck.firstChild);
    }
  }
	// и создаем новое поле
	startGame();
  audioMy.src = 'sound/click_ps.mp3';
  audioMy.autoplay = true;
}
// подписываемся на событие после нажатия кнопки "Играть еще раз"
window.addEventListener('keydown',function(EO) {
  if (EO.keyCode===13){
    modal.style.display = "none";
	resetAll();
  audioMy.src = 'sound/click_ps.mp3';
  audioMy.autoplay = true;
  }	
});
document.getElementById('playAgain').addEventListener('click', function(EO){
  modal.style.display = "none";
	resetAll();
  audioMy.src = 'sound/click_ps.mp3';
  audioMy.autoplay = true;
}, false);

//функция для отслеживания состояния кнопок
var sostBut;
function checkButton(sostBut,a,b,c){
  if (sostBut==true){
    a.removeAttribute('disabled', true);
    b.removeAttribute('disabled', true);
    c.removeAttribute('disabled', true);
  }
  else{
    a.setAttribute('disabled', true);
    b.setAttribute('disabled', true);
    c.setAttribute('disabled', true);
  }
}
//запускаем вопросы при нажатии на кнопку старт
// качественные реакции на органические вещества
//харнилище вопросов кач реакций
var organReact=[
  'Запишите качественную реакцию на алканы (метан)',
  'Запишите качественную реакцию на алкены (этен)',
  'Запишите качественную реакцию на алкины (используйте этин и реактив Толленса - аммиачный раствор оксида серебра)',
  'Запишите качественную реакцию на альдегиды (ацетальдегид). Реакция серебряного зеркала',
  'Запишите качественную реакцию на одноатомные спирты (иодоформная проба). Используйте этанол',
  'В качественной реакции на многоатомные спирты какого цвета раствор получается? Образуется хелатный комплекс гликолята меди(II)',
  'Запишите качественную реакцию на фенол',
  'Запишите качественную реакцию на карбоновые кислоты (используйте муравьиную кислоту)',
  'Запишите качественную реакцию на карбоновые кислоты (реакция этерификации). Используйте уксусную кислоту',
  'Запишите качественную реакцию на амины (используйте анилин)',
  'Какое окрашивание приобретает раствор в реакции на обнаружение пептидной связи белков?'
];
//ставим обработник события нажатие на кнопку старт, следующий и предыдущий вопрос
var start1=document.getElementById('start1');
var windowInfo1=document.getElementById('windowMessage1');
var next1=document.getElementById('next1');
var prev1=document.getElementById('prevent1');
var reaction1=document.getElementById('react1');
var endQuality=document.getElementById('end1');
var check1=document.getElementById('check1');
var index1=1;
//добавляем отсчет времени
var min1=0;
var sec1=0;
var time1;
start1.addEventListener('click', function(){
  time1=setInterval(function (){
    sec1++
    if(sec1===60){
      min1++;
      sec1=0;
    }
    countTime1.innerHTML=min1+' мин '+sec1+' сек ';
  }, 1000);
  audioMy.src = 'sound/click.mp3';
  audioMy.autoplay = true; 
  index1=0;
  sostBut=true;
  checkButton(sostBut,next1,prev1, endQuality);
  start1.setAttribute('disabled', true);
  updateSelect1();
}, false);
next1.addEventListener('click', nextQues1, false);
function nextQues1(){
  audioMy.src = 'sound/click.mp3';
  audioMy.autoplay = true;  
  if (index1==organReact.length-1){
    next1.setAttribute('disabled', true);
  }
  else{
    index1 = (index1 + 1) % organReact.length;    
   updateSelect1(); 
  }
};
prev1.addEventListener('click', function (){
  audioMy.src = 'sound/click.mp3';
  audioMy.autoplay = true;
  if (index1==0){
    prev1.setAttribute('disabled', true);
  }
  else{
    index1 = (index1 + organReact.length - 1) % organReact.length;
  updateSelect1();
  }
}, false);

//функция для вывода текста через рандомный интервал времени
function getRandomInterval(max){
  return Math.floor(Math.random()*Math.floor(max));
}

var count1=0;//подсчет строк в массиве заданий
var out1='';
function updateSelect1(){  
  //пока не закончится вывод условия задания завершить, щелкать назад или вперед нельзя,ответить нельзя
  sostBut=false;
  checkButton(sostBut,next1,prev1, endQuality);
  check1.setAttribute('disabled', true);
  let interval1=setTimeout(function(){       
    out1+=organReact[index1][count1];
    windowInfo1.innerHTML=out1 + '|';
    count1++;
    if (count1>organReact[index1].length-1){
      //если вывод закончился- можем переключаться вперед назад или завершить испытание
      sostBut=true;
      checkButton(sostBut,next1,prev1, endQuality);
      check1.removeAttribute('disabled', true);
      count1=0;
      clearTimeout(interval1);
      windowInfo1.innerHTML=out1;
      out1='';
      return true;
    }
    updateSelect1();
  },getRandomInterval(250)); 
   
}
//ставим обработчик событий на поле для ввода уравнения
reaction1.onfocus=function(){
  reaction1.value='';  
}
var press1;//переменная для отслеживания нажата клавиша или нет
reaction1.onkeydown=function(){
  audioMy.src = 'sound/key.mp3';
  press1=true;
}
reaction1.onkeyup=function(){
  press1=false;
}
if (press1==true){
  audioMy.play();
}
else{
  audioMy.pause();
}
//проверяем ответы, качественные реакции
var answerQuality=[
  'CH4+2O2=CO2+2H20',
  '3C2H4+2KMnO4+4H2O=3C2H6O2+2KOH+2MnO2',
  'C2H4+2[Ag(NH3)2]OH=Ag2C2+4NH3+2H20',
  'C2H4O+2[Ag(NH3)2]OH=C2H4O2+2Ag+4NH3+H2O',
  'C2H6O+4I2+6NaOH=CH3I+5NaI+CHO2Na+5H2O',
  'синего',
  'C6H6O+FeCl3=[Fe(C6H6O)6]Cl3',
  'CH2O2+Cu(OH)2=Cu2O+H2O+CO2',
  'C2H4O2+C2H6O=C4H8O2+H2O',
  'C6H7N+3Br2=C6H4N(Br)3+3HBr',
  'красно-фиолетовое'
];
var getAnswer='';
var arrQualityPass=[];
var arrQualityFall=[];
var pass1=document.getElementById('pass1');
var fall1=document.getElementById('fal1');
var modalQuality=document.getElementById('endBlock1');
var passCount1=0;
var fallCount1=0;
//считаем правильные и неправильные ответы по кнопке
check1.onclick=function(){ 
  getAnswer=reaction1.value.replace(/\s/g, '');
  reaction1.value='Введите уравнение реакции';
  if (answerQuality.includes(getAnswer)){
    passCount1++;
    arrQualityPass.push(getAnswer);
  }
  else if (!(answerQuality.includes(getAnswer))&&getAnswer!==''){
    fallCount1++;
    arrQualityFall.push(getAnswer);
  }
  nextQues1();
}

var ajaxHandlerScript="https://fe.it-academy.by/AjaxStringStorage2.php";
var updatePassword;
var stringName='KHMILEUSKAYA_CHEMISTRY_FUNNY';
updatePassword=Math.random();

//завершаем испытание
var timeSpend1=document.getElementById('timeCount1');
endQuality.onclick=function(){  
  $.ajax( {
          url : ajaxHandlerScript, type : 'POST', cache : false, dataType:'json',
          data : { f : 'LOCKGET', n : stringName, p : updatePassword },
          success : lockGetReady, error : errorHandler
      }
  );
 modalQuality.style.display='block';
 pass1.innerHTML=passCount1;
 fall1.innerHTML=fallCount1;
 timeSpend1.innerHTML=min1+' мин '+sec1+' сек';
 clearInterval(time1);
 start1.removeAttribute('disabled', true);
 endQuality.setAttribute('disabled', true);
}


//получаем элементы нужные для закрытия модальных окон
var closeObj1=document.getElementById('close1');
var closeObj2=document.getElementById('close2');
var closeObj3=document.getElementById('close3');
var closeObj4=document.getElementById('close4');
var closeObj5=document.getElementById('close5');
var closeWind3=document.getElementById('endGame');
var dopInfo=document.getElementById('showInfo');
var modalReac=document.getElementById('endBlock2');
var countTime1=document.getElementById('countTime1');
var countTime2=document.getElementById('countTime2');


//реакции на получение органических соединений
var organReceiv=[
  'Составьте реакцию Вюрца для получения бутана и NaCl (используйте 2 галогеналкана)',
  'Запишите реакцию восстановления этана в присутствии катализатора Pt',
  'Запишите реакцию получения метана в лабораторных условиях',
  'Используя правило Зайцева запишите уравнение реакции получения этена',
  'Составьте реакцию Лебедева для получения бутандиена-1,3',
  'Запишите реакцию получения ацетилена (используйте карбид Ca)',
  'Составьте реакцию окислительного пиролиза метана',
  'Запишите реакцию пропускания ацетилена над активированным углем',
  'Используя правило Марковникова получите пропанол',
  'Запишите реакцию брожения глюкозы',
  'Запишите реакцию окисления этена по Вагнеру с Ag',
  'Получите фенол из хлорбензола',
  'Запишите реакцию получения альдегида из этанола',
  'Составьте реакцию получения уксусной кислоты окислением',
  'Запишите реакцию получения глюкозы в процессе фотосинтеза'
];

//ставим обработник события нажатие на кнопку старт, следующий и предыдущий вопрос
var start2=document.getElementById('start2');
var windowInfo2=document.getElementById('windowMessage2');
var next2=document.getElementById('next2');
var prev2=document.getElementById('prevent2');
var reaction2=document.getElementById('react2');
var index2=1;
//добавляем отсчет времени
var min2=0;
var sec2=0;
var time2=null;
start2.addEventListener('click',  startPoluch, false);
function startPoluch(EO){
  EO=EO||window.event;
  EO.preventDefault();
  time2=setInterval(function (){
    sec2++
    if(sec2===60){
      min2++;
      sec2=0;
    }
    countTime2.innerHTML=min2+' мин '+sec2+' сек ';
  }, 1000);
  audioMy.src = 'sound/click.mp3';
  audioMy.autoplay = true; 
  index2=0;
  sostBut=true;
  checkButton(sostBut,next2,prev2, endReaction);
  start2.setAttribute('disabled', true);
  updateSelect2();
}
next2.addEventListener('click', nextQues2, false);
function nextQues2(){
  audioMy.src = 'sound/click.mp3';
  audioMy.autoplay = true;  
  if (index2==organReceiv.length-1){
    next2.setAttribute('disabled', true);
  }
  else{
    index2 = (index2 + 1) % organReceiv.length;
    reaction2.focus();    
   updateSelect2(); 
  }
};
prev2.addEventListener('click', function (){
  audioMy.src = 'sound/click.mp3';
  audioMy.autoplay = true;
  if (index2==0){
    prev2.setAttribute('disabled', true);
  }
  else{
    index2 = (index2 + organReceiv.length - 1) % organReceiv.length;
  updateSelect2();
  }
}, false)
var count2=0;//подсчет строк в массиве заданий
var out2='';
function updateSelect2(){
  let interval2=setTimeout(function(){
    sostBut=false;
    checkButton(sostBut,next2,prev2, endReaction);
    check2.setAttribute('disabled', true);
    out2+=organReceiv[index2][count2];
    windowInfo2.innerHTML=out2 + '|';
    count2++;
    if (count2>organReceiv[index2].length-1){
      sostBut=true;
      checkButton(sostBut,next2,prev2, endReaction);
      check2.removeAttribute('disabled', true);
      count2=0;
      clearTimeout(interval2);
      windowInfo2.innerHTML=out2;
      out2='';
      return true;
    }
    updateSelect2();
  },getRandomInterval(250));  
}
//ставим обработчик событий на поле для ввода уравнения
var check2=document.getElementById('check2');
reaction2.onfocus=function(){
  reaction2.value='';  
}
var press2;//переменная для отслеживания нажата клавиша или нет
reaction2.onkeydown=function(){
  audioMy.src = 'sound/key.mp3';
  press2=true;
}
reaction2.onkeyup=function(){
  press2=false;
}
if (press2==true){
  audioMy.play();
}
else{
  audioMy.pause();
}
//проверяем ответы, получение органических соединений
var answerReaction=[
  'C2H5Cl+C2H5Cl+2Na=C4H10+2NaCl',
  'C2H4+H2=C2H6',
  'Al4C3+12H2O=4Al(OH)3+3CH4',
  'C2H5Br+KOH=C2H4+KBr+H2O',
  '2C2H5OH=C4H6+H2+2H2O',
  'CaC2+2H2O=C2H2+Ca(OH)2',
  '6CH4+O2=2C2H2+2CO+10H2O',
  '3C2H2=C6H6',
  'C3H6+H2O=C3H8O',
  'C6H12O6=2C2H6O+2CO2',
  '32H4+2KMnO4+4H2O=3C2H6O2+2KOH+2MnO2',
  'C6H5Cl+NaOH=C6H5OH+NaCl',
  'C2H6O=C2H4O+H2',
  '2C4H10+5O2=4C2H4O2+2H2O',
  '6CO2+6H2O=C6H12O6+6O2'
];
var getAnswer2='';
var pass2=document.getElementById('pass2');
var fall2=document.getElementById('fal2');
var endReaction=document.getElementById('end2');
var passCount2=0;
var fallCount2=0;
var arrPassReseive=[];
var arrFallReceive=[];
//считаем правильные и неправильные ответы по кнопке
check2.onclick=function(){ 
  getAnswer2=reaction2.value.replace(/\s/g, '');
  reaction2.value='Введите уравнение реакции';
  if (answerReaction.includes(getAnswer2)){
    passCount2++;
    arrPassReseive.push(getAnswer2);
  }
  else if (!(answerReaction.includes(getAnswer2))&&getAnswer2!==''){
    fallCount2++;
    arrFallReceive.push(getAnswer2);
  }
  nextQues2();
}
//завершаем испытание
var timeSpend2=document.getElementById('timeCount2');
endReaction.onclick=function(){
  $.ajax( {
          url : ajaxHandlerScript, type : 'POST', cache : false, dataType:'json',
          data : { f : 'LOCKGET', n : stringName, p : updatePassword },
          success : lockGetReady, error : errorHandler
      }
  );
 modalReac.style.display='block';
 pass2.innerHTML=passCount2;
 fall2.innerHTML=fallCount2;
 timeSpend2.innerHTML=min2+' мин '+sec2+' сек';
 clearInterval(time2);
 time2=null;
 endReaction.setAttribute('disabled', true);
 start2.removeAttribute('disabled', true);
}


//цепочка реакций
var task=[
  'Красный фосфор сожгли в избытке кислорода.',
  'В результате образовалось твердое при обычных условиях вещество "1" белого цвета, энергично поглощающее пары воды из воздуха.',
  'При растворении "1" в избытке воды получили раствор вещества "2", который окрашивает лакмус в красный цвет.',
  'Вещество "2" взаимодействует с металлом (порядковый номер 30) с выделением газа "4".',
  'Раствор "2" нейтрализовали гидроксидом Na - получили соль "5".',
  'К образовавшейся соли "5" добавили несколько капель раствора нитрата серебра (I). В результате получили осадок "6" желтого цвета.',
  'Найдите сумму молярных масс (г/моль) веществ "4" и "6". Ответ запишите в поле "7".'
];

var start3=document.getElementById('start3');
var windowInfo3=document.getElementById('windowMessage3');
var next3=document.getElementById('next3');
var prev3=document.getElementById('prevent3');
var endTask=document.getElementById('end3');
var index3=1;
start3.addEventListener('click', function(){
  audioMy.src = 'sound/click.mp3';
  audioMy.autoplay = true; 
  index3=0;
  sostBut=true;
  checkButton(sostBut,next3,prev3, endTask);
  start3.setAttribute('disabled', true);
  updateSelect3();
}, false);
next3.addEventListener('click', function(){
  audioMy.src = 'sound/click.mp3';
  audioMy.autoplay = true;  
  if (index3==task.length-1){
    next3.setAttribute('disabled', true);
  }
  else{
    index3 = (index3 + 1) % task.length;    
   updateSelect3(); 
  }
}, false);
prev3.addEventListener('click', function (){
  audioMy.src = 'sound/click.mp3';
  audioMy.autoplay = true;
  if (index3==0){
    prev3.setAttribute('disabled', true);
  }
  else{
    index3 = (index3 + task.length - 1) % task.length;
  updateSelect3();
  }
}, false);
var count3=0;//подсчет строк в массиве заданий
var out3='';
function updateSelect3(){
  let interval3=setTimeout(function(){
    sostBut=false;
    checkButton(sostBut,next3,prev3, endTask);
    out3+=task[index3][count3];
    windowInfo3.innerHTML=out3 + '|';
    count3++;
    if (count3>task[index3].length-1){
      sostBut=true;
      checkButton(sostBut,next3,prev3, endTask);
      count3=0;
      clearTimeout(interval3);
      windowInfo3.innerHTML=out3;
      out3='';
      return true;
    }
    updateSelect3();
  },getRandomInterval(250));  
}
//проверяем ответы и выводим модальное окно с результатами
var answerTask=[
  'P2O5',
  'H3PO4',
  'Zn',
  'H2',
  'Na3PO4',
  'Ag3PO4',
  '421'
];
var numb=['1','2','3','4','5','6','7'];
var getAnsTask=document.querySelectorAll('.task');
getAnsTask.forEach(el=>{
  el.onfocus=function(){
    el.value='';
    el.classList.remove('error');
  }
  el.onblur=function(){
    if (el.value==''){
      el.classList.add('error');
    }    
  }
});
//переменные для подсчета правильных и ошибочных ответов
var passCount3=0;
var fallCount3=0;
var arrPassChain=[];
var arrFallChain=[];
endTask.addEventListener('click', showModal3, false);
function showModal3(EO){
  $.ajax( {
          url : ajaxHandlerScript, type : 'POST', cache : false, dataType:'json',
          data : { f : 'LOCKGET', n : stringName, p : updatePassword },
          success : lockGetReady, error : errorHandler
      }
  );
  EO=EO||window.event;
  EO.preventDefault();
  endTask.setAttribute('disabled', true);
  start3.removeAttribute('disabled', true);
  getAnsTask.forEach(element=>{
    if (answerTask.includes(element.value.replace(/\s/g, ''))){
      arrPassChain.push(element.value);
      passCount3++;
    }
    else if (!(answerTask.includes(element.value.replace(/\s/g, ''))) && !(numb.includes(element.value))){
      fallCount3++;
      arrFallChain.push(element.value);
      element.classList.add('error');
    }
  });
  document.getElementById('rightEl').innerHTML=passCount3;
  if (fallCount3!==0){
    document.getElementById('fallEl').innerHTML='<i class="fa fa-times" aria-hidden="true"></i>'+' Ошибочно установленных элементов '+fallCount3;
  }
  closeWind3.style.display='block';  
}


//качественные реакции 2 вариант
var qualReact2=[
  'Составьте качественную реакцию на карбоновые кислоты',
  'Составьте качественную реакцию на фенол',
  'Составьте качественную реакцию на многоатомные спирты',
  'Составьте качественную реакцию на альдегиды (реакция серебряного зеркала). Используйте ацетальдегид',
  'Составьте качественную реакцию на одноатомные спирты',
  'Составьте качественную реакцию на алкины. Используйте реактив Толленса',
  'Составьте качественную реакцию на алканы',
  'Составьте качественную реакцию на алкены'
 ];
 
var start4=document.getElementById('start4');
var windowInfo4=document.getElementById('windowMessage4');
var next4=document.getElementById('next4');
var prev4=document.getElementById('prevent4');
var endQuality2=document.getElementById('end4');
var index4=1;
var oneSoed=document.getElementById('oneSoed1');
var twoSoed=document.getElementById('twoSoed1');
var id1='';
var id2='';
var equals=document.getElementById('equals1');
var elemNeorgan=document.querySelectorAll('.touchElemNeorg');
var elemOrgan=document.querySelectorAll('.touchElemOrgan');
var sost;
start4.addEventListener('click', function(){
  //если нажата кнопка старт можно перетаскивать элементы
  sost=true;
  checkDrag(sost);
  audioMy.src = 'sound/click.mp3';
  audioMy.autoplay = true; 
  index4=0;
  sostBut=true;
  checkButton(sostBut,next4,prev4, endQuality2);
  equals.removeAttribute('disabled', true);
  start4.setAttribute('disabled', true);
  updateSelect4();
}, false);
next4.addEventListener('click', nextQues4, false);
function nextQues4(){
  audioMy.src = 'sound/click.mp3';
  audioMy.autoplay = true;  
  if (index4==qualReact2.length-1){
    next4.setAttribute('disabled', true);
  }
  else{
    index4 = (index4 + 1) % qualReact2.length;  
   updateSelect4(); 
  }
};
prev4.addEventListener('click', function (){
  audioMy.src = 'sound/click.mp3';
  audioMy.autoplay = true;
  if (index4==0){
    prev4.setAttribute('disabled', true);
  }
  else{
    index4 = (index4 + qualReact2.length - 1) % qualReact2.length;
  updateSelect4();
  }
}, false)
var count4=0;
var out4='';
function updateSelect4(){
  let interval4=setTimeout(function(){
    sostBut=false;
    checkButton(sostBut,next4,prev4, endQuality2);
    out4+=qualReact2[index4][count4];
    windowInfo4.innerHTML=out4 + '|';
    count4++;
    if (count4>qualReact2[index4].length-1){
      sostBut=true;
      checkButton(sostBut,next4,prev4, endQuality2);
      count4=0;
      clearTimeout(interval4);
      windowInfo4.innerHTML=out4;
      out4='';
      return true;
    }
    updateSelect4();
  },getRandomInterval(250));  
}

//описываем функции для перемещения соединений
  var draggElNeorg=null;
  
function dragStartNeorgan(EO){
  EO=EO||window.event;
  draggElNeorg=EO.target;
  oneSoed.classList.toggle('blink');
}
function dragEndNeorgan(EO){
  EO=EO||window.event;
  draggElNeorg=null;
  oneSoed.classList.remove('blink');
}
function dropElNeorgan(EO){
  EO=EO||window.event;
  EO.preventDefault();
  if (draggElNeorg){
    EO.currentTarget.appendChild(draggElNeorg);
    id1=draggElNeorg.id;  
    audioMy.src = 'sound/drop.mp3';
    audioMy.autoplay = true; 
  }
}
function dragOverNeorgan(EO){
  EO=EO||window.event;
  EO.preventDefault();
}
//перемещение органических соединений
var draggElOrgan=null;
function dragStartOrgan(EO){
  EO=EO||window.event; 
  draggElOrgan=EO.target;
  twoSoed.classList.toggle('blink');
}
function dragEndOrgan(EO){
  EO=EO||window.event;
  draggElOrgan=null;
  twoSoed.classList.remove('blink');
}
function dropElOrgan(EO){
  EO=EO||window.event;
  EO.preventDefault();
  if (draggElOrgan){
    EO.currentTarget.appendChild(draggElOrgan);
    id2=draggElOrgan.id; 
    audioMy.src = 'sound/drop.mp3';
    audioMy.autoplay = true;
  }
}
function dragOverOrgan(EO){
  EO=EO||window.event;
  EO.preventDefault();
}

//проверяем правильно составили реакцию или нет
var endReaction2=document.getElementById('end4');
var modalReac2=document.getElementById('endBlock4');
var buttonInfo=document.getElementById('showMore');
var zametka=document.getElementById('windowMessage5');
var countFals=0;
var countPass=0;
equals.addEventListener('click', equalsReaction, false);
function equalsReaction(EO){
  EO=EO||window.event;
  EO.preventDefault();
  audioMy.src = 'sound/click.mp3';
  audioMy.autoplay = true;
  let proval='Что-то пошло не так';
  let choise=(id1=='oxigen' && id2=='alkan')?'Горение алканов сопровождается синим пламенем.':
  (id1=='vagner' && id2=='alken')?'В ходе реакции раствор обесцветится, выпадает бурый диоксид марганца.':
  (id1=='tollens' && id2=='alkin')?'Получившийся ацетиленид серебра (I) выпадает в осадок. Алкины, у которых тройная связь в середине (R-C-=C-R) в эту реакцию не вступают.':
  (id1=='tollens' && id2=='aldegid')?'Выделяющееся серебро покрывает колбу ровным слоем, создавая эффект зеркала.':
  (id1=='one_alcohol' && id2=='alcohol2')?'Образуется характерный желтоватый осадок йодоформа (CHI3) при действии на спирт йода и щелочи.':
  (id1=='ferum' && id2=='fenol')?'Образуется фиолетовое окрашивание раствора. Это лучший метод обнаружения фенола, т.к. реакция очень чувствительна.':
  (id1=='cuparos' && id2=='carbon_mur')?'Реакция медного зеркала. Реакция протекает при нагревании и выпадает оксид меди (I) Cu2O — осадок красного цвета.':
  (id1=='cuparos' && id2=='lot_alcohol')?'Гидроксид меди растворяется, образуется хелатный комплекс темно-синего цвета.':
  (id1=='brom' && id2=='anilin')?'Образуется белый осадок 2,4,6-триброманилин.':proval;
  zametka.innerHTML=choise;
  //ставим обработчик события по кнопке больше информации если реакция составлена правильно
  buttonInfo.addEventListener('click', showMoreInfo, false);
  function showMoreInfo(EO){
  EO=EO||window.event;
  EO.preventDefault();
  var linkInfo=(id1=='oxigen' && id2=='alkan')?'http://fe.it-academy.by/Sites/0038890/alkan.html':
  (id1=='vagner' && id2=='alken')?'http://fe.it-academy.by/Sites/0038890/alken.html':
  (id1=='tollens' && id2=='alkin')?'http://fe.it-academy.by/Sites/0038890/alkin.html':
  (id1=='tollens' && id2=='aldegid')?'http://fe.it-academy.by/Sites/0038890/aldegid.html':
  (id1=='one_alcohol' && id2=='alcohol2')?'http://fe.it-academy.by/Sites/0038890/one_alcohol.html':
  (id1=='ferum' && id2=='fenol')?'http://fe.it-academy.by/Sites/0038890/fenol.html':
  (id1=='cuparos' && id2=='carbon_mur')?'http://fe.it-academy.by/Sites/0038890/carbon_acid.html':
  (id1=='cuparos' && id2=='lot_alcohol')?'http://fe.it-academy.by/Sites/0038890/lot_alcohol.html':
  (id1=='brom' && id2=='anilin')?'http://fe.it-academy.by/Sites/0038890/anilin.html':proval;
    dopInfo.style.display='block';  
    //подгружаем доп инфо для определенного класса хим соед
    $.ajax(linkInfo,
      { type:'GET', dataType:'html', 
      cache:false, success: function(data){
        document.getElementById('innertInfo').innerHTML=data;
      }, 
      error:errorHandler,
      xhrFields: { onprogress: progress },
      complete: function(){
        $("#escapingBallG").hide();
      }});
      function progress() {
        $("#escapingBallG").show();
        document.getElementById('innertInfo').innerHTML='';
      }
    function errorHandler(jqXHR,statusStr,errorStr) {
    alert(statusStr+' '+errorStr);
   }
   
  }
  var fonFlask=document.getElementById("fonFlask");
  //если реакция составлена неправильно показываем анимацию с ядом
  if (choise==proval){
    countFals++;
    buttonInfo.style.display='none';
    document.getElementById('zaliv').style.backgroundColor='#8ffe09';
    fonFlask.style.backgroundColor='#8ffe09';
    fonFlask.animate([
      { transform: 'translate3D(0, 0, 0)' },
      { transform: 'translate3D(0, -10px, 0)' },
      { transform: 'translate3D(0, -20px, 0)' },
      { transform: 'translate3D(0, -30px, 0)' },
      { transform: 'translate3D(0, -40px, 0)' },
      { transform: 'translate3D(0, -50px, 0)' },
      { transform: 'translate3D(0, -60px, 0)' },
      { transform: 'translate3D(0, -70px, 0)' },
      { transform: 'translate3D(0, -80px, 0)' },
      { transform: 'translate3D(0, -60px, 0)' },
      { transform: 'translate3D(0, -40px, 0)' },
      { transform: 'translate3D(0, -20px, 0)' },
      { transform: 'translate3D(0, 0px, 0)' }
    ], {
      duration: 4500,
      iterations: Infinity
    });
    fonFlask.style.height='140px';
    document.querySelectorAll('.bubble').forEach(elBubl=>{
      elBubl.style.display='block';
      elBubl.style.backgroundColor='#8ffe09';
    });
    document.getElementById('scull').style.display='block';
    document.getElementById('scull').animate([
      { opacity: '0.1' },
      { opacity: '0.2' },
      { opacity: '0.4' },
      { opacity: '0.6' },
      { opacity: '0.8' },
      { opacity: '01' }
    ], {
      duration: 4500
    });
  }
  else{//если верно то хорошую анимацию
  countPass++;
  buttonInfo.style.display='block';
  document.getElementById('scull').style.display='none';
  document.getElementById('zaliv').style.backgroundColor='rgb(247, 92, 3)';
  fonFlask.style.height='80px';
  fonFlask.style.backgroundColor='rgb(247, 92, 3)';
  fonFlask.animate([
    { transform: 'translate3D(0, 0, 0)' },
    { transform: 'translate3D(0, -10px, 0)' },
    { transform: 'translate3D(0, -20px, 0)' },
    { transform: 'translate3D(0, -30px, 0)' },
    { transform: 'translate3D(0, -20px, 0)' },
    { transform: 'translate3D(0, -10px, 0)' },
    { transform: 'translate3D(0, 0px, 0)' }
  ], {
    duration: 2500,
    iterations: Infinity
  });
  document.querySelectorAll('.bubble').forEach(elBubl=>{
    elBubl.style.display='block';
    elBubl.style.backgroundColor='rgb(247, 92, 3)';
  });
  }
}
endReaction2.onclick=function(){
  modalReac2.style.display='block';
  document.getElementById('pass3').innerHTML=countPass;
  document.getElementById('fal3').innerHTML=countFals;  
  endReaction2.setAttribute('disabled', true);
  start4.removeAttribute('disabled', true);
 }


//открываем таблицу с результатами
var scoreTabl=document.getElementById('scoreTest');
var lineScore=document.getElementById('lineSwipeTest');
var closeScore=document.getElementById('closeTest');
document.getElementById('showScore').onclick=function(){
  scoreTabl.style.display='block';
  audioMy.src = 'sound/click.mp3';
  audioMy.autoplay = true;
  dark.classList.toggle('overlay');
}

//открытие таблицы результатов не только по клику, но и по комбинации клавиш  
var keyQ = false;
var keyW = false; 
  document.body.onkeyup = function () {
    keyQ=false;
    keyW=false;
  } 
  document.body.onkeydown = function (EO){
    EO=EO||window.event;
    if (EO.keyCode == 87){
      keyW = true;
    } 
     else if (EO.keyCode == 81){
      keyQ = true;
     } 
    if (keyW==true && keyQ==true){
      scoreTabl.style.display='block';
      dark.classList.add('overlay'); 
      document.body.classList.toggle('noScroll');
    } 
  }


//проверяем есть ли поддерка touch событий и обрабатываем свайп вниз сообщения модального
var line1 = document.getElementById('lineSwipe1');
var line2 = document.getElementById('lineSwipe2');
var line4 = document.getElementById('lineSwipe4');

if ( ('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch ){
  closeObj1.style.display='none';
  closeObj2.style.display='none';
  closeObj3.style.display='none';
  closeScore.style.display='none';
  var initialPoint;
  var finalPoint;
//Качественные реакции на органические вещества 1 способ
modalQuality.addEventListener('touchstart', function(EO) {
  EO=EO||window.event;
  EO.preventDefault();
  initialPoint=EO.changedTouches[0];
}, false);
modalQuality.addEventListener('touchmove', function () {
  audioMy.src = 'sound/swipe.mp3';
  audioMy.autoplay = true;
  line1.style.transition = 'opacity 1000ms ease';
  line1.style.opacity=0;
  modalQuality.style.transform = 'translate( -200px,0px )';
  modalQuality.style.transition = 'opacity 1000ms ease';
  modalQuality.style.transition = 'transform 1000ms ease';
});
modalQuality.addEventListener('touchend', function(EO) {
  EO=EO||window.event;
  EO.preventDefault();
  finalPoint=EO.changedTouches[0];
  let xAbs = Math.abs(initialPoint.pageX - finalPoint.pageX);
  let yAbs = Math.abs(initialPoint.pageY - finalPoint.pageY);
  if (xAbs > 20 || yAbs > 20) {
  if (xAbs > yAbs) {
    //свайп влево
 if (finalPoint.pageX < initialPoint.pageX){
  modalQuality.style.display = 'none';}
 } 
 }
  modalQuality.style.transform = 'none';
  line1.style.opacity = 1;
  check1.setAttribute('disabled', true);
  countTime1.innerHTML='';
  min1=0;
  sec1=0;
  windowInfo1.innerHTML='';
  passCount1=0;
  fallCount1=0;
  sostBut=false;
  checkButton(sostBut,next1,prev1, endQuality);
}, false); 
//Установить последовательность реакций 
closeWind3.addEventListener('touchstart', function(EO) {
  EO=EO||window.event;
  EO.preventDefault();
  initialPoint=EO.changedTouches[0];
}, false);
closeWind3.addEventListener('touchmove', function () {
  audioMy.src = 'sound/swipe.mp3';
  audioMy.autoplay = true;
  line4.style.transition = 'opacity 1000ms ease';
 line4.style.opacity=0;
 closeWind3.style.transform = 'translate( -200px,0px )';
 closeWind3.style.transition = 'opacity 1000ms ease';
 closeWind3.style.transition = 'transform 1000ms ease';
});
closeWind3.addEventListener('touchend', function(EO) {
  EO=EO||window.event;
  EO.preventDefault();
  finalPoint=EO.changedTouches[0];
  let xAbs = Math.abs(initialPoint.pageX - finalPoint.pageX);
  let yAbs = Math.abs(initialPoint.pageY - finalPoint.pageY);
  if (xAbs > 20 || yAbs > 20) {
  if (xAbs > yAbs) {
    //свайп влево
 if (finalPoint.pageX < initialPoint.pageX){
  closeWind3.style.display = 'none';}
 } 
 }
 closeWind3.style.transform = 'none';
 line4.style.opacity = 1;
 windowInfo3.innerHTML='';
 passCount3=0;
 fallCount3=0;
 let cou1=1;
 getAnsTask.forEach(el=>{      
       el.value=cou1++;
       el.classList.remove('error'); 
 });
 sostBut=false;
 checkButton(sostBut,next3,prev3, endTask);
}, false);

//Реакции на получение органических соединений 
modalReac.addEventListener('touchstart', function(EO) {
  EO=EO||window.event;
  EO.preventDefault();
  initialPoint=EO.changedTouches[0];
}, false);
modalReac.addEventListener('touchmove', function () {
  audioMy.src = 'sound/swipe.mp3';
  audioMy.autoplay = true;
  line2.style.transition = 'opacity 1000ms ease';
 line2.style.opacity=0;
 modalReac.style.transform = 'translate( -200px,0px )';
 modalReac.style.transition = 'opacity 1000ms ease';
 modalReac.style.transition = 'transform 1000ms ease';
});
modalReac.addEventListener('touchend', function(EO) {
  EO=EO||window.event;
  EO.preventDefault();
  finalPoint=EO.changedTouches[0];
  let xAbs = Math.abs(initialPoint.pageX - finalPoint.pageX);
  let yAbs = Math.abs(initialPoint.pageY - finalPoint.pageY);
  if (xAbs > 20 || yAbs > 20) {
  if (xAbs > yAbs) {
    //свайп влево
 if (finalPoint.pageX < initialPoint.pageX){
  modalReac.style.display = 'none';}
 } 
 }
 modalReac.style.transform = 'none';
 line2.style.opacity = 1;
 check2.setAttribute('disabled', true);
 countTime2.innerHTML='';
  min2=0;
  sec2=0;
  windowInfo2.innerHTML='';
  passCount2=0;
  fallCount2=0;
  sostBut=false;
  checkButton(sostBut,next2,prev2, endReaction);
}, false);
//таблица с результатами прохождения предыдущего
scoreTabl.addEventListener('touchstart', function(EO) {
  EO=EO||window.event;
  EO.preventDefault();
  initialPoint=EO.changedTouches[0];
}, false);
scoreTabl.addEventListener('touchmove', function () {
  audioMy.src = 'sound/swipe.mp3';
  audioMy.autoplay = true;
  lineScore.style.transition = 'opacity 1000ms ease';
 lineScore.style.opacity=0;
 scoreTabl.style.transform = 'translate( -200px,0px )';
 scoreTabl.style.transition = 'opacity 1000ms ease';
 scoreTabl.style.transition = 'transform 1000ms ease';
});
scoreTabl.addEventListener('touchend', function(EO) {
  EO=EO||window.event;
  EO.preventDefault();
  finalPoint=EO.changedTouches[0];
  let xAbs = Math.abs(initialPoint.pageX - finalPoint.pageX);
  let yAbs = Math.abs(initialPoint.pageY - finalPoint.pageY);
  if (xAbs > 20 || yAbs > 20) {
  if (xAbs > yAbs) {
    //свайп влево
 if (finalPoint.pageX < initialPoint.pageX){
  scoreTabl.style.display = 'none';
  dark.classList.remove('overlay');}
 } 
 }
 scoreTabl.style.transform = 'none';
 lineScore.style.opacity = 1;
}, false);
}
else{//если нет то закрываем модальное по кнопке
  line1.style.display='none';
  line2.style.display='none';
  line4.style.display='none';
  lineScore.style.display='none';
  //закрываем результаты предыдущего испытания
  closeScore.onclick=function(){
    audioMy.src = 'sound/click.mp3';
   audioMy.autoplay = true;
   scoreTabl.style.display = "none";
   dark.classList.remove('overlay');
   document.body.classList.remove('noScroll');
  }
  //Качественные реакции на органические вещества  1 способ
  closeObj1.onclick=function(){
   check1.setAttribute('disabled', true);
   audioMy.src = 'sound/click.mp3';
   audioMy.autoplay = true;
   modalQuality.style.display = "none";
   countTime1.innerHTML='';
   min1=0;
   sec1=0;
   windowInfo1.innerHTML='';
   passCount1=0;
   fallCount1=0;
   sostBut=false;
   checkButton(sostBut,next1,prev1, endQuality);
  }
  //Реакции на получение органических соединений 
closeObj2.onclick=function(){
  check2.setAttribute('disabled', true);
  audioMy.src = 'sound/click.mp3';
  audioMy.autoplay = true;
  modalReac.style.display = "none";
  countTime2.innerHTML='';
  min2=0;
  sec2=0;
  windowInfo2.innerHTML='';
  passCount2=0;
  fallCount2=0;
  sostBut=false;
  checkButton(sostBut,next2,prev2, endReaction);
}
//Установить последовательность реакций
closeObj3.onclick=function(){
  audioMy.src = 'sound/click.mp3';
  audioMy.autoplay = true;
  closeWind3.style.display = "none";
  windowInfo3.innerHTML='';
  passCount3=0;
  fallCount3=0;
  let cou=1;
  getAnsTask.forEach(el=>{      
        el.value=cou++;
        el.classList.remove('error'); 
  });
  sostBut=false;
  checkButton(sostBut,next3,prev3, endTask);
}
}
//Качественные реакции на органические вещества 2 способ
closeObj4.onclick=function(){
  audioMy.src = 'sound/click.mp3';
  audioMy.autoplay = true;
  modalReac2.style.display = "none";
  windowInfo4.innerHTML='';
  equals.setAttribute('disabled', true);
  zametka.innerHTML='';
  document.getElementById('scull').style.display='none';
  document.querySelectorAll('.bubble').forEach(elBubl=>{
    elBubl.style.display='none';
  });  
  document.getElementById('fonFlask').style.backgroundColor='transparent';
  document.getElementById('zaliv').style.backgroundColor='transparent';
  countPass=0;
  countFals=0;
  sost=false;
  checkDrag(sost);
  sostBut=false;
  checkButton(sostBut,next4,prev4, endQuality2);
  buttonInfo.style.display='none';
  id1='';
  id2='';
}
//больше информации во 2 способе кач реакц
closeObj5.onclick=function(){
  audioMy.src = 'sound/click.mp3';
  audioMy.autoplay = true;
  dopInfo.style.display = "none";
}


 //если пользователь использует телефон или планшет то не сможет пройти испытание с составлением реакций  
if (navigator.userAgent.indexOf( "Mobile" ) !== -1 ||
   navigator.userAgent.indexOf( "iPhone" ) !== -1 ||
   navigator.userAgent.indexOf( "Android" ) !== -1 ||
   navigator.userAgent.indexOf( "Windows Phone" ) !== -1){
  document.getElementById('quality2').style.display='none'; 
} else {
  document.getElementById('quality2').style.display='block';
}

//предупреждаем о потере данных при закрытии приложения, если были изменения в input
var textChanged=false;
reaction1.onchange=changedData;
reaction1.onkeypress=changedData;
reaction1.onpaste=changedData;
reaction1.oncut=changedData;
reaction2.onchange=changedData;
reaction2.onkeypress=changedData;
reaction2.onpaste=changedData;
reaction2.oncut=changedData;
var taskElements = document.querySelectorAll('.task');
taskElements.forEach(elTask=>{
  elTask.onchange=changedData;
  elTask.onkeypress=changedData;
  elTask.onpaste=changedData;
  elTask.oncut=changedData;
})
function changedData(EO) {
  EO=EO||window.event;
  textChanged=true; 
}
window.onbeforeunload=befUnload;
function befUnload(EO) {
  EO=EO||window.event;
  if ( textChanged ){
   var dialogText = 'Ваши внесенные изменения не сохранятся если Вы покините страницу';
  EO.returnValue = dialogText;
  return dialogText; 
  }  
};

//провека состояния перетаскивания элементов
function checkDrag(sost){
  if (sost==true){
    for (let x=0; x<elemNeorgan.length; x++){
      elemNeorgan[x].ondragstart=dragStartNeorgan;
      elemNeorgan[x].ondragend=dragEndNeorgan;
    }
    document.getElementById('neorganSoed1').ondrop=dropElNeorgan;
    document.getElementById('neorganSoed1').ondragover=dragOverNeorgan;
    oneSoed.ondrop=dropElNeorgan;
    oneSoed.ondragover=dragOverNeorgan;
    for (let a=0; a<elemOrgan.length; a++){
      elemOrgan[a].ondragstart=dragStartOrgan;
      elemOrgan[a].ondragend=dragEndOrgan;
    }
    document.getElementById('organSoed1').ondrop=dropElOrgan;
    document.getElementById('organSoed1').ondragover=dragOverOrgan;
    twoSoed.ondrop=dropElOrgan;
    twoSoed.ondragover=dragOverOrgan;
  }
}


//сохраним успехи прохождения испытаний в отдельном окне
function lockGetReady(callresult) {
  if ( callresult.error!=undefined )
      alert(callresult.error);
  else {
      var info={
          passQuality : arrQualityPass.length || '-',
          fallQuality : arrQualityFall.length || '-',
          passRec: arrPassReseive.length || '-',
          fallRec: arrFallReceive.length || '-',
          passCh: arrPassChain.length || '-',
          fallCh: arrFallChain.length || '-'
      };
      $.ajax( {
              url : ajaxHandlerScript, type : 'POST', cache : false, dataType:'json',
              data : { f : 'UPDATE', n : stringName, v : JSON.stringify(info), p : updatePassword },
              success : updateReady, error : errorHandler
          }
      );
  }
}
function updateReady(callresult) {
  if ( callresult.error!=undefined )
      alert(callresult.error);
}
function restoreInfo() {
  $.ajax(
      {
          url : ajaxHandlerScript, type : 'POST', cache : false, dataType:'json',
          data : { f : 'READ', n : stringName },
          success : readReady, error : errorHandler
      }
  );
}
function readReady(callresult) {
  if ( callresult.error!=undefined )
      alert(callresult.error);
  else if ( callresult.result!="" ) {
      var info=JSON.parse(callresult.result);
      document.getElementById('passQual').innerHTML=info.passQuality;
      document.getElementById('fallQual').innerHTML=info.fallQuality;
      document.getElementById('passReceive').innerHTML=info.passRec;
      document.getElementById('fallReceive').innerHTML=info.fallRec;
      document.getElementById('passChain').innerHTML=info.passCh;
      document.getElementById('fallChain').innerHTML=info.fallCh;
  }
}

function errorHandler(jqXHR,statusStr,errorStr) {
  alert(statusStr+' '+errorStr);
}
restoreInfo();