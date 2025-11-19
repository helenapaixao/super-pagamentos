import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import DashboardControls from '@/components/DashboardControls.vue'

describe('DashboardControls', () => {
  it('renders all control components', () => {
    const wrapper = mount(DashboardControls, {
      global: {
        stubs: {
          NewChargeButton: true,
          Select: true,
          DateRangePicker: true,
          DownloadButton: true
        }
      }
    })

    expect(wrapper.findComponent({ name: 'NewChargeButton' }).exists()).toBe(true)
    expect(wrapper.findAllComponents({ name: 'Select' })).toHaveLength(2)
    expect(wrapper.findComponent({ name: 'DateRangePicker' }).exists()).toBe(true)
    expect(wrapper.findComponent({ name: 'DownloadButton' }).exists()).toBe(true)
  })

  it('renders controls divider', () => {
    const wrapper = mount(DashboardControls, {
      global: {
        stubs: {
          NewChargeButton: true,
          Select: true,
          DateRangePicker: true,
          DownloadButton: true
        }
      }
    })

    expect(wrapper.find('.controls-divider').exists()).toBe(true)
  })

  it('emits nova-cobranca event when NewChargeButton is clicked', async () => {
    const wrapper = mount(DashboardControls, {
      global: {
        stubs: {
          NewChargeButton: {
            template: '<button @click="$emit(\'click\')">New Charge</button>'
          },
          Select: true,
          DateRangePicker: true,
          DownloadButton: true
        }
      }
    })

    await wrapper.findComponent({ name: 'NewChargeButton' }).trigger('click')
    expect(wrapper.emitted('nova-cobranca')).toBeTruthy()
  })

  it('emits periodo-change event when period Select changes', async () => {
    const wrapper = mount(DashboardControls, {
      global: {
        stubs: {
          NewChargeButton: true,
          Select: {
            template: '<div @change="$emit(\'change\', \'hoje\')"></div>',
            emits: ['change']
          },
          DateRangePicker: true,
          DownloadButton: true
        }
      }
    })

    const selects = wrapper.findAllComponents({ name: 'Select' })
    await selects[0].vm.$emit('change', 'hoje')
    
    expect(wrapper.emitted('periodo-change')).toBeTruthy()
    expect(wrapper.emitted('periodo-change')[0]).toEqual(['hoje'])
  })

  it('emits data-change event when DateRangePicker changes', async () => {
    const wrapper = mount(DashboardControls, {
      global: {
        stubs: {
          NewChargeButton: true,
          Select: true,
          DateRangePicker: {
            template: '<div></div>',
            emits: ['change']
          },
          DownloadButton: true
        }
      }
    })

    const dateRange = { inicio: '2024-01-01', fim: '2024-01-31' }
    await wrapper.findComponent({ name: 'DateRangePicker' }).vm.$emit('change', dateRange)
    
    expect(wrapper.emitted('data-change')).toBeTruthy()
    expect(wrapper.emitted('data-change')[0]).toEqual([dateRange])
  })

  it('emits tipo-change event when charge type Select changes', async () => {
    const wrapper = mount(DashboardControls, {
      global: {
        stubs: {
          NewChargeButton: true,
          Select: {
            template: '<div @change="$emit(\'change\', \'credito\')"></div>',
            emits: ['change']
          },
          DateRangePicker: true,
          DownloadButton: true
        }
      }
    })

    const selects = wrapper.findAllComponents({ name: 'Select' })
    await selects[1].vm.$emit('change', 'credito')
    
    expect(wrapper.emitted('tipo-change')).toBeTruthy()
    expect(wrapper.emitted('tipo-change')[0]).toEqual(['credito'])
  })

  it('has correct CSS class', () => {
    const wrapper = mount(DashboardControls, {
      global: {
        stubs: {
          NewChargeButton: true,
          Select: true,
          DateRangePicker: true,
          DownloadButton: true
        }
      }
    })

    expect(wrapper.find('.dashboard-controls').exists()).toBe(true)
  })
})

