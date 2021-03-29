import { writeFile } from "fs/promises"
import { Hittable } from "./objects/hittable"
import { HittableList } from "./objects/hittable-list"
import { Sphere } from "./objects/sphere"
import { Ray } from "./ray"
import { Color } from "./vec3/color"
import { Point3 } from "./vec3/point3"
import { Vec3 } from "./vec3/vec3"

const rayColor = (ray: Ray, world: Hittable): Color => {
  const result = world.hit(ray, 0, Number.MAX_SAFE_INTEGER)
  if (result) {
    const n = result.normal
    const baseColor: Color = (new Color(n.x + 1, n.y + 1, n.z + 1)).multiplyByScalar(0.5)

    return new Color(baseColor.x, baseColor.y, baseColor.z)
  }

  const unitDirection: Vec3 = ray.direction.unitVector()
  const t = 0.5 * (unitDirection.y + 1)
  const white: Color = new Color(1, 1, 1)
  const blue: Color = new Color(0.5, 0.7, 1)
  // Operations return new Vec3 objects, which breaks the inheritance. Fix this!
  const vec: Vec3 = white.multiplyByScalar(1 - t).addVector(blue.multiplyByScalar(t))
  return new Color(vec.x, vec.y, vec.z)
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

  // World
  const world: HittableList = new HittableList()
  world.add(new Sphere(new Point3(0, 0, -1), 0.5))
  world.add(new Sphere(new Point3(0, -100.5, -1), 100))

  // Rendering
  let fileContent = `P3\n${imageWidth} ${imageHeight}\n255\n`

  for (let j = imageHeight - 1; j >= 0; j--) {
    console.info(`\rScanlines remaining: ${j}`)
    for (let i = 0; i < imageWidth; i++) {
      const u = i / (imageWidth - 1)
      const v = j / (imageHeight - 1)

      const rayDirection: Vec3 = lowerLeftCorner.addVector(horizontal.multiplyByScalar(u)).addVector(vertical.multiplyByScalar(v)).subtractVector(origin)
      const ray: Ray = new Ray(origin, rayDirection)
      const color: Color = rayColor(ray, world)

      fileContent += color
    }
  }

  await writeFile(`img/${filename}`, fileContent)
  console.info("\nDone.\n")
}

main().then(_ => console.log("Bye!"))
