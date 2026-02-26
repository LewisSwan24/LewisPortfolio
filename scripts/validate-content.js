#!/usr/bin/env node

/**
 * Content Validation Script
 * Validates MDX files for required frontmatter fields
 */

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const REQUIRED_PROJECT_FIELDS = ['slug', 'title', 'oneLiner', 'role', 'timeframe', 'tools', 'tags', 'featured', 'status', 'cover', 'date'];
const REQUIRED_BLOG_FIELDS = ['title', 'date', 'excerpt', 'tags', 'author'];

function validateFile(filePath, type) {
  const content = fs.readFileSync(filePath, 'utf8');
  const { data } = matter(content);
  const errors = [];
  
  const requiredFields = type === 'project' ? REQUIRED_PROJECT_FIELDS : REQUIRED_BLOG_FIELDS;
  
  for (const field of requiredFields) {
    if (!(field in data)) {
      errors.push(`Missing required field: ${field}`);
    }
  }
  
  return errors;
}

function validateDirectory(dir, type) {
  if (!fs.existsSync(dir)) {
    console.log(`⚠️  Directory not found: ${dir}`);
    return;
  }
  
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.mdx'));
  let hasErrors = false;
  
  console.log(`\n🔍 Validating ${type} files in ${dir}...`);
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const errors = validateFile(filePath, type);
    
    if (errors.length > 0) {
      console.log(`\n❌ ${file}:`);
      errors.forEach(err => console.log(`   - ${err}`));
      hasErrors = true;
    } else {
      console.log(`✅ ${file}`);
    }
  }
  
  return hasErrors;
}

const projectErrors = validateDirectory(path.join(__dirname, '../content/projects'), 'project');
const blogErrors = validateDirectory(path.join(__dirname, '../content/blog'), 'blog');

if (projectErrors || blogErrors) {
  console.log('\n❌ Validation failed with errors');
  process.exit(1);
} else {
  console.log('\n✅ All content files validated successfully!');
  process.exit(0);
}
