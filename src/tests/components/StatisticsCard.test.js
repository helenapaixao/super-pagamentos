import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import StatisticsCard from '@/components/StatisticsCard.vue'

describe('StatisticsCard', () => {
  const defaultProps = {
    titulo: 'Reembolsos',
    valor: 8260.10,
    cobrancas: 233,
    percentual: 4.5
  }

  it('renders card title correctly', () => {
    const wrapper = mount(StatisticsCard, { props: defaultProps })
    expect(wrapper.find('.card-title').text()).toBe('Reembolsos')
  })

  it('formats currency value correctly', () => {
    const wrapper = mount(StatisticsCard, { props: defaultProps })
    expect(wrapper.find('.card-value').text()).toContain('8.260,10')
  })

  it('displays number of charges', () => {
    const wrapper = mount(StatisticsCard, { props: defaultProps })
    expect(wrapper.find('.charges').text()).toBe('233 cobranças')
  })

  it('displays percentage correctly', () => {
    const wrapper = mount(StatisticsCard, { props: defaultProps })
    expect(wrapper.find('.percentage').text()).toContain('4,5%')
  })

  it('shows badge when showBadge is true', () => {
    const wrapper = mount(StatisticsCard, {
      props: { ...defaultProps, showBadge: true }
    })
    expect(wrapper.findComponent({ name: 'BadgeOrange' }).exists()).toBe(true)
  })

  it('does not show badge by default', () => {
    const wrapper = mount(StatisticsCard, { props: defaultProps })
    expect(wrapper.findComponent({ name: 'BadgeOrange' }).exists()).toBe(false)
  })

  it('displays percent icon', () => {
    const wrapper = mount(StatisticsCard, { props: defaultProps })
    expect(wrapper.find('.percent-icon').exists()).toBe(true)
    expect(wrapper.find('.percent-symbol').text()).toBe('%')
  })

  it('has divider element', () => {
    const wrapper = mount(StatisticsCard, { props: defaultProps })
    expect(wrapper.find('.divider').exists()).toBe(true)
  })

  it('formats large numbers correctly', () => {
    const wrapper = mount(StatisticsCard, {
      props: {
        ...defaultProps,
        valor: 1234567.89
      }
    })
    expect(wrapper.find('.card-value').text()).toContain('1.234.567,89')
  })

  it('formats percentages with one decimal place', () => {
    const wrapper = mount(StatisticsCard, {
      props: {
        ...defaultProps,
        percentual: 12.345
      }
    })
    expect(wrapper.find('.percentage').text()).toContain('12,3%')
  })
})

