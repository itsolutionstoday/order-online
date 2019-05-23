function createnewCssElem(lnk){
	var head = document.getElementsByTagName('HEAD')[0];  
	var link = document.createElement('link'); 
	link.rel = 'stylesheet';  
	link.type = 'text/css'; 
	link.href = lnk;  
	head.appendChild(link);
}
$(document).mouseup(function(e) {
    var container = $("#calendar-container-blanc .float-container");
    if (!container.is(e.target) && container.has(e.target).length === 0) 
    {
      if (container.is(':visible')) {
        container.hide();
        $('#calendar-container-blanc .float').toggle();
      }
    }
});

function CreateCalendarApp(lnk){ 
	createnewCssElem(lnk);
	$('#calendar-container-blanc').html(buildCalendarForm());
	var calendar = new CalendarApp();

  $('#calendar-container-blanc .float').click(function (){
    $('#calendar-container-blanc .float-container').toggle();
    $('#calendar-container-blanc .float').toggle();
  })

  $('body').css('max-width', '100%').css('overflow', 'hidden');
  setTimeout(function(){
    TweenMax.to("#calendar-container-blanc .float", 0.4, {rotation: 360});
    $('#calendar-container-blanc .float').css('opacity', '1');
  }, 200);

  BoxActiveLaunch();
};

function buildCalendarForm(){
  let bookOnline_word = 'Онлайн запись';
  let timeAndDate_word = 'Просто выберите дату и время';
  let headers = ['Пн','Вт','Ср','Чт','Пт','Сб','Вс'];

  let floating = buildFloatingButton(bookOnline_word, timeAndDate_word);
  let day = buildDayView();
  let month = buildCalendarView(headers);
  let footer = '<div class="footer"><span><span id="footer-date" class="footer__link"></span></span></div>';

  return floating + '<div class="float-container"><div class="calendar" id="calendar-app">' + day + month + footer + '</div></div>'
}

function buildCalendarView(headers){
  let m = '';
  let heads = '';
  let dates = '<div class="calendar--view" id="dates"></div>';
  
  m = m+'<span class="cview__month-last" id="calendar-month-last"></span>';
  m = m+'<span class="cview__month-current" id="calendar-month"></span>';
  m = m+'<span class="cview__month-next" id="calendar-month-next"></span>';

  let months = '<div class="cview__month">'+m+'</div>';

  $.each(headers, function (index, value) {
    heads = heads + '<div class="cview__header">'+value+'</div>'
  });

  return '<div class="calendar--view" id="calendar-view">'+months+heads+dates+'</div>';
}

function buildDayView(){
  return '<div class="calendar--day-view" id="day-view"> <span class="day-view-exit" id="day-view-exit">&times;</span> <span class="day-view-date" id="day-view-date"></span> <div class="day-view-content"> <div class="day-highlight"> <span class="day-events" id="day-events">Нет записей на</span>. &nbsp; <span tabindex="0" onkeyup="if(event.keyCode !=13) return; this.click();" class="day-events-link" id="add-event" data-date> Записаться? </span> </div><div class="day-add-event" id="add-day-event-box" data-active="false"> <div class="row"> <label class="add-event-label"> Ваше имя <input type="text" class="add-event-edit add-event-edit--long" placeholder="Ваше имя" id="input-add-event-name"> </label> </div><div class="row"> <label class="add-event-label"> Ваш телефон <input type="text" class="add-event-edit add-event-edit--long" placeholder="Ваш телефон" id="input-add-event-phone"> </label> </div><div class="row"> <div class="qtr"> <label class="add-event-label"> Start Time <input type="text" class="add-event-edit" placeholder="8:15" id="input-add-event-start-time" data-options="1,2,3,4,5,6,7,8,9,10,11,12" data-format="datetime"> <input type="text" class="add-event-edit" placeholder="am" id="input-add-event-start-ampm" data-options="a,p,am,pm"> </label> </div><div class="qtr"> <label class="add-event-label"> End Time <input type="text" class="add-event-edit" placeholder="9" id="input-add-event-end-time" data-options="1,2,3,4,5,6,7,8,9,10,11,12" data-format="datetime"> <input type="text" class="add-event-edit" placeholder="am" id="input-add-event-end-ampm" data-options="a,p,am,pm"> </label> </div><div class="half"> <a onkeyup="if(event.keyCode !=13) return; this.click();" tabindex="0" id="add-event-save" class="event-btn--save event-btn">save</a> <a tabindex="0" id="add-event-cancel" class="event-btn--cancel event-btn">cancel</a> </div></div></div><div id="day-events-list" class="day-events-list"></div><div class="day-inspiration-quote" id="inspirational-quote"></div></div></div>';
}

