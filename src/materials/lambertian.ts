import { HitResult } from "../objects/hittable"
import { Ray } from "../ray"
import { Color } from "../vec3/color"
import { Vec3 } from "../vec3/vec3"
import { Material, ScatterResult } from "./material"

export class Lambertian implements Material {
  constructor(public albedo: Color) { }

  scatter(ray: Ray, hit: HitResult): ScatterResult {
    let scatterDirection = hit.normal.addVector(Vec3.randomUnitVector())

    if (scatterDirection.isNearZero()) {
      scatterDirection = hit.normal
    }

    return {
      scattered: new Ray(hit.point, scatterDirection),
      attenuation: this.albedo,
      isScattered: true,
    }
  }

}
