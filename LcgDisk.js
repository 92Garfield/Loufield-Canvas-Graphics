////////////////////////////////////////////////////////////////////////////////////////////
// Disk drawing class, inherits from DisplayObjectContainer
////////////////////////////////////////////////////////////////////////////////////////////

function LcgDisk() {
    LcgDisplayObjectContainer.call(this);
    this.radius = 4;
    this.color = 'black';
    /**
     * Overloaded draw function, draws a disk of radius this.radius and color this.color on the screen
     *
     * @param 	{CanvasRenderingContext2D}  g        { The canvas context that will draw the text }
     * @param 	{Number}                    offsetX  { The X coordinate of the drawn disk }
     * @param 	{Number}                    offsetY  { The Y coordinate of the drawn disk }
     * @return {}
     */
    this.draw = function (g, offsetX, offsetY) {
        var myX = offsetX + this.x;
        var myY = offsetY + this.y;
        g.fillStyle = '#000000';
        g.beginPath();
        g.arc(myX, myY, this.radius, 0, Math.PI * 2);
        g.fillStyle = this.color;
        g.fill();
        g.fillStyle = this.color;
        g.stroke();
    };
}
