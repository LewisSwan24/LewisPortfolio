import { describe, it, expect } from 'vitest'
import { extractTOC, type TOCItem } from './toc'

describe('extractTOC', () => {
  it('should extract h2 and h3 headings from markdown', () => {
    const content = `
# Main Title
## Section 1
Some content here
### Subsection 1.1
More content
## Section 2
Even more content
    `
    const toc = extractTOC(content)
    
    expect(toc).toHaveLength(3)
    expect(toc[0]).toEqual({ text: 'Section 1', id: 'section-1', level: 2 })
    expect(toc[1]).toEqual({ text: 'Subsection 1.1', id: 'subsection-11', level: 3 })
    expect(toc[2]).toEqual({ text: 'Section 2', id: 'section-2', level: 2 })
  })

  it('should handle empty content', () => {
    const toc = extractTOC('')
    expect(toc).toEqual([])
  })

  it('should skip h1 headings', () => {
    const content = `
# Only H1
## First H2
# Another H1
## Second H2
    `
    const toc = extractTOC(content)
    
    expect(toc).toHaveLength(2)
    expect(toc.every(item => item.level > 1)).toBe(true)
  })

  it('should generate unique IDs for duplicate headings', () => {
    const content = `
## Duplicate
## Duplicate
## Duplicate
    `
    const toc = extractTOC(content)
    
    expect(toc).toHaveLength(3)
    expect(toc[0].id).toBe('duplicate')
    expect(toc[1].id).toBe('duplicate-1')
    expect(toc[2].id).toBe('duplicate-2')
  })

  it('should handle special characters in headings', () => {
    const content = `
## Heading with & Special <Characters>
## Code: \`example\`
    `
    const toc = extractTOC(content)
    
    // github-slugger handles special characters by removing them
    expect(toc[0].id).toContain('heading-with')
    expect(toc[0].id).toContain('special')
    // Backticks are handled specially by github-slugger
    expect(toc[1].id).toContain('code')
  })

  it('should handle nested heading levels correctly', () => {
    const content = `
## Level 2
### Level 3
#### Level 4 (should be ignored)
### Another Level 3
## Back to Level 2
    `
    const toc = extractTOC(content)
    
    expect(toc).toHaveLength(4)
    expect(toc.every(item => item.level <= 3)).toBe(true)
  })
})
