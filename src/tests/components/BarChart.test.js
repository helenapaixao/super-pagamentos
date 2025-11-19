import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import BarChart from '@/components/BarChart.vue'

describe('BarChart', () => {
  let mockContext

  beforeEach(() => {
    mockContext = {
      clearRect: vi.fn(),
      fillRect: vi.fn(),
      beginPath: vi.fn(),
      moveTo: vi.fn(),
      lineTo: vi.fn(),
      stroke: vi.fn(),
      arc: vi.fn(),
      fill: vi.fn(),
      measureText: vi.fn(() => ({ width: 50 }))
    }

    HTMLCanvasElement.prototype.getContext = vi.fn(() => mockContext)
  })

  it('renders canvas element', () => {
    const wrapper = mount(BarChart, {
      props: {
        data: [100, 200, 300],
        maxValue: 500,
        height: 200
      }
    })

    expect(wrapper.find('canvas').exists()).toBe(true)
  })

  it('sets canvas height from props', () => {
    const wrapper = mount(BarChart, {
      props: {
        data: [100, 200, 300],
        maxValue: 500,
        height: 250
      }
    })

    const canvas = wrapper.find('canvas')
    expect(canvas.attributes('height')).toBe('250')
  })

  it('accepts data array prop', () => {
    const testData = [100, 200, 300, 400, 500]
    const wrapper = mount(BarChart, {
      props: {
        data: testData,
        maxValue: 500,
        height: 200
      }
    })

    expect(wrapper.vm.data).toEqual(testData)
  })

  it('accepts maxValue prop', () => {
    const wrapper = mount(BarChart, {
      props: {
        data: [100, 200, 300],
        maxValue: 1000,
        height: 200
      }
    })

    expect(wrapper.vm.maxValue).toBe(1000)
  })

  it('has default maxValue when not provided', () => {
    const wrapper = mount(BarChart, {
      props: {
        data: [100, 200, 300],
        height: 200
      }
    })

    expect(wrapper.vm.maxValue).toBe(200000)
  })

  it('has default height when not provided', () => {
    const wrapper = mount(BarChart, {
      props: {
        data: [100, 200, 300]
      }
    })

    expect(wrapper.vm.height).toBe(150)
  })

  it('calls canvas context methods to draw', () => {
    mount(BarChart, {
      props: {
        data: [100, 200, 300],
        maxValue: 500,
        height: 200
      }
    })

    expect(mockContext.clearRect).toHaveBeenCalled()
    expect(mockContext.fillRect).toHaveBeenCalled()
  })

  it('wraps component in chart container', () => {
    const wrapper = mount(BarChart, {
      props: {
        data: [100, 200, 300],
        maxValue: 500,
        height: 200
      }
    })

    expect(wrapper.find('.chart-container').exists()).toBe(true)
  })
})

