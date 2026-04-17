import { CommandItem, CommandGroup } from '@/types/command';

// Example grouping structure for the Command Palette
export const exampleGroups: CommandGroup[] = [
  {
    heading: 'Navigation',
    items: [
      { id: 'home', label: 'Home', href: '/' },
      { id: 'projects', label: 'Projects', href: '/projects' },
      { id: 'blog', label: 'Blog', href: '/blog' },
    ],
  },
  {
    heading: 'Social',
    items: [
      { id: 'github', label: 'GitHub', href: 'https://github.com/yourusername', external: true },
      { id: 'linkedin', label: 'LinkedIn', href: 'https://linkedin.com/in/yourusername', external: true },
      { id: 'email', label: 'Email', href: 'mailto:hello@example.com' },
    ],
  },
];
