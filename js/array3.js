function Array3 ({ fill, size }) {
  const [length, width, height] = size

  const arr3 = []
  for (let x = 0; x < length; x++) {
    const sub = []
    for (let y = 0; y < width; y++) {
      sub.push(new Array(height).fill(fill))
    }
    arr3.push(sub)
  }

  arr3.get = ([x, y, z]) => arr3[x][y][z]

  arr3.set = ([x, y, z], val) => {
    arr3[x][y][z] = val
  }

  arr3.clone = () => {
    const clone = new Array3({ fill, size })
    for (let x = 0; x < length; x++) {
      for (let y = 0; y < width; y++) {
        // This prevents mutation
        clone[x][y] = arr3[x][y].slice()
      }
    }
    return clone
  }

  return arr3
}

export default Array3
