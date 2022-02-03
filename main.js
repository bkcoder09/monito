status = "";
object = [];

function preload(){
    alarm = loadSound('Alarm.mp3');
}

function setup(){
    canvas = createCanvas(400, 375);
    canvas.center();

    video = createCapture();
    video.hide();

    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("stats").innerHTML = " Status - Detecting Objects :D ";
}

function modelLoaded(){
    console.log("Model Is Working");
    status = true;
    objects = results;
    objectDetector.detect(video, gotResult);
}

function gotResult(error, results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
    }
}

function draw(){
    image(video, 0, 0, 400, 375);

    if(status != ""){
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(video, gotResult);
        for(i = 0; i < objects.length; i++){
        document.getElementById("stats").innerHTML = " Status - Detecting Objects :D ";
        fill(r, g, b);
        percent = floor(objects[i].confidence * 100);
        text(objects[i].label+" "+percent+"%", objects[i].x ,objects[i].y);
        noFill();
        stroke(r, g, b);
        rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
    if(objects[i].label == "person"){
        document.getElementById("uhoh").innerHTML = " Baby is Found ";
        alarm.stop();
    }
    else if(objects[i].length <= 0){
        document.getElementById("uhoh").innerHTML = " Baby Not Found ";
        alarm.play();
    }
}