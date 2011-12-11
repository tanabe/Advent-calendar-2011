Namespace('com.kaihatsubu.sample')
.use('brook *')
.use('brook.channel *')
.use('brook.model *')
.use('brook.util *')
.define(function(ns) {

  //Rect class
  var Rect = function(element) {
    this.element = element;
    this.x = 0;
    this.y = 0;
    this.intervalId = null;
    this.initialize();
  };

  Rect.prototype.initialize = function() {
    this.x = Math.floor(Math.random() * 300);
    this.y = Math.floor(Math.random() * 300);
    this.render();
  };

  Rect.prototype.move = function(x, y) {
    clearInterval(this.intervalId);
    var _self = this;
    this.intervalId = setInterval(function() {
      _self.x += (x - _self.x) / 5;
      _self.y += (y - _self.y) / 5;

      if (Math.abs(_self.x - x) < 1 && Math.abs(_self.y - y) < 1) {
        _self.x = x;
        _self.y = y;
        clearInterval(_self.intervalId);
        ns.sendChannel('onFinishRectMove').run(_self);
      }
      _self.render();
    }, 10);
  };

  Rect.prototype.render = function() {
    this.element.style.left = this.x + 'px';
    this.element.style.top = this.y + 'px';
  };

  Rect.prototype.hide = function() {
    this.element.style.display = 'none';
  }

  //client Sample class
  var Sample = function() {
  };

  Sample.prototype.initialize = function() {
    var _self = this;
    this.rects = [];
    var rectElements = document.getElementsByClassName('rect');
    for (var i = 0; i < rectElements.length; i++) {
      var rect = new Rect(rectElements[i]);
      this.rects.push(rect);
    }

    var button = document.getElementById('moveButton');
    button.addEventListener('click', function(event) {
      _self.moveAllRects();
      event.target.style.display = 'none';
    });
  };

  Sample.prototype.moveAllRects = function() {
    var _self = this;
    var index = 0;
    var moveRect = function() {
      _self.rects[index].move(0, 0);
    };

    ns.observeChannel('onFinishRectMove',
      ns.promise(function(next, value) {
        if (index < _self.rects.length - 1) {
          index++; 
          moveRect();
        }
        next(value);
      })
      .bind(ns.promise(function(next, value) {
        value.hide();
      }))
    );

    moveRect();
  };

  ns.provide({
    Sample: Sample
  });
});

