import { motion } from 'framer-motion';
import { Menu } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MenuButtonProps {
  toggleMenu: () => void;
}

export const MenuButton = ({ toggleMenu }: MenuButtonProps) => (
  <motion.button
    type="button"
    onClick={toggleMenu}
    className={cn(
      'rounded-md border border-brand-primary/15 p-2.5 transition-all duration-300',
      'bg-brand-primary/10 text-brand-primary hover:bg-brand-primary/20'
    )}
    aria-label="Open menu"
    whileTap={{ scale: 0.95 }}
  >
    <Menu className="h-5 w-5 text-brand-primary" aria-hidden />
  </motion.button>
);
