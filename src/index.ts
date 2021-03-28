import { writeFile } from "fs/promises"

const main = async () => {
  const imageWidth = 256
  const imageHeight = 256

  let fileContent = `P3\n${imageWidth} ${imageHeight}\n255\n`

  for (let j = imageHeight - 1; j >= 0; j--) {
    console.info(`\rScanlines remaining: ${j}`)
    for (let i = 0; i < imageWidth; i++) {
      const r = i / (imageWidth - 1)
      const g = j / (imageHeight - 1)
      const b = 0.25

      const ir = (255 * r) | 0
      const ig = (255 * g) | 0
      const ib = (255 * b) | 0

      fileContent += `${ir} ${ig} ${ib}\n`
    }
  }

  await writeFile("img/out.ppm", fileContent)
  console.info("\nDone.\n")
}

main().then(_ => console.log("Bye!"))
