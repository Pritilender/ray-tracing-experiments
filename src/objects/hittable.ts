import { Material } from "../materials/material"
import { Ray } from "../ray"
import { Point3 } from "../vec3/point3"
import { Vec3 } from "../vec3/vec3"

export class HitResult {
  public frontFace: boolean
  public normal: Vec3
  public point: Point3
  public t: number
  public material: Material

  constructor(point: Point3, t: number, outwardNormal: Vec3, ray: Ray, material: Material) {
    this.point = point
    this.t = t
    this.frontFace = ray.direction.dotProduct(outwardNormal) < 0
    this.normal = this.frontFace ? outwardNormal : outwardNormal.multiplyByScalar(-1)
    this.material = material
  }
}

export interface Hittable {
  // Returns hit result if something was hit, otherwise it returns null
  hit: (ray: Ray, tMin: number, tMax: number) => HitResult | null
}
