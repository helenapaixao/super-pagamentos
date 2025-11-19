import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import NewChargeButton from '@/components/NewChargeButton.vue'

describe('NewChargeButton', () => {
  it('renders button with default text', () => {
    const wrapper = mount(NewChargeButton)
    expect(wrapper.find('.btn-text').text()).toBe('Nova cobrança')
  })

  it('renders button with custom text', () => {
    const wrapper = mount(NewChargeButton, {
      props: {
        text: 'Custom Text'
      }
    })
    expect(wrapper.find('.btn-text').text()).toBe('Custom Text')
  })

  it('emits click event when button is clicked', async () => {
    const wrapper = mount(NewChargeButton)
    await wrapper.find('.btn-primary').trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
    expect(wrapper.emitted('click')).toHaveLength(1)
  })

  it('displays icon circle', () => {
    const wrapper = mount(NewChargeButton)
    expect(wrapper.find('.icon-circle').exists()).toBe(true)
  })

  it('has correct button classes', () => {
    const wrapper = mount(NewChargeButton)
    const button = wrapper.find('button')
    expect(button.classes()).toContain('btn-primary')
  })

  it('displays web icon by default', () => {
    const wrapper = mount(NewChargeButton)
    expect(wrapper.find('.icon-web').exists()).toBe(true)
    expect(wrapper.find('.icon-mobile').exists()).toBe(true)
  })
})

