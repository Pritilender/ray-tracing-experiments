import { Ray } from "../ray"
import { HitResult, Hittable } from "./hittable"

export class HittableList implements Hittable {
  public list: Hittable[] = []

  add(obj: Hittable): void {
    this.list.push(obj)
  }

  hit(ray: Ray, tMin: number, tMax: number): HitResult | null {
    let closestSoFar = tMax
    let hitResult: HitResult | null = null

    for (const obj of this.list) {
      const hit = obj.hit(ray, tMin, closestSoFar)

      if (hit) {
        hitResult = hit
        closestSoFar = hit.t
      }
    }

    return hitResult
  }
}
