function Stopwatch(elem) {
  var time = 0;
  var interval;
  var offset;

  function update() {
    if (this.isOn) {
      var timePassed = delta();
      time += timePassed;
    }

    var formattedTime = timeFormatter(time);
    elem.innerHTML = formattedTime;
  }

  function delta() {
    var now = Date.now();
    var timePassed = now - offset;
    offset = now;
    return timePassed;
  }

  function timeFormatter(timeInMilliseconds) {
    var time = new Date(timeInMilliseconds);
    var minutes = time.getMinutes().toString();
    var seconds = time.getSeconds().toString();
    var milliseconds = time.getMilliseconds().toString();
    var hours = (Math.floor(minutes/60)).toString();

    if (hours.length < 2) {
      hours = '0' + hours;
    }

    if (minutes.length < 2) {
      minutes = '0' + minutes;
    }

    if (seconds.length < 2) {
      seconds = '0' + seconds;
    }

    while (milliseconds.length < 3) {
      milliseconds = '0' + milliseconds;
    }

    return hours + ' : ' + minutes + ' : ' + seconds + ' . ' + milliseconds;
  }

  this.isOn = false;

  this.start = function() {
    if (!this.isOn) {
      interval = setInterval(update.bind(this), 10);
      offset = Date.now();
      this.isOn = true;
    }
  };

  this.stop = function() {
    if (this.isOn) {
      clearInterval(interval);
      interval = null;
      this.isOn = false;
    }
  };

  this.reset = function() {
    time = 0;
    update();
  };
}

var timer = document.getElementById('time');
var toggleBtn = document.getElementById('start');
var resetBtn = document.getElementById('clear');

var watch = new Stopwatch(timer);

function start() {
  watch.start();
  toggleBtn.innerHTML = 'Pause';
  toggleBtn.style.background = 'blue';
}

function stop() {
  watch.stop();
  toggleBtn.innerHTML = 'Continue';
  toggleBtn.style.background = 'green';
}

toggleBtn.addEventListener('click', function() {
  if(watch.isOn) {
    stop()
  } else {
    start()
  }
});

resetBtn.addEventListener('click', function() {
  if (!watch.isOn) {
    watch.reset();
    toggleBtn.innerHTML = 'Start';
  }
});