// GLOBAL VARIABLES
let $container = $(".container");   // ONLY USED ONCE IN FIRST FUNCTION? container to hold all of the content below the textboxes and buttons
let $divToHoldPanelAndShape = $("<div> </div>"); // create div to hold side panel and gray box
let $canvasDiv;
let $sidePanel;

// create data elements
let $nameDiv = $("<p> Shape Name: </p>");
let $widthDiv = $("<p> Width: </p>");
let $heightDiv = $("<p> Height: </p>");
let $radiusDiv = $("<p> Radius: </p>");
let $areaDiv = $("<p> Area: </p>");
let $perimeterDiv = $("<p> Perimeter: </p>");

createCanvasAndSidePanel();

function createCanvasAndSidePanel() {
    // style the div in here to make file more readable
    $divToHoldPanelAndShape.css("display", "inline-block");

    // create gray box div to hold shape
    $canvasDiv = $("<div> </div>");
    $canvasDiv.css({
        "background-color": "lightgray",
        "height": "600px",
        "width": "600px",
        "display": "inline-block",
        "margin-top": "2%",
        "position": "relative"
    });

    // create empty sidepanel div
    $sidePanel = $("<div> </div>");
    $sidePanel.css({
        "height": "600px",
        "width": "165px",
        "margin-top": "2%",
        "margin-left": "10px",
        "position": "relative",
        "display": "inline-block"
    });

    // append data elements to sidepanel
    $nameDiv.appendTo($sidePanel);
    $widthDiv.appendTo($sidePanel);
    $heightDiv.appendTo($sidePanel);
    $radiusDiv.appendTo($sidePanel);
    $areaDiv.appendTo($sidePanel);
    $perimeterDiv.appendTo($sidePanel);

    // Append everything together  
    $canvasDiv.appendTo($divToHoldPanelAndShape);
    $sidePanel.appendTo($divToHoldPanelAndShape);
    $divToHoldPanelAndShape.appendTo($container);
}

// CLASSES 
class Shape {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }

    describe() {
        clearPanelIfNeeded(); 
        $nameDiv.text("Shape Name: " + this.constructor.name);
        $widthDiv.text("Width: " + this.width + " px");
        $heightDiv.text("Height: " + this.height + " px");
        $radiusDiv.text("Radius: " + this.radius + " px");
        $areaDiv.text("Area: " + this.area + " px");
        $perimeterDiv.text("Perimeter: " + this.perimeter + " px");
    }

    draw() {
        let $shape = $("<div> </div>");
        $shape.click(() => {
            this.describe();
        });
        $shape.css({
            "width": this.width + "px",
            "height": this.height + "px",
            "background-color": getCorrectColor(this.constructor.name),
            "position": "absolute",
            "top": randomValue(this.height, 600),
            "left": randomValue(this.width, 600)
        });
        $shape.appendTo($canvasDiv);
    }
}

class Rectangle extends Shape {
    constructor(width, height) {
        super(width, height);
        this.radius = "";
        this.area = this.width * this.height;
        this.perimeter = (2 * (this.width + this.height));
        this.draw();
    }
}

class Square extends Rectangle { 
    constructor(sideLength) {
        super(sideLength, sideLength);
        this.area = this.width * this.height;
        this.perimeter = (2 * (this.width + this.height));
        this.draw();
    }
}

class Circle extends Shape { 
    constructor(radius) {
        super((radius * 2), (radius * 2));
        this.radius = radius;
        this.area = this.width * this.height;
        this.perimeter = (2 * (this.width + this.height));
        this.draw();
    }

    draw() {
        let $shape = $("<div> </div>");
        $shape.click(() => {
            this.describe();
        });
        $shape.css({
            "width": this.width + "px",
            "height": this.height + "px",
            "background-color": getCorrectColor(this.constructor.name),
            "position": "absolute",
            "top": randomValue(this.height, 600),
            "left": randomValue(this.width, 600),
            "border-radius": this.radius + "px"
        });
        $shape.appendTo($canvasDiv);
    }
}

class Triangle extends Shape { 
    constructor(height) {
        super(height, height); 
        this.radius = "";
        this.area = this.width * this.height;
        this.perimeter = (2 * (this.width + this.height)); 
        this.draw();
    }

    draw() {
        let $shape = $("<div> </div>");
        $shape.click(() => {
            this.describe();
        });
        $shape.css({
            "width": this.width + "px",
            "height": this.height + "px",
            "background-color": getCorrectColor(this.constructor.name),
            "position": "absolute",
            "top": randomValue(this.height, 600),
            "left": randomValue(this.width, 600),
            "clip-path": "polygon(0% 100%, 100% 100%, 0% 0%)"
        });
        $shape.appendTo($canvasDiv);
    }
}

// ONCLICK FUNCTIONS
function createRectangle() {
    new Rectangle($("#rectangleWidth").val(), $("#rectangleHeight").val()); 
}

function createSquare() {
    new Square($("#sideLength").val()); 
}

function createCircle() {
    new Circle($("#radius").val()); 
}

function createTriangle() {
    new Triangle($("#height").val()); 
}


// Helper functions 
function randomValue(min, max) {
    return Math.floor(Math.random() * (max - min));
}

function clearPanelIfNeeded() {
    if ($sidePanel.val() != "") {
        $sidePanel.text("");
    }
}

function getCorrectColor(name) {
    if (name == "Rectangle") {
        return "green";
    }
    if (name == "Square") {
        return "red";
    }
    if (name == "Circle") {
        return "purple";
    }
    if (name == "Triangle") {
        return "yellow";
    }
}