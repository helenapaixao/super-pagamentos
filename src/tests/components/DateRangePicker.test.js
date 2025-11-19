import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import DateRangePicker from '@/components/DateRangePicker.vue'

describe('DateRangePicker', () => {
  it('renders with default dates', () => {
    const wrapper = mount(DateRangePicker)
    expect(wrapper.find('.date-range-wrapper').exists()).toBe(true)
  })

  it('displays formatted start date', () => {
    const wrapper = mount(DateRangePicker, {
      props: {
        inicio: '2024-01-15',
        fim: '2024-01-31'
      }
    })
    
    const dateDisplays = wrapper.findAll('.date-display')
    expect(dateDisplays[0].text()).toBe('15-01-2024')
  })

  it('displays formatted end date', () => {
    const wrapper = mount(DateRangePicker, {
      props: {
        inicio: '2024-01-15',
        fim: '2024-01-31'
      }
    })
    
    const dateDisplays = wrapper.findAll('.date-display')
    expect(dateDisplays[1].text()).toBe('31-01-2024')
  })

  it('renders calendar icon', () => {
    const wrapper = mount(DateRangePicker)
    expect(wrapper.find('.date-icon').exists()).toBe(true)
  })

  it('renders two chevron icons', () => {
    const wrapper = mount(DateRangePicker)
    const chevrons = wrapper.findAll('.date-chevron')
    expect(chevrons).toHaveLength(2)
  })

  it('has date divider', () => {
    const wrapper = mount(DateRangePicker)
    expect(wrapper.find('.date-divider').exists()).toBe(true)
  })

  it('renders two date input fields', () => {
    const wrapper = mount(DateRangePicker)
    const inputs = wrapper.findAll('.date-range-input')
    expect(inputs).toHaveLength(2)
  })

  it('emits change event when start date changes', async () => {
    const wrapper = mount(DateRangePicker, {
      props: {
        inicio: '2024-01-15',
        fim: '2024-01-31'
      }
    })

    const inputs = wrapper.findAll('.date-range-input')
    await inputs[0].setValue('2024-02-01')
    await inputs[0].trigger('change')

    expect(wrapper.emitted('change')).toBeTruthy()
  })

  it('emits change event when end date changes', async () => {
    const wrapper = mount(DateRangePicker, {
      props: {
        inicio: '2024-01-15',
        fim: '2024-01-31'
      }
    })

    const inputs = wrapper.findAll('.date-range-input')
    await inputs[1].setValue('2024-02-28')
    await inputs[1].trigger('change')

    expect(wrapper.emitted('change')).toBeTruthy()
  })

  it('formats date correctly with leading zeros', () => {
    const wrapper = mount(DateRangePicker, {
      props: {
        inicio: '2024-03-05',
        fim: '2024-03-09'
      }
    })
    
    const dateDisplays = wrapper.findAll('.date-display')
    expect(dateDisplays[0].text()).toBe('05-03-2024')
    expect(dateDisplays[1].text()).toBe('09-03-2024')
  })

  it('updates display when props change', async () => {
    const wrapper = mount(DateRangePicker, {
      props: {
        inicio: '2024-01-15',
        fim: '2024-01-31'
      }
    })

    await wrapper.setProps({
      inicio: '2024-02-15',
      fim: '2024-02-29'
    })

    const dateDisplays = wrapper.findAll('.date-display')
    expect(dateDisplays[0].text()).toBe('15-02-2024')
    expect(dateDisplays[1].text()).toBe('29-02-2024')
  })

  it('has two date fields', () => {
    const wrapper = mount(DateRangePicker)
    const dateFields = wrapper.findAll('.date-field')
    expect(dateFields).toHaveLength(2)
    expect(dateFields[0].classes()).toContain('date-field-start')
    expect(dateFields[1].classes()).toContain('date-field-end')
  })
})