function buildFloatingButton(bookOnline_word, timeAndDate_word){
  let floating = '';
  floating = floating + '<a href="#" class="float" onclick="checkBoxIsActive()"><img src="calendar.svg"></a>';
  floating = floating + '<div class="online-booking">';
  floating = floating + '<div class="online-booking-inner-text">';
  floating = floating + '<div class="online-booking-inner-title">'+bookOnline_word+'</div>';
  floating = floating + '<div class="choose-date-time">'+timeAndDate_word+'</div>';
  floating = floating + '</div>';
  floating = floating + '</div>';

  return floating;
}

function BoxActiveLaunch(){
    setTimeout(function(){
      $("#calendar-container-blanc .online-booking").css('opacity', '1');
      setTimeout(function(){
        $("#calendar-container-blanc .online-booking").css('opacity', '0');
      }, 15000);
    }, 2000);
}

function checkBoxIsActive(){
  let box = $("#calendar-container-blanc .online-booking");
  if (box.is(":visible")) {
    $("#calendar-container-blanc .online-booking").fadeOut();
  }
}

function CalendarApp(date) {
  
  if (!(date instanceof Date)) {
    date = new Date();
  }
  
  this.days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
  this.months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
  this.monthsChange = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Авгуса', 'Сентября', 'Октября', 'Ноября', 'Декабря'];
  this.quotes = [''];

  this.aptDates = [new Date(2019, 4, 30, 21).toString()];

  this.apts = [
    {
      name: 'Finish this web app',
      endTime: new Date(2019, 4, 30, 22),
      startTime: new Date(2019, 4, 30, 21),
      day: new Date(2019, 4, 30).toString()
    },
  ];

  this.eles = {};

  this.calDaySelected = null;
  
  this.calendar = document.getElementById("calendar-app");
  this.calendarView = document.getElementById("dates");
  
  this.calendarMonthDiv = document.getElementById("calendar-month");
  this.calendarMonthLastDiv = document.getElementById("calendar-month-last");
  this.calendarMonthNextDiv = document.getElementById("calendar-month-next");
  
  this.dayInspirationalQuote = document.getElementById("inspirational-quote");
   
  this.todayIsSpan = document.getElementById("footer-date");
  // this.eventsCountSpan = document.getElementById("footer-events");
  this.dayViewEle = document.getElementById("day-view");
  this.dayViewExitEle = document.getElementById("day-view-exit");
  this.dayViewDateEle = document.getElementById("day-view-date");
  this.addDayEventEle = document.getElementById("add-event");
  this.dayEventsEle = document.getElementById("day-events");
  
  this.dayEventAddForm = {
    cancelBtn: document.getElementById("add-event-cancel"),
    addBtn: document.getElementById("add-event-save"),
    nameEvent:  document.getElementById("input-add-event-name"),
    startTime:  document.getElementById("input-add-event-start-time"),
    endTime:  document.getElementById("input-add-event-end-time"),
    startAMPM:  document.getElementById("input-add-event-start-ampm"),
    endAMPM:  document.getElementById("input-add-event-end-ampm")
  };

  this.dayEventsList = document.getElementById("day-events-list");
  this.dayEventBoxEle = document.getElementById("add-day-event-box");

  this.showView(date);
  this.addEventListeners();
  this.todayIsSpan.textContent = "Запись на сегодня " + this.months[date.getMonth()] + " " + date.getDate();  
}

