////////////////////////////////////////////////////////////////////////////////////////////
// DisplayObjectContainer class, inherits from DisplayObject
// Basically a DisplayObject with children
////////////////////////////////////////////////////////////////////////////////////////////

function LcgDisplayObjectContainer() {

    LcgDisplayObject.call(this);

    // Children of this DisplayObjectContainer whose draw method it will call every frame
    // Typically all of them should be of type DisplayObject
    var displayList = [];


    /**
     * @private
     * Searches for a DisplayObject in the displayList
     * @param   {DisplayObject} displayObject that will be searched for
     * @return  {int}           The index of the DisplayObject if found, or -1 otherwise
     */
    findChild = function (displayObject) {
        var dlLength = displayList.length;
        for (var i = 0; i < dlLength; i++) {
            if (displayList[i] == displayObject) {
                displayList.splice(i, 1);
                return i;
            }
        }
        return -1;
    };


    this.emptyDisplayList = function() {
        displayList = [];
    };
    /**
    * @public
    * Searches for a DisplayObject in the displayList
    * @param   {DisplayObject}  displayObjectThe displayObject that will be searched for
    * @return  {boolean}        True if the object is found, false otherwise
    */
    this.findChild = function (displayObject) {

        var dlLength = displayList.length;

        for (var i = 0; i < dlLength; i++) {

            if (displayList[i] == displayObject) {
                displayList.splice(i, 1);
                return true;
            }
        }
        return false;
    };

    /**
     * @public
     * Adds a DisplayObject to the displayList if it wasn't already there
     * @param 	{DisplayObject} displayObject The displayObject to be added
     * @return 	{boolean}       True if the DisplayObject was added, false otherwise.
     */
    this.addChild = function (displayObject) {

        if (this.findChild(displayObject))
            return false;

        displayList.push(displayObject);
        return true;
    };

    /**
     * @public
     * Adds a DisplayObject to the displayList at a given position
     * @param 	{DisplayObject}     displayObject The displayObject to be added
     * @param 	{int}    	    index New index of the Display Object to be added in the display list
     * @return 	{boolean} 	    True if the DisplayObject was added, false otherwise
     */
    this.addChildAt = function (displayObject, index) {

        if (index < 0)
            return false;

        if (this.findChild(displayObject))
            return false;

        if (index < displayList.length) {
            displayList.splice(index, 0, displayObject);
        }
        else {
            displayList.push(displayObject);
        }
        return true;
    };

    /**
     * @public
     * Searches for and removes a DisplayObject from the displayList
     * @param 	{DisplayObject} displayObject to be removed
     * @return 	{boolean} 	True if the DisplayObject was removed, false otherwise
     */
    this.removeChild = function (displayObject) {
        for (var i = 0; i < displayList.length; i++) {
            if (displayList[i] == displayObject) {
                displayList.splice(i, 1);
                return true;
            }
        }
        return false;
    };

    /**
     * @public
     * Removes a DisplayObject from the displayList based off of its index
     * @param 	{int}       index of the Display Object to be removed in the display list
     * @return 	{boolean}   True if the DisplayObject was removed, false otherwise.
     */
    this.removeChildAt = function (index) {

        if (index < 0 || index >= displayList.length) {
            return false;
        } else {
            displayList.splice(index, 1);
            return true;
        }
    };

    /**
     * @public
     * Returns the child at a certain index
     * @param 	{int}    	index of the Display Object to be fetched from the display list
     * @return 	{DisplayObject} The display object if the index is in range, null otherwise
     */
    this.getChildAt = function (index) {

        if (index < 0 || index >= displayList.length) {
            return null;
        }
        else {
            return displayList[index];
        }
    };

    /**
     * @public
     * Returns the number of children in the displayList
     * @return 	{int} 	The length of displayList
     */
    this.getNumChildren = function () {

        return displayList.length;
    };

    /**
     * @public
     * Calls the draws the children of this container and their children
     * @param 	{CanvasRenderingContext2D}  g The canvas context that will be used to draw
     * @param 	{Number}                     offsetX The X coordinate of the container
     * @param 	{Number}                     offsetY The Y coordinate of the container
     * @param   {Number}                     alph Product of all alpha so far
     * @return 	{void}
     */
    this.drawChildren = function (g, offsetX, offsetY, alph) {

        var dlLength = displayList.length;
        for (var i = 0; i < dlLength; i++) {
            displayList[i].onEnterFrame();
            g.globalAlpha = alph * this.alpha * displayList[i].alpha;
            displayList[i].draw(g, offsetX, offsetY, this.alpha*alph);
            g.globalAlpha = 1;
            displayList[i].drawChildren(g, offsetX + displayList[i].x, offsetY + displayList[i].y, this.alpha*alph);
        }
    };


    this.eventDispatcher =  function (event, offsetX, offsetY) {

        var newOffsetX = offsetX + this.x;
        var newOffsetY = offsetY + this.y;

        //console.log(newOffsetX);

        // DFS over the children of this container
        // in reverse order since the latest children are always 
        // going to be drawn on top and should be given priority
 
        for (var i=displayList.length-1; i >= 0; i--) {

            var ret = displayList[i].eventDispatcher(event, newOffsetX, newOffsetY);

            // checks if there was an object that handled the event in the subtree of displayList[i]
            if (ret)
                return ret;
        }


        // if the event is in range of this object's bounding box
        if ( (event.clientX >= newOffsetX && event.clientX <= newOffsetX+this.width) && 
             (event.clientY >= newOffsetY && event.clientY <= newOffsetY+this.height) )
        {

            if (this.dispatchEvent(event)) {
                event.currentTarget = this;
                return this;
            }
        }

        return null;

    };
}





