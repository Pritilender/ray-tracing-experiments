import { HitResult } from "../objects/hittable"
import { Ray } from "../ray"
import { Color } from "../vec3/color"
import { Vec3 } from "../vec3/vec3"
import { Material, ScatterResult } from "./material"

export class Metal implements Material {
  public albedo: Color
  public fuzz: number

  constructor(albedo: Color, fuzz: number) {
    this.albedo = albedo
    this.fuzz = fuzz < 1 ? fuzz : 1
  }

  scatter(ray: Ray, hit: HitResult): ScatterResult {
    const reflected = ray.direction.unitVector().reflect(hit.normal)
    const scattered = new Ray(hit.point, reflected.addVector(Vec3.randomInUnitSphere().multiplyByScalar(this.fuzz)))

    return {
      scattered: scattered,
      attenuation: this.albedo,
      isScattered: scattered.direction.dotProduct(hit.normal) > 0,
    }
  }
}
