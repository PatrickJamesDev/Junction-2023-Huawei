// Define Rotation class
class Rotation {
  constructor() {
    this.rotationValue = 0;
    if (window.DeviceOrientationEvent) {
      window.addEventListener(
        "deviceorientation",
        (event) => {
          const rotateDegrees = event.alpha; // alpha: rotation around z-axis
          const leftToRight = event.gamma; // gamma: left to right
          const frontToBack = event.beta; // beta: front back motion

          this.rotationValue = frontToBack; // Use frontToBack as rotation value

          handleOrientationEvent(frontToBack, leftToRight, rotateDegrees);
        },
        true
      );
    }
  }

  getRotation() {
    return this.rotationValue;
  }
}

const handleOrientationEvent = (frontToBack, leftToRight, rotateDegrees) => {
  // do something amazing
  // You can add your custom logic here
};

// Export the Rotation class
window.Rotation = Rotation;
