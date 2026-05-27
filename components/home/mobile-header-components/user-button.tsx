'use client';

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
			<button
				type="button"
				onClick={toggleMenu}
				className={cn(
					'flex items-center gap-1.5 rounded-md border border-brand-primary/15 px-3 py-2 text-sm font-medium transition-all duration-300',
					'bg-brand-primary/10 text-brand-primary hover:bg-brand-primary/20'
				)}
				aria-label={user?.name ? `Account menu for ${user.name}` : 'Account menu'}
			>
				<User className="h-4 w-4 text-brand-primary" aria-hidden />
			</button>
		);
	}

	return (
		<button
			type="button"
			onClick={openAuthModal}
			className={cn(
				'rounded-md text-brand-primary px-4 py-2 text-sm font-semibold transition-all duration-300',
				'hover:text-brand-primary/90'
			)}
		>
			Login
		</button>
	);
};
