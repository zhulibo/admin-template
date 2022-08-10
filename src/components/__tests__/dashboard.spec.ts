import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import dashboard from '@/views/dashboard/dashboard.vue'

describe('dashboard', () => {
  it('renders properly', () => {
    const wrapper = mount(dashboard)
    expect(wrapper.text()).toContain('dashboard')
  })
})
