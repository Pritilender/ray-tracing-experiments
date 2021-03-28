export class Vec3 {
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
