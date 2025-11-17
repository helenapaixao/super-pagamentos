import api from './api'

export const dashboardService = {
  // Buscar dados de faturamento
  async getFaturamento(params = {}) {
    const response = await api.get('/dashboard/faturamento', { params })
    return response.data
  },

  // Buscar estatísticas gerais
  async getEstatisticas(params = {}) {
    const response = await api.get('/dashboard/estatisticas', { params })
    return response.data
  },

  // Buscar dados de conversão por modalidade
  async getConversaoModalidade(params = {}) {
    const response = await api.get('/dashboard/conversao-modalidade', { params })
    return response.data
  },

  // Buscar bandeiras mais utilizadas
  async getBandeirasUtilizadas(params = {}) {
    const response = await api.get('/dashboard/bandeiras', { params })
    return response.data
  },

  // Buscar transferências pendentes
  async getTransferenciasPendentes() {
    const response = await api.get('/dashboard/transferencias-pendentes')
    return response.data
  },

  // Autorizar transferência
  async autorizarTransferencia(transferenciaId) {
    const response = await api.post(`/dashboard/transferencias/${transferenciaId}/autorizar`)
    return response.data
  }
}

