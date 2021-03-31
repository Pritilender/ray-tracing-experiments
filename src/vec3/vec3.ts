import { randomInRange } from "../utils"

export class Vec3 {
  static random(min: number, max: number): Vec3 {
    return new Vec3(randomInRange(min, max), randomInRange(min, max), randomInRange(min, max))
  }

  static randomInUnitSphere(): Vec3 {
    let p: Vec3

    do {
      p = this.random(-1, 1)
    } while (p.lengthSquared() >= 1)

    return p
  }

  static randomInHemisphere(normal: Vec3): Vec3 {
    const inUnitSphere = this.randomInUnitSphere()
    if (inUnitSphere.dotProduct(normal) > 0) {
      return inUnitSphere
    } else {
      return inUnitSphere.multiplyByScalar(-1)
    }
  }

  static randomUnitVector(): Vec3 {
    return this.randomInUnitSphere().unitVector()
  }

  public e: number[]

  constructor(e0: number, e1: number, e2: number) {
    this.e = [e0, e1, e2]
  }

  get x(): number {
    return this.e[0]
  }

  get y(): number {
    return this.e[1]
  }

  get z(): number {
    return this.e[2]
  }

  isNearZero(): boolean {
    const s = 1e-8
    return this.e.every(x => Math.abs(x) < s)
  }

  reflect(centerVector: Vec3): Vec3 {
    return this.subtractVector(centerVector.multiplyByScalar(2 * this.dotProduct(centerVector)))
  }

  addVector(rhs: Vec3): Vec3 {
    return new Vec3(this.e[0] + rhs.e[0], this.e[1] + rhs.e[1], this.e[2] + rhs.e[2])
  }

  subtractVector(rhs: Vec3): Vec3 {
    return new Vec3(this.e[0] - rhs.e[0], this.e[1] - rhs.e[1], this.e[2] - rhs.e[2])
  }

  multiplyByVector(rhs: Vec3): Vec3 {
    return new Vec3(this.e[0] * rhs.e[0], this.e[1] * rhs.e[1], this.e[2] * rhs.e[2])
  }

  dotProduct(rhs: Vec3): number {
    return this.e[0] * rhs.e[0] +
      this.e[1] * rhs.e[1] +
      this.e[2] * rhs.e[2]
  }

  crossProduct(rhs: Vec3): Vec3 {
    return new Vec3(
      this.e[1] * rhs.e[2] - this.e[2] * rhs.e[1],
      this.e[2] * rhs.e[0] - this.e[0] * rhs.e[2],
      this.e[0] * rhs.e[1] - this.e[1] * rhs.e[0]
    )
  }

  multiplyByScalar(s: number): Vec3 {
    return new Vec3(this.e[0] * s, this.e[1] * s, this.e[2] * s)
  }

  divideByScalar(s: number): Vec3 {
    return this.multiplyByScalar(1 / s)
  }

  lengthSquared(): number {
    return this.e[0] * this.e[0] + this.e[1] * this.e[1] + this.e[2] * this.e[2]
  }

  length(): number {
    return Math.sqrt(this.lengthSquared())
  }

  unitVector(): Vec3 {
    return this.divideByScalar(this.length())
  }

  toString(): string {
    return `${this.e[0]} ${this.e[1]} ${this.e[2]}`
  }
}
