let windowfile = null

const container = document.getElementsByClassName('container')[0]
container.ondrop = (e) => {
  e.preventDefault()
  e.stopPropagation()
  console.log(e.dataTransfer.files[0]);
  const file = e.dataTransfer.files[0]
  let fileDom = document.getElementsByClassName('fileInfo')[0]
  fileDom.innerHTML = file.name
  windowfile = file
}

container.ondragover = (e) => {
  e.preventDefault()
  e.stopPropagation()
}

submitBtn.onclick = (e) => {
  let fileSliceList = sliceFile(windowfile)
  let formdata = new FormData()
  console.log(typeof fileSliceList[0].file);
  formdata.append('index', fileSliceList[0].file)
  fetch('http://localhost:3000/file-slice', {
    method: 'POST',
    body: formdata,
  }).then(res => res.text()).then(res => {
    console.log(res);
  })
}

function sliceFile(file, size = 100) {
  let begin = 0
  let end = begin + size
  const fileSize = file.size
  const result = []
  let index = 0
  while (end < fileSize) {
    let file_slice = File.prototype.slice.call(file, begin, end)
    result.push({
      index: index++,
      file: file_slice,
    })
    begin = end
    if (end < fileSize) {
      end = begin + size
    }
  }
  if (end >= fileSize) {
    result.push({
      index,
      file: File.prototype.slice.call(file, begin, fileSize)
    })
  }
  return result
}
