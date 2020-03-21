# r3smil3-pack

My own ReactJS components

<h1>Info</h1>
<table>
<tr>
<td>
<img src="https://img.shields.io/github/issues/AlbertZawadzki/r3smil3-pack">
</td>
<td>
<img src="https://img.shields.io/github/forks/AlbertZawadzki/r3smil3-pack">
</td>
<td>
<img src="https://img.shields.io/github/stars/AlbertZawadzki/r3smil3-pack">
</td>
<td>
<img src="https://img.shields.io/github/license/AlbertZawadzki/r3smil3-pack">
</td>
</tr>
</table>
<h1>What's in here</h1>
My own ReactJS components, currently in the pack:<br/>
<ol><li><a href="#slider">Slider</a></li></ol>

<h1 id="slider">Slider</h1>
<table>
<tr>
  <td colspan='4'>
    <h2>
      All passable props
    </h2>
  </td>
</tr>
  <tr>
    <td>
      Prop name
    </td>
    <td>
      Prop type
    </td>
    <td>
      Default value
    </td>
    <td>
      Description
    </td>
  </tr>
  <tr>
    <td>
      arrows
    </td>
    <td>
    <pre>Object: {
  show: Boolean,
  left: {
    content: Object || String,
    styles: Object
  },
  right: {
    content: Object || String,
    styles: Object
  }
}</pre>
    </td>
    <td>
      <pre>{
  show: true,
  left: {
    content: "Left",
    styles: {}
  },
  right: {
    content: "Right",
    styles: {}
  }
}</pre>
    </td>
    <td>
      Sets styling and content of arrows
    </td>
  </tr>
  <tr>
    <td>
      autoPlay
    </td>
    <td>
      <pre>Object: {
  on: Boolean,
  leftOrUp: Boolean,
  time: Integer
}</pre>
    </td>
    <td>
      <pre>{
  on: false,
  leftOrUp: false,
  time: 5000
}</pre>
    </td>
    <td>
     Sets slider autoplay, frequency of slides changing and autosliding up (if slider is vertical) or left (if slider is horizontal)
    </td>
  </tr>
   <tr>
    <td>
      center
    </td>
    <td>
     Boolean
    </td>
    <td><pre>false</pre>
    </td>
    <td>
     Centers all items vertically and horizontally
    </td>
  </tr>
   <tr>
    <td>
      children
    </td>
    <td>
     Objects
    </td>
    <td><pre>null</pre>
    </td>
    <td>
     What will be displayed as slides
    </td>
  </tr>
   <tr>
    <td>
      draggable
    </td>
    <td>
     Boolean
    </td>
    <td><pre>true</pre>
    </td>
    <td>
     Sets if slider should react on touching and dragging
    </td>
  </tr>
   <tr>
    <td>
      fitToContainer
    </td>
    <td>
     Boolean
    </td>
    <td><pre>true</pre>
    </td>
    <td>
     Sets sliders width and height to 100% of sliders wrapper and hides everything outside of it
    </td>
  </tr>
   <tr>
    <td>
      recurrence
    </td>
    <td>
     Integer > 5
    </td>
    <td><pre>rotateable ? recurrence > this.recurrence ? recurrence : 5 : 1</pre>
    </td>
    <td>
     If slider is rotateable and new recurrence is greater than 5 sets it up
    </td>
  </tr>
  <tr>
    <td>
      responsive
    </td>
    <td><pre>Array:[
  {
    breakPoint:Integer,
    otherAvaibleSliderSettings
  },
]</pre>
    </td>
    <td><pre>null</pre>
    </td>
    <td>
     Sets breakpoints to change settings dependlingly on siteHeight (if slider is vertical) or siteWidth (if slider is horizontal)
    </td>
  </tr>
   <tr>
    <td>
      rotateable
    </td>
    <td>
     Boolean
    </td>
    <td><pre>true</pre>
    </td>
    <td>
     Sets if slider should be infinitly rotating
    </td>
  </tr>
   <tr>
    <td>
      vertical
    </td>
    <td>
     Boolean
    </td>
    <td><pre>false</pre>
    </td>
    <td>
     Sets slides vertically
    </td>
  </tr>
</table>
