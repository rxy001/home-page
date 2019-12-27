import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.timeout = 3000
axios.defaults.withCredentials = true;

axios.cancelRequests = []
axios.cancelRequest = function (requestId) {
  try {
    axios.cancelRequests[requestId]()
    delete axios.cancelRequests[requestId]
  } catch (err) {
    console.error('请传入正确的requestId, 取消请求')
  }
}

// 添加请求拦截器
axios.interceptors.request.use(function (config) {

  // 请求参数中添加一个requestId。 
  // 调用axios.cancelRequest(requestId)取消请求
  const requestId = config.requestId
  if (requestId) {
    if (axios.cancelRequests.hasOwnProperty(requestId)) {
      throw 'requestId 重复'
    }
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source()
    axios.cancelRequests[requestId] = source.cancel
    config.cancelToken = source.token
    delete config.requestId
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response.data;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});