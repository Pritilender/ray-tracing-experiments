import { writeFile } from "fs/promises"
import { Camera } from "./camera"
import { Hittable } from "./objects/hittable"
import { HittableList } from "./objects/hittable-list"
import { Sphere } from "./objects/sphere"
import { Ray } from "./ray"
import { Color } from "./vec3/color"
import { Point3 } from "./vec3/point3"
import { Vec3 } from "./vec3/vec3"

const rayColor = (ray: Ray, world: Hittable, depth: number): Color => {
  if (depth <= 0) {
    return new Color(0, 0, 0)
  }

  const result = world.hit(ray, 0.001, Number.MAX_SAFE_INTEGER)

  if (result) {
    const target = result.point.addVector(result.normal).addVector(Vec3.randomInHemisphere(result.normal))
    const baseColorAsVec3: Vec3 = rayColor(
      new Ray(result.point, target.subtractVector(result.point)),
      world,
      depth - 1
    ).multiplyByScalar(0.5)

    return new Color(baseColorAsVec3.x, baseColorAsVec3.y, baseColorAsVec3.z)
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
  const samplesPerPixel = 100
  const maxDepth = 50

  // Camera configuration
  const camera = new Camera()

  // World
  const world: HittableList = new HittableList()
  world.add(new Sphere(new Point3(0, 0, -1), 0.5))
  world.add(new Sphere(new Point3(0, -100.5, -1), 100))

  // Rendering
  let fileContent = `P3\n${imageWidth} ${imageHeight}\n255\n`

  for (let j = imageHeight - 1; j >= 0; j--) {
    console.info(`\rScanlines remaining: ${j}`)
    for (let i = 0; i < imageWidth; i++) {
      let color = new Color(0, 0, 0)
      for (let s = 0; s < samplesPerPixel; s++) {
        const u = (i + Math.random()) / (imageWidth - 1)
        const v = (j + Math.random()) / (imageHeight - 1)
        const ray = camera.getRay(u, v)
        color = color.addVector(rayColor(ray, world, maxDepth))
      }
      fileContent += color.write(samplesPerPixel)
    }
  }

  await writeFile(`img/${filename}`, fileContent)
  console.info("\nDone.\n")
}

main().then(_ => console.log("Bye!"))
