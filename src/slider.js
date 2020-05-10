import React from "react";
import { v4 } from "uuid";

export default class Slider extends React.Component {
  constructor(props) {
    super(props);

    /* GENERAL SLIDER ITEMS */
    this.allowToDrag = false; //Allow to drag items
    this.autoPlay = "Function that automatically changes slides"; //Function that automatically changes slides
    this.attractableSlider = false; //Allow slider to get to closest divs end
    this.firstSlide = 0; //Currently first slide
    this.oneSlidesSetLength = 0; //All unique slides length
    this.parentSize = 0; //Sliders parent size
    this.positionMover = 0; //(this.recurrence - 1) / 2 - Defines all breakpoints to fake inifity sliding effect
    this.previousPointerPosition = 0; //Defines previous pointing device position
    this.recurrence = 5; //Initial number of slides sets
    this.siteHeight = 0; //Site height
    this.siteWidth = 0; //Site width
    this.slider = "Slider wrapper"; //Slider
    this.sliderNotFocused = true; //Defines if mouse is over the slider
    this.sliderId = v4(); //Unique slider id
    this.sliderPosition = 0; //Defines how much has the slider moved
    this.sliderRealPosition = 0; //Defines how much has the slider moved relativily
    this.sliderSize = 0; //Defines the width  or height of slider
    this.slides = "Slides"; //Slides
    this.slidesBreaks = []; //All slides endings
    this.slidesWrapper = "Slides wrapper"; //Slides wrapper
    this.slidesWrapperId = v4(); //Unique slides wrapper id
    this.slidesWrapperSize = 0; //Slides wrapper size

    this.state = {
      /* DEFAULT SLIDER SETTINGS */
      arrows: {
        show: true,
        left: { content: "Left", styles: {} },
        right: { content: "Right", styles: {} },
      },
      autoPlay: {
        on: false,
        leftOrUp: false,
        time: 5000,
      },
      center: {
        horizontally: false,
        vertically: true,
      },
      children: [],
      draggable: true,
      fitToContainer: true,
      rotatable: true,
      vertical: false,
      /* IMPORTANT SITE DATA */
      siteHasLoaded: false, //Defines if all necessery data has loaded
    };
  }

  /* COMPONENT INITIALISING */

  setSiteSize = () => {
    if (typeof window === "undefined") return;
    this.siteHeight = window.innerHeight;
    this.siteWidth = window.innerWidth;
  };

  setCurrentSettings = (settings) => {
    let {
      arrows,
      autoPlay,
      center,
      draggable,
      fitToContainer,
      rotatable,
      startNumber,
      vertical,
    } = settings;

    if (typeof arrows !== "undefined")
      this.setState({ arrows: { ...this.state.arrows, ...arrows } });
    if (typeof autoPlay !== "undefined")
      this.setState({ autoPlay: { ...this.state.autoPlay, ...autoPlay } });
    if (typeof center !== "undefined")
      this.setState({ center: { ...this.state.center, ...center } });
    if (typeof draggable !== "undefined") this.setState({ draggable });
    if (typeof fitToContainer !== "undefined")
      this.setState({ fitToContainer });
    if (typeof rotatable !== "undefined") this.setState({ rotatable });
    if (typeof startNumber !== "undefined") this.setState({ startNumber });
    if (typeof vertical !== "undefined") this.setState({ vertical });
  };

  setSliderSettings = () => {
    //Set first global settings
    this.setCurrentSettings(this.props);
    const { responsive } = this.props;
    //Check if responsive settings are set
    if (responsive && responsive.length > 0) {
      for (let i = 0; i < responsive.length; i++) {
        if (
          (responsive[i].vertical &&
            responsive[i].breakPoint > this.siteHeight) ||
          responsive[i].breakPoint > this.siteWidth
        ) {
          this.setSettings(this.props.responsive[i]);
        }
      }
    }
  };

  resizeTasks = () => {
    this.setState({ siteHasLoaded: false });
    this.beforeMountTasks();
    this.afterMountTasks();
  };

