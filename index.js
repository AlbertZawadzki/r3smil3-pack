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

    _this.getSiteSize = function () {
      var siteWidth = 0;
      var siteHeight = 0;
      siteWidth = window.innerWidth;
      siteHeight = window.innerHeight;

      _this.setState({
        siteHeight: siteHeight,
        siteWidth: siteWidth
      });
    };

    _this.handledEvents = function () {
      window.addEventListener("resize", function () {
        return _this.getSiteSize();
      });
      window.addEventListener("resize", function () {
        return _this.chooseSettings();
      });
      window.addEventListener("mousemove", function () {
        return _this.followMouse();
      });
      window.addEventListener("mouseup", function () {
        return _this.stopDragSlider();
      });
      window.addEventListener("touchmove", function () {
        return _this.followMouse();
      });
      window.addEventListener("touchend", function () {
        return _this.stopDragSlider();
      });
    };

    _this.dragSlider = function () {
      _this.allowToDrag = true;
      _this.attractableSlider = false;
    };

    _this.stopDragSlider = function () {
      _this.allowToDrag = false;
      _this.attractableSlider = true;
      setTimeout(function () {
        _this.allowToDrag = false;
        _this.attractableSlider = true;

        _this.setSlidesClassNames();
      }, 100);
    };

    _this.attractSlider = function () {
      var slider = document.getElementById(_this.sliderWrapperId);
      var slidesWrapper = slider.childNodes[0];
      var _this$state = _this.state,
          vertical = _this$state.vertical,
          rotateable = _this$state.rotateable;
      var items = slidesWrapper.childNodes;
      _this.endingLines = [0];
      var start = 0; //Calculate slides break points

      for (var i = 0; i < items.length; i++) {
        start += vertical ? items[i].offsetHeight : items[i].offsetWidth;

        _this.endingLines.push(start);
      }

      var closest = {
        smaller: {
          length: 0,
          pos: 0
        },
        larger: {
          length: Infinity,
          pos: 0
        },
        exact: {
          pos: 0,
          found: false
        }
      }; //Find closest one

      for (var _i = 0; _i < _this.endingLines.length; _i++) {
        if (_this.endingLines[_i] === -_this.sliderPosition) {
          closest.exact.pos = _i;
          closest.exact.found = true;
          break;
        }

        if (_this.endingLines[_i] < -_this.sliderPosition) {
          closest.smaller.length = Math.abs(_this.endingLines[_i] + _this.sliderPosition);
          closest.smaller.pos = _i;
        } else if (_this.endingLines[_i] > -_this.sliderPosition) {
          closest.larger.length = Math.abs(_this.endingLines[_i] + _this.sliderPosition);
          closest.larger.pos = _i;
          break;
        }
      }

      var minimum;

      if (closest.exact.found) {
        minimum = closest.exact.pos;
      } else {
        if (closest.smaller.length < closest.larger.length) {
          minimum = closest.smaller.pos;
        } else {
          minimum = closest.larger.pos;
        }
      }

      if (rotateable) {
        setTimeout(function () {
          if (minimum === 0) {
            var closestSlide;

            if (_this.firstSlide >= 3 * (items.length / _this.recurrence)) {
              _this.firstSlide = items.length / _this.recurrence;
              slidesWrapper.style.transition = "0s";
              closestSlide = _this.endingLines[_this.firstSlide];
              _this.sliderPosition = closestSlide;
              slidesWrapper.style.transform = vertical ? "translateY(" + -_this.sliderPosition + "px)" : "translateX(" + -_this.sliderPosition + "px)";
              setTimeout(function () {
                slidesWrapper.style.transition = "0.25s";
              }, 100);
            } else if (_this.firstSlide <= items.length / _this.recurrence) {
              _this.firstSlide = 3 * (items.length / _this.recurrence);
              slidesWrapper.style.transition = "0s";
              closestSlide = _this.endingLines[_this.firstSlide];
              _this.sliderPosition = closestSlide;
              slidesWrapper.style.transform = vertical ? "translateY(" + -_this.sliderPosition + "px)" : "translateX(" + -_this.sliderPosition + "px)";
              setTimeout(function () {
                slidesWrapper.style.transition = "0.25s";
              }, 100);
            } else {
              closestSlide = _this.endingLines[_this.firstSlide];
              _this.sliderPosition = closestSlide;
              closestSlide = _this.endingLines[_this.firstSlide];
              _this.sliderPosition = closestSlide;
              slidesWrapper.style.transform = vertical ? "translateY(" + -_this.sliderPosition + "px)" : "translateX(" + -_this.sliderPosition + "px)";
              slidesWrapper.style.transition = "0.25s";
            }
          } else if (_this.attractableSlider) {
            _this.firstSlide = minimum;

            var _closestSlide;

            if (_this.firstSlide >= 3 * (items.length / _this.recurrence)) {
              _this.firstSlide = items.length / _this.recurrence;
              slidesWrapper.style.transition = "all 0s";
              _closestSlide = _this.endingLines[_this.firstSlide];
              _this.sliderPosition = _closestSlide;
              slidesWrapper.style.transform = vertical ? "translateY(" + -_this.sliderPosition + "px)" : "translateX(" + -_this.sliderPosition + "px)";
              setTimeout(function () {
                slidesWrapper.style.transition = "0.25s";
              }, 100);
            } else if (_this.firstSlide <= items.length / _this.recurrence) {
              _this.firstSlide = 3 * (items.length / _this.recurrence);
              slidesWrapper.style.transition = "all 0s";
              _closestSlide = _this.endingLines[_this.firstSlide];
              _this.sliderPosition = _closestSlide;
              slidesWrapper.style.transform = vertical ? "translateY(" + -_this.sliderPosition + "px)" : "translateX(" + -_this.sliderPosition + "px)";
              setTimeout(function () {
                slidesWrapper.style.transition = "0.25s";
              }, 100);
            } else {
              _closestSlide = _this.endingLines[_this.firstSlide];
              _this.sliderPosition = _closestSlide;
              slidesWrapper.style.transform = vertical ? "translateY(" + -_this.sliderPosition + "px)" : "translateX(" + -_this.sliderPosition + "px)";
              slidesWrapper.style.transition = "0.25s";
            }
          }
        }, 250);
      } else {
        _this.firstSlide = minimum;
        setTimeout(function () {
          if (_this.attractableSlider) {
            var closestSlide = _this.endingLines[_this.firstSlide];

            if (_this.sliderWidth > _this.allChildrenLength - closestSlide) {
              closestSlide -= closestSlide + _this.sliderWidth - _this.allChildrenLength;
            }

            _this.sliderPosition = closestSlide;
            slidesWrapper.style.transform = vertical ? "translateY(" + -closestSlide + "px)" : "translateX(" + -closestSlide + "px)";
          }
        }, 250);
      }
    };

    _this.setSlidesClassNames = function () {
      return setTimeout(function () {
        var vertical = _this.state.vertical;
        var slider = document.getElementById(_this.sliderWrapperId);
        var slidesWrapper = slider.childNodes[0];
        var slides = slidesWrapper.childNodes;
        var minimum = Infinity;

        for (var i = 0; i < slides.length; i++) {
          var slidePosition = void 0;
          var nextSlidePosition = void 0;

          if (vertical) {
            slidePosition = slides[i].getBoundingClientRect().top;
            nextSlidePosition = slides[i].getBoundingClientRect().top + slides[i].offsetHeight;
          } else {
            slidePosition = slides[i].getBoundingClientRect().left;
            nextSlidePosition = slides[i].getBoundingClientRect().left + slides[i].offsetWidth;
          }

          if (slidePosition > 0 && nextSlidePosition < _this.sliderWidth) {
            if (minimum > i) {
              minimum = i;
            }

            slides[i].className = "slide-visible";
          } else if (slidePosition > 0 && slidePosition < _this.sliderWidth) slides[i].className = "slide-partial";else slides[i].className = "slide-invisible";
        }
      }, 100);
    };

    _this.followMouse = function () {
      var vertical = _this.state.vertical; //Nothing should move

      if (_this.allChildrenLength < _this.sliderWidth) return;
      var currentMousePosition = {
        x: window.event.clientX,
        y: window.event.clientY
      }; //Tacticle

      if (window.event.touches !== undefined) {
        currentMousePosition = {
          x: window.event.touches[0].clientX,
          y: window.event.touches[0].clientY
        };
      }

      var slider = document.getElementById(_this.sliderWrapperId);
      var slidesWrapper = slider.childNodes[0];

      if (_this.allowToDrag) {
        if (vertical) {
          //Vertical movement
          var movement = currentMousePosition.y - _this.previousMousePosition.y; //Tactile handling

          if (window.event.touches !== undefined) {
            movement = currentMousePosition.y > _this.previousMousePosition.y ? 12 : -12;
          }

          var previousPositionY = slidesWrapper.style.transform.split("(")[1].split("px)")[0] * 1.0;
          var newPositionY = movement + previousPositionY;
          slidesWrapper.style.transition = "transform 0s ease-in-out";
          slidesWrapper.style.transform = "translateY(" + newPositionY + "px)";
          _this.sliderPosition = newPositionY;
          setTimeout(function () {
            slidesWrapper.style.transition = "transform 0.25s ease-in-out";
          }, 100);
        } else {
          //Horizontal movement
          var _movement = currentMousePosition.x - _this.previousMousePosition.x; //Tactile handling


          if (window.event.touches !== undefined) {
            _movement = currentMousePosition.x > _this.previousMousePosition.x ? 12 : -12;
          }

          var previousPositionX = slidesWrapper.style.transform.split("(")[1].split("px)")[0] * 1.0;
          var newPositionX = _movement + previousPositionX;
          slidesWrapper.style.transition = "transform 0s ease-in-out";
          slidesWrapper.style.transform = "translateX(" + newPositionX + "px)";
          _this.sliderPosition = newPositionX;
          setTimeout(function () {
            slidesWrapper.style.transition = "transform 0.25s ease-in-out";
          }, 100);
        }

        _this.attractSlider();
      }

      _this.previousMousePosition = currentMousePosition;
    };

    _this.setSliderStyles = function () {
      var _this$state2 = _this.state,
          center = _this$state2.center,
          draggable = _this$state2.draggable,
          fitToContainer = _this$state2.fitToContainer,
          rotateable = _this$state2.rotateable,
          vertical = _this$state2.vertical;
      var parentSize = 0;
      _this.allChildrenLength = 0;
      _this.singleChildrenSetLength = 0;
      var slider = document.getElementById(_this.sliderWrapperId); //get max size of slider

      if (slider !== null) {
        if (vertical) {
          parentSize = slider.parentElement.offsetHeight;
        } else {
          parentSize = slider.parentElement.offsetWidth;
        }
      }

      var slidesWrapper;
      var slides;

      if (slider !== null) {
        slidesWrapper = slider.childNodes[0];
        slides = slidesWrapper.childNodes;

        for (var i = 0; i < slides.length; i++) {
          //Get all items repe
          if (i < slides.length / _this.recurrence) {
            _this.singleChildrenSetLength += vertical ? slides[i].offsetHeight : slides[i].offsetWidth;
          }

          if (rotateable) {
            if (i < slides.length / _this.recurrence) {
              _this.allChildrenLength += vertical ? slides[i].offsetHeight : slides[i].offsetWidth;
            }
          } else {
            _this.allChildrenLength += vertical ? slides[i].offsetHeight : slides[i].offsetWidth;
          }

          slides[i].style.width = "auto";
          slides[i].style.height = "auto";
          slides[i].style.margin = center ? "auto" : "initial";
        }

        _this.sliderWidth = vertical ? slider.offsetHeight : slider.offsetWidth;

        if (slider && draggable) {
          slider.addEventListener("mousedown", function () {
            return _this.dragSlider();
          });
          slider.addEventListener("touchstart", function () {
            return _this.dragSlider();
          });
        }

        _this.positionMover = (_this.recurrence - 1) / 2;
        _this.sliderPosition = _this.positionMover * _this.allChildrenLength; //Styling slides wrapper

        slidesWrapper.style.width = "100%";
        slidesWrapper.style.height = "100%";
        slidesWrapper.style.display = "flex";
        slidesWrapper.style.flexDirection = vertical ? "column" : "row";
        slidesWrapper.style.justifyContent = false ? "space-evenly" : "flex-start";
        slidesWrapper.style.transition = "transform 0.25s ease-in-out";
        slidesWrapper.style.transform = vertical ? "translateY(0px)" : "translateX(0px)"; //Styling slider

        slider.style.width = fitToContainer ? !vertical ? "100%" : "".concat(parentSize, "px") : "auto";
        slider.style.height = fitToContainer ? vertical ? "".concat(parentSize, "px") : "100%" : "auto";
        slider.style.overflow = fitToContainer ? "hidden" : "visible";
      }
    };

    _this.nonRotateableMoveSliderLeft = function () {
      var vertical = _this.state.vertical;
      var slider = document.getElementById(_this.sliderWrapperId);
      var slidesWrapper = slider.childNodes[0];
      var slide;
      var movement;

      if (_this.firstSlide === 0) {
        movement = 0;
      } else {
        slide = slidesWrapper.childNodes[--_this.firstSlide];
        movement = vertical ? slide.offsetHeight : slide.offsetWidth;
      }

      _this.sliderPosition = movement - _this.sliderPosition;
      slidesWrapper.style.transform = vertical ? "translateY(" + _this.sliderPosition + "px)" : "translateX(" + _this.sliderPosition + "px)";
      setTimeout(function () {
        _this.attractSlider();

        _this.setSlidesClassNames();
      }, 100);
    };

    _this.nonRotateableMoveSliderRight = function () {
      var vertical = _this.state.vertical;
      var slider = document.getElementById(_this.sliderWrapperId);
      var slidesWrapper = slider.childNodes[0];
      var slide;
      var movement;

      if (_this.firstSlide === slidesWrapper.childNodes.length - 1) {
        movement = 0;
      } else {
        slide = slidesWrapper.childNodes[_this.firstSlide++];
        movement = vertical ? slide.offsetHeight : slide.offsetWidth;
      }

      _this.sliderPosition = -_this.sliderPosition - movement;
      slidesWrapper.style.transform = vertical ? "translateY(" + _this.sliderPosition + "px)" : "translateX(" + _this.sliderPosition + "px)";
      setTimeout(function () {
        _this.attractSlider();

        _this.setSlidesClassNames();
      }, 260);
    };

    _this.rotateableMoveSliderLeft = function () {
      var vertical = _this.state.vertical;
      var slider = document.getElementById(_this.sliderWrapperId);
      var slidesWrapper = slider.childNodes[0];
      var slide = slidesWrapper.childNodes[--_this.firstSlide];
      var movement = vertical ? slide.offsetHeight : slide.offsetWidth;
      _this.sliderPosition -= movement;
      slidesWrapper.style.transform = vertical ? "translateY(" + -_this.sliderPosition + "px)" : "translateX(" + -_this.sliderPosition + "px)";
      setTimeout(function () {
        _this.attractSlider();

        _this.setSlidesClassNames();
      }, 260);
    };

    _this.rotateableMoveSliderRight = function () {
      var vertical = _this.state.vertical;
      var slider = document.getElementById(_this.sliderWrapperId);
      var slidesWrapper = slider.childNodes[0];
      var slide = slidesWrapper.childNodes[_this.firstSlide++];
      var movement = vertical ? slide.offsetHeight : slide.offsetWidth;
      _this.sliderPosition += movement;
      slidesWrapper.style.transform = vertical ? "translateY(" + -_this.sliderPosition + "px)" : "translateX(" + -_this.sliderPosition + "px)";
      setTimeout(function () {
        _this.attractSlider();

        _this.setSlidesClassNames();
      }, 260);
    };

    _this.setMinimumRecurrence = function (recurrence) {
      var rotateable = _this.state.rotateable;
      if (!rotateable) _this.recurrence = 1;else if (recurrence > _this.recurrence) _this.recurrence = recurrence;else _this.recurrence = 5;
      return _this.recurrence;
    };

    _this.setSettings = function (settings) {
      var arrows = settings.arrows,
          autoPlay = settings.autoPlay,
          center = settings.center,
          draggable = settings.draggable,
          fitToContainer = settings.fitToContainer,
          recurrence = settings.recurrence,
          rotateable = settings.rotateable,
          startNumber = settings.startNumber,
          vertical = settings.vertical;
      if (typeof arrows !== "undefined") _this.setState({
        arrows: _objectSpread({}, _this.state.arrows, arrows)
      });
      if (typeof autoPlay !== "undefined") _this.setState({
        autoPlay: _objectSpread({}, _this.state.autoPlay, autoPlay)
      });
      if (typeof center !== "undefined") _this.setState({
        center: center
      });
      if (typeof draggable !== "undefined") _this.setState({
        draggable: draggable
      });
      if (typeof fitToContainer !== "undefined") _this.setState({
        fitToContainer: fitToContainer
      });
      if (typeof recurrence !== "undefined") _this.setMinimumRecurrence(recurrence);
      if (typeof rotateable !== "undefined") _this.setState({
        rotateable: rotateable
      });
      if (typeof startNumber !== "undefined") _this.setState({
        startNumber: startNumber
      });
      if (typeof vertical !== "undefined") _this.setState({
        vertical: vertical
      });
    };

    _this.chooseSettings = function () {
      var _this$state3 = _this.state,
          siteHeight = _this$state3.siteHeight,
          siteWidth = _this$state3.siteWidth;
      var responsive = _this.props.responsive;

      _this.setSettings(_this.props); //Choose responsive setup


      if (responsive && responsive.length > 0) {
        //Go thorugh all settings
        //If site is bigger leave
        for (var i = 0; i < responsive.length; i++) {
          //If vertical setup check by height
          if (responsive[i].vertical) {
            //BreakPoint must be bigger than site height
            if (responsive[i].breakPoint > siteHeight) {
              _this.setSettings(_this.props.responsive[i]);
            }
          } //horizontal setup
          else {
              //BreakPoint must be bigger than site width
              if (responsive[i].breakPoint > siteWidth) {
                _this.setSettings(_this.props.responsive[i]);
              }
            }
        }
      }
    };

    _this.sliderIsFocused = function (status) {
      _this.sliderNotFocused = !status;
    };

    _this.sliderSetup = function () {
      var _this$props = _this.props,
          children = _this$props.children,
          rotateable = _this$props.rotateable;

      _this.setState({
        children: children,
        allChildren: children
      });

      _this.firstSlide = rotateable ? 2 * children.length : 0;

      _this.chooseSettings();

      _this.handledEvents();

      setTimeout(function () {
        _this.setSlidesClassNames();

        _this.autoStart();
      }, 100);
    };

    _this.autoStart = function () {
      var _this$state4 = _this.state,
          autoPlay = _this$state4.autoPlay,
          rotateable = _this$state4.rotateable;

      if (autoPlay.on && rotateable) {
        _this.autoPlay = setInterval(function () {
          if (_this.sliderNotFocused) {
            if (autoPlay.leftOrUp) _this.rotateableMoveSliderLeft();else _this.rotateableMoveSliderRight();
          }
        }, autoPlay.time);
      }
    };

    _this.renderSlides = function () {
      var _this$state5 = _this.state,
          children = _this$state5.children,
          rotateable = _this$state5.rotateable,
          arrows = _this$state5.arrows;

      var rotationLeft = function rotationLeft() {
        return rotateable ? _this.rotateableMoveSliderLeft() : _this.nonRotateableMoveSliderLeft();
      };

      var rotationRight = function rotationRight() {
        return rotateable ? _this.rotateableMoveSliderRight() : _this.nonRotateableMoveSliderRight();
      };

      _this.recurrence = _this.setMinimumRecurrence();
      var table = [];

      for (var i = 0; i < _this.recurrence; i++) {
        table.push(i);
      }

      setTimeout(function () {
        _this.setSliderStyles();

        setTimeout(function () {
          _this.setSlidesClassNames();
        }, 100);
      }, 100);

      if (arrows.show) {
        return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement("div", {
          id: _this.sliderWrapperId,
          onMouseOver: function onMouseOver() {
            return _this.sliderIsFocused(true);
          },
          onMouseOut: function onMouseOut() {
            return _this.sliderIsFocused(false);
          }
        }, _react.default.createElement("div", {
          id: _this.sliderInnerWrapperId
        }, table.map(function () {
          return children.map(function (child) {
            return _react.default.createElement("div", {
              key: (0, _uuid.v4)()
            }, child);
          });
        }))), _react.default.createElement("div", {
          style: _objectSpread({}, arrows.left.styles),
          onClick: function onClick() {
            return rotationLeft();
          }
        }, arrows.left.content), _react.default.createElement("div", {
          style: _objectSpread({}, arrows.right.styles),
          onClick: function onClick() {
            return rotationRight();
          }
        }, arrows.right.content));
      } else return _react.default.createElement("div", {
        id: _this.sliderWrapperId,
        onMouseOver: function onMouseOver() {
          return _this.sliderIsFocused(true);
        },
        onMouseOut: function onMouseOut() {
          return _this.sliderIsFocused(false);
        }
      }, _react.default.createElement("div", {
        id: _this.sliderInnerWrapperId
      }, table.map(function () {
        return children.map(function (child) {
          return _react.default.createElement("div", {
            key: (0, _uuid.v4)()
          }, child);
        });
      })));
    };

    _this.sliderWrapperId = (0, _uuid.v4)();
    _this.sliderInnerWrapperId = (0, _uuid.v4)();
    var _siteWidth = 0;
    var _siteHeight = 0;
    _siteWidth = window.innerWidth;
    _siteHeight = window.innerHeight;
    _this.allChildrenLength = 0;
    _this.allowToDrag = false;
    _this.attractableSlider = false;
    _this.autoPlay = "";
    _this.endingLines = [];
    _this.firstSlide = 0;
    _this.positionMover = 0;
    _this.previousMousePosition = {
      x: 0,
      y: 0
    };
    _this.recurrence = 5;
    _this.singleChildrenSetLength = 0;
    _this.sliderNotFocused = true;
    _this.sliderWidth = 0;
    _this.sliderPosition = 0;
    _this.state = {
      allChildren: [],
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
      center: false,
      children: [],
      draggable: true,
      fitToContainer: true,
      rotateable: true,
      siteHeight: _siteHeight,
      siteWidth: _siteWidth,
      vertical: false
    };
    return _this;
  }

  _createClass(Slider, [{
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var _this2 = this;

      var slider = document.getElementById(this.sliderWrapperId);
      window.removeEventListener("resize", function () {
        return _this2.getSiteSize();
      });
      window.removeEventListener("resize", function () {
        return _this2.chooseSettings();
      });
      window.removeEventListener("mousemove", function () {
        return _this2.followMouse();
      });
      window.removeEventListener("mouseup", function () {
        return _this2.stopDragSlider();
      });
      window.removeEventListener("touchmove", function () {
        return _this2.followMouse();
      });
      window.removeEventListener("touchend", function () {
        return _this2.stopDragSlider();
      });
      slider.removeEventListener("mousedown", function () {
        return _this2.dragSlider();
      });
      slider.removeEventListener("touchstart", function () {
        return _this2.dragSlider();
      });
      clearInterval(this.autoPlay);
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.sliderSetup();
    }
  }, {
    key: "render",
    value: function render() {
      //SSR check if window exists
      if (typeof window === "undefined") return _react.default.createElement(_react.default.Fragment, null, "Window error");
      return this.renderSlides();
    }
  }]);

  return Slider;
}(_react.default.Component);

exports.default = Slider;
