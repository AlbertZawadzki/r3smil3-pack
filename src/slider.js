import React from "react";
import { v4 } from "uuid";

export default class Slider extends React.Component {
  constructor(props) {
    super(props);

    this.sliderWrapperId = v4();
    this.sliderInnerWrapperId = v4();

    let siteWidth = 0;
    let siteHeight = 0;
    siteWidth = window.innerWidth;
    siteHeight = window.innerHeight;

    this.allChildrenLength = 0;
    this.allowToDrag = false;
    this.attractableSlider = false;
    this.autoPlay = "";
    this.endingLines = [];
    this.firstSlide = 0;
    this.positionMover = 0;
    this.previousMousePosition = { x: 0, y: 0 };
    this.recurrence = 5;
    this.singleChildrenSetLength = 0;
    this.sliderNotFocused = true;
    this.sliderWidth = 0;
    this.sliderPosition = 0;

    this.state = {
      allChildren: [],
      arrows: {
        show: true,
        left: { content: "Left", styles: {} },
        right: { content: "Right", styles: {} }
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
      siteHeight,
      siteWidth,
      vertical: false
    };
  }

  getSiteSize = () => {
    let siteWidth = 0;
    let siteHeight = 0;
    siteWidth = window.innerWidth;
    siteHeight = window.innerHeight;
    this.setState({ siteHeight, siteWidth });
  };

  handledEvents = () => {
    window.addEventListener("resize", () => this.getSiteSize());
    window.addEventListener("resize", () => this.chooseSettings());
    window.addEventListener("mousemove", () => this.followMouse());
    window.addEventListener("mouseup", () => this.stopDragSlider());
    window.addEventListener("touchmove", () => this.followMouse());
    window.addEventListener("touchend", () => this.stopDragSlider());
  };

  dragSlider = () => {
    this.allowToDrag = true;
    this.attractableSlider = false;
  };

  stopDragSlider = () => {
    this.allowToDrag = false;
    this.attractableSlider = true;

    setTimeout(() => {
      this.allowToDrag = false;
      this.attractableSlider = true;
      this.setSlidesClassNames();
    }, 100);
  };

  attractSlider = () => {
    let slider = document.getElementById(this.sliderWrapperId);
    let slidesWrapper = slider.childNodes[0];
    const { vertical, rotateable } = this.state;

    let items = slidesWrapper.childNodes;
    this.endingLines = [0];
    let start = 0;

    //Calculate slides break points
    for (let i = 0; i < items.length; i++) {
      start += vertical ? items[i].offsetHeight : items[i].offsetWidth;

      this.endingLines.push(start);
    }

    let closest = {
      smaller: { length: 0, pos: 0 },
      larger: { length: Infinity, pos: 0 },
      exact: { pos: 0, found: false }
    };

    //Find closest one
    for (let i = 0; i < this.endingLines.length; i++) {
      if (this.endingLines[i] === -this.sliderPosition) {
        closest.exact.pos = i;
        closest.exact.found = true;
        break;
      }

      if (this.endingLines[i] < -this.sliderPosition) {
        closest.smaller.length = Math.abs(
          this.endingLines[i] + this.sliderPosition
        );
        closest.smaller.pos = i;
      } else if (this.endingLines[i] > -this.sliderPosition) {
        closest.larger.length = Math.abs(
          this.endingLines[i] + this.sliderPosition
        );
        closest.larger.pos = i;
        break;
      }
    }

    let minimum;

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
      setTimeout(() => {
        if (minimum === 0) {
          let closestSlide;
          if (this.firstSlide >= 3 * (items.length / this.recurrence)) {
            this.firstSlide = items.length / this.recurrence;
            slidesWrapper.style.transition = "0s";
            closestSlide = this.endingLines[this.firstSlide];
            this.sliderPosition = closestSlide;

            slidesWrapper.style.transform = vertical
              ? "translateY(" + -this.sliderPosition + "px)"
              : "translateX(" + -this.sliderPosition + "px)";

            setTimeout(() => {
              slidesWrapper.style.transition = "0.25s";
            }, 100);
          } else if (this.firstSlide <= items.length / this.recurrence) {
            this.firstSlide = 3 * (items.length / this.recurrence);
            slidesWrapper.style.transition = "0s";
            closestSlide = this.endingLines[this.firstSlide];
            this.sliderPosition = closestSlide;

            slidesWrapper.style.transform = vertical
              ? "translateY(" + -this.sliderPosition + "px)"
              : "translateX(" + -this.sliderPosition + "px)";

            setTimeout(() => {
              slidesWrapper.style.transition = "0.25s";
            }, 100);
          } else {
            closestSlide = this.endingLines[this.firstSlide];
            this.sliderPosition = closestSlide;
            closestSlide = this.endingLines[this.firstSlide];
            this.sliderPosition = closestSlide;

            slidesWrapper.style.transform = vertical
              ? "translateY(" + -this.sliderPosition + "px)"
              : "translateX(" + -this.sliderPosition + "px)";

            slidesWrapper.style.transition = "0.25s";
          }
        } else if (this.attractableSlider) {
          this.firstSlide = minimum;
          let closestSlide;
          if (this.firstSlide >= 3 * (items.length / this.recurrence)) {
            this.firstSlide = items.length / this.recurrence;
            slidesWrapper.style.transition = "all 0s";
            closestSlide = this.endingLines[this.firstSlide];
            this.sliderPosition = closestSlide;

            slidesWrapper.style.transform = vertical
              ? "translateY(" + -this.sliderPosition + "px)"
              : "translateX(" + -this.sliderPosition + "px)";

            setTimeout(() => {
              slidesWrapper.style.transition = "0.25s";
            }, 100);
          } else if (this.firstSlide <= items.length / this.recurrence) {
            this.firstSlide = 3 * (items.length / this.recurrence);
            slidesWrapper.style.transition = "all 0s";

            closestSlide = this.endingLines[this.firstSlide];
            this.sliderPosition = closestSlide;

            slidesWrapper.style.transform = vertical
              ? "translateY(" + -this.sliderPosition + "px)"
              : "translateX(" + -this.sliderPosition + "px)";

            setTimeout(() => {
              slidesWrapper.style.transition = "0.25s";
            }, 100);
          } else {
            closestSlide = this.endingLines[this.firstSlide];
            this.sliderPosition = closestSlide;

            slidesWrapper.style.transform = vertical
              ? "translateY(" + -this.sliderPosition + "px)"
              : "translateX(" + -this.sliderPosition + "px)";
            slidesWrapper.style.transition = "0.25s";
          }
        }
      }, 250);
    } else {
      this.firstSlide = minimum;
      setTimeout(() => {
        if (this.attractableSlider) {
          let closestSlide = this.endingLines[this.firstSlide];

          if (this.sliderWidth > this.allChildrenLength - closestSlide) {
            closestSlide -=
              closestSlide + this.sliderWidth - this.allChildrenLength;
          }

          this.sliderPosition = closestSlide;
          slidesWrapper.style.transform = vertical
            ? "translateY(" + -closestSlide + "px)"
            : "translateX(" + -closestSlide + "px)";
        }
      }, 250);
    }
  };

