import { describe, it, expect } from 'vitest'
import { getBlurDataURL, getImageProps, IMAGE_SIZES } from '../image-utils'

describe('image-utils', () => {
  describe('getBlurDataURL', () => {
    it('should return a base64 encoded SVG placeholder', () => {
      const result = getBlurDataURL()
      expect(result.startsWith('data:image/svg+xml;base64,')).toBe(true)
    })

    it('should use custom dimensions when provided', () => {
      const result = getBlurDataURL(100, 50)
      const decoded = Buffer.from(result.split(',')[1], 'base64').toString()
      expect(decoded).toContain('width="100"')
      expect(decoded).toContain('height="50"')
    })
  })

  describe('getImageProps', () => {
    it('should return base props with defaults', () => {
      const props = getImageProps('/image.jpg', 'Alt text')
      expect(props.src).toBe('/image.jpg')
      expect(props.alt).toBe('Alt text')
      expect(props.quality).toBe(90)
      expect(props.placeholder).toBe('blur')
      // Type guard: default returns SizedImageProps (no fill option)
      expect('width' in props && props.width).toBe(1200)
      expect('height' in props && props.height).toBe(630)
    })

    it('should return fill props when fill option is true', () => {
      const props = getImageProps('/image.jpg', 'Alt text', { fill: true })
      // Type guard: fill option returns FillImageProps
      expect('fill' in props && props.fill).toBe(true)
      expect('width' in props).toBe(false)
      expect('height' in props).toBe(false)
      expect(props.sizes).toBe('(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw')
    })

    it('should use custom sizes when provided', () => {
      const customSizes = '100vw'
      const props = getImageProps('/image.jpg', 'Alt text', { fill: true, sizes: customSizes })
      expect(props.sizes).toBe(customSizes)
    })

    it('should handle priority option', () => {
      const props = getImageProps('/image.jpg', 'Alt text', { priority: true, fill: true })
      expect(props.priority).toBe(true)
    })
  })

  describe('IMAGE_SIZES', () => {
    it('should have predefined size presets', () => {
      expect(IMAGE_SIZES.card).toContain('100vw')
      expect(IMAGE_SIZES.detail).toContain('100vw')
      expect(IMAGE_SIZES.hero).toBe('100vw')
      expect(IMAGE_SIZES.thumbnail).toContain('48px')
    })
  })
})
