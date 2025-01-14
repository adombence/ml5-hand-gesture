let video;
let handPose;
let hands = [];
let connections = [];

function preload() {
  handPose = ml5.handPose({ flipped: true });
}

function mousePressed() {
  console.log(hands);
}

function gotHands(results) {
  hands = results;
}

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO, { flipped: true });
  video.hide();
  handPose.detectStart(video, gotHands);
  connections = handPose.getConnections();
}

function draw() {
  // Draw the webcam video
  image(video, 0, 0, width, height);

  // Draw the skeletal connections
  for (let hand of hands) {
    for (let connection of connections) {
      let pointAIndex = connection[0];
      let pointBIndex = connection[1];
      let pointA = hand.keypoints[pointAIndex];
      let pointB = hand.keypoints[pointBIndex];

      if (hand.handedness == "Left") {
        stroke(96, 187, 226);
      } else {
        stroke(236, 94, 79);
      }
      strokeWeight(2);
      line(pointA.x, pointA.y, pointB.x, pointB.y);
    }
  }

  // Draw all the tracked hand points
  for (let hand of hands) {
    for (let keypoint of hand.keypoints) {
      fillHand(hand);
      noStroke();
      circle(keypoint.x, keypoint.y, 10);
    }
  }
}

function fillHand(hand) {
  if (hand.handedness == "Left") {
    fill(255, 0, 255);
  } else {
    fill(255, 255, 0);
  }
}
