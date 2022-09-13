img = ""
status = ""
objects = []


function preload(){
    song = loadSound("warning.mp3")
}

function setup() {

    canvas = createCanvas(300, 300)
    canvas.center()
    video = createCapture(VIDEO)
    video.hide()
    video.size(300, 300)


}



function draw() {
    image(video, 0, 0, 300, 300)

    if (status != "") {
        r = random(255)
        g = random(255)
        b = random(255)

        objectDetector.detect(video, gotresult)
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status : objects detected"
            document.getElementById("number_of_objects").innerHTML = "Number of object detected are :" + objects.length
            fill(r, g, b)
            percent = floor(objects[i].confidence * 100)
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15)
            noFill()
            stroke(r, b, g)
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height)

            if(objects[i].label == "person"){
                song.stop()
                document.getElementById("status").innerHTML = "Baby Found"
            }else{song.play()
            document.getElementById("status").innerHTML = "Baby not found"
            }

        }
    }
}

function modelloaded() {
    console.log("cocoSSD is loaded!")
    status = true
}

function gotresult(error, result) {
    if (error) {
        console.log(error)
    } else { console.log(result) }

    objects = result
}

function start() {
    objectDetector = ml5.objectDetector("cocossd", modelloaded)
    document.getElementById("status").innerHTML = "Status : detecting objects"
}