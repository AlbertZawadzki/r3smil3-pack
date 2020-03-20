const sliderSetting = {
  fitToContainer: true,
  startNumber: 0,
  draggable: true,
  vertical: false,
  rotateable: true,
  arrows: {
    left: {
      content: <div>left</div>,
      styles: { backgroundColor: "red" },
    },
    right: {
      content: <div>right</div>,
      styles: { backgroundColor: "lime" },
    },
  },
  showArrows: true,
  autoPlay: false,
  autoPlayLeftOrUp: false,
  autoPlayTime: 5000,

  responsive: [
    {
      breakPoint: 1300,
    },
    {
      breakPoint: 1200,
    },
  ],
}
