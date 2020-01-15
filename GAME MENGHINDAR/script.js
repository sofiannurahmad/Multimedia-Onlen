function degToRad(deg){
  return (deg/180) * Math.PI;
}
//console.log('Background');
function Background(canvas, context) {
  this.myCanvas = canvas;
  this.myContext = context;
  //-------------------------------------------------
  this.init = function(center, refSize) {
    this.center = {x:center.x, y:center.y};
    this.refSize = refSize;
    this.cir0 = {x: center.x, y: center.y, radius: this.refSize * 0.45};
    this.cir1 = {x: center.x, y: center.y, radius: this.refSize * 0.36};
    this.cir2 = {x: center.x, y: center.y, radius: this.refSize * 0.2};
    this.score = {
      number: 0,
      font: 'Impact',
      size: this.refSize * 0.120,
      center:{x: center.x, y: center.y * 1.1,}
    };
    this.topScore = {
      number: 0,
      font: 'Impact',
      size: this.refSize * 0.02,
      center:{x: 15, y: 25,}
    };
    this.borderWidth = this.refSize * 0.02;
	}
  //-------------------------------------------------
	this.draw = function(topScore) {
    this.myContext.clearRect(0, 0, this.myCanvas.width, this.myCanvas.height);
    this.myContext.strokeStyle = game.colors.c1;
    this.myContext.lineWidth = this.borderWidth;
    this.myContext.strokeCircle(this.cir1);
    this.myContext.fillStyle = game.colors.c1;
    this.myContext.fillCircle(this.cir2);
    //--
    this.topScore.number = topScore;
    this.myContext.font = this.topScore.size+"px "+ this.topScore.font;
    this.myContext.textAlign = 'left';
    this.myContext.fillStyle = '#333';
    //--
    this.myContext.fillText("Skor Terbaikmu = "+ this.topScore.number ,this.topScore.center.x, this.topScore.center.y);
    //--
    this.updateScore(this.score.number);
	};
  //-------------------------------------------------
  this.updateScore = function(score) {
    //--
    this.score.number = score;
    //--
    this.myContext.fillStyle = game.colors.c1;
    this.myContext.fillCircle(this.cir2);
    //--
    if(this.score.number > 999999){
      this.score.size = this.score.size * 0.6;
      this.score.center.y = this.center.y * 1.06;
    }
    this.myContext.font = this.score.size+"px "+ this.score.font;
    this.myContext.textAlign = 'center';
    this.myContext.fillStyle = '#fff';
    //--
    this.myContext.fillText(this.score.number ,this.score.center.x, this.score.center.y);
    //--
	};
  //-------------------------------------------------
}
//console.log('Avatar');
function Avatar(canvas, context) {
  this.myCanvas = canvas;
  this.myContext = context;
  //-------------------------------------------------
  this.init = function(center, refSize, angle, state) {
    this.refSize = refSize;
    this.state = state;
    this.degAngle = angle;
    this.degAngleSpeed = 1;
    this.inRadFact = 0.35;
    this.outRadFact = 0.37;
    this.radius = this.refSize * this.outRadFact;
    if(this.state == 'in'){
      this.radius = this.refSize * this.inRadFact;
    }
    this.center = {x:center.x, y:center.y};
    this.selfCenter = {x:this.center.x+this.radius, y:this.center.y};
    //--
    this.rec0 = {
      x: this.center.x,
      y: this.center.y,
      width: this.refSize * 0.08,
      height: this.refSize * 0.12,
      fillColor: "#fff"
    };
    this.rec1 = {
      x: this.center.x + (this.rec0.width/2),
      y: this.center.y,
      width: this.rec0.width,
      height: this.rec0.width * 0.5,
      fillColor: "#c85388",
    };
    this.clearRec = {
      x: this.rec0.x,
      y: this.rec0.y,
      width: this.rec0.width,
      height: this.rec0.height
    };
    //--
    this.cir1 = {
      orgX:center.x+this.radius+(this.rec0.width*0.5),
      orgY:center.y,
      x:center.x+this.radius+(this.rec0.width*0.5),
      y:center.y,
      radius: this.rec0.width * 0.5,
      fillColor: "#F00"
    };
    this.cir2 = {
      orgX:center.x+this.radius+this.rec0.width,
      orgY:center.y,
      x:center.x+this.radius+this.rec0.width,
      y:center.y,
      radius: this.rec0.width * 0.5,
      fillColor: "#c85388"
    };
    this.cir3 = {
      orgX:center.x+this.radius+(this.rec0.height*0.75),
      orgY:center.y+(this.rec0.width * 0.2),
      x:center.x+this.radius+(this.rec0.height*0.75),
      y:center.y+(this.rec0.width * 0.2),
      radius: this.rec0.width * 0.2,
      fillColor: "#fff"
    };
    this.cir4 = {
      orgX:center.x+this.radius+(this.rec0.height*0.75),
      orgY:center.y+(this.rec0.width * 0.2),
      x:center.x+this.radius+(this.rec0.height*0.75),
      y:center.y+(this.rec0.width * 0.2),
      radius: this.rec0.width * 0.1,
      fillColor: "#a6b5dc"
    };
	}
  //-------------------------------------------------
  this.calculateAll = function() {
    this.toPoints({x:this.rec0.x, y:this.rec0.y}, this.rec0, this.radius);
    if(this.state == 'in'){this.rotateBox(this.selfCenter, this.rec0, 180);};
    this.rotateBox(this.center, this.rec0, this.degAngle);
    //--
    this.toPoints({x:this.rec1.x, y:this.rec1.y}, this.rec1, this.radius);
    if(this.state == 'in'){this.rotateBox(this.selfCenter, this.rec1, 180);};
    this.rotateBox(this.center, this.rec1, this.degAngle);
    //--
    this.cir1.x = this.cir1.orgX;
    this.cir1.y = this.cir1.orgY;
    if(this.state == 'in'){this.rotate(this.selfCenter, this.cir1, 180);};
    this.rotate(this.center, this.cir1, this.degAngle);
    //--
    this.cir2.x = this.cir2.orgX;
    this.cir2.y = this.cir2.orgY;
    if(this.state == 'in'){this.rotate(this.selfCenter, this.cir2, 180);};
    this.rotate(this.center, this.cir2, this.degAngle);
    //--
    this.cir3.x = this.cir3.orgX;
    this.cir3.y = this.cir3.orgY;
    if(this.state == 'in'){this.rotate(this.selfCenter, this.cir3, 180);};
    this.rotate(this.center, this.cir3, this.degAngle);
    //--
    this.cir4.x = this.cir4.orgX;
    this.cir4.y = this.cir4.orgY;
    if(this.state == 'in'){this.rotate(this.selfCenter, this.cir4, 180);};
    this.rotate(this.center, this.cir4, this.degAngle);
    //--
    this.toPoints(this.center, this.clearRec, this.radius);
    if(this.state == 'in'){this.rotateBox(this.selfCenter, this.clearRec, 180);};
    this.rotateBox(this.center, this.clearRec, this.degAngle);
    var tempX = Math.min(this.clearRec.point0.x, this.clearRec.point1.x, this.clearRec.point2.x, this.clearRec.point3.x);
    var tempY = Math.min(this.clearRec.point0.y, this.clearRec.point1.y, this.clearRec.point2.y, this.clearRec.point3.y);
    this.clearRec.clearPoint0 = {x:tempX-1, y:tempY-1};
    var tempX = Math.max(this.clearRec.point0.x, this.clearRec.point1.x, this.clearRec.point2.x, this.clearRec.point3.x);
    var tempY = Math.max(this.clearRec.point0.y, this.clearRec.point1.y, this.clearRec.point2.y, this.clearRec.point3.y);
    this.clearRec.clearPoint0.width = (tempX - this.clearRec.clearPoint0.x)+1;
    this.clearRec.clearPoint0.height = (tempY - this.clearRec.clearPoint0.y)+1;
  }
  //-------------------------------------------------
	this.draw = function() {
    this.calculateAll();
  //  this.buildBox(this.rec0);
    this.myContext.fillStyle = this.cir1.fillColor;
    this.myContext.fillCircle(this.cir1);
    this.myContext.fillCircle(this.cir2);
    this.buildBox(this.rec1);
    this.myContext.fillStyle = this.cir3.fillColor;
    this.myContext.fillCircle(this.cir3);
    this.myContext.fillStyle = this.cir4.fillColor;
    this.myContext.fillCircle(this.cir4);
	};
  //-------------------------------------------------
  this.clear = function() {
    this.myContext.clearRect(this.clearRec.clearPoint0.x, this.clearRec.clearPoint0.y, this.clearRec.clearPoint0.width, this.clearRec.clearPoint0.height);
	};
  //-------------------------------------------------
  this.switchState = function(){
    this.clear();
    if(this.state == "in"){
      this.state = "out";
      this.radius = this.refSize * this.outRadFact;
      this.selfCenter = {x:this.center.x+this.radius, y:this.center.y};
      this.cir1.orgX += this.refSize * 0.02;
      this.cir2.orgX += this.refSize * 0.02;
      this.cir3.orgX += this.refSize * 0.02;
      this.cir4.orgX += this.refSize * 0.02;
    }else if(this.state == "out"){
      this.state = "in";
      this.radius = this.refSize * this.inRadFact;
      this.selfCenter = {x:this.center.x+this.radius, y:this.center.y};
      this.cir1.orgX -= this.refSize * 0.02;
      this.cir2.orgX -= this.refSize * 0.02;
      this.cir3.orgX -= this.refSize * 0.02;
      this.cir4.orgX -= this.refSize * 0.02;
    }
  }
  //-------------------------------------------------
  this.animate = function(){
    //console.log('animate');
    this.clear();
    this.degAngle = (this.degAngle + this.degAngleSpeed) % 360;
    this.draw();
  }
  //-------------------------------------------------
  this.getHitRec = function(){
    var tempRec = {
      x: this.clearRec.clearPoint0.x+1,
      y: this.clearRec.clearPoint0.y+1,
      width: this.clearRec.clearPoint0.width-1,
      height: this.clearRec.clearPoint0.height-1,
      angle: this.degAngle,
      angleRange: 5,
      radius: this.radius,
    }
    if(this.state == "in"){
      tempRec.angleRange = 6;
    }
    return tempRec;
  }
  //-------------------------------------------------
  this.toPoints = function(center, box, radius, basePoints = false){
    box.point0 = {x:center.x+radius, y:center.y+(box.width * 0.5)};
    box.point1 = {x:center.x+radius, y:center.y+(box.width * -0.5)};
    box.point2 = {x:center.x+box.height+radius, y:center.y+(box.width *-0.5)};
    box.point3 = {x:center.x+box.height+radius, y:center.y+(box.width *0.5)};
    if(basePoints){
      box.basePoint0={x:center.x+radius, y:center.y};
      box.basePoint1={x:center.x+radius+box.height, y:center.y};
    }
  }
  //-------------------------------------------------
  this.rotateBox = function(center, box, angle) {
    for (var point in box) {
      if (box.hasOwnProperty(point)) {
        if (box[point].hasOwnProperty('x')) {
          this.rotate(center, box[point], angle);
        }
      }
    }
  }
  //-------------------------------------------------
  this.rotate = function(center, point, angle) {
    var radians = (Math.PI / 180) * angle, cos = Math.cos(radians),
    sin = Math.sin(radians),
    nx = (cos * (point.x - center.x)) - (sin * (point.y - center.y)) + center.x,
    ny = (cos * (point.y - center.y)) + (sin * (point.x - center.x)) + center.y;
    point.x = nx;
    point.y = ny;
  }
  //-------------------------------------------------
  this.buildBox = function(box){
    this.myContext.strokeStyle = "#333";
    this.myContext.beginPath();
    this.myContext.moveTo(box.point0.x, box.point0.y);
    this.myContext.lineTo(box.point1.x, box.point1.y);
    this.myContext.lineTo(box.point2.x, box.point2.y);
    this.myContext.lineTo(box.point3.x, box.point3.y);
    this.myContext.closePath();
    this.myContext.fill();
  }
  this.increaseSpeed = function(number){
    this.degAngleSpeed += number;
  }
  //-------------------------------------------------
}
//console.log('Obstcales');
function Obstcale(canvas, context) {
  this.myCanvas = canvas;
  this.myContext = context;
  //-------------------------------------------------
  this.init = function(center, refSize, angle, state) {
    this.refSize = refSize;
    this.state = state;
    this.degAngle = angle;
    this.degAngleSpeed = 1;
    this.inRadFact = 0.35;
    this.outRadFact = 0.37;
    this.radius = this.refSize * this.outRadFact;
    if(this.state == 'in'){
      this.radius = this.refSize * this.inRadFact;
    }
    this.center = {x:center.x, y:center.y};
    this.selfCenter = {x:this.center.x+this.radius, y:this.center.y};
    //--
    this.rec0 = {
      x: this.center.x+(this.refSize * -0.025),
      y: this.center.y,
      width: this.refSize * 0.08,
      height: this.refSize * 0.1,
      fillColor: "#eee"
    };
    this.rec1 = {
      x: this.rec0.x,
      y: this.center.y,
      width: this.rec0.width * 0.5,
      height: this.rec0.height,
      fillColor: "#000",
    }
    this.clearRec = {
      x: this.rec0.x,
      y: this.rec0.y,
      width: this.rec0.width,
      height: this.rec0.height
    };
	}
  //-------------------------------------------------
  this.calculateAll = function() {
    this.toPoints({x:this.rec0.x, y:this.rec0.y}, this.rec0, this.radius);
    if(this.state == 'in'){this.rotateBox(this.selfCenter, this.rec0, 180);};
    this.rotateBox(this.center, this.rec0, this.degAngle);
    //--
    this.toPoints({x:this.rec1.x, y:this.rec1.y}, this.rec1, this.radius);
    if(this.state == 'in'){this.rotateBox(this.selfCenter, this.rec1, 180);};
    this.rotateBox(this.center, this.rec1, this.degAngle);
    //--
    this.toPoints({x:this.rec0.x, y:this.rec0.y}, this.clearRec, this.radius);
    if(this.state == 'in'){this.rotateBox(this.selfCenter, this.clearRec, 180);};
    this.rotateBox(this.center, this.clearRec, this.degAngle);
    var tempX = Math.min(this.clearRec.point0.x, this.clearRec.point1.x, this.clearRec.point2.x, this.clearRec.point3.x);
    var tempY = Math.min(this.clearRec.point0.y, this.clearRec.point1.y, this.clearRec.point2.y, this.clearRec.point3.y);
    this.clearRec.clearPoint0 = {x:tempX-1, y:tempY-1};
    var tempX = Math.max(this.clearRec.point0.x, this.clearRec.point1.x, this.clearRec.point2.x, this.clearRec.point3.x);
    var tempY = Math.max(this.clearRec.point0.y, this.clearRec.point1.y, this.clearRec.point2.y, this.clearRec.point3.y);
    this.clearRec.clearPoint0.width = (tempX - this.clearRec.clearPoint0.x)+1;
    this.clearRec.clearPoint0.height = (tempY - this.clearRec.clearPoint0.y)+1;
  }
  //-------------------------------------------------
	this.draw = function() {
    this.calculateAll();
    this.myContext.fillStyle = this.rec0.fillColor;
    this.buildBox(this.rec0);
    this.myContext.fillStyle = this.rec1.fillColor;
    this.buildBox(this.rec1);
    //this.clear();
	};
  //-------------------------------------------------
  this.clear = function() {
    this.myContext.fillStyle = "#ff0";
    this.myContext.clearRect(this.clearRec.clearPoint0.x, this.clearRec.clearPoint0.y, this.clearRec.clearPoint0.width, this.clearRec.clearPoint0.height);
	};
  //-------------------------------------------------
  this.toPoints = function(center, box, radius, basePoints = false){
    box.point0 = {x:center.x+radius, y:center.y+(box.width * 0.5)};
    box.point1 = {x:center.x+radius, y:center.y+(box.width * -0.5)};
    box.point2 = {x:center.x+box.height+radius, y:center.y+(box.width *-0.5)};
    box.point3 = {x:center.x+box.height+radius, y:center.y+(box.width *0.5)};
    if(basePoints){
      box.basePoint0={x:center.x+radius, y:center.y};
      box.basePoint1={x:center.x+radius+box.height, y:center.y};
    }
  }
  //-------------------------------------------------
  this.rotateBox = function(center, box, angle) {
    for (var point in box) {
      if (box.hasOwnProperty(point)) {
        if (box[point].hasOwnProperty('x')) {
          this.rotate(center, box[point], angle);
        }
      }
    }
  }
  //-------------------------------------------------
  this.rotate = function(center, point, angle) {
    var radians = (Math.PI / 180) * angle, cos = Math.cos(radians),
    sin = Math.sin(radians),
    nx = (cos * (point.x - center.x)) - (sin * (point.y - center.y)) + center.x,
    ny = (cos * (point.y - center.y)) + (sin * (point.x - center.x)) + center.y;
    point.x = nx;
    point.y = ny;
  }
  //-------------------------------------------------
  this.buildBox = function(box){
    this.myContext.strokeStyle = "#333";
    this.myContext.beginPath();
    this.myContext.moveTo(box.point0.x, box.point0.y);
    this.myContext.lineTo(box.point1.x, box.point1.y);
    this.myContext.lineTo(box.point2.x, box.point2.y);
    this.myContext.lineTo(box.point3.x, box.point3.y);
    this.myContext.closePath();
    this.myContext.fill();
  }
  //-------------------------------------------------
  this.getHitRec = function(){
    this.toPoints({x:this.rec1.x, y:this.rec1.y}, this.rec1, this.radius);
    if(this.state == 'in'){this.rotateBox(this.selfCenter, this.rec1, 180);};
    this.rotateBox(this.center, this.rec1, this.degAngle);
    var tempX = Math.min(this.rec1.point0.x, this.rec1.point1.x, this.rec1.point2.x, this.rec1.point3.x);
    var tempY = Math.min(this.rec1.point0.y, this.rec1.point1.y, this.rec1.point2.y, this.rec1.point3.y);
    //--
    var tempRec = {
      x:tempX,
      y:tempY,
      angle: this.degAngle,
      angleRange: 3,
      radius: this.radius
    };
    if(this.state == "in"){
      tempRec.angleRange = 4;
    }
    //--
    var tempX = Math.max(this.rec1.point0.x, this.rec1.point1.x, this.rec1.point2.x, this.rec1.point3.x);
    var tempY = Math.max(this.rec1.point0.y, this.rec1.point1.y, this.rec1.point2.y, this.rec1.point3.y);
    //--
    tempRec.width = tempX - tempRec.x;
    tempRec.height = tempY - tempRec.y;
    return tempRec;
  }
  //-------------------------------------------------
  this.increaseSpeed = function(number){
    this.degAngleSpeed += number;
  }
  //-------------------------------------------------
}
//---------------------------------------------------------------
//---------------------------------------------------------------
//---------------------------------------------------------------
//---------------------------------------------------------------
//---------------------------------------------------------------
//---------------------------------------------------------------
function Obstcales(canvas, context) {
  this.myCanvas = canvas;
  this.myContext = context;
  //-------------------------------------------------
  this.init = function(center, refSize, angle) {
    this.refSize = refSize;
    this.degAngle = angle;
    this.degAngleSpeed = 1;
    this.center = {x:center.x, y:center.y};
    //--
    if(this.allObstcales == undefined){
      this.allObstcales = [];
    }else{
      for(var obstCount = 0; obstCount < this.allObstcales.length; obstCount++){
        var obst = this.allObstcales[obstCount];
        if(obst != undefined){
          obst.draw();
        }
      }
    }
  }
  //-------------------------------------------------
  this.createObst = function(){
    var obst = new Obstcale(this.myCanvas, this.myContext);
    this.randomDegAngle = this.degAngle + 10 - Math.floor(Math.random() * 20);
    if(Math.floor(Math.random() * 2) == 0){
      this.randomDirection = "in";
    }else{
      this.randomDirection = "out";
    }
    obst.init(this.center, this.refSize, this.randomDegAngle , this.randomDirection);
    obst.draw();
    var noEmptyPlace = true;
    for(var obstCount = 0; obstCount < this.allObstcales.length; obstCount++){
      if(this.allObstcales[obstCount] == undefined){
        this.allObstcales[obstCount] = obst;
        noEmptyPlace = false;
      }
    }
    if(noEmptyPlace){
      this.allObstcales.push(obst);
    }
  }
  //-------------------------------------------------
  this.clearAll = function(){
    this.allObstcales = undefined;
    this.myContext.clearRect(0, 0, this.myCanvas.width, this.myCanvas.height);
  }
  //-------------------------------------------------
  this.animate = function(){
    if(this.counter == undefined){
      this.counter = 0;
    }else{
      this.counter++;
    }
    this.counter = this.counter % 60;
    if(this.counter == 0){
      this.createObst();
    }
    this.degAngle = (this.degAngle + this.degAngleSpeed) % 360;
  }
  //-------------------------------------------------
  this.chickAngleRange = function(a1, ar1, a2, ar2){
    if((a1-ar1) <= (a2+ar2) && (a2-ar2) <= (a1+ar1)){
      return true;
    }
    return false;
  }
  //-------------------------------------------------
  this.chickPassedObst = function(obj) {
    var avatarDim = obj;
    var obstDim = {};
    for(var obstCount = 0; obstCount < this.allObstcales.length; obstCount++){
      if(this.allObstcales[obstCount] != undefined){
        obstDim = this.allObstcales[obstCount].getHitRec();
        var chickIn = this.chickAngleRange(avatarDim.angle, avatarDim.angleRange, obstDim.angle, obstDim.angleRange);
        if(chickIn){
          //console.log('chickIn');
          var obst = this.allObstcales[obstCount];
          this.allObstcales[obstCount] = undefined;
          obst.clear();
        }
      }
    }
  }

  //-------------------------------------------------
  this.chickForCollision = function(obj){
    //console.log('chickForCollision');
    var avatarDim = obj;
    var obstDim = {};
    for(var obstCount = 0; obstCount < this.allObstcales.length; obstCount++){
      if(this.allObstcales[obstCount] != undefined){
        obstDim = this.allObstcales[obstCount].getHitRec();
        if(avatarDim.radius == obstDim.radius){
          var chickIn = this.chickAngleRange(avatarDim.angle, avatarDim.angleRange, obstDim.angle, obstDim.angleRange);
          if(chickIn){
            var obst = this.allObstcales[obstCount];
            this.allObstcales[obstCount] = undefined;
            obst.clear();
            return true;
          }
        }
      }
    }
  }
  //-------------------------------------------------
  this.increaseSpeed = function(number){
    for(var obstCount = 0; obstCount < this.allObstcales.length; obstCount++){
      if(this.allObstcales[obstCount] != undefined){
        var obst = this.allObstcales[obstCount];
        obst.increaseSpeed(number);
      }
    }
  }
  //-------------------------------------------------
}
function Collectable(canvas, context) {
  this.myCanvas = canvas;
  this.myContext = context;
  //-------------------------------------------------
  this.init = function(center, refSize, angle, state) {
    //console.log('init');
    this.refSize = refSize;
    this.state = state;
    this.degAngle = angle;
    this.degAngleSpeed = 1;
    this.inRadFact = 0.35;
    this.outRadFact = 0.37;
    this.radius = this.refSize * this.outRadFact;
    if(this.state == 'in'){
      this.radius = this.refSize * this.inRadFact;
    }
    this.center = {x:center.x, y:center.y};
    this.selfCenter = {x:this.center.x+this.radius, y:this.center.y};
    //--
    this.cir1 = {
      orgX:center.x+this.radius+(this.refSize * 0.015),
      orgY:center.y,
      x:center.x+this.radius+(this.refSize * 0.015),
      y:center.y,
      radius:this.refSize * 0.015,
      fillColor: "#00F"
    };
    //--
    this.clearRec = {
      x: this.center.x,
      y: this.center.y,
      width: this.refSize * 0.03,
      height: this.refSize * 0.03,
    };
    //--
	}
  //-------------------------------------------------
  this.calculateAll = function() {
    this.cir1.x = this.cir1.orgX;
    this.cir1.y = this.cir1.orgY;
    if(this.state == 'in'){this.rotate(this.selfCenter, this.cir1, 180);};
    this.rotate(this.center, this.cir1, this.degAngle);
    //--
    this.toPoints(this.center, this.clearRec, this.radius);
    if(this.state == 'in'){this.rotateBox(this.selfCenter, this.clearRec, 180);};
    this.rotateBox(this.center, this.clearRec, this.degAngle);
    var tempX = Math.min(this.clearRec.point0.x, this.clearRec.point1.x, this.clearRec.point2.x, this.clearRec.point3.x);
    var tempY = Math.min(this.clearRec.point0.y, this.clearRec.point1.y, this.clearRec.point2.y, this.clearRec.point3.y);
    this.clearRec.clearPoint0 = {x:tempX-1, y:tempY-1};
    var tempX = Math.max(this.clearRec.point0.x, this.clearRec.point1.x, this.clearRec.point2.x, this.clearRec.point3.x);
    var tempY = Math.max(this.clearRec.point0.y, this.clearRec.point1.y, this.clearRec.point2.y, this.clearRec.point3.y);
    this.clearRec.clearPoint0.width = (tempX - this.clearRec.clearPoint0.x)+1;
    this.clearRec.clearPoint0.height = (tempY - this.clearRec.clearPoint0.y)+1;
  }
  //-------------------------------------------------
	this.draw = function() {
    this.calculateAll();
    this.myContext.fillStyle = this.cir1.fillColor;
    //this.buildBox(this.clearRec);
    this.myContext.fillCircle(this.cir1);
	};
  //-------------------------------------------------
  this.clear = function() {
    console.log('clear');
    this.myContext.clearRect(this.clearRec.clearPoint0.x, this.clearRec.clearPoint0.y, this.clearRec.clearPoint0.width, this.clearRec.clearPoint0.height);
	};
  //-------------------------------------------------
  this.getHitRec = function(){
    var tempRec = {
      x: this.clearRec.clearPoint0.x+1,
      y: this.clearRec.clearPoint0.y+1,
      width: this.clearRec.clearPoint0.width-1,
      height: this.clearRec.clearPoint0.height-1,
      angle: this.degAngle,
      angleRange: 2,
      radius: this.radius,
    }
    if(this.state == "in"){
      tempRec.angleRange = 3;
    }
    return tempRec;
  }
  //-------------------------------------------------
  this.toPoints = function(center, box, radius, basePoints = false){
    box.point0 = {x:center.x+radius, y:center.y+(box.width * 0.5)};
    box.point1 = {x:center.x+radius, y:center.y+(box.width * -0.5)};
    box.point2 = {x:center.x+box.height+radius, y:center.y+(box.width *-0.5)};
    box.point3 = {x:center.x+box.height+radius, y:center.y+(box.width *0.5)};
    if(basePoints){
      box.basePoint0={x:center.x+radius, y:center.y};
      box.basePoint1={x:center.x+radius+box.height, y:center.y};
    }
  }
  //-------------------------------------------------
  this.rotateBox = function(center, box, angle) {
    for (var point in box) {
      if (box.hasOwnProperty(point)) {
        if (box[point].hasOwnProperty('x')) {
          this.rotate(center, box[point], angle);
        }
      }
    }
  }
  //-------------------------------------------------
  this.rotate = function(center, point, angle) {
    var radians = (Math.PI / 180) * angle, cos = Math.cos(radians),
    sin = Math.sin(radians),
    nx = (cos * (point.x - center.x)) - (sin * (point.y - center.y)) + center.x,
    ny = (cos * (point.y - center.y)) + (sin * (point.x - center.x)) + center.y;
    point.x = nx;
    point.y = ny;
  }
  //-------------------------------------------------
  this.buildBox = function(box){
    this.myContext.strokeStyle = "#333";
    this.myContext.beginPath();
    this.myContext.moveTo(box.point0.x, box.point0.y);
    this.myContext.lineTo(box.point1.x, box.point1.y);
    this.myContext.lineTo(box.point2.x, box.point2.y);
    this.myContext.lineTo(box.point3.x, box.point3.y);
    this.myContext.closePath();
    this.myContext.fill();
  }
  //-------------------------------------------------
  this.increaseSpeed = function(number){
    this.degAngleSpeed += number;
  }
  //-------------------------------------------------
}
//---------------------------------------------------------------
//---------------------------------------------------------------
//---------------------------------------------------------------
//---------------------------------------------------------------
//---------------------------------------------------------------
//---------------------------------------------------------------
function Collectables(canvas, context) {
  this.myCanvas = canvas;
  this.myContext = context;
  //-------------------------------------------------
  this.init = function(center, refSize, angle) {
    this.refSize = refSize;
    this.degAngle = angle;
    this.degAngleSpeed = 1;
    this.center = {x:center.x, y:center.y};
    //--
    if(this.allCollectables == undefined){
      this.allCollectables = [];
    }else{
      for(var collCount = 0; collCount < this.allCollectables.length; collCount++){
        var coll = this.allObstcales[collCount];
        if(coll != undefined){
          coll.draw();
        }
      }
    }
  }
  //-------------------------------------------------
  this.createCollect = function(){
    var coll = new Collectable(this.myCanvas, this.myContext);
    this.randomDegAngle = this.degAngle + 10 - Math.floor(Math.random() * 20);
    if(Math.floor(Math.random() * 2) == 0){
      this.randomDirection = "in";
    }else{
      this.randomDirection = "out";
    }
    coll.init(this.center, game.dimentions.refSize ,this.randomDegAngle , this.randomDirection);
    coll.draw();
    var noEmptyPlace = true;
    for(var collCount = 0; collCount < this.allCollectables.length; collCount++){
      if(this.allCollectables[collCount] == undefined){
        this.allCollectables[collCount] = coll;
        noEmptyPlace = false;
      }
    }
    if(noEmptyPlace){
      this.allCollectables.push(coll);
    }
  }
  //-------------------------------------------------
  this.clearAll = function(){
    this.allCollectables = undefined;
    this.myContext.clearRect(0, 0, this.myCanvas.width, this.myCanvas.height);
    //coll.clear();
  }
  //-------------------------------------------------
  this.animate = function(){
    if(this.counter == undefined){
      this.counter = 0;
    }else{
      this.counter++;
    }
    this.counter = this.counter % 120;
    if(this.counter == 30){
      this.createCollect();
    }
    this.degAngle = (this.degAngle + this.degAngleSpeed) % 360;
  }
  //-------------------------------------------------
  this.chickAngleRange = function(a1, ar1, a2, ar2){
    if((a1-ar1) <= (a2+ar2) && (a2-ar2) <= (a1+ar1)){
      return true;
    }
    return false;
  }
  //-------------------------------------------------
  this.chickPassedObst = function(obj) {
    //console.log('chickPassedObst');
    var avatarDim = obj;
    var collDim = {};
    for(var collCount = 0; collCount < this.allCollectables.length; collCount++){
      if(this.allCollectables[collCount] != undefined){
        collDim = this.allCollectables[collCount].getHitRec();
        var chickIn = this.chickAngleRange(avatarDim.angle, avatarDim.angleRange, collDim.angle, collDim.angleRange);
        if(chickIn){
          //console.log('chickIn--0');
          var coll = this.allCollectables[collCount];
          this.allCollectables[collCount] = undefined;
          //console.log(coll);
          coll.clear();
        }
      }
    }
  }
  //-------------------------------------------------
  this.chickForCollision = function(obj){
    //console.log('chickForCollision');
    var avatarDim = obj;
    var collDim = {};
    for(var collCount = 0; collCount < this.allCollectables.length; collCount++){
      if(this.allCollectables[collCount] != undefined){
        collDim = this.allCollectables[collCount].getHitRec();
        if(avatarDim.radius == collDim.radius){
          var chickIn = this.chickAngleRange(avatarDim.angle, avatarDim.angleRange, collDim.angle, collDim.angleRange);
          if(chickIn){
            var coll = this.allCollectables[collCount];
            this.allCollectables[collCount] = undefined;
            coll.clear();
            return true;
          }
        }
      }
    }
  }
  //-------------------------------------------------
  this.increaseSpeed = function(number){
    for(var collCount = 0; collCount < this.allCollectables.length; collCount++){
      if(this.allCollectables[collCount] != undefined){
        var coll = this.allCollectables[collCount];
        coll.increaseSpeed(number);
      }
    }
  }
  //-------------------------------------------------
}