CalendarApp.prototype.addEventListeners = function(){
  
  this.calendar.addEventListener("click", this.mainCalendarClickClose.bind(this));
  this.todayIsSpan.addEventListener("click", this.showView.bind(this));
  this.calendarMonthLastDiv.addEventListener("click", this.showNewMonth.bind(this));
  this.calendarMonthNextDiv.addEventListener("click", this.showNewMonth.bind(this));
  this.dayViewExitEle.addEventListener("click", this.closeDayWindow.bind(this));
  this.dayViewDateEle.addEventListener("click", this.showNewMonth.bind(this));
  this.addDayEventEle.addEventListener("click", this.addNewEventBox.bind(this));
  this.dayEventAddForm.cancelBtn.addEventListener("click", this.closeNewEventBox.bind(this));
  this.dayEventAddForm.cancelBtn.addEventListener("keyup", this.closeNewEventBox.bind(this));
  
  this.dayEventAddForm.startTime.addEventListener("keyup",this.inputChangeLimiter.bind(this));
  this.dayEventAddForm.startAMPM.addEventListener("keyup",this.inputChangeLimiter.bind(this));
  this.dayEventAddForm.endTime.addEventListener("keyup",this.inputChangeLimiter.bind(this));
  this.dayEventAddForm.endAMPM.addEventListener("keyup",this.inputChangeLimiter.bind(this));
  this.dayEventAddForm.addBtn.addEventListener("click",this.saveAddNewEvent.bind(this));

};

CalendarApp.prototype.showView = function(date){

  if ( !date || (!(date instanceof Date)) ) date = new Date();

  let now = new Date(date); //current date
  let y = now.getFullYear(); //current year
  let m = now.getMonth(); //current month
  var today = new Date(); // current day
  
  var lastDayOfM = new Date(y, m + 1, 0).getDate();
  var startingD = new Date(y, m, 0).getDay();

  var lastM = new Date(y, now.getMonth()-1, 1); //switch between months -1
  var nextM = new Date(y, now.getMonth()+1, 1); //switch between months +1
 
  this.calendarMonthDiv.classList.remove("cview__month-activate");
  this.calendarMonthDiv.classList.add("cview__month-reset");
  
  while(this.calendarView.firstChild) {
    this.calendarView.removeChild(this.calendarView.firstChild);
  }
  
  // build up spacers
  for ( var x = 0; x < startingD; x++ ) {
    var spacer = document.createElement("div");
    spacer.className = "cview--spacer";
    this.calendarView.appendChild(spacer);
  }
  
  for ( var z = 1; z <= lastDayOfM; z++ ) {
    
    // y - current year, m - current month, day - z+1
    var _date = new Date(y, m ,z);

    var day = document.createElement("div");
    day.className = "cview--date";
    day.textContent = z;
    day.setAttribute("data-date", _date);

    //open modal and show day
    day.onclick = this.showDay.bind(this);

    // check if todays date
    if ( z == today.getDate() && y == today.getFullYear() && m == today.getMonth() ) {
      day.classList.add("today");
    }

    // check if has events to show
    if ( this.aptDates.indexOf(_date.toString()) !== -1 ) {
      day.classList.add("has-events");
    }

    //append days to caqlendar
    this.calendarView.appendChild(day); 
  }
  
  var _that = this;
  setTimeout(function(){
    _that.calendarMonthDiv.classList.add("cview__month-activate");
  }, 50);
  
  this.calendarMonthDiv.textContent = this.months[now.getMonth()] + " " + now.getFullYear();
  this.calendarMonthDiv.setAttribute("data-date", now);

  // + this.months[lastM.getMonth()]
  this.calendarMonthLastDiv.textContent = "←"; 
  this.calendarMonthLastDiv.setAttribute("data-date", lastM);
  
  // this.months[nextM.getMonth()] + 
  this.calendarMonthNextDiv.textContent = "→"; 
  this.calendarMonthNextDiv.setAttribute("data-date", nextM);
}