  followPointer = () => {
    if (typeof window === "undefined") return;
    //Everything is visible
    if (this.sliderSize > this.oneSlidesSetLength) return;

    let { vertical } = this.state;

    //set current mouse position
    let currentPointerPosition = vertical
      ? window.event.clientY
      : window.event.clientX;
    //tacticle
    if (window.event.touches !== undefined) {
      currentPointerPosition = vertical
        ? window.event.touches[0].clientY
        : window.event.touches[0].clientX;
    }

    if (this.allowToDrag) this.moveSlider(currentPointerPosition);
    this.previousPointerPosition = currentPointerPosition;
  };

  stopFollowingPointer = () => {
    this.allowToDrag = false;
    this.attractableSlider = true;
  };

  beforeMountTasks = () => {
    //Get site size
    this.setSiteSize();
    //Setup slider
    this.setSliderSettings();
    //Set children
    const { children } = this.props;
    this.setState({ children });
  };

  /* COMPONENT MOUNTED */

  setRecurrence = () => {
    const { rotatable, vertical } = this.state;
    const { recurrence } = this.props;
    /*
     *      x < 1 - not enough sliders to be moved
     *  1 < x < 2 - more slides needed
     *  2 < x     - repeated 3 times should be ok.
     */

    const slidesToParentRatio = this.oneSlidesSetLength / this.parentSize;

    if (slidesToParentRatio < 1 || !rotatable) {
      this.recurrence = 1;
      this.setState({ rotatable: false });
    } else if (slidesToParentRatio < 2) {
      this.recurrence = recurrence > this.recurrence ? recurrence : 5;
    } else {
      this.recurrence = 3;
    }

    //Set position mover
    this.positionMover = (this.recurrence - 1) / 2;
  };

  setInitialSliderPosition = () => {
    this.sliderPosition =
      this.recurrence > 1 ? -this.positionMover * this.oneSlidesSetLength : 0;
    this.sliderRealPosition =
      this.recurrence > 1 ? this.positionMover * this.oneSlidesSetLength : 0;
  };

  autoStart = () => {
    const { autoPlay } = this.state;

    if (autoPlay.on && this.recurrence > 1) {
      this.autoPlay = setInterval(() => {
        if (this.sliderNotFocused) {
          if (autoPlay.leftOrUp) this.moveSliderLeft();
          else this.moveSliderRight();
        }
      }, autoPlay.time);
    }
  };

  setDragability = () => {
    const { draggable } = this.state;
    if (draggable) {
      this.slider.addEventListener("mousedown", () => this.dragSlider());
      this.slider.addEventListener("touchstart", () => this.dragSlider());
    }
  };

  getSlidesBreaks = () => {
    const { vertical } = this.state;
    this.slidesBreaks = [-this.positionMover * this.oneSlidesSetLength];
    let currentPosition = -this.positionMover * this.oneSlidesSetLength;

    for (let j = 0; j < this.recurrence; j++) {
      for (let i = 0; i < this.slides.childNodes.length; i++) {
        currentPosition += vertical
          ? this.slides.childNodes[i].childNodes[0].offsetHeight
          : this.slides.childNodes[i].childNodes[0].offsetWidth;

        this.slidesBreaks.push(currentPosition);
      }
    }
  };

  setListeners = () => {
    if (typeof window === "undefined") return;
    window.addEventListener("resize", () => this.resizeTasks());
    window.addEventListener("mousemove", () => this.followPointer());
    window.addEventListener("touchmove", () => this.followPointer());
    window.addEventListener("mouseup", () => this.stopFollowingPointer());
    window.addEventListener("touchend", () => this.stopFollowingPointer());
  };

