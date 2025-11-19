import { describe, it, expect } from 'vitest'

describe('Currency Formatter', () => {
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value)
  }

  it('formats integer correctly', () => {
    expect(formatCurrency(1000)).toBe('1.000,00')
  })

  it('formats decimal correctly', () => {
    expect(formatCurrency(1234.56)).toBe('1.234,56')
  })

  it('formats large numbers correctly', () => {
    expect(formatCurrency(1234567.89)).toBe('1.234.567,89')
  })

  it('formats zero correctly', () => {
    expect(formatCurrency(0)).toBe('0,00')
  })

  it('formats negative numbers correctly', () => {
    expect(formatCurrency(-500.50)).toBe('-500,50')
  })
})

describe('Number Formatter', () => {
  const formatNumber = (value) => {
    return new Intl.NumberFormat('pt-BR').format(value)
  }

  it('formats integer correctly', () => {
    expect(formatNumber(1000)).toBe('1.000')
  })

  it('formats large numbers correctly', () => {
    expect(formatNumber(1234567)).toBe('1.234.567')
  })

  it('formats zero correctly', () => {
    expect(formatNumber(0)).toBe('0')
  })
})

describe('Percentage Formatter', () => {
  const formatPercentual = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1
    }).format(value)
  }

  it('formats percentage with one decimal', () => {
    expect(formatPercentual(4.5)).toBe('4,5')
  })

  it('rounds to one decimal place', () => {
    expect(formatPercentual(4.567)).toBe('4,6')
  })

  it('formats zero correctly', () => {
    expect(formatPercentual(0)).toBe('0,0')
  })
})

describe('Date Formatter', () => {
  const formatDate = (dateString) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = date.getFullYear()
    return `${day}-${month}-${year}`
  }

  it('formats date correctly', () => {
    expect(formatDate('2024-01-15')).toBe('15-01-2024')
  })

  it('formats date with leading zeros', () => {
    expect(formatDate('2024-03-05')).toBe('05-03-2024')
  })

  it('handles empty string', () => {
    expect(formatDate('')).toBe('')
  })

  it('handles December correctly', () => {
    expect(formatDate('2024-12-31')).toBe('31-12-2024')
  })
})

