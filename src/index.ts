import { writeFile } from "fs/promises"
import { Ray } from "./ray"
import { Color } from "./vec3/color"
import { Point3 } from "./vec3/point3"
import { Vec3 } from "./vec3/vec3"

const rayColor = (ray: Ray): Color => {
  let t = hitSphere(new Point3(0, 0, -1), 0.5, ray)

  if (t > 0) {
    const n: Vec3 = ray.at(t).subtractVector(new Vec3(0, 0, -1)).unitVector()
    const baseColor: Color = (new Color(n.x + 1, n.y + 1, n.z + 1)).multiplyByScalar(0.5)

    return new Color(baseColor.x, baseColor.y, baseColor.z)
  }

  const unitDirection: Vec3 = ray.direction.unitVector()
  t = 0.5 * (unitDirection.y + 1)
  const white: Color = new Color(1, 1, 1)
  const blue: Color = new Color(0.5, 0.7, 1)
  // Operations return new Vec3 objects, which breaks the inheritance. Fix this!
  const vec: Vec3 = white.multiplyByScalar(1 - t).addVector(blue.multiplyByScalar(t))
  return new Color(vec.x, vec.y, vec.z)
}

const hitSphere = (center: Point3, radius: number, ray: Ray): number => {
  const oc: Vec3 = ray.origin.subtractVector(center)
  const a: number = ray.direction.lengthSquared()
  const halfB: number = oc.dotProduct(ray.direction)
  const c: number = oc.lengthSquared() - radius * radius
  const discriminant = halfB * halfB - a * c

  if (discriminant < 0) {
    return -1
  } else {
    return (-halfB - Math.sqrt(discriminant)) / a
  }
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
