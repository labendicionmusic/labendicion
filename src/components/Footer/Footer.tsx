import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { socialLinks } from '../SocialIcons';

export default function Footer() {
  return (
    <footer className="w-full border-t border-outline-variant/30 bg-black font-mono text-xs mt-auto">
      <div className="flex flex-col lg:flex-row justify-between items-center w-full px-8 py-16 gap-10 max-w-[1440px] mx-auto">
        
        {/* Brand */}
        <div className="relative h-12 w-48 font-display">
          <Image 
            src="/logo-bendicion.svg" 
            alt="La Bendición Logo" 
            fill 
            className="object-contain"
          />
        </div>
        
        {/* Links */}
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 text-on-surface-variant font-bold uppercase tracking-widest">
          <Link href="/privacidad" className="hover:text-primary transition-all duration-300">
            Privacidad
          </Link>
          <Link href="/terminos" className="hover:text-primary transition-all duration-300">
            Términos
          </Link>
          <Link href="/contacto" className="hover:text-primary transition-all duration-300">
            Contacto // Mgmt
          </Link>
          <Link href="/prensa" className="hover:text-primary transition-all duration-300">
            Prensa
          </Link>
        </div>

        {/* Social Icons */}
        <div className="flex gap-6 mt-8 lg:mt-0">
          {socialLinks.map((link) => (
            <a 
              key={link.name}
              href={link.href} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white/60 hover:text-primary transition-colors hover:scale-110 duration-300"
              aria-label={link.name}
            >
              {link.icon}
            </a>
          ))}
        </div>

        {/* Copyright */}
        <div className="text-on-surface-variant/50 text-center lg:text-right uppercase tracking-[0.2em]">
          &copy; {new Date().getFullYear()} La Bendición. <br className="hidden lg:block"/> El ritmo del alma.
        </div>
      </div>

      {/* Powered by Mhuri */}
      <div className="w-full border-t border-outline-variant/10 py-6 text-center text-on-surface-variant/30 text-[10px] uppercase tracking-[0.3em]">
        Powered by <a href="https://www.mhuri.tech" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors duration-300 font-bold">Mhuri</a>
      </div>
    </footer>
  );
}
