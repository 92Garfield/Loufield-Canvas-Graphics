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
     * @param 	{CanvasRenderingContext2D}  g The canvas context that will draw the text
     * @param 	{Number}                    offsetX The X coordinate of the drawn text
     * @param 	{Number}                    offsetY The Y coordinate of the drawn text
     * @return {}
     */
    this.draw = function (g, offsetX, offsetY) {
        g.fillStyle = '#000000';
        g.beginPath();
        g.arc(0, 0, this.radius, 0, Math.PI * 2);
        g.fillStyle = this.color;
        g.fill();
        g.fillStyle = this.color;
        g.stroke();
    };
}