  afterMountTasks = () => {
    const { vertical } = this.state;
    //Assign slider to a var
    this.slider = document.getElementById(this.sliderId);
    //Assign slides wrapper to a var
    this.slidesWrapper = this.slider.childNodes[0];
    //Set slides wrapper size
    this.slidesWrapperSize = vertical
      ? this.slidesWrapper.offsetHeight
      : this.slidesWrapper.offsetWidth;
    //Assign slides to a var
    this.slides = this.slider.childNodes[0];
    //Set one set of slides
    this.oneSlidesSetLength = 0;
    for (let i = 0; i < this.slides.childNodes.length; i++)
      this.oneSlidesSetLength += vertical
        ? this.slides.childNodes[i].childNodes[0].offsetHeight
        : this.slides.childNodes[i].childNodes[0].offsetWidth;
    //Get proper parent size
    this.parentSize = vertical
      ? this.slider.parentElement.offsetHeight
      : this.slider.parentElement.offsetWidth;
    //Set how many times the slides should be repeated
    this.setRecurrence();
    //Set startup slider position
    this.setInitialSliderPosition();
    //Allow draging slider
    this.setDragability();
    //Get all slides breakpoints
    this.getSlidesBreaks();
    //Setup all listeners
    this.setListeners();
    //Get first slides number
    this.firstSlide = this.positionMover * this.slides.childNodes.length;
    //Slider is ready to start
    this.setState({ siteHasLoaded: true });
    //Auto start sliding
    this.autoStart();
  };

  /* COMPONENT UPDATE */

  setSliderStyles = () => {
    const { center, fitToContainer, vertical } = this.state;

    //Styling slider wrapper
    this.slider.style.width = fitToContainer ? "100%" : "auto";
    this.slider.style.height = fitToContainer ? "100%" : "auto";
    this.slider.style.overflow = fitToContainer ? "hidden" : "visible";
    //Styling slides wrapper
    this.slidesWrapper.style.width = fitToContainer ? "100%" : "auto";
    this.slidesWrapper.style.height = fitToContainer ? "100%" : "auto";
    this.slidesWrapper.style.display = "flex";
    this.slidesWrapper.style.flexDirection = vertical ? "column" : "row";
    this.slidesWrapper.style.justifyContent =
      !vertical && center.horizontally ? "space-evenly" : "flex-start";
    this.slidesWrapper.style.alignContent =
      !vertical && center.vertically ? "space-around" : "start";
    this.slidesWrapper.style.transform = vertical
      ? `translateY(${this.sliderPosition}px)`
      : `translateX(${this.sliderPosition}px)`;
    this.slidesWrapper.style.transition = "transform 0.25s ease-in-out";

    //Styling slides
    for (let i = 0; i < this.slides.childNodes.length; i++) {
      this.slides.childNodes[i].display = "flex";
      this.slides.childNodes[i].style.width = "auto";
      this.slides.childNodes[i].style.height = "auto";

      //Proper centring
      if (center.horizontally && center.vertically) {
        this.slides.childNodes[i].style.margin = "auto";
      } else if (center.vertically) {
        this.slides.childNodes[i].style.margin = "auto 0";
      } else if (center.horizontally) {
        this.slides.childNodes[i].style.margin = "0 auto";
      } else {
        this.slides.childNodes[i].style.margin = "initial";
      }
    }
  };

  setSlidesClassNames = () => {
    const { vertical } = this.state;
    let firstSlidePartiallyVisible = false;

    for (let i = 0; i < this.slides.childNodes.length; i++) {
      //All slides have slide class name
      this.slides.childNodes[i].className = "slide ";

      let slidePosition = vertical
        ? this.slides.childNodes[i].getBoundingClientRect().top
        : this.slides.childNodes[i].getBoundingClientRect().left;
      let dimension = vertical
        ? this.slides.childNodes[i].offsetHeight
        : this.slides.childNodes[i].offsetWidth;

      //Slide is fully visible on site
      if (slidePosition >= 0 && slidePosition + dimension <= this.sliderSize) {
        this.slides.childNodes[i].className += "visible ";
      }
      //You can see only  end of a slide
      else if (
        slidePosition >= 0 &&
        slidePosition + dimension > this.sliderSize
      ) {
        this.slides.childNodes[i].className += "partial ";
      }
      //First slide is partially visible - block first className
      else if (slidePosition < 0 && slidePosition + dimension > 0) {
        this.slides.childNodes[i].className += "partial first ";
        firstSlidePartiallyVisible = true;
      }
      //Inivisble
      else {
        this.slides.childNodes[i].className += "invisible ";
      }
    }

    //Highlight first slide
    if (!firstSlidePartiallyVisible)
      this.slides.childNodes[this.firstSlide].className += "first ";
  };

