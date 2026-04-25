'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { socialLinks } from '../SocialIcons';

const navLinks = [
  { name: 'Inicio', href: '/' },
  { name: 'Bio', href: '/bio' },
  { name: 'Discografía', href: '/discografia' },
  { name: 'Tour', href: '/tour' },
  { name: 'Merch', href: '/merch' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
              className="object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8 font-mono tracking-[0.15em] text-sm uppercase font-bold">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`transition-all duration-300 hover:-translate-y-1 ${
                    isActive 
                      ? 'text-primary drop-shadow-[0_0_10px_rgba(0,255,157,0.5)]' 
                      : 'text-white/70 hover:text-white drop-shadow-md'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Trailing Icons & Mobile Menu Toggle */}
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
            
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden ml-2 hover:text-primary p-2 flex items-center justify-center transition-all"
              onClick={() => setIsOpen(!isOpen)}
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
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.name}
              href={link.href}
              className={`font-display text-4xl font-black tracking-tighter uppercase transition-colors hover:scale-110 ${
                isActive ? 'text-primary drop-shadow-[0_0_15px_rgba(0,255,157,0.6)]' : 'text-white hover:text-secondary'
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