//---------------------------------------------------------------
//---------------------------------------------------------------
//---------------------------------------------------------------

var game = {
  dimentions:{
    width: 0,
    height: 0,
    center:{x:0, y:0},
    refSize:0
  },
  bgCanvas:undefined,
  bgContext:undefined,
  obstCanvas:undefined,
  obstContext:undefined,
  collCanvas:undefined,
  collContext:undefined,
  avatCanvas:undefined,
  avatContext:undefined,
  colors:{
    c1:"#333",
    c2:"#666",
    c3:"#fff"
  }
};
//--
var setion = {
  score:0,
  topScore:0,
  animating: false,
  setionEnded: false,
  speedIncrease: 0.2,
};
//--
var speedIncrInterval;
//---------------------------------------------------------------
//---------------------------------------------------------------
//---------------------------------------------------------------
function fillCircle(obj){
  this.beginPath();
  this.arc(obj.x, obj.y, obj.radius, 0, Math.PI*2);
  this.closePath();
  this.fill();
}
//---------------------------------------------------------------
function strokeCircle(obj){
  this.beginPath();
  this.arc(obj.x, obj.y, obj.radius, 0, Math.PI*2);
  this.closePath();
  this.stroke();
}
//---------------------------------------------------------------
//---------------------------------------------------------------
//---------------------------------------------------------------
function getWidth(){
  game.dimentions.width = $("body").prop("clientWidth");
  return game.dimentions.width;
}
//---------------------------------------------------------------
function getHeight(){
  if(window.innerHeight > 0){
    game.dimentions.height = window.innerHeight;
  }else{
    game.dimentions.height = screen.height;
  }
  return game.dimentions.height;
}
//---------------------------------------------------------------
function updateDimensions(){
  if(getWidth() > getHeight()){
    game.dimentions.refSize = getHeight();
  }else{
    game.dimentions.refSize = getWidth();
  }
  game.dimentions.center.x = game.dimentions.refSize * 0.5;
  game.dimentions.center.y = game.dimentions.refSize * 0.5;
  return game.dimentions.refSize;
}
//---------------------------------------------------------------
function resizeCanvas(){
  updateDimensions();
  if(game.bgCanvas != undefined){
    game.bgCanvas.width = game.dimentions.refSize;
    game.bgCanvas.height = game.dimentions.refSize;
  }
  if(game.obstCanvas != undefined){
    game.obstCanvas.width = game.dimentions.refSize;
    game.obstCanvas.height = game.dimentions.refSize;
  }
  if(game.collCanvas != undefined){
    game.collCanvas.width = game.dimentions.refSize;
    game.collCanvas.height = game.dimentions.refSize;
  }
  if(game.avatCanvas != undefined){
    game.avatCanvas.width = game.dimentions.refSize;
    game.avatCanvas.height = game.dimentions.refSize;
  }
}
//---------------------------------------------------------------
function updatePlayBtn(){
  var leftArea = {};
  if(getWidth() > getHeight()){
    leftArea.width = getWidth() - getHeight();
    leftArea.height = getHeight();
    leftArea.x = getHeight();
    leftArea.y = 0;
  }else{
    leftArea.width = getWidth();
    leftArea.height = getHeight() - getWidth();
    leftArea.x = 0;
    leftArea.y = getWidth();
  }
  if(leftArea.width > leftArea.height){
    leftArea.refSize = leftArea.height;
  }else{
    leftArea.refSize = leftArea.width;
  }
  var playBtnArea = {};
  playBtnArea.width = leftArea.refSize *  0.6;
  playBtnArea.height = leftArea.refSize *  0.6;
  playBtnArea.x = leftArea.x + ((leftArea.width - playBtnArea.width)/2);
  playBtnArea.y = leftArea.y + ((leftArea.height - playBtnArea.height)/2);
  playBtnArea.borderRadius = playBtnArea.width / 2;
  $('#playBtn').css({
    'width': playBtnArea.width,
    'height': playBtnArea.height,
    'left': playBtnArea.x,
    'top': playBtnArea.y,
    'border-radius': playBtnArea.borderRadius,
  });
}
//---------------------------------------------------------------
function updateHtml(){
  game.bgCanvas = $('#gameBg')[0];
  game.bgContext = game.bgCanvas.getContext('2d');
  game.bgContext.fillCircle = fillCircle;
  game.bgContext.strokeCircle = strokeCircle;
  game.obstCanvas = $('#gameObst')[0];
  game.obstContext =  game.obstCanvas.getContext('2d');
  game.obstContext.fillCircle = fillCircle;
  game.obstContext.strokeCircle = strokeCircle;
  game.collCanvas = $('#gameColl')[0];
  game.collContext = game.collCanvas.getContext('2d');
  game.collContext.fillCircle = fillCircle;
  game.collContext.strokeCircle = strokeCircle;
  game.avatCanvas = $('#gameAvat')[0];
  game.avatContext = game.avatCanvas.getContext('2d');
  game.avatContext.fillCircle = fillCircle;
  game.avatContext.strokeCircle = strokeCircle;
  //--
  resizeCanvas();
  updatePlayBtn();
}
//---------------------------------------------------------------
function addResizeFunction(){
  $( window ).resize(function() {
    resizeCanvas();
    updatePlayBtn();
    setion.setionEnded = true;
  });
}

