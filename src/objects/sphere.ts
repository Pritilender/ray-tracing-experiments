import { Ray } from "../ray"
import { Point3 } from "../vec3/point3"
import { Vec3 } from "../vec3/vec3"
import { HitResult, Hittable } from "./hittable"

export class Sphere implements Hittable {
  constructor(public center: Point3, public radius: number) { }

  hit(ray: Ray, tMin: number, tMax: number): HitResult | null {
    const oc: Vec3 = ray.origin.subtractVector(this.center)
    const a: number = ray.direction.lengthSquared()
    const halfB: number = oc.dotProduct(ray.direction)
    const c: number = oc.lengthSquared() - this.radius * this.radius
    const discriminant = halfB * halfB - a * c

    if (discriminant < 0) {
      return null
    }

    const sqrtDisc = Math.sqrt(discriminant)
    let root = (-halfB - sqrtDisc) / a
    if (root < tMin || tMax < root) {
      root = (-halfB + sqrtDisc) / a
      if (root < tMin || tMax < root) {
        return null
      }
    }

    const rayAtRoot = ray.at(root)

    return new HitResult(
      rayAtRoot,
      root,
      rayAtRoot.subtractVector(this.center).divideByScalar(this.radius),
      ray,
    )
  }
}
