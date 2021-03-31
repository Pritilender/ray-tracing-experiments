import { HitResult } from "../objects/hittable"
import { Ray } from "../ray"
import { Color } from "../vec3/color"

export interface ScatterResult {
  attenuation: Color
  scattered: Ray
  isScattered: boolean
}

export interface Material {
  scatter(ray: Ray, hit: HitResult): ScatterResult
}
