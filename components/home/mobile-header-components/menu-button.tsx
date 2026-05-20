import { motion } from 'framer-motion';
import { Menu } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MenuButtonProps {
  toggleMenu: () => void;
  showSolidHeader: boolean;
}

export const MenuButton = ({ toggleMenu, showSolidHeader }: MenuButtonProps) => (
  <motion.button
    type="button"
    onClick={toggleMenu}
    className={cn(
      'p-2.5 rounded-md transition-all duration-300',
      showSolidHeader
        ? 'text-brand-primary bg-brand-primary/10 hover:bg-brand-primary/20'
        : 'wc-menu-btn-glass text-brand-primary'
    )}
    aria-label="Open menu"
    whileTap={{ scale: 0.95 }}
  >
    <Menu
      className={cn('w-5 h-5', showSolidHeader ? 'text-brand-primary' : 'text-white')}
    />
  </motion.button>
);
