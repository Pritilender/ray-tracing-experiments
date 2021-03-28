import { Vec3 } from "./vec3"

export class Color extends Vec3 {
  toString(): string {
    const r = (255 * this.x) | 0
    const g = (255 * this.y) | 0
    const b = (255 * this.z) | 0

    return `${r} ${g} ${b}\n`
  }
}
