import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ListTemplate from '../ListTemplate.vue'
import { LIST_STATUS } from '@/constant'

// Mock data for testing
const mockList = [
  {
    'im:image': [{ label: 'https://example.com/image1.jpg' }],
    'im:name': { label: 'Item 1' },
    'category': { attributes: { label: 'Category 1' } }
  },
  {
    'im:image': [{ label: 'https://example.com/image2.jpg' }],
    'im:name': { label: 'Item 2' },
    'category': { attributes: { label: 'Category 2' } }
  }
]

describe('ListTemplate.vue', () => {
  it('renders list items correctly when status is SUCCESS', () => {
    const wrapper = mount(ListTemplate, {
      props: {
        status: LIST_STATUS.SUCCESS,
        list: mockList
      }
    })

    // Check if the list is rendered
    const listItems = wrapper.findAll('.template-item')
    expect(listItems.length).toBe(mockList.length)

    // Check the first item content
    const firstItem = listItems[0]
    expect(firstItem.find('.template-name').text()).toBe('Item 1')
    expect(firstItem.find('.template-category').text()).toBe('Category 1')
    expect(firstItem.find('img').attributes('src')).toBe('https://example.com/image1.jpg')

    // Check if the StarRating component is rendered
    const starRating = firstItem.findComponent({ name: 'StarRating' })
    expect(starRating.exists()).toBe(true)
  })

  it('renders "暂无数据" when status is EMPTY and list is empty', () => {
    const wrapper = mount(ListTemplate, {
      props: {
        status: LIST_STATUS.EMPTY,
        list: []
      }
    })

    // Check if the empty state is rendered
    expect(wrapper.text()).toContain('暂无数据')
  })

  it('renders "加载中" when status is LOADING', () => {
    const wrapper = mount(ListTemplate, {
      props: {
        status: LIST_STATUS.LOADING,
        list: []
      }
    })

    // Check if the loading state is rendered
    expect(wrapper.text()).toContain('加载中')
  })

  it('renders "数据异常" when status is neither SUCCESS nor EMPTY nor LOADING', () => {
    const wrapper = mount(ListTemplate, {
      props: {
        status: 'ERROR',
        list: []
      }
    })

    // Check if the error state is rendered
    expect(wrapper.text()).toContain('数据异常')
  })

  it('displays alternating "even" class on even-indexed items', () => {
    const wrapper = mount(ListTemplate, {
      props: {
        status: LIST_STATUS.SUCCESS,
        list: mockList
      }
    })

    const firstItemLogo = wrapper.findAll('.template-logo')[0]
    const secondItemLogo = wrapper.findAll('.template-logo')[1]

    // First item should not have the "even" class
    expect(firstItemLogo.classes()).not.toContain('even')

    // Second item should have the "even" class
    expect(secondItemLogo.classes()).toContain('even')
  })
})