  setSlidesClassNames = () =>
    setTimeout(() => {
      const { vertical } = this.state;
      let slider = document.getElementById(this.sliderWrapperId);
      let slidesWrapper = slider.childNodes[0];
      let slides = slidesWrapper.childNodes;

      let minimum = Infinity;
      for (let i = 0; i < slides.length; i++) {
        let slidePosition;
        let nextSlidePosition;

        if (vertical) {
          slidePosition = slides[i].getBoundingClientRect().top;
          nextSlidePosition =
            slides[i].getBoundingClientRect().top + slides[i].offsetHeight;
        } else {
          slidePosition = slides[i].getBoundingClientRect().left;
          nextSlidePosition =
            slides[i].getBoundingClientRect().left + slides[i].offsetWidth;
        }

        if (slidePosition > 0 && nextSlidePosition < this.sliderWidth) {
          if (minimum > i) {
            minimum = i;
          }
          slides[i].className = "slide-visible";
        } else if (slidePosition > 0 && slidePosition < this.sliderWidth)
          slides[i].className = "slide-partial";
        else slides[i].className = "slide-invisible";
      }
    }, 100);

  followMouse = () => {
    let { vertical } = this.state;

    //Nothing should move
    if (this.allChildrenLength < this.sliderWidth) return;

    let currentMousePosition = {
      x: window.event.clientX,
      y: window.event.clientY
    };

    //Tacticle
    if (window.event.touches !== undefined) {
      currentMousePosition = {
        x: window.event.touches[0].clientX,
        y: window.event.touches[0].clientY
      };
    }

    let slider = document.getElementById(this.sliderWrapperId);
    let slidesWrapper = slider.childNodes[0];

    if (this.allowToDrag) {
      if (vertical) {
        //Vertical movement
        let movement = currentMousePosition.y - this.previousMousePosition.y;

        //Tactile handling
        if (window.event.touches !== undefined) {
          movement =
            currentMousePosition.y > this.previousMousePosition.y ? 12 : -12;
        }

        let previousPositionY =
          slidesWrapper.style.transform.split("(")[1].split("px)")[0] * 1.0;

        let newPositionY = movement + previousPositionY;

        slidesWrapper.style.transition = "transform 0s ease-in-out";
        slidesWrapper.style.transform = "translateY(" + newPositionY + "px)";
        this.sliderPosition = newPositionY;

        setTimeout(() => {
          slidesWrapper.style.transition = "transform 0.25s ease-in-out";
        }, 100);
      } else {
        //Horizontal movement
        let movement = currentMousePosition.x - this.previousMousePosition.x;

        //Tactile handling
        if (window.event.touches !== undefined) {
          movement =
            currentMousePosition.x > this.previousMousePosition.x ? 12 : -12;
        }

        let previousPositionX =
          slidesWrapper.style.transform.split("(")[1].split("px)")[0] * 1.0;

        let newPositionX = movement + previousPositionX;

        slidesWrapper.style.transition = "transform 0s ease-in-out";
        slidesWrapper.style.transform = "translateX(" + newPositionX + "px)";
        this.sliderPosition = newPositionX;

        setTimeout(() => {
          slidesWrapper.style.transition = "transform 0.25s ease-in-out";
        }, 100);
      }

      this.attractSlider();
    }

    this.previousMousePosition = currentMousePosition;
  };

