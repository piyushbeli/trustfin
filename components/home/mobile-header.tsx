'use client';

import { useState, useEffect, useCallback, JSX } from 'react';
import type { GlobalLink, StrapiMedia } from '@/types/strapi';
import { useAuth } from '@/hooks/use-auth';
import { cn } from '@/lib/utils';
import { HeaderLogo } from './mobile-header-components/header-logo';
import { UserButton } from './mobile-header-components/user-button';
import { MenuButton } from './mobile-header-components/menu-button';
import { MobileMenuDrawer } from './mobile-header-components/mobile-menu-drawer';

/** Props for MobileHeader component */
interface MobileHeaderProps {
  headerLinks: GlobalLink[];
  logo: StrapiMedia | null;
  siteName: string;
}

/**
 * Mobile-first sticky header with scroll-aware styling and slide-out menu drawer.
 * Transitions from transparent to white background when user scrolls down.
 */
const MobileHeader = ({ headerLinks, logo, siteName }: MobileHeaderProps): JSX.Element => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isAuthenticated, user, openAuthModal, logout } = useAuth();

  /** Hysteresis avoids flicker when scrolling slowly around the threshold */
  const SCROLL_ENTER_THRESHOLD = 60;
  const SCROLL_EXIT_THRESHOLD = 40;

  const handleScroll = useCallback((): void => {
    const scrollY = window.scrollY;
    setIsScrolled((prev) => {
      if (!prev && scrollY > SCROLL_ENTER_THRESHOLD) return true;
      if (prev && scrollY < SCROLL_EXIT_THRESHOLD) return false;
      return prev;
    });
  }, []);

  useEffect(() => {
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const toggleMenu = (): void => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = (): void => {
    setIsMenuOpen(false);
  };

  return (
    <>
<header className="fixed top-0 left-0 right-0 z-50 p-4 lg:p-0">
          <div
          className={cn(
            'flex items-center justify-between px-4 py-2 rounded-md wc-header-pill-transition lg:rounded-[0]',
            isScrolled ? 'wc-header-pill-scrolled' : 'wc-header-pill'
          )}
        >
          {/* Logo - switches between light and dark variants based on header state */}
          <HeaderLogo siteName={siteName} />

          {/* Right side buttons */}
          <div className="flex items-center gap-2">
            {/* Login/User Button */}
            <UserButton
              isAuthenticated={isAuthenticated}
              user={user}
              toggleMenu={toggleMenu}
              openAuthModal={openAuthModal}
            />

            {/* Hamburger Menu Button */}
            <MenuButton toggleMenu={toggleMenu} />
          </div>
        </div>
      </header>

      {/* Menu Drawer */}
      <MobileMenuDrawer
        isMenuOpen={isMenuOpen}
        closeMenu={closeMenu}
        siteName={siteName}
        isAuthenticated={isAuthenticated}
        user={user}
        logout={logout}
        openAuthModal={openAuthModal}
        headerLinks={headerLinks}
      />
    </>
  );
};

export default MobileHeader;

