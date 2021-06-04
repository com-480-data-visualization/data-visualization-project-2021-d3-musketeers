"use strict";function _slicedToArray(t,e){return _arrayWithHoles(t)||_iterableToArrayLimit(t,e)||_unsupportedIterableToArray(t,e)||_nonIterableRest()}function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function _unsupportedIterableToArray(t,e){if(t){if("string"==typeof t)return _arrayLikeToArray(t,e);var a=Object.prototype.toString.call(t).slice(8,-1);return"Map"===(a="Object"===a&&t.constructor?t.constructor.name:a)||"Set"===a?Array.from(t):"Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a)?_arrayLikeToArray(t,e):void 0}}function _arrayLikeToArray(t,e){(null==e||e>t.length)&&(e=t.length);for(var a=0,r=new Array(e);a<e;a++)r[a]=t[a];return r}function _iterableToArrayLimit(t,e){var a=t&&("undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"]);if(null!=a){var r,i,n=[],s=!0,l=!1;try{for(a=a.call(t);!(s=(r=a.next()).done)&&(n.push(r.value),!e||n.length!==e);s=!0);}catch(t){l=!0,i=t}finally{try{s||null==a.return||a.return()}finally{if(l)throw i}}return n}}function _arrayWithHoles(t){if(Array.isArray(t))return t}function _classCallCheck(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function _defineProperties(t,e){for(var a=0;a<e.length;a++){var r=e[a];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function _createClass(t,e,a){return e&&_defineProperties(t.prototype,e),a&&_defineProperties(t,a),t}var TICKS_PER_SECOND=30,TimeSelector=function(){function s(t,e,a,r,i,n){switch(_classCallCheck(this,s),this.baseEl=d3.select("#".concat(t)),this.id=t,this.dragging=!1,this.interval=e,this.onPercentageSelectedCallback=a,this.dataFormatter=n,this.scalingType=i,this.increasePerTick=1/(r/1e3*TICKS_PER_SECOND),this.scalingType){case"date":this.scaling=d3.scaleTime().domain([0,1]).range(e);break;case"int":this.scaling=d3.scaleLinear().domain([0,1]).rangeRound(e);break;case"float":this.scaling=d3.scaleLinear().domain([0,1]).range(e);break;default:console.log("Unsupported scaling type!")}this.createGUI(),this.isPlaying=!1,this.lastEmit=void 0}return _createClass(s,[{key:"increasePercentage",value:function(){var t=this.percentage;this.setPercentage(t+this.increasePerTick,!this.dragging),this.emitPercentage(this.percentage)}},{key:"setVisualPercentage",value:function(t){var e=t*this.maxBarWidth;this.plotHandle.attr("cx",e),this.plotBar.attr("width",e);t=this.scaling(t);this.selectionText.text(this.createText(t))}},{key:"setPercentage",value:function(t){var e=!(1<arguments.length&&void 0!==arguments[1])||arguments[1];t=Math.max(0,Math.min(1,t)),this.percentage=t,e&&this.setVisualPercentage(t)}},{key:"getDisplayableValue",value:function(t){return void 0!==this.dataFormatter?this.dataFormatter(t):t+""}},{key:"getMousePercentage",value:function(){var t=_slicedToArray(d3.mouse(this.plotBar.node()),2),e=t[0];t[1];return Math.max(0,Math.min(1,e/this.maxBarWidth))}},{key:"invokeCallback",value:function(t){t!=this.lastEmit?this.onPercentageSelectedCallback(t):console.log("Same",this.lastEmit),"date"===this.scalingType?this.lastEmit=new Date(t.getTime()):this.lastEmit=t}},{key:"emitPercentage",value:function(t){t=this.scaling(t);this.invokeCallback(t)}},{key:"setValue",value:function(t){var e=this.scaling.invert(t);0<=e&&e<=1&&(this.setPercentage(e,!0),this.invokeCallback(t))}},{key:"createText",value:function(t){return"".concat(this.getDisplayableValue(t)," / ").concat(this.getDisplayableValue(this.interval[1]))}},{key:"play",value:function(){var t=this;this.isPlaying=!0,this.displayCorrectControlIcon(),this.playLoop=setInterval(function(){return t.loopTick()},1e3/TICKS_PER_SECOND)}},{key:"pause",value:function(){this.isPlaying=!1,this.displayCorrectControlIcon(),clearInterval(this.playLoop)}},{key:"loopTick",value:function(){this.increasePercentage(),1==this.percentage&&this.pause()}},{key:"handleControlButtonClick",value:function(){this.isPlaying?this.pause():(1==this.percentage&&(this.percentage=0),this.play())}},{key:"displayCorrectControlIcon",value:function(){this.controlButton.attr("class","bi bi-".concat(this.isPlaying?"pause":"play","-fill"))}},{key:"handleDragStart",value:function(){this.dragging=!0}},{key:"handleDragOver",value:function(){this.dragging&&(this.dragging=!1,this.emitPercentage(this.getMousePercentage()),this.setPercentage(this.getMousePercentage()))}},{key:"handleDragMove",value:function(){this.dragging&&this.setVisualPercentage(this.getMousePercentage())}},{key:"createGUI",value:function(){var t=this,e=this.baseEl.append("div").attr("class","time-selector row"),a=e.append("div").attr("class","col-md-1 col-3 play-control my-auto");this.controlButton=a.append("i").attr("class","bi bi-play-fill").style("cursor","pointer"),this.controlButton.on("click",function(){return t.handleControlButtonClick()});var r=500,i=100,a=e.append("div").attr("class","col-md-4 col-9 my-auto").style("text-align","left").append("svg").style("width","100%").attr("viewBox","0 0 ".concat(r," ").concat(i));this.maxBarWidth=480;i=a.append("g").attr("transform","translate(".concat((r-480)/2,", ").concat(i/2,")"));this.percentage=0;i.append("rect").attr("x",0).attr("y",-4).attr("height",8).attr("width",480).attr("fill","rgba(255, 255, 255, .5)").on("mousedown",function(){return t.handleDragStart()});this.plotBar=i.append("rect").attr("x",0).attr("y",-4).attr("height",8).attr("width",0).attr("fill","red").on("mousedown",function(){return t.handleDragStart()}),this.plotHandle=i.append("circle").attr("cx",0).attr("cy",0).attr("r",9).attr("fill","red").style("cursor","pointer").on("mousedown",function(){return t.handleDragStart()}),d3.select("body").on("mouseup.".concat(this.id),function(){return t.handleDragOver()}).on("mousemove.".concat(this.id),function(){return t.handleDragMove()}),this.selectionText=i.append("text").attr("x",2).attr("y",18).attr("fill","whitesmoke").attr("font-size","1.3em").style("alignment-baseline","hanging").style("text-anchor","start").style("user-select","none").text(this.createText(this.interval[0]));i=this.baseEl.attr("plot-description");void 0!==i&&(e.append("div").attr("class","col-md-1 col-1 my-auto plot-description").style("text-align","right").html('<i class="bi bi-info-circle-fill"></i>'),e.append("div").attr("class","col-md-6 col-11 my-auto plot-description").html(i))}}]),s}();
//# sourceMappingURL=media_player_time_selection.js.map
