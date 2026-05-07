'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { socialLinks } from '../SocialIcons';
import CartIcon from '@/components/Cart/CartIcon';

const navLinks = [
  { name: 'Inicio', href: '/', sectionId: '' },
  { name: 'Bio', href: '/#bio', sectionId: 'bio' },
  { name: 'Discografía', href: '/#musica', sectionId: 'musica' },
  { name: 'Tour', href: '/#tour', sectionId: 'tour' },
  { name: 'Merch', href: '/#merch', sectionId: 'merch' },
];

// Rutas que tienen su propio layout sin Navbar
const STANDALONE_ROUTES = ['/labendicionvol1', '/booking'];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  if (STANDALONE_ROUTES.some((r) => pathname.startsWith(r))) return null;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track active section when on homepage
  useEffect(() => {
    if (!isHomePage) return;

    const sectionIds = ['merch', 'tour', 'musica', 'bio', 'nosotros'];

    const updateActive = () => {
      const threshold = window.innerHeight * 0.35;
      let current = '';
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= threshold) {
          current = id;
          break;
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', updateActive, { passive: true });
    updateActive();
    return () => window.removeEventListener('scroll', updateActive);
  }, [isHomePage]);

  const isLinkActive = (link: { href: string; sectionId: string }) => {
    if (isHomePage) {
      if (link.sectionId === '') return activeSection === '';
      return activeSection === link.sectionId;
    }
    // On inner pages: match pathname to the full href (e.g. /bio, /discografia)
    const fullPath = link.href.replace('/#', '/').replace('#', '/');
    return pathname === fullPath || pathname === link.href;
  };

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-black/90 backdrop-blur-2xl border-b border-white/10 shadow-2xl py-4'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="flex justify-between items-center w-full px-6 max-w-[1440px] mx-auto">
          {/* Brand */}
          <Link
            href="/"
            className="relative h-20 w-20 md:h-32 md:w-32 -my-4 md:-my-8 hover:scale-110 transition-all duration-300 z-50"
            onClick={() => setIsOpen(false)}
          >
            <Image
              src="/logo-bendicion.svg"
              alt="La Bendición Logo"
              fill
              className="object-contain"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8 font-mono tracking-[0.15em] text-sm uppercase font-bold">
            {navLinks.map((link) => {
              const active = isLinkActive(link);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`transition-all duration-300 hover:-translate-y-1 ${
                    active
                      ? 'text-primary drop-shadow-[0_0_10px_rgba(0,255,157,0.5)]'
                      : 'text-white/70 hover:text-white drop-shadow-md'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Social Icons + Mobile Toggle */}
          <div className="flex items-center gap-2 md:gap-4 text-white">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex hover:text-primary hover:scale-110 transition-all duration-300 p-2 rounded-full items-center justify-center"
                aria-label={link.name}
              >
                {link.icon}
              </a>
            ))}

            {/* Cart Icon */}
            <CartIcon />

            {/* Mobile Menu Button */}
            <button
              className="md:hidden ml-2 hover:text-primary p-2 flex items-center justify-center transition-all"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
            >
              <span className="material-symbols-outlined text-3xl">{isOpen ? 'close' : 'menu'}</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black/95 backdrop-blur-3xl z-40 md:hidden transition-transform duration-500 ease-in-out flex flex-col items-center justify-center gap-8 ${
          isOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        {navLinks.map((link) => {
          const active = isLinkActive(link);
          return (
            <Link
              key={link.name}
              href={link.href}
              className={`font-display text-4xl font-black tracking-tighter uppercase transition-colors hover:scale-110 ${
                active ? 'text-primary drop-shadow-[0_0_15px_rgba(0,255,157,0.6)]' : 'text-white hover:text-secondary'
              }`}
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          );
        })}
        <div className="flex gap-6 mt-12 text-white/50">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors hover:scale-110 duration-300"
            >
              {link.icon}
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
