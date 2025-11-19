import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import Select from '@/components/Select.vue'

describe('Select', () => {
  const options = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' }
  ]

  beforeEach(() => {
    // Mock body for Teleport
    document.body.innerHTML = '<div id="app"></div>'
  })

  it('renders with placeholder when no value is selected', () => {
    const wrapper = mount(Select, {
      props: {
        modelValue: '',
        options,
        placeholder: 'Select an option'
      }
    })
    expect(wrapper.find('.select-text').text()).toBe('Select an option')
  })

  it('displays selected option label', () => {
    const wrapper = mount(Select, {
      props: {
        modelValue: 'option1',
        options,
        placeholder: 'Select an option'
      }
    })
    expect(wrapper.find('.select-text').text()).toBe('Option 1')
  })

  it('opens dropdown when clicked', async () => {
    const wrapper = mount(Select, {
      props: {
        modelValue: '',
        options,
        placeholder: 'Select an option'
      },
      attachTo: document.body
    })

    await wrapper.find('.select-wrapper').trigger('click')
    expect(wrapper.vm.isOpen).toBe(true)
  })

  it('closes dropdown after selecting option', async () => {
    vi.useFakeTimers()
    
    const wrapper = mount(Select, {
      props: {
        modelValue: '',
        options,
        placeholder: 'Select an option'
      },
      attachTo: document.body
    })

    await wrapper.find('.select-wrapper').trigger('click')
    expect(wrapper.vm.isOpen).toBe(true)

    const dropdownOptions = document.querySelectorAll('.dropdown-option')
    if (dropdownOptions.length > 0) {
      dropdownOptions[0].dispatchEvent(new MouseEvent('mousedown', { bubbles: true }))
    }

    vi.advanceTimersByTime(200)
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.isOpen).toBe(false)
    
    vi.useRealTimers()
  })

  it('emits update:modelValue when option is selected', async () => {
    const wrapper = mount(Select, {
      props: {
        modelValue: '',
        options,
        placeholder: 'Select an option'
      },
      attachTo: document.body
    })

    await wrapper.find('.select-wrapper').trigger('click')
    
    const dropdownOptions = document.querySelectorAll('.dropdown-option')
    if (dropdownOptions.length > 0) {
      dropdownOptions[0].dispatchEvent(new MouseEvent('mousedown', { bubbles: true }))
      await wrapper.vm.$nextTick()
    }

    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
  })

  it('emits change event when option is selected', async () => {
    const wrapper = mount(Select, {
      props: {
        modelValue: '',
        options,
        placeholder: 'Select an option'
      },
      attachTo: document.body
    })

    await wrapper.find('.select-wrapper').trigger('click')
    
    const dropdownOptions = document.querySelectorAll('.dropdown-option')
    if (dropdownOptions.length > 0) {
      dropdownOptions[0].dispatchEvent(new MouseEvent('mousedown', { bubbles: true }))
      await wrapper.vm.$nextTick()
    }

    expect(wrapper.emitted('change')).toBeTruthy()
  })

  it('applies custom width when provided', () => {
    const wrapper = mount(Select, {
      props: {
        modelValue: '',
        options,
        width: '300px'
      }
    })
    expect(wrapper.find('.select-wrapper').attributes('style')).toContain('width: 300px')
  })

  it('rotates chevron when dropdown is open', async () => {
    const wrapper = mount(Select, {
      props: {
        modelValue: '',
        options,
        placeholder: 'Select an option'
      },
      attachTo: document.body
    })

    await wrapper.find('.select-wrapper').trigger('click')
    expect(wrapper.find('.select-chevron').classes()).toContain('rotated')
  })

  it('adds is-open class when dropdown is open', async () => {
    const wrapper = mount(Select, {
      props: {
        modelValue: '',
        options,
        placeholder: 'Select an option'
      },
      attachTo: document.body
    })

    await wrapper.find('.select-wrapper').trigger('click')
    expect(wrapper.find('.select-wrapper').classes()).toContain('is-open')
  })
})

