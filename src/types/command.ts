export interface CommandItem {
  id: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
  shortcut?: string;
  action?: () => void;
  href?: string;
  external?: boolean;
}

export interface CommandGroup {
  heading: string;
  items: CommandItem[];
}
