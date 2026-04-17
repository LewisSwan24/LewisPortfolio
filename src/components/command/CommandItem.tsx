'use client';

import { Command } from 'cmdk';
import { useRouter } from 'next/navigation';
import styles from './CommandPalette.module.css';
import { CommandItem as CommandItemType } from '@/types/command';

interface Props {
  item: CommandItemType;
  onClose: () => void;
}

export const CommandItem = ({ item, onClose }: Props) => {
  const router = useRouter();

  return (
    <Command.Item
      className={styles.item}
      onSelect={() => {
        if (item.action) {
          item.action();
        }
        if (item.href) {
          if (item.external) {
            window.open(item.href, '_blank', 'noopener,noreferrer');
          } else {
            router.push(item.href);
          }
        }
        onClose();
      }}
    >
      <div className={styles.itemIcon}>{item.icon}</div>
      <div className={styles.itemLabel}>
        <span>{item.label}</span>
        {item.description && <span className={styles.itemDescription}>{item.description}</span>}
      </div>
      <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '8px' }}>
        {item.shortcut && <span className={styles.shortcut}>{item.shortcut}</span>}
        {item.external && <span className={styles.externalIndicator}>↗</span>}
      </div>
    </Command.Item>
  );
};