//---------------------------------------------------------------
//---------------------------------------------------------------
//---------------------------------------------------------------
window.requestAnimFrame = (function(){
	return  window.requestAnimationFrame   ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame    ||
			window.oRequestAnimationFrame      ||
			window.msRequestAnimationFrame     ||
			function(/* function */ callback, /* DOMElement */ element){
				window.setTimeout(callback, 1000 / 60);
			};
})();
//---------------------------------------------------------------
//---------------------------------------------------------------
//---------------------------------------------------------------
function buildGame(){
  setion.bg = new Background(game.bgCanvas, game.bgContext);
  //--
  setion.avatar = new Avatar(game.avatCanvas, game.avatContext);
  //--
  setion.obstcales = new Obstcales(game.obstCanvas, game.obstContext);
  //--
  setion.collectables = new Collectables(game.collCanvas, game.collContext);
}
//---------------------------------------------------------------
function resetGame(){
  setion.bg.init(game.dimentions.center, game.dimentions.refSize);
  setion.bg.draw(setion.topScore);
  //--
  setion.avatar.init(game.dimentions.center, game.dimentions.refSize, 270, "out");
  setion.avatar.draw();
  //--
  setion.obstcales.init(game.dimentions.center, game.dimentions.refSize, 90);
  //--
  setion.collectables.init(game.dimentions.center, game.dimentions.refSize, 90);
}
//---------------------------------------------------------------
function activatePlayBtn(){
  $('#playBtn').on('click', function(event) {
    event.preventDefault();
    if(setion.animating == false){
      setion.animating = true;
      speedIncrInterval = setInterval(increaseGameSpeed, 10000);
      requestAnimFrame(animateGame);
    }else if(setion.animating == true){
      if(setion.setionEnded == false){
        setion.avatar.switchState();
      }else{
        resetSetion();
      }
    }
    //requestAnimFrame(animateGame);
  });
}
//---------------------------------------------------------------
function increaseGameSpeed(){
  console.log('increaseGameSpeed');
  setion.avatar.increaseSpeed(setion.speedIncrease);
  setion.collectables.increaseSpeed(setion.speedIncrease);
  setion.obstcales.increaseSpeed(setion.speedIncrease);
}
//---------------------------------------------------------------
function animateGame(){
  //--
  setion.avatar.animate();
  setion.collectables.animate();
  setion.obstcales.animate();
  //--
  if(setion.collectables.chickForCollision(setion.avatar.getHitRec())){
    setion.score++;
    setion.bg.updateScore(setion.score);
    // console.log('setion.score');
    // console.log(setion.score);
  }else{
    setion.collectables.chickPassedObst(setion.avatar.getHitRec());
    //requestAnimFrame( animateGame );
  }
  //--
  if(setion.obstcales.chickForCollision(setion.avatar.getHitRec())){
    setion.avatar.clear();
    //console.log('chickForCollision');
    clearInterval(speedIncrInterval);
    console.log('Game is Ended !!');
    setion.setionEnded = true;
  }else{
    setion.obstcales.chickPassedObst(setion.avatar.getHitRec());
    console.log(setion.setionEnded == false);
    if(setion.setionEnded == false){
      requestAnimFrame( animateGame );
    }
  }
  //--
};
//---------------------------------------------------------------
//---------------------------------------------------------------
//---------------------------------------------------------------
function initGame(){
  //console.log('initGame');
  buildGame();
  resetGame();
  activatePlayBtn();
}
//---------------------------------------------------------------
//---------------------------------------------------------------
//---------------------------------------------------------------
function resetSetion(){
  //onsole.log('resetSetion');
  if(setion.topScore < setion.score){
    setion.topScore = setion.score;
  }
  setion.score = 0;
  //console.log(setion.topScore);
  setion.collectables.clearAll();
  setion.obstcales.clearAll();
  resetGame();
  setion.setionEnded = false;
  setion.animating = false;
}
//---------------------------------------------------------------
//---------------------------------------------------------------
//---------------------------------------------------------------
$(function(){
  updateHtml();
  addResizeFunction();
  initGame();
});