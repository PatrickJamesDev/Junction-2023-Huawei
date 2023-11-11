document.addEventListener('DOMContentLoaded', function () {
    const rotation = new Rotation();
    let counter = 30; // Initial counter value

    webgazer.setRegression('ridge')
        .setTracker('clmtrackr')
        .setGazeListener(function(data, clock) {
            if (data == null) {
                return;
            }

            const faceModel = data.face; // Access face model data
            if (faceModel) {
                const faceAngle = faceModel.angle; // Get the angle of the face
                document.getElementById("face-angle").value = faceAngle.toFixed(2);

                // Check if the face tracking model has points
                if (faceModel.points) {
                    // Access face tracking points (vertices)
                    const facePoints = faceModel.points;
                    console.log("Face Points:", facePoints);
                }
            }

            const phoneAngle = rotation.getRotation(); // Get the angle of the phone
            document.getElementById("rotation").value = phoneAngle.toFixed(2);

            // Check if the phone angle is below 35 degrees
            if (phoneAngle < 35) {
                startCounter();
            } else {
                resetCounter();
            }
        })
        .begin();
    webgazer.showPredictionPoints(true);

    setInterval(() => {
        const phoneRotation = rotation.getRotation();
        if (phoneRotation > 10) {
            document.getElementById("exercise").style.display = "block";
        } else {
            document.getElementById("exercise").style.display = "none";
        }
    }, 10); // Update every 0.01 second, adjust as needed

    

    // Function to check if the angle of the phone is below 35 degrees and start the counter
    //the counter is set to 30 seconds and counts down to 0
    function startCounter() {
        if (counter > 0) {
            counter--;
            document.getElementById("counter").value = counter;
        } else {
            // Counter reached 0, take appropriate action
            console.log("Counter reached 0. Implement your action here.");
            //send notification to browser "Hey fix your posture"
            // Check if the browser supports notifications
            if (!("Notification" in window)) {
                console.log("This browser does not support desktop notification");
            }
            
            // Check whether notification permissions have already been granted
            else if (Notification.permission === "granted") {
                // If it's okay let's create a notification
                if (counter === 0) {
                new Notification("Hey fix your posture");
                }
            }
            
            // Otherwise, we need to ask the user for permission
            else if (Notification.permission !== 'denied' || Notification.permission === "default") {
                Notification.requestPermission(function (permission) {
                // If the user accepts, let's create a notification
                if (permission === "granted" && counter === 0) {
                    new Notification("Hey fix your posture");
                }
                });
            }}
    // Function to reset the counter to its initial value
    function resetCounter() {
        counter = 30;
        document.getElementById("counter").value = counter;
    }
});