  componentWillUnmount() {
    const slider = document.getElementById(this.sliderWrapperId);

    window.removeEventListener("resize", () => this.getSiteSize());
    window.removeEventListener("resize", () => this.chooseSettings());
    window.removeEventListener("mousemove", () => this.followMouse());
    window.removeEventListener("mouseup", () => this.stopDragSlider());
    window.removeEventListener("touchmove", () => this.followMouse());
    window.removeEventListener("touchend", () => this.stopDragSlider());
    slider.removeEventListener("mousedown", () => this.dragSlider());
    slider.removeEventListener("touchstart", () => this.dragSlider());
    clearInterval(this.autoPlay);
  }

  setSliderStyles = () => {
    let {
      center,
      draggable,
      fitToContainer,
      rotateable,
      vertical
    } = this.state;

    let parentSize = 0;
    this.allChildrenLength = 0;
    this.singleChildrenSetLength = 0;

    let slider = document.getElementById(this.sliderWrapperId);

    //get max size of slider
    if (slider !== null) {
      if (vertical) {
        parentSize = slider.parentElement.offsetHeight;
      } else {
        parentSize = slider.parentElement.offsetWidth;
      }
    }

    let slidesWrapper;
    let slides;

    if (slider !== null) {
      slidesWrapper = slider.childNodes[0];
      slides = slidesWrapper.childNodes;

      for (let i = 0; i < slides.length; i++) {
        //Get all items repe
        if (i < slides.length / this.recurrence) {
          this.singleChildrenSetLength += vertical
            ? slides[i].offsetHeight
            : slides[i].offsetWidth;
        }

        if (rotateable) {
          if (i < slides.length / this.recurrence) {
            this.allChildrenLength += vertical
              ? slides[i].offsetHeight
              : slides[i].offsetWidth;
          }
        } else {
          this.allChildrenLength += vertical
            ? slides[i].offsetHeight
            : slides[i].offsetWidth;
        }

        slides[i].style.width = "auto";
        slides[i].style.height = "auto";
        slides[i].style.margin = center ? "auto" : "initial";
      }

      this.sliderWidth = vertical ? slider.offsetHeight : slider.offsetWidth;

      if (slider && draggable) {
        slider.addEventListener("mousedown", () => this.dragSlider());
        slider.addEventListener("touchstart", () => this.dragSlider());
      }

      this.positionMover = (this.recurrence - 1) / 2;
      this.sliderPosition = this.positionMover * this.allChildrenLength;

      //Styling slides wrapper
      slidesWrapper.style.width = "100%";
      slidesWrapper.style.height = "100%";
      slidesWrapper.style.display = "flex";
      slidesWrapper.style.flexDirection = vertical ? "column" : "row";
      slidesWrapper.style.justifyContent = false
        ? "space-evenly"
        : "flex-start";
      slidesWrapper.style.transition = "transform 0.25s ease-in-out";
      slidesWrapper.style.transform = vertical
        ? "translateY(0px)"
        : "translateX(0px)";

      //Styling slider
      slider.style.width = fitToContainer
        ? !vertical
          ? "100%"
          : `${parentSize}px`
        : "auto";
      slider.style.height = fitToContainer
        ? vertical
          ? `${parentSize}px`
          : "100%"
        : "auto";
      slider.style.overflow = fitToContainer ? "hidden" : "visible";
    }
  };

