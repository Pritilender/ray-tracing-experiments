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
    const r = (256 * this.clamp(this.x * scale, 0, 0.999)) | 0
    const g = (256 * this.clamp(this.y * scale, 0, 0.999)) | 0
    const b = (256 * this.clamp(this.z * scale, 0, 0.999)) | 0

    return `${r} ${g} ${b}\n`
  }

  addVector(color: Color): Color {
    const vecColor = super.addVector(color)
    return new Color(vecColor.x, vecColor.y, vecColor.z)
  }

  // TODO: This should be in some util
  private clamp(x: number, min: number, max: number): number {
    if (x < min) {
      return min
    } else if (x > max) {
      return max
    } else {
      return x
    }
  }
}
