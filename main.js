song_song_1 = "";
song_1="";
song_song_2 = "";
song_2="";
leftWristX = 0;
leftWristY = 0;
rightWirstX = 0;
rightWirstY = 0;
scoreleftWrist = 0;
scorerightWrist = 0;

function preload(){
    song_1 = loadSound("music-1.mp3");
    song_2 = loadSound("music-2.mp3");
}
function setup(){
    canvas = createCanvas(600,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}
function draw(){
    image(video,0,0,600,500);

    fill("#0000");
    stroke("#000000");

    song_song__1 = song_1.isPlaying();
    console.log(" Close Eyes = " + song_song_1);

    song_song_2 = song_2.isPlaying();
    console.log(" Montero = " + song_song_2);

    if(scoreleftWrist > 0.2){
        circle(leftWristX,leftWristY,20);
        song_2.stop();
        if(song_song_1 == false){
            song_1.play();
        }
        else{
            document.getElementById("song_id").innerHTML = "Song Name : Close Eyes";
        }
    }

    if(scorerightWrist > 0.2){
        circle(rightWristX,rightWirstY,20);
        song_1.stop();
        if(song_song_2 == false){
            song_2.play();
        }
        else{
            document.getElementById("song_id").innerHTML = "Song Name : Montero";
        }
    }
}

function modelLoaded(){
    console.log("Pose Net model is loaded");
}

function gotPoses(results){
    if(results.length>0){
        console.log(results);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("LeftWristx = " + leftWristX + " LeftWristy =" + leftWristY);
        
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("RightWristx = " + rightWristX + " RightWristy =" + rightWristY);
        scoreLeftwrist = results[0].pose.keypoints[9].score;

    }
}