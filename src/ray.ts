import { Point3 } from "./vec3/point3"
import { Vec3 } from "./vec3/vec3"

export class Ray {
  constructor(public origin: Point3, public direction: Vec3) { }

  at(t: number): Point3 {
    return this.origin.addVector(this.direction.multiplyByScalar(t))
  }
}
