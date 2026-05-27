import Link from 'next/link';
import Image from 'next/image';
import { X, User, LogOut } from 'lucide-react';
import type { GlobalLink } from '@/types/strapi';
import type { User as UserType } from '@/stores/auth-store';
import { IMAGES } from '@/lib/constants/images';
import { MenuLink } from './menu-link';

interface MobileMenuDrawerProps {
    isMenuOpen: boolean;
    closeMenu: () => void;
    siteName: string;
    isAuthenticated: boolean;
    user: UserType | null;
    logout: () => void;
    openAuthModal: () => void;
    headerLinks: GlobalLink[];
}

export const MobileMenuDrawer = ({
    isMenuOpen,
    closeMenu,
    siteName,
    isAuthenticated,
    user,
    logout,
    openAuthModal,
    headerLinks,
}: MobileMenuDrawerProps) => {
    if (!isMenuOpen) {
        return null;
    }

    return (
        <>
            <div
                className="fixed inset-0 z-50 wc-menu-overlay"
                onClick={closeMenu}
            />

            <div className="fixed top-0 left-0 bottom-0 w-[280px] z-50 bg-wc-dark shadow-2xl">
                        {/* Drawer Header */}
                        <div className="flex items-center justify-between p-4 border-b border-white/10">
                            <Link href="/" onClick={closeMenu} className="flex items-center">
                                <Image
                                    src={IMAGES.LOGOS.TRUSTFIN_LOGO_TRANSPARENT}
                                    alt={siteName || 'Trustfin'}
                                    width={100}
                                    height={28}
                                    className="h-7 w-auto"
                                />
                            </Link>
                            <button
                                type="button"
                                onClick={closeMenu}
                                className="p-2 text-white/70 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
                                aria-label="Close menu"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* User Section */}
                        <div className="p-4 border-b border-white/10">
                            {isAuthenticated ? (
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-brand-primary flex items-center justify-center">
                                            <User className="w-5 h-5 text-white" />
                                        </div>
                                        <div>
                                            
                                            <p className="text-white/60 text-sm">
                                                +91 {user?.phoneNumber}
                                            </p>
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            logout();
                                            closeMenu();
                                        }}
                                        className="p-2 text-white/70 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
                                        aria-label="Logout"
                                    >
                                        <LogOut className="w-5 h-5" />
                                    </button>
                                </div>
                            ) : (
                                <button
                                    type="button"
                                    onClick={() => {
                                        openAuthModal();
                                        closeMenu();
                                    }}
                                    className="w-full py-3 bg-brand-primary text-white rounded-lg font-semibold hover:bg-brand-primary/90 transition-colors"
                                >
                                    Login / Sign Up
                                </button>
                            )}
                        </div>

                        {/* Navigation Links */}
                        <nav className="p-4">
                            <ul className="space-y-1">
                                {isAuthenticated && (
                                    <li
                                    >
                                        <Link
                                            href="/offers"
                                            onClick={closeMenu}
                                            className="flex items-center gap-3 px-3 py-3 text-white rounded-lg hover:bg-white/10 transition-colors"
                                        >
                                            <span className="font-medium">Loan Status</span>
                                        </Link>
                                    </li>
                                )}
                                {headerLinks.map((link, index) => (
                                    <li
                                        key={link.id}
                                    >
                                        <MenuLink link={link} onNavigate={closeMenu} />
                                    </li>
                                ))}
                            </ul>
                        </nav>
            </div>
        </>
    );
};