CalendarApp.prototype.showDay = function(e, dayEle) {
  e.stopPropagation();
  if ( !dayEle ) {
    dayEle = e.currentTarget;
  }
  var dayDate = new Date(dayEle.getAttribute('data-date'));
  this.calDaySelected = dayEle;
  this.openDayWindow(dayDate);
};

CalendarApp.prototype.openDayWindow = function(date){
  var now = new Date();
  var day = new Date(date);
  this.dayViewDateEle.textContent = this.days[day.getDay()] + ", " + day.getDate() + " " + this.monthsChange[day.getMonth()];
  this.dayViewDateEle.setAttribute('data-date', day);
  this.dayViewEle.classList.add("calendar--day-view-active");
  
  var _dayTopbarText = '';
  if ( day < new Date(now.getFullYear(), now.getMonth(), now.getDate())) {
    _dayTopbarText = "had ";
    this.addDayEventEle.style.display = "none";
  } else {
     _dayTopbarText = " ";
     this.addDayEventEle.style.display = "inline";
  }
  this.addDayEventEle.setAttribute("data-date", day);
  var eventsToday = this.showEventsByDay(day);

  if ( !eventsToday ) {
    _dayTopbarText += "Нет записей ";
    var _rand = Math.round(Math.random() * ((this.quotes.length - 1 ) - 0) + 0);
    this.dayInspirationalQuote.textContent = this.quotes[_rand];
  } else {
    _dayTopbarText += eventsToday.length + " ";
    this.dayInspirationalQuote.textContent = null;
  }
  //this.dayEventsList.innerHTML = this.showEventsCreateHTMLView(eventsToday);
  while(this.dayEventsList.firstChild) {
    this.dayEventsList.removeChild(this.dayEventsList.firstChild);
  }
  
  this.dayEventsList.appendChild(this.showEventsCreateElesView(eventsToday));
  this.dayEventsEle.textContent = _dayTopbarText + "на " + day.getDate()  + " " + this.monthsChange[day.getMonth()];
  
};

CalendarApp.prototype.showEventsCreateElesView = function(events) {
  var ul = document.createElement("ul");
  ul.className = 'day-event-list-ul';
  events = this.sortEventsByTime(events);
  var _this = this;

  events.forEach(function(event){
    var _start = new Date(event.startTime);
    var _end = new Date(event.endTime);
    var idx = event.index;
    var li = document.createElement("li");
    li.className = "event-dates";
    var html = "<span class='start-time'>" + _start.toLocaleTimeString(navigator.language,{hour: '2-digit', minute:'2-digit'}) + "</span> <small>through</small> ";
    html += "<span class='end-time'>" + _end.toLocaleTimeString(navigator.language,{hour: '2-digit', minute:'2-digit'}) + ( (_end.getDate() != _start.getDate()) ? ' <small>on ' + _end.toLocaleDateString() + "</small>" : '') +"</span>";
    html += "<span class='event-name'>" + event.name + "</span>";
    var div = document.createElement("div");
    div.className = "event-dates";
    div.innerHTML = html;
    li.appendChild(div);
    ul.appendChild(li);
  });

  return ul;
};

CalendarApp.prototype.sortEventsByTime = function(events) {
  if (!events) return [];
  return events.sort(function compare(a, b) {
    if (new Date(a.startTime) < new Date(b.startTime)) {
      return -1;
    }
    if (new Date(a.startTime) > new Date(b.startTime)) {
      return 1;
    }
    return 0;
  });
};

CalendarApp.prototype.showEventsByDay = function(day) {
  var _events = [];
  this.apts.forEach(function(apt, idx){
    if ( day.toString() == apt.day.toString() ) {
      apt.index = idx;
      _events.push(apt);
    }
  });
  return (_events.length) ? _events : false;
};

CalendarApp.prototype.closeDayWindow = function(){
  this.dayViewEle.classList.remove("calendar--day-view-active");
  this.closeNewEventBox();
};

CalendarApp.prototype.mainCalendarClickClose = function(e){
  if ( e.currentTarget != e.target ) {
    return;
  }
  this.dayViewEle.classList.remove("calendar--day-view-active");
  this.closeNewEventBox();
};

