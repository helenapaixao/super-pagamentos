import api from './api'

export const dashboardService = {
  async getFaturamento(params = {}) {
    const response = await api.get('/dashboard/faturamento', { params })
    return response.data
  },

  async getEstatisticas(params = {}) {
    const response = await api.get('/dashboard/estatisticas', { params })
    return response.data
  },

  async getConversaoModalidade(params = {}) {
    const response = await api.get('/dashboard/conversao-modalidade', { params })
    return response.data
  },

  async getBandeirasUtilizadas(params = {}) {
    const response = await api.get('/dashboard/bandeiras', { params })
    return response.data
  },
  async getTransferenciasPendentes() {
    const response = await api.get('/dashboard/transferencias-pendentes')
    return response.data
  },

  async autorizarTransferencia(transferenciaId) {
    const response = await api.post(`/dashboard/transferencias/${transferenciaId}/autorizar`)
    return response.data
  }
}

