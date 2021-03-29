import { writeFile } from "fs/promises"
import { Ray } from "./ray"
import { Color } from "./vec3/color"
import { Point3 } from "./vec3/point3"
import { Vec3 } from "./vec3/vec3"

const rayColor = (ray: Ray): Color => {
  if (hitSphere(new Point3(0, 0, -1), 0.5, ray)) {
    return new Color(1, 0, 0)
  }

  const unitDirection: Vec3 = ray.direction.unitVector()
  const t = 0.5 * (unitDirection.y + 1)
  const white: Color = new Color(1, 1, 1)
  const blue: Color = new Color(0.5, 0.7, 1)
  // Operations return new Vec3 objects, which breaks the inheritance. Fix this!
  const vec: Vec3 = white.multiplyByScalar(1 - t).addVector(blue.multiplyByScalar(t))
  return new Color(vec.x, vec.y, vec.z)
}

const hitSphere = (center: Point3, radius: number, ray: Ray): boolean => {
  const oc: Vec3 = ray.origin.subtractVector(center)
  const a: number = ray.direction.dotProduct(ray.direction)
  const b: number = 2 * oc.dotProduct(ray.direction)
  const c: number = oc.dotProduct(oc) - radius ** 2
  const discriminant = b * b - 4 * a * c
  return discriminant > 0
}

const main = async () => {
  // Image configuration
  const filename: string = process.argv[2] || `${Date.now()}.ppm`
  const aspectRatio = 16 / 9
  const imageWidth = 400
  const imageHeight = (imageWidth / aspectRatio) | 0

  // Camera configuration
  const viewportHeight = 2
  const viewportWidth = aspectRatio * viewportHeight
  const focalLength = 1

  const origin = new Point3(0, 0, 0)
  const horizontal = new Vec3(viewportWidth, 0, 0)
  const vertical = new Vec3(0, viewportHeight, 0)
  const lowerLeftCorner = origin.subtractVector(horizontal.divideByScalar(2)).subtractVector(vertical.divideByScalar(2)).subtractVector(new Vec3(0, 0, focalLength))

  // Rendering
  let fileContent = `P3\n${imageWidth} ${imageHeight}\n255\n`

  for (let j = imageHeight - 1; j >= 0; j--) {
    console.info(`\rScanlines remaining: ${j}`)
    for (let i = 0; i < imageWidth; i++) {
      const u = i / (imageWidth - 1)
      const v = j / (imageHeight - 1)

      const rayDirection: Vec3 = lowerLeftCorner.addVector(horizontal.multiplyByScalar(u)).addVector(vertical.multiplyByScalar(v)).subtractVector(origin)
      const ray: Ray = new Ray(origin, rayDirection)
      const color: Color = rayColor(ray)

      fileContent += color
    }
  }

  await writeFile(`img/${filename}`, fileContent)
  console.info("\nDone.\n")
}

main().then(_ => console.log("Bye!"))
