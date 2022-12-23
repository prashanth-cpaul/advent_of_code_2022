import { INPUT, requiredDiskSpace, totalDiskSpaceAvailable } from './constants'

const parsedInputStrings = INPUT.split(/\n/).filter((line) => line !== '')

interface Directory {
  name: string
  files: { name: string; size: number }[]
  directories: Directory[]
  parent: Directory | null
}

let fileSystem: Directory[] = [
  { name: '/', files: [], directories: [], parent: null },
]
let currentDir: Directory = fileSystem[0]

for (let i = 0; i < parsedInputStrings.length; i++) {
  if (parsedInputStrings[i][0] === '$') {
    const [command, argument] = parsedInputStrings[i]
      .split(' ')
      .filter((c) => c !== '$')

    switch (command) {
      case 'cd':
        if (argument === '/') {
          currentDir = fileSystem[0]
        } else if (argument === '..') {
          if (currentDir.parent) {
            currentDir = currentDir.parent
          }
        } else {
          const childDir = currentDir.directories.find(
            ({ parent, name }) => name === argument && parent === currentDir
          )
          if (childDir) {
            currentDir = childDir
          }
        }
        break

      case 'ls':
        for (let j = i + 1; j < parsedInputStrings.length; j++) {
          if (parsedInputStrings[j][0] === '$') {
            break
          } else {
            const [sizeOrDir, fileOrFolder] = parsedInputStrings[j].split(' ')
            if (sizeOrDir === 'dir') {
              if (
                !currentDir.directories.some(
                  ({ name }) => name === fileOrFolder
                )
              ) {
                const newDir = {
                  name: fileOrFolder,
                  files: [],
                  directories: [],
                  parent: currentDir,
                }
                currentDir.directories.push(newDir)
                fileSystem = [...fileSystem, newDir]
              }
            } else {
              if (!currentDir.files.some(({ name }) => name === fileOrFolder)) {
                currentDir.files.push({
                  name: fileOrFolder,
                  size: parseInt(sizeOrDir, 10),
                })
              }
            }
            i++
          }
        }
        break
    }
  }
}

// console.log('fileSystem', JSON.stringify(fileSystem, null, 2))

const calculateDirectorySize: (directory: Directory) => number = ({
  files,
  directories,
}) =>
  files.reduce((acc, { size }) => (acc += size), 0) +
  directories.reduce(
    (acc, currentDir) => (acc += calculateDirectorySize(currentDir)),
    0
  )

const directorySizes = fileSystem.map(({ directories, files }) => {
  const nestedDirectoryFilesTotalSize = directories.reduce(
    (acc, directory) => (acc += calculateDirectorySize(directory)),

    0
  )
  return (
    nestedDirectoryFilesTotalSize +
    files.reduce((acc, { size }) => (acc += size), 0)
  )
})

console.log(
  'Sum total of size of directories with total size <= 100000: ',
  directorySizes
    .filter((size) => size <= 100000)
    .reduce((acc, size) => (acc += size), 0)
)

const availableSpace =
  totalDiskSpaceAvailable - calculateDirectorySize(fileSystem[0])

const smallestDeletableDirectorySizes = directorySizes
  .map((directorySize) =>
    availableSpace + directorySize >= requiredDiskSpace ? directorySize : 0
  )
  .filter((size) => size !== 0)
  .sort((a, b) => a - b)

console.log(
  'Smallest deletable directory size: ',
  smallestDeletableDirectorySizes[0]
)
