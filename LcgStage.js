////////////////////////////////////////////////////////////////////////////////////////////
// Stage class, inherits from DisplayObjectContainer
// The root DisplayObjectContainer that contains the main loop that draws all objects in the scene periodically
////////////////////////////////////////////////////////////////////////////////////////////

function LcgStage(canvas) {

    LcgDisplayObjectContainer.call(this);
    var frameRate = 60;
    var g = canvas.getContext('2d');
    var _this = this;

    /**
     * Overloaded draw function, simply draws all the children of the Stage
     * @return {}
     */
    this.draw = function () {
        this.onEnterFrame();
        this.drawChildren(g, 0, 0, 1);
    };

    /**
     * Frame function or Main Loop function
     * Calls itself once every 1000/framerate milliseconds
     * Draws the canvas rectangle then calls the draw method
     * @return {}
     */
    function doFrame() {
        g.clearRect(0, 0, canvas.width, canvas.height);
        _this.draw();
        setTimeout(doFrame, 1000 / frameRate);
    }

    function eventClick(e) {
        _this.eventDispatcher(new LcgEvent(LcgEvent.CLICK, e), 0, 0);
    }

    canvas.onclick = eventClick;


    // Calls the doFrame method for the first time during construction
    doFrame();
}

