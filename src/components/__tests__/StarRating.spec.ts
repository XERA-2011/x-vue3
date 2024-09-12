import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import StarRating from '../StarRating.vue'

describe('StarRating.vue', () => {
  it('renders correct number of full, half, and empty stars', () => {
    const wrapper = mount(StarRating, {
      props: {
        score: 3.5, // 3 full stars, 1 half star, and 1 empty star
        comments: 100,
      },
    })

    // Find all star elements
    const stars = wrapper.findAll('.star-item')

    // Check that we have 5 stars
    expect(stars.length).toBe(5)

    // Check star classes
    expect(stars[0].classes()).toContain('on')  // Full star
    expect(stars[1].classes()).toContain('on')  // Full star
    expect(stars[2].classes()).toContain('on')  // Full star
    expect(stars[3].classes()).toContain('half') // Half star
    expect(stars[4].classes()).toContain('off')  // Empty star
  })

  it('renders the correct number of comments', () => {
    const wrapper = mount(StarRating, {
      props: {
        score: 4.5,
        comments: 200,
      },
    })

    const comments = wrapper.find('.star-comments')

    // Check that the comments number is correctly displayed
    expect(comments.text()).toBe('(200)')
  })

  it('displays default 0 comments if comments prop is not provided', () => {
    const wrapper = mount(StarRating, {
      props: {
        score: 4,
      },
    })

    const comments = wrapper.find('.star-comments')

    // Should display '(0)' when no comments are provided
    expect(comments.text()).toBe('(0)')
  })
})
