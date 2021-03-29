import { Ray } from "./ray"
import { Point3 } from "./vec3/point3"
import { Vec3 } from "./vec3/vec3"

export class Camera {
  public origin: Point3
  public lowerLeftCorner: Point3
  public horizontal: Vec3
  public vertical: Vec3

  constructor() {
    const aspectRatio = 16 / 9
    const viewportHeight = 2
    const viewportWidth = aspectRatio * viewportHeight
    const focalLength = 1

    this.origin = new Point3(0, 0, 0)
    this.horizontal = new Vec3(viewportWidth, 0, 0)
    this.vertical = new Vec3(0, viewportHeight, 0)
    this.lowerLeftCorner = this.origin
      .subtractVector(this.horizontal.divideByScalar(2))
      .subtractVector(this.vertical.divideByScalar(2))
      .subtractVector(new Vec3(0, 0, focalLength))
  }

  getRay(u: number, v: number): Ray {
    return new Ray(
      this.origin,
      this.lowerLeftCorner
        .addVector(this.horizontal.multiplyByScalar(u))
        .addVector(this.vertical.multiplyByScalar(v))
        .subtractVector(this.origin)
    )
  }
}
