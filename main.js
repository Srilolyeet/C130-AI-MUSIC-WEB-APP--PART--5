var music="";
var sounds="";
leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;
function preload(){
    music=loadSound("music.mp3");
    sounds=loadSound("music2.mp3");
}
function setup(){
    canvas=createCanvas(500,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses)
}
function modelLoaded(){
    console.log('PoseNet Is Initialized');
}
function gotPoses(results)
{
    if(results.length>0)
    { 
        scoreRightWrist=results[0].pose.keypoints[10].score;
        scoreLeftWrist=results[0].pose.keypoints[9].score;
        console.log("scoreLeftwrist="+scoreLeftWrist);
        console.log("scoreRightWrist="+scoreRightWrist+"scoreLeftWrist="+scoreLeftWrist);

        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;
        console.log("leftWristX="+leftWristX+"leftWristY="+leftWristY);

        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;
        console.log("rightWristX="+rightWristX+"rightWristY="+rightWristY);
    }
}
function draw(){
    image(video,0,0,500,500);

    fill("#ff6500");
    stroke("#0030ff");

    if(scoreRightWrist>0.2)
    {
        circle(rightWristX,rightWristY,20);

        if(rightWristY>0&&rightWristY<=100)
        {
            document.getElementById("Speed").innerHTML="Speed=0.5x";
            song.rate(0.5);
        }
        else if(rightWristY>100&&rightWristY<=200)
        {
            document.getElementById("Speed").innerHTML="Speed=1";
            song.rate(1);
        }
        else if(rightWristY>200&&rightWristY<=300)
        {
            document.getElementById("Speed").innerHTML="Speed=1.5";
            song.rate(1.5);
        }
        else if(rightWristY>300&&rightWristY<=400)
        {
            document.getElementById("Speed").innerHTML="Speed=2";
            song.rate(2);
        }
        else if(rightWristY>400&&rightWristY<=500)
        {
            document.getElementById("Speed").innerHTML="Speed=2.5";
            song.rate(2.5);
        }
    }

    if(scoreLeftWrist>0.2)
    {
        circle(leftWristX,leftWristY,20);
        InNumberleftWristY= number(leftWristY);
        remove_decimals=floor(InNumberleftWristY);
        volume=remove_decimals/500;
        document.getElementById("volume").innerHTML="Volume="+volume;
        music.setVolume(volume);
    }
}
function play()
{
    music.play();
    music.setVolume(1);
    music.rate(1);
}