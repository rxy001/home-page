export default function request(options) {
  const xhr = new XMLHttpRequest()
  if (options.onProgress) {
    xhr.upload.addEventListener('progress', (e) => {
      options.onProgress(e)
    })
  }

  const formData = new FormData()
  formData.append(options.name, options.file)

  xhr.addEventListener('error', (e) => {
    options.onError(e)
  })

  xhr.addEventListener('load', () => {
    if (xhr.status < 200 || xhr.status >= 300) {
      console.log('loaderror', options, xhr)
    }
    console.log('load', options, xhr)
  })
  xhr.open(options.method, options.action, true);
  xhr.withCredentials = true;

  const headers = options.headers || {}

  Object.keys(headers).forEach((key) => {
    xhr.setRequestHeader(key, headers[key])
  })

  if (headers['X-Requested-With'] !== null) {
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest')
  }

  xhr.send(formData)

  return {
    abort() {
      xhr.abort()
    }
  }
}