  updateTasks = () => {
    const { vertical } = this.state;
    //All data is ready set styles
    this.setSliderStyles();
    //Set slider size
    this.sliderSize = vertical
      ? this.slider.offsetHeight
      : this.slider.offsetWidth;
    //Name all slides properly
    this.setSlidesClassNames();
  };

  /* COMPONENT LIFE */

  componentWillMount() {
    this.beforeMountTasks();
  }

  componentDidMount() {
    this.afterMountTasks();
  }

  componentDidUpdate() {
    this.updateTasks();
  }

  componentWillUnmount() {
    if (typeof window === "undefined") return;
    window.removeEventListener("resize", () => this.resizeTasks());
    window.removeEventListener("mousemove", () => this.followPointer());
    window.removeEventListener("touchmove", () => this.followPointer());
    window.removeEventListener("mouseup", () => this.stopFollowingPointer());
    window.removeEventListener("touchend", () => this.stopFollowingPointer());
    this.slider.removeEventListener("mousedown", () => this.dragSlider());
    this.slider.removeEventListener("touchstart", () => this.dragSlider());
    clearInterval(this.autoPlay);
  }

  /* SLIDER MOVEMENT */

  dragSlider = () => {
    this.allowToDrag = true;
    this.attractableSlider = false;
  };

  fakeInfinity = () => {
    /*
     * If slider is not recurrencial
     * block it on max position, setClosestSlide blocks at 0
     */
    const { children, rotatable, vertical } = this.state;

    if (this.recurrence === 1 || !rotatable) {
      if (this.sliderRealPosition > this.oneSlidesSetLength - this.sliderSize) {
        this.sliderPosition = this.sliderSize - this.oneSlidesSetLength;
        this.sliderRealPosition =
          this.oneSlidesSetLength - this.slider.offsetWidth;
        this.slidesWrapper.style.transition = "transform 0.25s";
        this.slidesWrapper.style.transform = vertical
          ? `translateY(${this.sliderPosition}px)`
          : `translateX(${this.sliderPosition}px)`;
      }
    } else {
      let maxItem = children.length * (this.recurrence - 1);
      let minItem = children.length;

      if (this.firstSlide <= minItem || this.firstSlide >= maxItem) {
        if (this.firstSlide <= minItem)
          this.firstSlide += this.positionMover * minItem;
        if (this.firstSlide >= maxItem)
          this.firstSlide -= this.positionMover * minItem;

        this.sliderPosition =
          -this.slidesBreaks[this.firstSlide] -
          this.positionMover * this.oneSlidesSetLength;

        this.sliderRealPosition = -this.sliderPosition;
        setTimeout(() => {
          this.slidesWrapper.style.transition = "transform 0s";
          this.slidesWrapper.style.transform = vertical
            ? `translateY(${this.sliderPosition}px)`
            : `translateX(${this.sliderPosition}px)`;
        }, 50);
      }
    }
    this.setSlidesClassNames();
  };

  setClosestSlide = () => {
    if (!this.attractableSlider) return;
    const { vertical } = this.state;

    let closestSlide;
    let minimum = Infinity;

    for (let i = 0; i < this.slides.childNodes.length; i++) {
      if (
        (vertical &&
          Math.abs(this.slides.childNodes[i].getBoundingClientRect().top) <
            minimum) ||
        (!vertical &&
          Math.abs(this.slides.childNodes[i].getBoundingClientRect().left) <
            minimum)
      ) {
        minimum = vertical
          ? Math.abs(this.slides.childNodes[i].getBoundingClientRect().top)
          : Math.abs(this.slides.childNodes[i].getBoundingClientRect().left);
        closestSlide = i;
      }
    }

    this.firstSlide = closestSlide;
    this.sliderRealPosition =
      this.slidesBreaks[closestSlide] +
      this.positionMover * this.oneSlidesSetLength;
    this.sliderPosition = -(
      this.slidesBreaks[closestSlide] +
      this.positionMover * this.oneSlidesSetLength
    );

    this.slidesWrapper.style.transition = "transform 0.25s";
    this.slidesWrapper.style.transform = vertical
      ? `translateY(${this.sliderPosition}px)`
      : `translateX(${this.sliderPosition}px)`;

    this.fakeInfinity();
  };

