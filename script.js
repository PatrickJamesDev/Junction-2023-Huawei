document.addEventListener('DOMContentLoaded', function () {
    const rotation = new Rotation();

    // Load face-api.js models
    Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri('models'),
        faceapi.nets.faceLandmark68Net.loadFromUri('models'),
        faceapi.nets.faceRecognitionNet.loadFromUri('models'),
    ]).then(startWebGazer);

    function startWebGazer() {
        webgazer.setRegression('ridge')
            .setTracker('clmtrackr')
            .setGazeListener(function(data, clock) {
                if (data == null) {
                    return;
                }

                trackFaceAngle(data); // Call the function to track face angle

                const phoneAngle = rotation.getRotation(); // Get the angle of the phone
                document.getElementById("rotation").value = phoneAngle.toFixed(2);
            })
            .begin();
        webgazer.showPredictionPoints(true);
    }

    setInterval(() => {
        const phoneRotation = rotation.getRotation();
        if (phoneRotation > 10) {
            document.getElementById("exercise").style.display = "block";
        } else {
            document.getElementById("exercise").style.display = "none";
        }
    }, 10); // Update every 0.01 second, adjust as needed

    // Corrected function to track face angle
    function trackFaceAngle(data) {
        const faceModel = data.face; // Access face model data
        if (faceModel) {
            const faceAngle = faceModel.angle; // Get the angle of the face
            document.getElementById("face-angle").value = faceAngle.toFixed(2);
        }
    }
});