CalendarApp.prototype.addNewEventBox = function(e){
  var target = e.currentTarget;
  this.dayEventBoxEle.setAttribute("data-active", "true"); 
  this.dayEventBoxEle.setAttribute("data-date", target.getAttribute("data-date"));
  
};

CalendarApp.prototype.closeNewEventBox = function(e){
  if (e && e.keyCode && e.keyCode != 13) return false;
  this.dayEventBoxEle.setAttribute("data-active", "false");
  this.resetAddEventBox();
};

CalendarApp.prototype.saveAddNewEvent = function() {
  var saveErrors = this.validateAddEventInput();
  if ( !saveErrors ) {
    this.addEvent();
  }
};

CalendarApp.prototype.addEvent = function() {
  var name = this.dayEventAddForm.nameEvent.value.trim();
  var dayOfDate = this.dayEventBoxEle.getAttribute("data-date");
  var dateObjectDay =  new Date(dayOfDate);
  var cleanDates = this.cleanEventTimeStampDates();
  
  this.apts.push({
    name: name,
    day: dateObjectDay,
    startTime: cleanDates[0],
    endTime: cleanDates[1]
  });
  this.closeNewEventBox();
  this.openDayWindow(dayOfDate);
  this.calDaySelected.classList.add("has-events");

  // add to dates
  if ( this.aptDates.indexOf(dateObjectDay.toString()) === -1 ) {
    this.aptDates.push(dateObjectDay.toString());
  }

  console.log(name);

};

CalendarApp.prototype.convertTo23HourTime = function(stringOfTime, AMPM) {
  // convert to 0 - 23 hour time
  var mins = stringOfTime.split(":");
  var hours = stringOfTime.trim();
  if ( mins[1] && mins[1].trim() ) {
    hours = parseInt(mins[0].trim());
    mins = parseInt(mins[1].trim());
  } else {
    hours = parseInt(hours);
    mins = 0;
  }
  hours = ( AMPM == 'am' ) ? ( (hours == 12) ? 0 : hours ) : (hours <= 11) ? parseInt(hours) + 12 : hours;
  return [hours, mins];
};

CalendarApp.prototype.cleanEventTimeStampDates = function() {
  var startTime = this.dayEventAddForm.startTime.value.trim() || this.dayEventAddForm.startTime.getAttribute("placeholder") || '8';
  var startAMPM = this.dayEventAddForm.startAMPM.value.trim() || this.dayEventAddForm.startAMPM.getAttribute("placeholder") || 'am';
  startAMPM = (startAMPM == 'a') ? startAMPM + 'm' : startAMPM;
  var endTime = this.dayEventAddForm.endTime.value.trim() || this.dayEventAddForm.endTime.getAttribute("placeholder") || '9';
  var endAMPM = this.dayEventAddForm.endAMPM.value.trim() || this.dayEventAddForm.endAMPM.getAttribute("placeholder") || 'pm';
  endAMPM = (endAMPM == 'p') ? endAMPM + 'm' : endAMPM;
  var date = this.dayEventBoxEle.getAttribute("data-date");
  
  var startingTimeStamps = this.convertTo23HourTime(startTime, startAMPM);
  var endingTimeStamps = this.convertTo23HourTime(endTime, endAMPM);
  
  var dateOfEvent = new Date(date);
  var startDate = new Date(dateOfEvent.getFullYear(), dateOfEvent.getMonth(), dateOfEvent.getDate(), startingTimeStamps[0], startingTimeStamps[1]);
  var endDate = new Date(dateOfEvent.getFullYear(), dateOfEvent.getMonth(), dateOfEvent.getDate(), endingTimeStamps[0], endingTimeStamps[1]);
  
  // if end date is less than start date - set end date back another day
  if ( startDate > endDate ) endDate.setDate(endDate.getDate() + 1);
  
  return [startDate, endDate];
};

