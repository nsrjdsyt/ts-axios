import { AxiosRequestConfig, AxiosPromise, AxiosResponse} from './../types'
import xhr from './xhr'
import { buildUrl, isAbsoluteURL, combineURL } from './../helpers/url'
import { flatternHeaders } from './../helpers/headers'
import transform from './transform'

export default function dispatchRequest(config: AxiosRequestConfig): AxiosPromise {
  processConfig(config)
  throwIfCancellationRequested(config)
  return xhr(config).then((res) => {
    return transformResponseData(res)
  })
}


function processConfig(config: AxiosRequestConfig): void {
  config.url = transFormUrl(config)
  config.data = transform(config.data, config.headers, config.transformRequest)
  config.headers = flatternHeaders(config.headers, config.method!)
}

function transFormUrl(config: AxiosRequestConfig): string {
  let { url, params, paramsSerializer, baseURL } = config
  if (baseURL && !isAbsoluteURL(url!)) {
    url = combineURL(baseURL, url)
  }
  return buildUrl(url!, params, paramsSerializer)
}

function transformResponseData(res: AxiosResponse): AxiosResponse {
  res.data = transform(res.data, res.headers, res.config.transformResponse)
  return res
}

function throwIfCancellationRequested(config: AxiosRequestConfig): void {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested()
  }
}
