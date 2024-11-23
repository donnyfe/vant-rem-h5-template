import axios, {
  AxiosInstance,
  AxiosResponse,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
} from 'axios'
import { useLoadingStore } from '@/store/loading'

// 响应数据类型
export interface ResponseData<T = any> {
  code: number
  data: T
  message: string
}

// 请求配置
export interface RequestConfig extends AxiosRequestConfig {
  loading?: boolean // 是否显示loading
  retry?: number // 重试次数
  retryDelay?: number // 重试延迟
}

class HttpRequest {
  private instance: AxiosInstance
  private baseConfig: RequestConfig = {
    baseURL: import.meta.env.VITE_BASE_URL,
    timeout: 60000,
    loading: true,
    retry: 3,
    retryDelay: 1000,
  }

  constructor() {
    this.instance = axios.create(this.baseConfig)
    this.setupInterceptors()
  }

  // 设置拦截器
  private setupInterceptors() {
    // 请求拦截
    this.instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig & RequestConfig) => {
        const loadingStore = useLoadingStore()

        // 显示loading
        if (config.loading !== false) {
          loadingStore.show()
        }

        // 添加token
        const token = localStorage.getItem('token')
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }

        return config
      },
      error => {
        return Promise.reject(error)
      }
    )

    // 响应拦截
    this.instance.interceptors.response.use(
      (response: AxiosResponse<ResponseData>) => {
        const loadingStore = useLoadingStore()
        const config = response.config as RequestConfig

        // 隐藏loading
        if (config.loading !== false) {
          loadingStore.hide()
        }

        // 处理业务错误
        const { code, data, message } = response.data
        if (code !== 200) {
          return Promise.reject(new Error(message))
        }

        return data
      },
      async error => {
        const loadingStore = useLoadingStore()
        const config = error.config as RequestConfig

        // 隐藏loading
        if (config.loading !== false) {
          loadingStore.hide()
        }

        // 请求重试
        if (config.retry && config.retry > 0) {
          config.retry--
          await new Promise(resolve => setTimeout(resolve, config.retryDelay))
          return this.instance(config)
        }

        // 处理HTTP错误
        if (error.response) {
          switch (error.response.status) {
            case 401:
              // 未登录处理
              break
            case 403:
              // 无权限处理
              break
            default:
              // 其他错误
              break
          }
        }

        return Promise.reject(error)
      }
    )
  }

  // 通用请求方法
  request<T = any>(config: RequestConfig): Promise<T> {
    return this.instance.request(config)
  }

  get<T = any>(url: string, config?: RequestConfig): Promise<T> {
    return this.request({ ...config, method: 'GET', url })
  }

  post<T = any>(url: string, data?: any, config?: RequestConfig): Promise<T> {
    return this.request({ ...config, method: 'POST', url, data })
  }

  put<T = any>(url: string, data?: any, config?: RequestConfig): Promise<T> {
    return this.request({ ...config, method: 'PUT', url, data })
  }

  delete<T = any>(url: string, config?: RequestConfig): Promise<T> {
    return this.request({ ...config, method: 'DELETE', url })
  }
}

export const request = new HttpRequest()