  moveSlider = (currentPointerPosition) => {
    if (typeof window === "undefined") return;
    const { vertical } = this.state;

    let movement = currentPointerPosition - this.previousPointerPosition;

    //tacticle handlign
    if (window.event.touches !== undefined) {
      movement =
        currentPointerPosition > this.previousPointerPosition ? 12 : -12;
    }

    this.sliderPosition += movement;
    this.sliderRealPosition += movement;

    this.slidesWrapper.style.transition = "transform 0s";
    this.slidesWrapper.style.transform = vertical
      ? `translateY(${this.sliderPosition}px)`
      : `translateX(${this.sliderPosition}px)`;

    //Needed for attractibily to set
    setTimeout(() => {
      this.slidesWrapper.style.transition = "transform 0.25s";
    }, 10);

    const findClosestSlide = setInterval(() => {
      if (this.attractableSlider) {
        this.setClosestSlide();
        clearInterval(findClosestSlide);
      }
    }, 100);
  };

  moveSliderLeft = () => {
    const { vertical } = this.state;
    this.attractableSlider = true;

    this.sliderRealPosition =
      this.slidesBreaks[--this.firstSlide] +
      this.positionMover * this.oneSlidesSetLength;
    this.sliderPosition = -(
      this.slidesBreaks[this.firstSlide] +
      this.positionMover * this.oneSlidesSetLength
    );

    this.slidesWrapper.style.transition = "transform 0.25s";
    this.slidesWrapper.style.transform = vertical
      ? `translateY(${this.sliderPosition}px)`
      : `translateX(${this.sliderPosition}px)`;

    this.attractableSlider = false;
    this.fakeInfinity();
  };

  moveSliderRight = () => {
    const { vertical } = this.state;
    this.attractableSlider = true;

    this.sliderRealPosition =
      this.slidesBreaks[++this.firstSlide] +
      this.positionMover * this.oneSlidesSetLength;
    this.sliderPosition = -(
      this.slidesBreaks[this.firstSlide] +
      this.positionMover * this.oneSlidesSetLength
    );

    this.slidesWrapper.style.transition = "transform 0.25s";
    this.slidesWrapper.style.transform = vertical
      ? `translateY(${this.sliderPosition}px)`
      : `translateX(${this.sliderPosition}px)`;

    this.attractableSlider = false;
    this.fakeInfinity();
  };

  sliderIsFocused = (status) => {
    this.sliderNotFocused = !status;
  };

  /*  RENDERING */

  renderArrows = () => {
    const { arrows } = this.state;

    if (!arrows.show) return <></>;
    return (
      <>
        <div
          onClick={() => this.moveSliderLeft()}
          style={{ ...arrows.left.styles }}
        >
          {arrows.left.content}
        </div>
        <div
          onClick={() => this.moveSliderRight()}
          style={{ ...arrows.right.styles }}
        >
          {arrows.right.content}
        </div>
      </>
    );
  };

  renderSlides = () => {
    let iterations = [];
    for (let i = 0; i < this.recurrence; i++) iterations.push(i);
    return iterations;
  };

  render() {
    const { children, siteHasLoaded } = this.state;
    //SSR check if window exists
    if (typeof window === "undefined") return <>Window error</>;

    const iteratedChildren = this.renderSlides();

    if (siteHasLoaded) {
      return (
        <div
          id={this.sliderId}
          style={{ background: "lightgray" }}
          onMouseOver={() => this.sliderIsFocused(true)}
          onMouseOut={() => this.sliderIsFocused(false)}
        >
          <div id={this.slidesWrapperId}>
            {iteratedChildren.map((iteration) =>
              children.map((child) => <div key={v4()}>{child}</div>)
            )}
          </div>
          {this.renderArrows()}
        </div>
      );
    } else {
      return (
        <div
          id={this.sliderId}
          onMouseOver={() => this.sliderIsFocused(true)}
          onMouseOut={() => this.sliderIsFocused(false)}
        >
          <div id={this.slidesWrapperId}>
            {children.map((child) => (
              <div key={v4()}>{child}</div>
            ))}
          </div>
          {this.renderArrows()}
        </div>
      );
    }
  }
}