CalendarApp.prototype.validateAddEventInput = function() {
  var _errors = false;
  var name = this.dayEventAddForm.nameEvent.value.trim();
  var startTime = this.dayEventAddForm.startTime.value.trim();
  var startAMPM = this.dayEventAddForm.startAMPM.value.trim();
  var endTime = this.dayEventAddForm.endTime.value.trim();
  var endAMPM = this.dayEventAddForm.endAMPM.value.trim();
  
  if (!name || name == null) {
    _errors = true;
    this.dayEventAddForm.nameEvent.classList.add("add-event-edit--error");
    this.dayEventAddForm.nameEvent.focus();
  } else {
     this.dayEventAddForm.nameEvent.classList.remove("add-event-edit--error");
  }
  
//   if (!startTime || startTime == null) {
//     _errors = true;
//     this.dayEventAddForm.startTime.classList.add("add-event-edit--error");
//   } else {
//      this.dayEventAddForm.startTime.classList.remove("add-event-edit--error");
//   }
  
  return _errors;
};

var timeOut = null;
var activeEle = null;
CalendarApp.prototype.inputChangeLimiter = function(ele) {
  
  if ( ele.currentTarget ) {
    ele = ele.currentTarget;
  }
  if (timeOut && ele == activeEle){
    clearTimeout(timeOut);
  }
  
  var limiter = CalendarApp.prototype.textOptionLimiter;

  var _options = ele.getAttribute("data-options").split(",");
  var _format = ele.getAttribute("data-format") || 'text';
  timeOut = setTimeout(function(){
    ele.value = limiter(_options, ele.value, _format);
  }, 600);
  activeEle = ele;
  
};

CalendarApp.prototype.textOptionLimiter = function(options, input, format){
  if ( !input ) return '';
  
  if ( input.indexOf(":") !== -1 && format == 'datetime' ) {
 
    var _splitTime = input.split(':', 2);
    if (_splitTime.length == 2 && !_splitTime[1].trim()) return input;
    var _trailingTime = parseInt(_splitTime[1]);
    /* Probably could be coded better -- a block to clean up trailing data */
    if (options.indexOf(_splitTime[0]) === -1) {
      return options[0];
    }
    else if (_splitTime[1] == "0" ) {
      return input;
    }
    else if (_splitTime[1] == "00" ) {
      return _splitTime[0] +  ":00";
    }
    else if (_trailingTime < 10 ) {
      return _splitTime[0] + ":" + "0" + _trailingTime;
    }
    else if ( !Number.isInteger(_trailingTime) || _trailingTime < 0 || _trailingTime > 59 )  {
      return _splitTime[0];
    } 
    return _splitTime[0] + ":" + _trailingTime;
  }
  if ((input.toString().length >= 3) ) {
    var pad = (input.toString().length - 4) * -1;
    var _hour, _min;
    if (pad == 1) {
      _hour = input[0];
      _min = input[1] + input[2];
    } else {
      _hour = input[0] + input[1];
      _min = input[2] + input[3];
    }
    
    _hour = Math.max(1,Math.min(12,(_hour)));
    _min = Math.min(59,(_min));
    if ( _min < 10 ) { 
      _min = "0" + _min;
    }
    _min = (isNaN(_min)) ? '00' : _min;
    _hour = (isNaN(_hour)) ? '9' : _hour ;

    return _hour + ":" + _min;
    
  }

  if (options.indexOf(input) === -1) {
    return options[0];
  }
  
  return input;
};

CalendarApp.prototype.resetAddEventBox = function(){
  this.dayEventAddForm.nameEvent.value = '';
  this.dayEventAddForm.nameEvent.classList.remove("add-event-edit--error");
  this.dayEventAddForm.endTime.value = '';
  this.dayEventAddForm.startTime.value = '';
  this.dayEventAddForm.endAMPM.value = '';
  this.dayEventAddForm.startAMPM.value = '';
};

CalendarApp.prototype.showNewMonth = function(e){
  var date = e.currentTarget.dataset.date;
  var newMonthDate = new Date(date);

  let now = new Date(); //current date
  let cm = now.getMonth(); //current month
  let m = newMonthDate.getMonth(); //current new month

  if (cm > m) {
    return false; //if its prev month, so return false
  }

  this.showView(newMonthDate);
  this.closeDayWindow();
  return true;
};