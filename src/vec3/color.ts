import { clamp } from "../utils"
import { Vec3 } from "./vec3"

export class Color extends Vec3 {
  toString(): string {
    const r = (255 * this.x) | 0
    const g = (255 * this.y) | 0
    const b = (255 * this.z) | 0

    return `${r} ${g} ${b}\n`
  }

  write(samplesPerPixel: number): string {
    const scale = 1 / samplesPerPixel
    let r = Math.sqrt(scale * this.x)
    let g = Math.sqrt(scale * this.y)
    let b = Math.sqrt(scale * this.z)

    r = (256 * clamp(r, 0, 0.999)) | 0
    g = (256 * clamp(g, 0, 0.999)) | 0
    b = (256 * clamp(b, 0, 0.999)) | 0

    return `${r} ${g} ${b}\n`
  }

  addVector(color: Color): Color {
    const vecColor = super.addVector(color)
    return new Color(vecColor.x, vecColor.y, vecColor.z)
  }
}
