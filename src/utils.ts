export const randomInRange = (min: number, max: number): number => {
  return min + (max - min) * Math.random()
}

export const clamp = (x: number, min: number, max: number): number => {
  if (x < min) {
    return min
  } else if (x > max) {
    return max
  } else {
    return x
  }
}
