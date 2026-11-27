import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import { createPinia } from 'pinia'
import App from '../App.vue'

describe('App', () => {
  it('renders the default Minesweeper board', () => {
    const wrapper = mount(App, {
      global: { plugins: [createPinia()] },
    })

    try {
      expect(wrapper.findAll('.cell')).toHaveLength(81)
    } finally {
      wrapper.unmount()
    }
  })
})
