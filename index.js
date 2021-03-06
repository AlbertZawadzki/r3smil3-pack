"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _uuid = require("uuid");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _createSuper(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Slider = /*#__PURE__*/function (_React$Component) {
  _inherits(Slider, _React$Component);

  var _super = _createSuper(Slider);

  function Slider(props) {
    var _this;

    _classCallCheck(this, Slider);

    _this = _super.call(this, props);
    /* GENERAL SLIDER ITEMS */

    _this.setSiteSize = function () {
      if (typeof window === "undefined") return;
      _this.siteHeight = window.innerHeight;
      _this.siteWidth = window.innerWidth;
    };

    _this.setCurrentSettings = function (settings) {
      var arrows = settings.arrows,
          autoPlay = settings.autoPlay,
          center = settings.center,
          changeTime = settings.changeTime,
          draggable = settings.draggable,
          fitToContainer = settings.fitToContainer,
          id = settings.id,
          rotatable = settings.rotatable,
          startNumber = settings.startNumber,
          vertical = settings.vertical;
      if (typeof id === "undefined" && _this.state.id === "undefined") console.error("Fatal error, no id given");

      if (typeof arrows !== "undefined") {
        Object.assign(_this.state.arrows, arrows);

        _this.setState({
          arrows: _objectSpread({}, _this.state.arrows)
        });
      }

      if (typeof autoPlay !== "undefined") {
        Object.assign(_this.state.autoPlay, autoPlay);

        _this.setState({
          autoPlay: _objectSpread({}, _this.state.autoPlay)
        });
      }

      if (typeof center !== "undefined") {
        Object.assign(_this.state.center, center);

        _this.setState({
          center: _objectSpread({}, _this.state.center)
        });
      }

      if (typeof changeTime !== "undefined") _this.setState({
        changeTime: changeTime / 1000
      });
      if (typeof draggable !== "undefined") _this.setState({
        draggable: draggable
      });
      if (typeof fitToContainer !== "undefined") _this.setState({
        fitToContainer: fitToContainer
      });

      if (typeof id !== "undefined") {
        _this.sliderId = "slider-".concat(id);
        _this.slidesWrapperId = "slides-wrapper-".concat(id);

        _this.setState({
          id: id
        });
      }

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
          responsive[i].vertical = responsive[i].vertical !== undefined ? responsive[i].vertical : false;

          if (responsive[i].vertical && responsive[i].breakPoint > _this.siteHeight || !responsive[i].vertical && responsive[i].breakPoint > _this.siteWidth) {
            _this.setCurrentSettings(_this.props.responsive[i]);
          }
        }
      }
    };

    _this.resizeTasks = function () {
      _this.setSiteSize();

      _this.setSliderSettings();

      for (var i = 1; i < 5; i++) {
        setTimeout(function () {
          _this.moveSliderRight();

          _this.moveSliderLeft();
        }, 250 * i);
      }
    };

    _this.recurrenceTasks = function () {
      return setInterval(function () {
        _this.getSlidesBreaks();
      }, 10);
    };

    _this.followPointer = function () {
      if (typeof window === "undefined") return; //Everything is visible

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


      var children = _this.props.children; //One slideonly

      if (typeof children.length === "undefined") {
        children = [children];

        _this.setState({
          autoPlay: _objectSpread({}, _this.state.autoPlay, {
            on: false
          })
        });

        _this.setState({
          rotatable: false
        });
      }

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

    _this.preventDefault = function (event) {
      event.preventDefault();
    };

    _this.blockScrolling = function () {
      if (typeof window === "undefined") return;
      window.addEventListener("touchmove", _this.preventDefault, {
        passive: false
      });
    };

    _this.setListeners = function () {
      if (typeof window === "undefined") return;
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
      window.addEventListener("scroll", function () {
        return _this.blockScrolling();
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
          changeTime = _this$state2.changeTime,
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
      _this.slidesWrapper.style.margin = vertical ? "".concat(_this.sliderPosition, "px 0 0 0 ") : "0 0 0 ".concat(_this.sliderPosition, "px");
      _this.slidesWrapper.style.transition = "margin ".concat(changeTime, "s ease-in-out"); //Styling slides

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
      return setTimeout(function () {
        var _this$state3 = _this.state,
            fitToContainer = _this$state3.fitToContainer,
            vertical = _this$state3.vertical;
        var firstSlidePartiallyVisible = false;
        var firstSet = false;

        for (var i = 0; i < _this.slides.childNodes.length; i++) {
          //All slides have slide class name
          _this.slides.childNodes[i].className = "slide ";
          var slidePosition = vertical ? _this.slides.childNodes[i].getBoundingClientRect().top : _this.slides.childNodes[i].getBoundingClientRect().left;
          var dimension = vertical ? _this.slides.childNodes[i].offsetHeight : _this.slides.childNodes[i].offsetWidth;
          var sliderPosition = void 0;
          var sliderSize = void 0; //Some bug

          if (document.getElementById(_this.sliderId) !== null) {
            sliderPosition = vertical ? document.getElementById(_this.sliderId).getBoundingClientRect().top : document.getElementById(_this.sliderId).getBoundingClientRect().left; //If fitToContainer is false, slider is on 100vh || 100vw

            if (fitToContainer) {
              sliderSize = vertical ? document.getElementById(_this.sliderId).offsetHeight : document.getElementById(_this.sliderId).offsetWidth;
            } else {
              sliderSize = vertical ? window.innerHeight : window.innerWidth;
            }
          }

          if (sliderPosition > slidePosition + dimension) {
            _this.slides.childNodes[i].className += "invisible ";
          } else if (sliderPosition > slidePosition && sliderPosition <= slidePosition + dimension) {
            _this.slides.childNodes[i].className += "partial-first ";
          } else if (sliderPosition === slidePosition) {
            _this.slides.childNodes[i].className += "first ";
            firstSet = true;
          } else if (slidePosition < sliderSize && slidePosition + dimension < sliderSize) {
            _this.slides.childNodes[i].className += firstSet ? "visible " : "first ";
            firstSet = true;
          } else if (slidePosition < sliderSize) {
            _this.slides.childNodes[i].className += "partial ";
          } else if (slidePosition > sliderSize) {
            _this.slides.childNodes[i].className += "invisible ";
          } else {
            _this.slides.childNodes[i].className += "unknown ";
          }
        }
      }, 1000 * _this.state.changeTime);
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
      var _this$state4 = _this.state,
          changeTime = _this$state4.changeTime,
          children = _this$state4.children,
          rotatable = _this$state4.rotatable,
          vertical = _this$state4.vertical;

      if (_this.recurrence === 1 || !rotatable) {
        if (_this.sliderRealPosition > _this.oneSlidesSetLength - _this.sliderSize) {
          _this.sliderPosition = _this.sliderSize - _this.oneSlidesSetLength;
          _this.sliderRealPosition = _this.oneSlidesSetLength - _this.slider.offsetWidth;
          _this.slidesWrapper.style.transition = "margin ".concat(changeTime, "s");
          _this.slidesWrapper.style.margin = vertical ? "".concat(_this.sliderPosition, "px 0 0 0") : "0 0 0 ".concat(_this.sliderPosition, "px");
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
            _this.slidesWrapper.style.transition = "margin 0s";
            _this.slidesWrapper.style.margin = vertical ? "".concat(_this.sliderPosition, "px 0 0 0") : "0 0 0 ".concat(_this.sliderPosition, "px");
          }, 1250 * changeTime);
        }
      }

      _this.setSlidesClassNames();

      setTimeout(function () {
        if (typeof _this.props.onChange !== "undefined") _this.props.onChange();
      }, 1000 * changeTime);
    };

    _this.setClosestSlide = function () {
      if (!_this.attractableSlider) return;
      var _this$state5 = _this.state,
          changeTime = _this$state5.changeTime,
          vertical = _this$state5.vertical;
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
      _this.slidesWrapper.style.transition = "margin ".concat(changeTime, "s");
      _this.slidesWrapper.style.margin = vertical ? "".concat(_this.sliderPosition, "px 0 0 0") : "0 0 0 ".concat(_this.sliderPosition, "px");

      _this.fakeInfinity();
    };

    _this.moveSlider = function (currentPointerPosition) {
      if (typeof window === "undefined") return;
      var _this$state6 = _this.state,
          changeTime = _this$state6.changeTime,
          vertical = _this$state6.vertical;
      var movement = currentPointerPosition - _this.previousPointerPosition; //tacticle handlign

      if (window.event.touches !== undefined) {
        movement = currentPointerPosition > _this.previousPointerPosition ? 27 : -27;
      }

      _this.sliderPosition += movement;
      _this.sliderRealPosition += movement;
      _this.slidesWrapper.style.transition = "margin 0s";
      _this.slidesWrapper.style.margin = vertical ? "".concat(_this.sliderPosition, "px 0 0 0") : "0 0 0 ".concat(_this.sliderPosition, "px"); //Needed for attractibily to set

      setTimeout(function () {
        _this.slidesWrapper.style.transition = "margin ".concat(changeTime, "s");
      }, 10);
      var findClosestSlide = setInterval(function () {
        if (_this.attractableSlider) {
          _this.setClosestSlide();

          clearInterval(findClosestSlide);
        }
      }, 100);
    };

    _this.moveSliderLeft = function () {
      var _this$state7 = _this.state,
          arrows = _this$state7.arrows,
          changeTime = _this$state7.changeTime,
          vertical = _this$state7.vertical;
      _this.attractableSlider = true;
      _this.firstSlide -= arrows.slides;
      _this.sliderRealPosition = _this.slidesBreaks[_this.firstSlide] + _this.positionMover * _this.oneSlidesSetLength;
      _this.sliderPosition = -(_this.slidesBreaks[_this.firstSlide] + _this.positionMover * _this.oneSlidesSetLength);
      _this.slidesWrapper.style.transition = "margin ".concat(changeTime, "s");
      _this.slidesWrapper.style.margin = vertical ? "".concat(_this.sliderPosition, "px 0 0 0") : "0 0 0 ".concat(_this.sliderPosition, "px");
      _this.attractableSlider = false;

      _this.fakeInfinity();
    };

    _this.moveSliderRight = function () {
      var _this$state8 = _this.state,
          arrows = _this$state8.arrows,
          changeTime = _this$state8.changeTime,
          vertical = _this$state8.vertical;
      _this.attractableSlider = true;
      _this.firstSlide += arrows.slides;
      _this.sliderRealPosition = _this.slidesBreaks[_this.firstSlide] + _this.positionMover * _this.oneSlidesSetLength;
      _this.sliderPosition = -(_this.slidesBreaks[_this.firstSlide] + _this.positionMover * _this.oneSlidesSetLength);
      _this.slidesWrapper.style.transition = "margin ".concat(changeTime, "s");
      _this.slidesWrapper.style.margin = vertical ? "".concat(_this.sliderPosition, "px 0 0 0") : "0 0 0 ".concat(_this.sliderPosition, "px");
      _this.attractableSlider = false;

      _this.fakeInfinity();
    };

    _this.sliderIsFocused = function (status) {
      _this.sliderNotFocused = !status;
    };

    _this.renderArrows = function () {
      var _this$state9 = _this.state,
          arrows = _this$state9.arrows,
          children = _this$state9.children;
      if (!arrows.show || children.length < 2 || _this.oneSlidesSetLength < _this.parentSize) return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null);
      return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("div", {
        onClick: function onClick() {
          return _this.moveSliderLeft();
        },
        style: _objectSpread({}, arrows.left.styles)
      }, arrows.left.content), /*#__PURE__*/_react["default"].createElement("div", {
        onClick: function onClick() {
          return _this.moveSliderRight();
        },
        style: _objectSpread({}, arrows.right.styles)
      }, arrows.right.content));
    };

    _this.renderSlides = function () {
      var iterations = [];
      var children = _this.state.children;

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

    _this.sliderId; //Unique slider id

    _this.sliderPosition = 0; //Defines how much has the slider moved

    _this.sliderRealPosition = 0; //Defines how much has the slider moved relativily

    _this.sliderSize = 0; //Defines the width or height of slider

    _this.slides = "Slides"; //Slides

    _this.slidesBreaks = []; //All slides endings

    _this.slidesWrapper = "Slides wrapper"; //Slides wrapper

    _this.slidesWrapperId; //Unique slides wrapper id

    _this.slidesWrapperSize = 0; //Slides wrapper size

    _this.state = {
      /* DEFAULT SLIDER SETTINGS */
      arrows: {
        show: true,
        slides: 1,
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
      changeTime: 0.25,
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
      this.recurrenceTasks();
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

      if (typeof window === "undefined") return;
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
      window.removeEventListener("scroll", function () {
        return _this2.blockScrolling();
      });
      this.slider.removeEventListener("mousedown", function () {
        return _this2.dragSlider();
      });
      this.slider.removeEventListener("touchstart", function () {
        return _this2.dragSlider();
      });
      clearInterval(this.autoPlay);
      clearInterval(this.recurrenceTasks());
    }
    /* SLIDER MOVEMENT */

  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _this$state10 = this.state,
          children = _this$state10.children,
          siteHasLoaded = _this$state10.siteHasLoaded; //SSR check if window exists

      if (typeof window === "undefined") return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, "Window error");
      var iteratedChildren = this.renderSlides();

      if (siteHasLoaded) {
        return /*#__PURE__*/_react["default"].createElement("div", {
          id: this.sliderId,
          onMouseOver: function onMouseOver() {
            return _this3.sliderIsFocused(true);
          },
          onMouseOut: function onMouseOut() {
            return _this3.sliderIsFocused(false);
          }
        }, /*#__PURE__*/_react["default"].createElement("div", {
          id: this.slidesWrapperId
        }, iteratedChildren.map(function (iteration) {
          return children.map(function (child) {
            return /*#__PURE__*/_react["default"].createElement("div", {
              key: (0, _uuid.v4)()
            }, child);
          });
        })), this.renderArrows());
      } else {
        return /*#__PURE__*/_react["default"].createElement("div", {
          id: this.sliderId,
          onMouseOver: function onMouseOver() {
            return _this3.sliderIsFocused(true);
          },
          onMouseOut: function onMouseOut() {
            return _this3.sliderIsFocused(false);
          }
        }, /*#__PURE__*/_react["default"].createElement("div", {
          id: this.slidesWrapperId
        }, children.map(function (child) {
          return /*#__PURE__*/_react["default"].createElement("div", {
            key: (0, _uuid.v4)()
          }, child);
        })), this.renderArrows());
      }
    }
  }]);

  return Slider;
}(_react["default"].Component);

exports["default"] = Slider;
