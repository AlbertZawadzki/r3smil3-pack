"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _uuid = require("uuid");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Slider =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Slider, _React$Component);

  function Slider(props) {
    var _this;

    _classCallCheck(this, Slider);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Slider).call(this, props));
    /* GENERAL SLIDER ITEMS */

    _this.setSiteSize = function () {
      _this.siteHeight = window.innerHeight;
      _this.siteWidth = window.innerWidth;
    };

    _this.setCurrentSettings = function (settings) {
      var arrows = settings.arrows,
          autoPlay = settings.autoPlay,
          center = settings.center,
          draggable = settings.draggable,
          fitToContainer = settings.fitToContainer,
          rotatable = settings.rotatable,
          startNumber = settings.startNumber,
          vertical = settings.vertical;
      if (typeof arrows !== "undefined") _this.setState({
        arrows: _objectSpread({}, _this.state.arrows, arrows)
      });
      if (typeof autoPlay !== "undefined") _this.setState({
        autoPlay: _objectSpread({}, _this.state.autoPlay, autoPlay)
      });
      if (typeof center !== "undefined") _this.setState({
        center: _objectSpread({}, _this.state.center, center)
      });
      if (typeof draggable !== "undefined") _this.setState({
        draggable: draggable
      });
      if (typeof fitToContainer !== "undefined") _this.setState({
        fitToContainer: fitToContainer
      });
      if (typeof rotatable !== "undefined") _this.setState({
        rotatable: rotatable
      });
      if (typeof startNumber !== "undefined") _this.setState({
        startNumber: startNumber
      });
      if (typeof vertical !== "undefined") _this.setState({
        vertical: vertical
      });
    };

    _this.setSliderSettings = function () {
      //Set first global settings
      _this.setCurrentSettings(_this.props);

      var responsive = _this.props.responsive; //Check if responsive settings are set

      if (responsive && responsive.length > 0) {
        for (var i = 0; i < responsive.length; i++) {
          if (responsive[i].vertical && responsive[i].breakPoint > _this.siteHeight || responsive[i].breakPoint > _this.siteWidth) {
            _this.setSettings(_this.props.responsive[i]);
          }
        }
      }
    };

    _this.resizeTasks = function () {
      _this.setState({
        siteHasLoaded: false
      });

      _this.beforeMountTasks();

      _this.afterMountTasks();
    };

    _this.followPointer = function () {
      //Everything is visible
      if (_this.sliderSize > _this.oneSlidesSetLength) return;
      var vertical = _this.state.vertical; //set current mouse position

      var currentPointerPosition = vertical ? window.event.clientY : window.event.clientX; //tacticle

      if (window.event.touches !== undefined) {
        currentPointerPosition = vertical ? window.event.touches[0].clientY : window.event.touches[0].clientX;
      }

      if (_this.allowToDrag) _this.moveSlider(currentPointerPosition);
      _this.previousPointerPosition = currentPointerPosition;
    };

    _this.stopFollowingPointer = function () {
      _this.allowToDrag = false;
      _this.attractableSlider = true;
    };

    _this.beforeMountTasks = function () {
      //Get site size
      _this.setSiteSize(); //Setup slider


      _this.setSliderSettings(); //Set children


      var children = _this.props.children;

      _this.setState({
        children: children
      });
    };

    _this.setRecurrence = function () {
      var _this$state = _this.state,
          rotatable = _this$state.rotatable,
          vertical = _this$state.vertical;
      var recurrence = _this.props.recurrence;
      /*
       *      x < 1 - not enough sliders to be moved
       *  1 < x < 2 - more slides needed
       *  2 < x     - repeated 3 times should be ok.
       */

      var slidesToParentRatio = _this.oneSlidesSetLength / _this.parentSize;

      if (slidesToParentRatio < 1 || !rotatable) {
        _this.recurrence = 1;

        _this.setState({
          rotatable: false
        });
      } else if (slidesToParentRatio < 2) {
        _this.recurrence = recurrence > _this.recurrence ? recurrence : 5;
      } else {
        _this.recurrence = 3;
      } //Set position mover


      _this.positionMover = (_this.recurrence - 1) / 2;
    };

    _this.setInitialSliderPosition = function () {
      _this.sliderPosition = _this.recurrence > 1 ? -_this.positionMover * _this.oneSlidesSetLength : 0;
      _this.sliderRealPosition = _this.recurrence > 1 ? _this.positionMover * _this.oneSlidesSetLength : 0;
    };

    _this.autoStart = function () {
      var autoPlay = _this.state.autoPlay;

      if (autoPlay.on && _this.recurrence > 1) {
        _this.autoPlay = setInterval(function () {
          if (_this.sliderNotFocused) {
            if (autoPlay.leftOrUp) _this.moveSliderLeft();else _this.moveSliderRight();
          }
        }, autoPlay.time);
      }
    };

    _this.setDragability = function () {
      var draggable = _this.state.draggable;

      if (draggable) {
        _this.slider.addEventListener("mousedown", function () {
          return _this.dragSlider();
        });

        _this.slider.addEventListener("touchstart", function () {
          return _this.dragSlider();
        });
      }
    };

    _this.getSlidesBreaks = function () {
      var vertical = _this.state.vertical;
      _this.slidesBreaks = [-_this.positionMover * _this.oneSlidesSetLength];
      var currentPosition = -_this.positionMover * _this.oneSlidesSetLength;

      for (var j = 0; j < _this.recurrence; j++) {
        for (var i = 0; i < _this.slides.childNodes.length; i++) {
          currentPosition += vertical ? _this.slides.childNodes[i].childNodes[0].offsetHeight : _this.slides.childNodes[i].childNodes[0].offsetWidth;

          _this.slidesBreaks.push(currentPosition);
        }
      }
    };

    _this.setListeners = function () {
      window.addEventListener("resize", function () {
        return _this.resizeTasks();
      });
      window.addEventListener("mousemove", function () {
        return _this.followPointer();
      });
      window.addEventListener("touchmove", function () {
        return _this.followPointer();
      });
      window.addEventListener("mouseup", function () {
        return _this.stopFollowingPointer();
      });
      window.addEventListener("touchend", function () {
        return _this.stopFollowingPointer();
      });
    };

    _this.afterMountTasks = function () {
      var vertical = _this.state.vertical; //Assign slider to a var

      _this.slider = document.getElementById(_this.sliderId); //Assign slides wrapper to a var

      _this.slidesWrapper = _this.slider.childNodes[0]; //Set slides wrapper size

      _this.slidesWrapperSize = vertical ? _this.slidesWrapper.offsetHeight : _this.slidesWrapper.offsetWidth; //Assign slides to a var

      _this.slides = _this.slider.childNodes[0]; //Set one set of slides

      _this.oneSlidesSetLength = 0;

      for (var i = 0; i < _this.slides.childNodes.length; i++) {
        _this.oneSlidesSetLength += vertical ? _this.slides.childNodes[i].childNodes[0].offsetHeight : _this.slides.childNodes[i].childNodes[0].offsetWidth;
      } //Get proper parent size


      _this.parentSize = vertical ? _this.slider.parentElement.offsetHeight : _this.slider.parentElement.offsetWidth; //Set how many times the slides should be repeated

      _this.setRecurrence(); //Set startup slider position


      _this.setInitialSliderPosition(); //Allow draging slider


      _this.setDragability(); //Get all slides breakpoints


      _this.getSlidesBreaks(); //Setup all listeners


      _this.setListeners(); //Get first slides number


      _this.firstSlide = _this.positionMover * _this.slides.childNodes.length; //Slider is ready to start

      _this.setState({
        siteHasLoaded: true
      }); //Auto start sliding


      _this.autoStart();
    };

    _this.setSliderStyles = function () {
      var _this$state2 = _this.state,
          center = _this$state2.center,
          fitToContainer = _this$state2.fitToContainer,
          vertical = _this$state2.vertical; //Styling slider wrapper

      _this.slider.style.width = fitToContainer ? "100%" : "auto";
      _this.slider.style.height = fitToContainer ? "100%" : "auto";
      _this.slider.style.overflow = fitToContainer ? "hidden" : "visible"; //Styling slides wrapper

      _this.slidesWrapper.style.width = fitToContainer ? "100%" : "auto";
      _this.slidesWrapper.style.height = fitToContainer ? "100%" : "auto";
      _this.slidesWrapper.style.display = "flex";
      _this.slidesWrapper.style.flexDirection = vertical ? "column" : "row";
      _this.slidesWrapper.style.justifyContent = !vertical && center.horizontally ? "space-evenly" : "flex-start";
      _this.slidesWrapper.style.alignContent = !vertical && center.vertically ? "space-around" : "start";
      _this.slidesWrapper.style.transform = vertical ? "translateY(".concat(_this.sliderPosition, "px)") : "translateX(".concat(_this.sliderPosition, "px)");
      _this.slidesWrapper.style.transition = "transform 0.25s ease-in-out"; //Styling slides

      for (var i = 0; i < _this.slides.childNodes.length; i++) {
        _this.slides.childNodes[i].display = "flex";
        _this.slides.childNodes[i].style.width = "auto";
        _this.slides.childNodes[i].style.height = "auto"; //Proper centring

        if (center.horizontally && center.vertically) {
          _this.slides.childNodes[i].style.margin = "auto";
        } else if (center.vertically) {
          _this.slides.childNodes[i].style.margin = "auto 0";
        } else if (center.horizontally) {
          _this.slides.childNodes[i].style.margin = "0 auto";
        } else {
          _this.slides.childNodes[i].style.margin = "initial";
        }
      }
    };

    _this.setSlidesClassNames = function () {
      var vertical = _this.state.vertical;
      var firstSlidePartiallyVisible = false;

      for (var i = 0; i < _this.slides.childNodes.length; i++) {
        //All slides have slide class name
        _this.slides.childNodes[i].className = "slide ";
        var slidePosition = vertical ? _this.slides.childNodes[i].getBoundingClientRect().top : _this.slides.childNodes[i].getBoundingClientRect().left;
        var dimension = vertical ? _this.slides.childNodes[i].offsetHeight : _this.slides.childNodes[i].offsetWidth; //Slide is fully visible on site

        if (slidePosition >= 0 && slidePosition + dimension <= _this.sliderSize) {
          _this.slides.childNodes[i].className += "visible ";
        } //You can see only  end of a slide
        else if (slidePosition >= 0 && slidePosition + dimension > _this.sliderSize) {
            _this.slides.childNodes[i].className += "partial ";
          } //First slide is partially visible - block first className
          else if (slidePosition < 0 && slidePosition + dimension > 0) {
              _this.slides.childNodes[i].className += "partial first ";
              firstSlidePartiallyVisible = true;
            } //Inivisble
            else {
                _this.slides.childNodes[i].className += "invisible ";
              }
      } //Highlight first slide


      if (!firstSlidePartiallyVisible) _this.slides.childNodes[_this.firstSlide].className += "first ";
    };

    _this.updateTasks = function () {
      var vertical = _this.state.vertical; //All data is ready set styles

      _this.setSliderStyles(); //Set slider size


      _this.sliderSize = vertical ? _this.slider.offsetHeight : _this.slider.offsetWidth; //Name all slides properly

      _this.setSlidesClassNames();
    };

    _this.dragSlider = function () {
      _this.allowToDrag = true;
      _this.attractableSlider = false;
    };

    _this.fakeInfinity = function () {
      /*
       * If slider is not recurrencial
       * block it on max position, setClosestSlide blocks at 0
       */
      var _this$state3 = _this.state,
          children = _this$state3.children,
          rotatable = _this$state3.rotatable,
          vertical = _this$state3.vertical;

      if (_this.recurrence === 1 || !rotatable) {
        if (_this.sliderRealPosition > _this.oneSlidesSetLength - _this.sliderSize) {
          _this.sliderPosition = _this.sliderSize - _this.oneSlidesSetLength;
          _this.sliderRealPosition = _this.oneSlidesSetLength - _this.slider.offsetWidth;
          _this.slidesWrapper.style.transition = "transform 0.25s";
          _this.slidesWrapper.style.transform = vertical ? "translateY(".concat(_this.sliderPosition, "px)") : "translateX(".concat(_this.sliderPosition, "px)");
        }
      } else {
        var maxItem = children.length * (_this.recurrence - 1);
        var minItem = children.length;

        if (_this.firstSlide <= minItem || _this.firstSlide >= maxItem) {
          if (_this.firstSlide <= minItem) _this.firstSlide += _this.positionMover * minItem;
          if (_this.firstSlide >= maxItem) _this.firstSlide -= _this.positionMover * minItem;
          _this.sliderPosition = -_this.slidesBreaks[_this.firstSlide] - _this.positionMover * _this.oneSlidesSetLength;
          _this.sliderRealPosition = -_this.sliderPosition;
          setTimeout(function () {
            _this.slidesWrapper.style.transition = "transform 0s";
            _this.slidesWrapper.style.transform = vertical ? "translateY(".concat(_this.sliderPosition, "px)") : "translateX(".concat(_this.sliderPosition, "px)");
          }, 50);
        }
      }

      _this.setSlidesClassNames();
    };

    _this.setClosestSlide = function () {
      if (!_this.attractableSlider) return;
      var vertical = _this.state.vertical;
      var closestSlide;
      var minimum = Infinity;

      for (var i = 0; i < _this.slides.childNodes.length; i++) {
        if (vertical && Math.abs(_this.slides.childNodes[i].getBoundingClientRect().top) < minimum || !vertical && Math.abs(_this.slides.childNodes[i].getBoundingClientRect().left) < minimum) {
          minimum = vertical ? Math.abs(_this.slides.childNodes[i].getBoundingClientRect().top) : Math.abs(_this.slides.childNodes[i].getBoundingClientRect().left);
          closestSlide = i;
        }
      }

      _this.firstSlide = closestSlide;
      _this.sliderRealPosition = _this.slidesBreaks[closestSlide] + _this.positionMover * _this.oneSlidesSetLength;
      _this.sliderPosition = -(_this.slidesBreaks[closestSlide] + _this.positionMover * _this.oneSlidesSetLength);
      _this.slidesWrapper.style.transition = "transform 0.25s";
      _this.slidesWrapper.style.transform = vertical ? "translateY(".concat(_this.sliderPosition, "px)") : "translateX(".concat(_this.sliderPosition, "px)");

      _this.fakeInfinity();
    };

    _this.moveSlider = function (currentPointerPosition) {
      var vertical = _this.state.vertical;
      var movement = currentPointerPosition - _this.previousPointerPosition; //tacticle handlign

      if (window.event.touches !== undefined) {
        movement = currentPointerPosition > _this.previousPointerPosition ? 12 : -12;
      }

      _this.sliderPosition += movement;
      _this.sliderRealPosition += movement;
      _this.slidesWrapper.style.transition = "transform 0s";
      _this.slidesWrapper.style.transform = vertical ? "translateY(".concat(_this.sliderPosition, "px)") : "translateX(".concat(_this.sliderPosition, "px)"); //Needed for attractibily to set

      setTimeout(function () {
        _this.slidesWrapper.style.transition = "transform 0.25s";
      }, 10);
      var findClosestSlide = setInterval(function () {
        if (_this.attractableSlider) {
          _this.setClosestSlide();

          clearInterval(findClosestSlide);
        }
      }, 100);
    };

    _this.moveSliderLeft = function () {
      var vertical = _this.state.vertical;
      _this.attractableSlider = true;
      _this.sliderRealPosition = _this.slidesBreaks[--_this.firstSlide] + _this.positionMover * _this.oneSlidesSetLength;
      _this.sliderPosition = -(_this.slidesBreaks[_this.firstSlide] + _this.positionMover * _this.oneSlidesSetLength);
      _this.slidesWrapper.style.transition = "transform 0.25s";
      _this.slidesWrapper.style.transform = vertical ? "translateY(".concat(_this.sliderPosition, "px)") : "translateX(".concat(_this.sliderPosition, "px)");
      _this.attractableSlider = false;

      _this.fakeInfinity();
    };

    _this.moveSliderRight = function () {
      var vertical = _this.state.vertical;
      _this.attractableSlider = true;
      _this.sliderRealPosition = _this.slidesBreaks[++_this.firstSlide] + _this.positionMover * _this.oneSlidesSetLength;
      _this.sliderPosition = -(_this.slidesBreaks[_this.firstSlide] + _this.positionMover * _this.oneSlidesSetLength);
      _this.slidesWrapper.style.transition = "transform 0.25s";
      _this.slidesWrapper.style.transform = vertical ? "translateY(".concat(_this.sliderPosition, "px)") : "translateX(".concat(_this.sliderPosition, "px)");
      _this.attractableSlider = false;

      _this.fakeInfinity();
    };

    _this.sliderIsFocused = function (status) {
      _this.sliderNotFocused = !status;
    };

    _this.renderArrows = function () {
      var arrows = _this.state.arrows;
      if (!arrows.show) return _react.default.createElement(_react.default.Fragment, null);
      return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement("div", {
        onClick: function onClick() {
          return _this.moveSliderLeft();
        },
        style: _objectSpread({}, arrows.left.styles)
      }, arrows.left.content), _react.default.createElement("div", {
        onClick: function onClick() {
          return _this.moveSliderRight();
        },
        style: _objectSpread({}, arrows.right.styles)
      }, arrows.right.content));
    };

    _this.renderSlides = function () {
      var iterations = [];

      for (var i = 0; i < _this.recurrence; i++) {
        iterations.push(i);
      }

      return iterations;
    };

    _this.allowToDrag = false; //Allow to drag items

    _this.autoPlay = "Function that automatically changes slides"; //Function that automatically changes slides

    _this.attractableSlider = false; //Allow slider to get to closest divs end

    _this.firstSlide = 0; //Currently first slide

    _this.oneSlidesSetLength = 0; //All unique slides length

    _this.parentSize = 0; //Sliders parent size

    _this.positionMover = 0; //(this.recurrence - 1) / 2 - Defines all breakpoints to fake inifity sliding effect

    _this.previousPointerPosition = 0; //Defines previous pointing device position

    _this.recurrence = 5; //Initial number of slides sets

    _this.siteHeight = 0; //Site height

    _this.siteWidth = 0; //Site width

    _this.slider = "Slider wrapper"; //Slider

    _this.sliderNotFocused = true; //Defines if mouse is over the slider

    _this.sliderId = (0, _uuid.v4)(); //Unique slider id

    _this.sliderPosition = 0; //Defines how much has the slider moved

    _this.sliderRealPosition = 0; //Defines how much has the slider moved relativily

    _this.sliderSize = 0; //Defines the width  or height of slider

    _this.slides = "Slides"; //Slides

    _this.slidesBreaks = []; //All slides endings

    _this.slidesWrapper = "Slides wrapper"; //Slides wrapper

    _this.slidesWrapperId = (0, _uuid.v4)(); //Unique slides wrapper id

    _this.slidesWrapperSize = 0; //Slides wrapper size

    _this.state = {
      /* DEFAULT SLIDER SETTINGS */
      arrows: {
        show: true,
        left: {
          content: "Left",
          styles: {}
        },
        right: {
          content: "Right",
          styles: {}
        }
      },
      autoPlay: {
        on: false,
        leftOrUp: false,
        time: 5000
      },
      center: {
        horizontally: false,
        vertically: true
      },
      children: [],
      draggable: true,
      fitToContainer: true,
      rotatable: true,
      vertical: false,

      /* IMPORTANT SITE DATA */
      siteHasLoaded: false //Defines if all necessery data has loaded

    };
    return _this;
  }
  /* COMPONENT INITIALISING */


  _createClass(Slider, [{
    key: "componentWillMount",

    /* COMPONENT LIFE */
    value: function componentWillMount() {
      this.beforeMountTasks();
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.afterMountTasks();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this.updateTasks();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var _this2 = this;

      window.removeEventListener("resize", function () {
        return _this2.resizeTasks();
      });
      window.removeEventListener("mousemove", function () {
        return _this2.followPointer();
      });
      window.removeEventListener("touchmove", function () {
        return _this2.followPointer();
      });
      window.removeEventListener("mouseup", function () {
        return _this2.stopFollowingPointer();
      });
      window.removeEventListener("touchend", function () {
        return _this2.stopFollowingPointer();
      });
      this.slider.removeEventListener("mousedown", function () {
        return _this2.dragSlider();
      });
      this.slider.removeEventListener("touchstart", function () {
        return _this2.dragSlider();
      });
      clearInterval(this.autoPlay);
    }
    /* SLIDER MOVEMENT */

  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _this$state4 = this.state,
          children = _this$state4.children,
          siteHasLoaded = _this$state4.siteHasLoaded; //SSR check if window exists

      if (typeof window === "undefined") return _react.default.createElement(_react.default.Fragment, null, "Window error");
      var iteratedChildren = this.renderSlides();

      if (siteHasLoaded) {
        return _react.default.createElement("div", {
          id: this.sliderId,
          style: {
            background: "lightgray"
          },
          onMouseOver: function onMouseOver() {
            return _this3.sliderIsFocused(true);
          },
          onMouseOut: function onMouseOut() {
            return _this3.sliderIsFocused(false);
          }
        }, _react.default.createElement("div", {
          id: this.slidesWrapperId
        }, iteratedChildren.map(function (iteration) {
          return children.map(function (child) {
            return _react.default.createElement("div", {
              key: (0, _uuid.v4)()
            }, child);
          });
        })), this.renderArrows());
      } else {
        return _react.default.createElement("div", {
          id: this.sliderId,
          onMouseOver: function onMouseOver() {
            return _this3.sliderIsFocused(true);
          },
          onMouseOut: function onMouseOut() {
            return _this3.sliderIsFocused(false);
          }
        }, _react.default.createElement("div", {
          id: this.slidesWrapperId
        }, children.map(function (child) {
          return _react.default.createElement("div", {
            key: (0, _uuid.v4)()
          }, child);
        })), this.renderArrows());
      }
    }
  }]);

  return Slider;
}(_react.default.Component);

exports.default = Slider;
