import { motion } from 'framer-motion';
import { User } from 'lucide-react';
import { cn } from '@/lib/utils';

import type { User as UserType } from '@/stores/auth-store';

interface UserButtonProps {
	isAuthenticated: boolean;
	user: UserType | null;
	toggleMenu: () => void;
	openAuthModal: () => void;
}

export const UserButton = ({
	isAuthenticated,
	user,
	toggleMenu,
	openAuthModal,
}: UserButtonProps) => {
	if (isAuthenticated) {
		return (
			<motion.button
				type="button"
				onClick={toggleMenu}
				className={cn(
					'flex items-center gap-1.5 rounded-md border border-brand-primary/15 px-3 py-2 text-sm font-medium transition-all duration-300',
					'bg-brand-primary/10 text-brand-primary hover:bg-brand-primary/20'
				)}
				whileTap={{ scale: 0.95 }}
				aria-label={user?.name ? `Account menu for ${user.name}` : 'Account menu'}
			>
				<User className="h-4 w-4 text-brand-primary" aria-hidden />
			</motion.button>
		);
	}

	return (
		<motion.button
			type="button"
			onClick={openAuthModal}
			className={cn(
				'rounded-md bg-brand-primary px-4 py-2 text-sm font-semibold text-white transition-all duration-300',
				'hover:bg-brand-primary/90'
			)}
			whileTap={{ scale: 0.95 }}
		>
			Login
		</motion.button>
	);
};