  nonRotateableMoveSliderLeft = () => {
    const { vertical } = this.state;
    let slider = document.getElementById(this.sliderWrapperId);
    let slidesWrapper = slider.childNodes[0];
    let slide;
    let movement;

    if (this.firstSlide === 0) {
      movement = 0;
    } else {
      slide = slidesWrapper.childNodes[--this.firstSlide];
      movement = vertical ? slide.offsetHeight : slide.offsetWidth;
    }

    this.sliderPosition = movement - this.sliderPosition;

    slidesWrapper.style.transform = vertical
      ? "translateY(" + this.sliderPosition + "px)"
      : "translateX(" + this.sliderPosition + "px)";

    setTimeout(() => {
      this.attractSlider();
      this.setSlidesClassNames();
    }, 100);
  };

  nonRotateableMoveSliderRight = () => {
    const { vertical } = this.state;
    let slider = document.getElementById(this.sliderWrapperId);
    let slidesWrapper = slider.childNodes[0];
    let slide;
    let movement;

    if (this.firstSlide === slidesWrapper.childNodes.length - 1) {
      movement = 0;
    } else {
      slide = slidesWrapper.childNodes[this.firstSlide++];
      movement = vertical ? slide.offsetHeight : slide.offsetWidth;
    }

    this.sliderPosition = -this.sliderPosition - movement;

    slidesWrapper.style.transform = vertical
      ? "translateY(" + this.sliderPosition + "px)"
      : "translateX(" + this.sliderPosition + "px)";

    setTimeout(() => {
      this.attractSlider();
      this.setSlidesClassNames();
    }, 260);
  };

  rotateableMoveSliderLeft = () => {
    const { vertical } = this.state;
    let slider = document.getElementById(this.sliderWrapperId);
    let slidesWrapper = slider.childNodes[0];
    let slide = slidesWrapper.childNodes[--this.firstSlide];
    let movement = vertical ? slide.offsetHeight : slide.offsetWidth;

    this.sliderPosition -= movement;

    slidesWrapper.style.transform = vertical
      ? "translateY(" + -this.sliderPosition + "px)"
      : "translateX(" + -this.sliderPosition + "px)";

    setTimeout(() => {
      this.attractSlider();
      this.setSlidesClassNames();
    }, 260);
  };

  rotateableMoveSliderRight = () => {
    const { vertical } = this.state;
    let slider = document.getElementById(this.sliderWrapperId);
    let slidesWrapper = slider.childNodes[0];
    let slide = slidesWrapper.childNodes[this.firstSlide++];
    let movement = vertical ? slide.offsetHeight : slide.offsetWidth;

    this.sliderPosition += movement;

    slidesWrapper.style.transform = vertical
      ? "translateY(" + -this.sliderPosition + "px)"
      : "translateX(" + -this.sliderPosition + "px)";

    setTimeout(() => {
      this.attractSlider();
      this.setSlidesClassNames();
    }, 260);
  };

  setMinimumRecurrence = recurrence => {
    const { rotateable } = this.state;

    if (!rotateable) this.recurrence = 1;
    else if (recurrence > this.recurrence) this.recurrence = recurrence;
    else this.recurrence = 5;

    return this.recurrence;
  };

