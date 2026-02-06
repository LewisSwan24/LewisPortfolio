import { describe, it, expect } from 'vitest'
import { cn } from './cn'

describe('cn', () => {
  it('should merge class names', () => {
    expect(cn('class1', 'class2')).toBe('class1 class2')
  })

  it('should handle conditional classes', () => {
    const isActive = true
    const isDisabled = false
    expect(
      cn('base', isActive && 'active', isDisabled && 'disabled')
    ).toBe('base active')
  })

  it('should merge tailwind classes correctly', () => {
    expect(cn('px-2 py-1', 'px-4')).toBe('py-1 px-4')
  })

  it('should handle empty values', () => {
    expect(cn('class1', null, undefined, '', 'class2')).toBe('class1 class2')
  })

  it('should handle object syntax', () => {
    expect(cn({ active: true, disabled: false })).toBe('active')
  })
})
