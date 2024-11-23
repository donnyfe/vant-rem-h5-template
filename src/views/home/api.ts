import { request } from '@/uitls/request'

export const getList = params => {
  return request.get('/common/code/logisticsInfo/getOrderByPhone', { params: params || {} })
}
