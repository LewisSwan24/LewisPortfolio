'use client';

import { Command } from 'cmdk';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import styles from './CommandPalette.module.css';
import { CommandItem } from './CommandItem';
import { CommandGroup } from '@/types/command';

interface Props {
  open: boolean;
  onClose: () => void;
  groups: CommandGroup[];
}

export const CommandPalette = ({ open, onClose, groups }: Props) => {
  return (
    <Command.Dialog
      open={open}
      onOpenChange={onClose}
      className={styles.overlay}
      label="Command Palette"
    >
      <div className={styles.dialog}>
        <div className={styles.inputWrapper}>
          <MagnifyingGlassIcon className={styles.inputIcon} />
          <Command.Input className={styles.input} placeholder="Search commands..." />
        </div>
        <Command.List className={styles.list}>
          {groups.map((group, i) => (
            <Command.Group key={i} heading={group.heading} className={styles.group}>
              {group.items.map((item) => (
                <CommandItem key={item.id} item={item} onClose={onClose} />
              ))}
            </Command.Group>
          ))}
        </Command.List>
      </div>
    </Command.Dialog>
  );
};
