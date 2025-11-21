
import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronDown, Phone, Headphones, BookOpen, Sparkles, Activity, ClipboardList, LayoutGrid, Instagram, MessageCircle, Mail, ArrowUp } from 'lucide-react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

interface LayoutProps {
  children: React.ReactNode;
  currentPage: string;
  onNavigate: (page: string) => void;
}

interface NavSubItem {
  name: string;
  id: string;
  description: string;
  icon: React.ElementType;
}

interface NavItem {
  name: string;
  id?: string;
  subItems?: NavSubItem[];
}

export const Layout: React.FC<LayoutProps> = ({ children, currentPage, onNavigate }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Check if we are on the homepage
  const isHomePage = currentPage === 'home';
  
  // Determine if we need dark text/elements
  const useDarkHeader = scrolled || !isHomePage || mobileMenuOpen;

  // Footer Parallax Logic
  const footerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end end"]
  });
  
  const footerY = useTransform(scrollYProgress, [0, 1], ["-20%", "0%"]);

  useEffect(() => {
    const handleScroll = () => {
        setScrolled(window.scrollY > 20);
        setShowBackToTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleExternalLink = () => {
    window.open('https://daniquekwakman.clientomgeving.nl/afspraak-maken?t=QqtG5FOC', '_blank');
  };

  const navLinks: NavItem[] = [
    { name: 'Home', id: 'home' },
    { 
      name: 'Gratis', 
      subItems: [
        { name: 'Match Call', id: 'match-call', description: 'Spar met mij', icon: Phone },
        { name: 'Podcast', id: 'podcast', description: 'Luister mee', icon: Headphones },
        { name: 'E-book', id: 'ebook', description: 'Gratis tips', icon: BookOpen }
      ]
    },
    { 
      name: 'Aanbod', 
      subItems: [
        { name: 'Behandelingen', id: 'behandelingen', description: 'Overzicht', icon: LayoutGrid },
        { name: '1:1 Glowup', id: 'glowup', description: 'Exclusief traject', icon: Sparkles },
        { name: '1:1 Darmtraject', id: 'darmtraject', description: 'Darmherstel', icon: Activity },
        { name: 'Werkwijze', id: 'home#services', description: 'Mijn aanpak', icon: ClipboardList }
      ]
    },
    { name: 'Over mij', id: 'about' },
    { name: 'Blog', id: 'blog' },
    { name: 'Contact', id: 'contact' },
  ];

  const handleNavigation = (id: string) => {
    if (id.includes('#')) {
      const [page, anchor] = id.split('#');
      onNavigate(page);
      setTimeout(() => {
        const element = document.getElementById(anchor);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      onNavigate(id);
      window.scrollTo(0, 0);
    }
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  };

  return (
    <div className="min-h-screen flex flex-col font-sans text-[#757575]">
      <header 
        className={`fixed top-0 w-full z-50 transition-all duration-500 ease-in-out border-b ${
          scrolled 
            ? 'bg-[#FCF9F2]/90 backdrop-blur-xl py-2 border-[#D8CCAB]/50 shadow-md' 
            : isHomePage 
              ? 'bg-transparent py-4 border-transparent' 
              : 'bg-[#FCF9F2] py-4 border-transparent'
        }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          {/* Logo */}
          <div 
            className="flex items-center gap-2 cursor-pointer relative z-50 group" 
            onClick={() => handleNavigation('home')}
          >
             <div className={`w-3 h-3 rounded-full transition-colors duration-300 ${useDarkHeader ? 'bg-[#1D1D1B]' : 'bg-white'}`}></div>
             
             <span className={`font-serif text-xl font-semibold tracking-tight transition-colors duration-300 ${useDarkHeader ? 'text-[#1D1D1B]' : 'text-white drop-shadow-md'}`}>
               Danique Kwakman
             </span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => (
              <div key={link.name} className="relative group px-3 py-2">
                <button 
                  onClick={() => link.id ? handleNavigation(link.id) : null}
                  className={`flex items-center gap-1.5 text-sm font-medium transition-all duration-300 ${
                    useDarkHeader 
                      ? 'text-[#757575] hover:text-[#1D1D1B]' 
                      : 'text-white hover:text-white/80 drop-shadow-sm'
                  }`}
                >
                  {link.name}
                  {link.subItems && <ChevronDown className="w-3.5 h-3.5 opacity-70 group-hover:translate-y-0.5 transition-transform" />}
                </button>

                {/* Creative Dropdown Bridge */}
                {link.subItems && (
                  <>
                    <div className="absolute top-full left-0 w-full h-4"></div>
                    <div className="absolute top-[calc(100%+10px)] left-1/2 -translate-x-1/2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top group-hover:translate-y-0 translate-y-2 w-[340px]">
                      {/* Dropdown uses Stone-50 (#FCF9F2) frosted */}
                      <div className="bg-[#FCF9F2]/95 backdrop-blur-xl shadow-lg rounded-2xl border border-[#D8CCAB]/60 p-3 overflow-hidden">
                          <div className="grid grid-cols-1 gap-1">
                            {link.subItems.map((sub) => (
                                <button
                                  key={sub.name}
                                  onClick={() => handleNavigation(sub.id)}
                                  className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/80 transition-colors group/item text-left"
                                >
                                  <div className="w-10 h-10 rounded-lg bg-white/50 border border-[#D8CCAB]/50 flex items-center justify-center text-[#9CAAC6] group-hover/item:bg-[#9CAAC6]/20 group-hover/item:border-[#9CAAC6]/20 group-hover/item:text-[#1D1D1B] transition-colors">
                                    <sub.icon size={18} strokeWidth={2} />
                                  </div>
                                  <div>
                                    <div className="text-sm font-semibold text-[#1D1D1B]">{sub.name}</div>
                                    <div className="text-xs text-[#757575]">{sub.description}</div>
                                  </div>
                                </button>
                            ))}
                          </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}
            
            <div className="ml-4">
                <button 
                onClick={handleExternalLink}
                className="text-xs font-medium px-5 py-2.5 rounded-md transition-all transform hover:-translate-y-0.5 shadow-md bg-[#9CAAC6] text-white hover:bg-[#8A98B0]"
                >
                Kennismaking
                </button>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className={`md:hidden p-2 transition-colors ${useDarkHeader ? 'text-[#1D1D1B]' : 'text-white drop-shadow-md'}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Nav */}
        <div className={`absolute top-0 left-0 w-full bg-[#FCF9F2] min-h-screen p-6 pt-24 md:hidden flex flex-col gap-4 shadow-xl transition-transform duration-300 ease-in-out ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            {navLinks.map((link) => (
              <div key={link.name} className="border-b border-[#D8CCAB]/50 pb-2 last:border-0">
                {link.subItems ? (
                  <div>
                    <button 
                      onClick={() => setActiveDropdown(activeDropdown === link.name ? null : link.name)}
                      className="flex justify-between items-center w-full text-lg font-serif font-medium text-[#1D1D1B] py-3"
                    >
                      {link.name}
                      <ChevronDown className={`w-5 h-5 transition-transform ${activeDropdown === link.name ? 'rotate-180' : ''}`} />
                    </button>
                    <div className={`overflow-hidden transition-all duration-300 ${activeDropdown === link.name ? 'max-h-96 opacity-100 mt-2 mb-4' : 'max-h-0 opacity-0'}`}>
                      <div className="flex flex-col gap-3 pl-4">
                        {link.subItems.map(sub => (
                          <button 
                            key={sub.name}
                            onClick={() => handleNavigation(sub.id)}
                            className="flex items-center gap-3 text-[#757575] text-left py-2"
                          >
                             <div className="w-8 h-8 rounded-full bg-white border border-[#D8CCAB] flex items-center justify-center text-[#9CAAC6]">
                                <sub.icon size={14} />
                             </div>
                             <span className="text-sm font-medium">{sub.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <button 
                    onClick={() => handleNavigation(link.id!)}
                    className="text-lg font-serif font-medium text-[#1D1D1B] w-full text-left py-3"
                  >
                    {link.name}
                  </button>
                )}
              </div>
            ))}
             <button 
              onClick={handleExternalLink}
              className="bg-[#9CAAC6] text-white font-medium text-center py-4 rounded-xl mt-6 shadow-md w-full"
            >
              Gratis kennismaking
            </button>
          </div>
      </header>

      <main className="flex-grow bg-[#FCF9F2] relative z-10">
        {children}
      </main>

      <footer 
         ref={footerRef}
         className="relative h-[380px] md:h-[450px] w-full overflow-hidden z-0"
         style={{ 
           backgroundColor: '#FCF9F2',
           boxShadow: '0 -4px 20px rgba(0,0,0,0.06)'
         }}
       >
          {/* Parallax Background Layer */}
          <motion.div 
            className="absolute inset-0 w-full h-[120%] -top-[10%]"
            style={{ 
               y: footerY, 
               background: 'linear-gradient(135deg, rgba(157,170,198,0.12) 0%, rgba(216,204,171,0.08) 100%)'
            }} 
          />

          {/* Content */}
          <div className="relative z-10 container mx-auto px-6 h-full flex flex-col items-center justify-center text-center">
             
             {/* Logo */}
             <div className="mb-6 flex items-center gap-3">
                <div className="w-3 h-3 bg-[#1D1D1B] rounded-full"></div>
                <span className="font-serif text-2xl md:text-3xl font-semibold text-[#1D1D1B] tracking-tight">
                  Danique Kwakman
                </span>
             </div>

             {/* Short Text */}
             <p className="text-[#757575] max-w-md text-sm md:text-base leading-relaxed mb-10">
               Jouw partner voor natuurlijke gezondheid en duurzame vitaliteit. <br className="hidden md:block" />
               Herstel je balans van binnenuit.
             </p>

             {/* Social Icons */}
             <div className="flex items-center gap-8 mb-12">
                <a href="#" className="text-[#757575] hover:text-[#1D1D1B] transition-all duration-300 transform hover:-translate-y-1">
                  <Instagram size={26} strokeWidth={1.5} />
                </a>
                <a href="#" className="text-[#757575] hover:text-[#1D1D1B] transition-all duration-300 transform hover:-translate-y-1">
                  <MessageCircle size={26} strokeWidth={1.5} />
                </a>
                <a href="#" className="text-[#757575] hover:text-[#1D1D1B] transition-all duration-300 transform hover:-translate-y-1">
                   <Mail size={26} strokeWidth={1.5} />
                </a>
             </div>

             {/* Copyright */}
             <div className="absolute bottom-8 left-0 w-full text-center px-4">
                <p className="text-xs text-[#757575] opacity-60 font-light tracking-wide">
                  © {new Date().getFullYear()} Danique Kwakman. Alle rechten voorbehouden.
                </p>
             </div>

          </div>
       </footer>
       
       {/* Back To Top Button */}
       <AnimatePresence>
          {showBackToTop && (
              <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  onClick={scrollToTop}
                  className="fixed bottom-8 right-8 z-40 bg-[#9CAAC6] text-white p-3.5 rounded-full shadow-xl hover:bg-[#8A98B0] transition-colors duration-300"
              >
                  <ArrowUp size={20} />
              </motion.button>
          )}
       </AnimatePresence>
    </div>
  );
};
