status1 = "";
object = [];
function preload(){
    song = loadSound("alarm.mp3");
    image = loadImage("background.jpg")
}
function setup(){
    canvas = createCanvas(300, 300);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide;
    objectDetection = ml5.objectDetector("cocossd", modelLoaded)
    document.getElementById("status").innerHTML = "STATUS:DETECTING OBJECTS";
}
function draw(){
    image(video, 0, 0, 300, 300)
    if(status1 != 0){
        r = random(255);
        g = random(255);
        b = random(255);
        for(i = 0; i < object.length; i++){
            document.getElementById("status").innerHTML = "STATUS:OBJECTS HAVE BEEN DETECTED";
            confidence = floor(object[i].confidence * 100);
            fill(r,g,b);
            text(object[i].label + "" + confidence + "%", object[i].x, object[i].y);
            noFill();
            stroke(r,g,b);
            rect(object[i].x, object[i].y, object[i].width, object[i].height);
        };
    }
    else{
        song.play();
    }
    function modelLoaded(){
        console.log("model loaded ")
        status1 = true;
        objectDetection.detect(video, gotResults);
        }
        function gotResults(error, results){
            if(error){
                console.error(error);
            }
            console.log(results);
            object = results;
        }
    
}
