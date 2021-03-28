import { writeFile } from "fs/promises"
import { Color } from "./vec3/color"

const main = async () => {
  const imageWidth = 256
  const imageHeight = 256

  let fileContent = `P3\n${imageWidth} ${imageHeight}\n255\n`

  for (let j = imageHeight - 1; j >= 0; j--) {
    console.info(`\rScanlines remaining: ${j}`)
    for (let i = 0; i < imageWidth; i++) {
      const color = new Color(
        i / (imageWidth - 1),
        j / (imageHeight - 1),
        0.25
      )

      fileContent += color
    }
  }

  await writeFile("img/out1.ppm", fileContent)
  console.info("\nDone.\n")
}

main().then(_ => console.log("Bye!"))
