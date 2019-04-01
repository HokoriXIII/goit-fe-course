/*
  Создайте скрипт секундомера.  
  По ссылке можно посмотреть пример выбрав Stopwatch http://www.online-stopwatch.com/full-screen-stopwatch/
  
  Изначально в HTML есть разметка:
  
  <div class="stopwatch">
    <p class="time js-time">00:00.0</p>
    <button class="btn js-start">Start</button>
    <button class="btn js-take-lap">Lap</button>
    <button class="btn js-reset">Reset</button>
  </div>
  <ul class="laps js-laps"></ul>
  
  Добавьте следующий функционал:
  
  - При нажатии на кнопку button.js-start, запускается таймер, который считает время 
    со старта и до текущего момента времени, обновляя содержимое элемента p.js-time 
    новым значение времени в формате xx:xx.x (минуты:секунды.сотни_миллисекунд).
       
    🔔 Подсказка: так как необходимо отображать только сотни миллисекунд, интервал
                  достаточно повторять не чаще чем 1 раз в 100 мс.
    
  - Когда секундомер запущен, текст кнопки button.js-start меняется на 'Pause', 
    а функционал при клике превращается в оставновку секундомера без сброса 
    значений времени.
    
    🔔 Подсказка: вам понадобится буль который описывает состояние таймера активен/неактивен.
  
  - Если секундомер находится в состоянии паузы, текст на кнопке button.js-start
    меняется на 'Continue'. При следующем клике в нее, продолжается отсчет времени, 
    а текст меняется на 'Pause'. То есть если во время нажатия 'Pause' прошло 6 секунд 
    со старта, при нажатии 'Continue' 10 секунд спустя, секундомер продолжит отсчет времени 
    с 6 секунд, а не с 16. 
    
    🔔 Подсказка: сохраните время секундомера на момент паузы и используйте его 
                  при рассчете текущего времени после возобновления таймера отнимая
                  это значение от времени запуска таймера.
    
  - Если секундомер находится в активном состоянии или в состоянии паузы, кнопка 
    button.js-reset должна быть активна (на нее можно кликнуть), в противном случае
    disabled. Функционал при клике - остановка таймера и сброс всех полей в исходное состояние.
    
  - Функционал кнопки button.js-take-lap при клике - сохранение текущего времени секундомера 
    в массив и добавление в ul.js-laps нового li с сохраненным временем в формате xx:xx.x
*/

/*
  ⚠️ ЗАДАНИЕ ПОВЫШЕННОЙ СЛОЖНОСТИ - ВЫПОЛНЯТЬ ПО ЖЕЛАНИЮ
  
  Выполните домашнее задание используя класс с полями и методами.
  
  На вход класс Stopwatch принимает только ссылку на DOM-узел в котором будет 
  динамически создана вся разметка для секундомера.
  
  Должна быть возможность создать сколько угодно экземпляров секундоментов 
  на странице и все они будут работать независимо.
  
  К примеру:
  
  new Stopwatch(parentA);
  new Stopwatch(parentB);
  new Stopwatch(parentC);
  
  Где parent* это существующий DOM-узел. 
*/

class Stopwatch {
  constructor(value) {
    this.parrentNode = value;
    this.minutes = "00";
    this.seconds = "00";
    this.milisec = 0;
    this.delta = 0;
    this.start = 0;
    this.timerActive = false;
    this.lapArray = [];
    this.timerInterval;
    this.timer;
    this.buttonStart;
    this.buttonLap;
    this.buttonReset;
    this.lap;
  }

  createStopwatch() {
    this.buttonStart = document.createElement("button");
    this.buttonStart.classList.add("btn");
    this.buttonStart.innerHTML = "Start";

    this.buttonLap = document.createElement("button");
    this.buttonLap.classList.add("btn");
    this.buttonLap.setAttribute("disabled", true);
    this.buttonLap.innerHTML = "Lap";

    this.buttonReset = document.createElement("button");
    this.buttonReset.classList.add("btn");
    this.buttonReset.setAttribute("disabled", true);
    this.buttonReset.innerHTML = "Reset";

    this.timer = document.createElement("div");
    this.timer.classList.add("timer");
    this.timer.innerHTML = "00:00.0";

    this.lap = document.createElement("ul");
    this.lap.classList.add("laps");

    this.stopwatch = document.createElement("div");
    this.stopwatch.classList.add("stopwatch");

    this.stopwatch.appendChild(this.timer);
    this.stopwatch.appendChild(this.buttonStart);
    this.stopwatch.appendChild(this.buttonLap);
    this.stopwatch.appendChild(this.buttonReset);
    this.stopwatch.appendChild(this.lap);

    const stopwatchList = document.querySelector(".stopwatch-list");

    if (this.parrentNode === undefined) {
      stopwatchList.appendChild(this.stopwatch);
    } else {
      this.parrentNode.appendChild(this.stopwatch);
    }
  }

  createLapItems() {
    const li = document.createElement("li");
    li.innerHTML = this.minutes + ":" + this.seconds + ":" + this.milisec;

    return li;
  }

  saveTimer() {
    const li = this.createLapItems();
    this.lapArray.push(li);
    this.lapArray.forEach(element => {
      this.lap.appendChild(element);
    });
  }

  startTimer() {
    this.buttonReset.removeAttribute("disabled");
    this.buttonLap.removeAttribute("disabled");

    if (!this.timerActive) {
      this.start = Date.now() - this.delta;

      this.timerInterval = setInterval(this.createTimer.bind(this), 100);
      this.timerActive = !this.timerActive;
      this.buttonStart.innerHTML = "Pause";
    } else {
      clearInterval(this.timerInterval);
      this.timerActive = !this.timerActive;
      this.buttonStart.innerHTML = "Continue";
    }
  }

  resetTimer() {
    clearInterval(this.timerInterval);
    this.timer.innerHTML = "00:00.0";
    this.buttonStart.innerHTML = "Start";
    this.timerActive = false;
    this.minutes = "00";
    this.seconds = "00";
    this.milisec = 0;
    this.delta = 0;
    this.lap.innerHTML = "";
    this.lapArray = [];
    this.buttonReset.setAttribute("disabled", true);
    this.buttonLap.setAttribute("disabled", true);
  }

  createTimer() {
    this.delta = new Date(Date.now() - this.start);
    this.milisec = Math.floor(this.delta.getMilliseconds() / 100);
    this.seconds = this.delta.getSeconds();
    this.minutes = this.delta.getMinutes();

    if (this.seconds < 10) this.seconds = "0" + this.seconds;
    if (this.minutes < 10) this.minutes = "0" + this.minutes;

    this.timer.innerHTML =
      this.minutes + ":" + this.seconds + "." + this.milisec;
  }

  init() {
    this.createStopwatch();

    this.buttonStart.addEventListener("click", e => this.startTimer(e));
    this.buttonLap.addEventListener("click", e => this.saveTimer(e));
    this.buttonReset.addEventListener("click", e => this.resetTimer(e));
  }
}

const watch = new Stopwatch();
watch.init();
const parentA = document.querySelector(".stopwatch-list");
const watchA = new Stopwatch(parentA);
watchA.init();
const parentB = document.querySelector(".stopwatch-B");
const watchB = new Stopwatch(parentB);
watchB.init();
const parentC = document.querySelector(".stopwatch-C");
const watchC = new Stopwatch(parentC);
watchC.init();