  setSettings = settings => {
    const {
      arrows,
      autoPlay,
      center,
      draggable,
      fitToContainer,
      recurrence,
      rotateable,
      startNumber,
      vertical
    } = settings;

    if (typeof arrows !== "undefined")
      this.setState({ arrows: { ...this.state.arrows, ...arrows } });
    if (typeof autoPlay !== "undefined")
      this.setState({ autoPlay: { ...this.state.autoPlay, ...autoPlay } });
    if (typeof center !== "undefined") this.setState({ center });
    if (typeof draggable !== "undefined") this.setState({ draggable });
    if (typeof fitToContainer !== "undefined")
      this.setState({ fitToContainer });
    if (typeof recurrence !== "undefined")
      this.setMinimumRecurrence(recurrence);
    if (typeof rotateable !== "undefined") this.setState({ rotateable });
    if (typeof startNumber !== "undefined") this.setState({ startNumber });
    if (typeof vertical !== "undefined") this.setState({ vertical });
  };

  chooseSettings = () => {
    const { siteHeight, siteWidth } = this.state;
    const { responsive } = this.props;
    this.setSettings(this.props);

    //Choose responsive setup
    if (responsive && responsive.length > 0) {
      //Go thorugh all settings
      //If site is bigger leave
      for (let i = 0; i < responsive.length; i++) {
        //If vertical setup check by height
        if (responsive[i].vertical) {
          //BreakPoint must be bigger than site height
          if (responsive[i].breakPoint > siteHeight) {
            this.setSettings(this.props.responsive[i]);
          }
        }
        //horizontal setup
        else {
          //BreakPoint must be bigger than site width
          if (responsive[i].breakPoint > siteWidth) {
            this.setSettings(this.props.responsive[i]);
          }
        }
      }
    }
  };

  sliderIsFocused = status => {
    this.sliderNotFocused = !status;
  };

  sliderSetup = () => {
    const { children, rotateable } = this.props;
    this.setState({ children, allChildren: children });
    this.firstSlide = rotateable ? 2 * children.length : 0;
    this.chooseSettings();
    this.handledEvents();

    setTimeout(() => {
      this.setSlidesClassNames();
      this.autoStart();
    }, 100);
  };

  componentDidMount() {
    this.sliderSetup();
  }

  autoStart = () => {
    const { autoPlay, rotateable } = this.state;

    if (autoPlay.on && rotateable) {
      this.autoPlay = setInterval(() => {
        if (this.sliderNotFocused) {
          if (autoPlay.leftOrUp) this.rotateableMoveSliderLeft();
          else this.rotateableMoveSliderRight();
        }
      }, autoPlay.time);
    }
  };

  renderSlides = () => {
    let { children, rotateable, arrows } = this.state;

    let rotationLeft = () =>
      rotateable
        ? this.rotateableMoveSliderLeft()
        : this.nonRotateableMoveSliderLeft();
    let rotationRight = () =>
      rotateable
        ? this.rotateableMoveSliderRight()
        : this.nonRotateableMoveSliderRight();

    this.recurrence = this.setMinimumRecurrence();

    let table = [];
    for (let i = 0; i < this.recurrence; i++) {
      table.push(i);
    }

    setTimeout(() => {
      this.setSliderStyles();
      setTimeout(() => {
        this.setSlidesClassNames();
      }, 100);
    }, 100);

    if (arrows.show) {
      return (
        <>
          <div
            id={this.sliderWrapperId}
            onMouseOver={() => this.sliderIsFocused(true)}
            onMouseOut={() => this.sliderIsFocused(false)}
          >
            <div id={this.sliderInnerWrapperId}>
              {table.map(() =>
                children.map(child => <div key={v4()}>{child}</div>)
              )}
            </div>
          </div>
          <div style={{ ...arrows.left.styles }} onClick={() => rotationLeft()}>
            {arrows.left.content}
          </div>
          <div
            style={{ ...arrows.right.styles }}
            onClick={() => rotationRight()}
          >
            {arrows.right.content}
          </div>
        </>
      );
    } else
      return (
        <div
          id={this.sliderWrapperId}
          onMouseOver={() => this.sliderIsFocused(true)}
          onMouseOut={() => this.sliderIsFocused(false)}
        >
          <div id={this.sliderInnerWrapperId}>
            {table.map(() =>
              children.map(child => <div key={v4()}>{child}</div>)
            )}
          </div>
        </div>
      );
  };

  render() {
    //SSR check if window exists
    if (typeof window === "undefined") return <>Window error</>;

    return this.renderSlides();
  }
}
