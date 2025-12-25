import { useEffect, useState } from 'react';
import { CyberGrid } from './CyberGrid';

const Hero = () => {
  const [glitchActive, setGlitchActive] = useState(false);

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 150);
    }, 3000);
    return () => clearInterval(glitchInterval);
  }, []);

  return (
    <section className="min-h-screen flex flex-col justify-center section-padding relative overflow-hidden bg-background">
      {/* Cyber Grid Background */}
      <CyberGrid />
      
      {/* Scanline overlay */}
      <div className="absolute inset-0 scanlines pointer-events-none z-10" />
      
      {/* Gradient overlays */}
      <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-background to-transparent z-10" />
      <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-background to-transparent z-10" />
      
      {/* Corner brackets */}
      <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-foreground/30 z-20" />
      <div className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-foreground/30 z-20" />
      <div className="absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-foreground/30 z-20" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-foreground/30 z-20" />
      
      <div className="relative z-20 max-w-7xl mx-auto w-full">
        {/* Status bar */}
        <div 
          className="flex items-center gap-4 mb-12 opacity-0 animate-fade-in"
          style={{ animationDelay: '0.1s' }}
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-foreground rounded-full animate-pulse" />
            <span className="text-mono text-xs tracking-widest uppercase text-muted-foreground">SYSTEM ONLINE</span>
          </div>
          <div className="flex-1 h-px bg-gradient-to-r from-foreground/50 to-transparent" />
        </div>

        {/* Main Name - Glitch Effect */}
        <div className="relative mb-4">
          <h1 
            className={`text-display text-[4rem] sm:text-[7rem] md:text-[10rem] lg:text-[14rem] leading-[0.85] tracking-tighter font-bold opacity-0 animate-fade-in ${glitchActive ? 'glitch-text' : ''}`}
            style={{ animationDelay: '0.2s' }}
            data-text="DEVANSH"
          >
            <span className="relative inline-block">
              {'DEVANSH'.split('').map((letter, i) => (
                <span 
                  key={i} 
                  className="inline-block hover:text-muted-foreground transition-colors duration-100 cursor-default"
                  style={{ 
                    animationDelay: `${i * 0.05}s`,
                  }}
                >
                  {letter}
                </span>
              ))}
            </span>
          </h1>
          
          {/* Glitch layers */}
          {glitchActive && (
            <>
              <h1 className="absolute top-0 left-0 text-display text-[4rem] sm:text-[7rem] md:text-[10rem] lg:text-[14rem] leading-[0.85] tracking-tighter font-bold text-foreground/80 glitch-layer-1">
                DEVANSH
              </h1>
              <h1 className="absolute top-0 left-0 text-display text-[4rem] sm:text-[7rem] md:text-[10rem] lg:text-[14rem] leading-[0.85] tracking-tighter font-bold text-foreground/80 glitch-layer-2">
                DEVANSH
              </h1>
            </>
          )}
        </div>

        {/* Subtitle with cyber styling */}
        <div 
          className="flex items-center gap-4 mb-16 opacity-0 animate-fade-in"
          style={{ animationDelay: '0.4s' }}
        >
          <div className="cyber-bracket text-mono text-lg md:text-2xl tracking-widest text-muted-foreground">
            <span className="text-foreground">&lt;</span>
            <span className="mx-2">AI ENTHUSIAST</span>
            <span className="text-foreground">/&gt;</span>
          </div>
          <span className="text-muted-foreground/50 mx-2">//</span>
          <div className="cyber-bracket text-mono text-lg md:text-2xl tracking-widest text-muted-foreground">
            <span className="text-foreground">&lt;</span>
            <span className="mx-2">CREATIVE DIRECTOR</span>
            <span className="text-foreground">/&gt;</span>
          </div>
        </div>

        {/* Description */}
        <p 
          className="text-mono text-base md:text-lg max-w-2xl text-muted-foreground leading-relaxed mb-16 opacity-0 animate-fade-in"
          style={{ animationDelay: '0.5s' }}
        >
          Building at the intersection of <span className="text-foreground border-b border-foreground/50">design</span>, 
          <span className="text-foreground border-b border-foreground/50"> technology</span>, and 
          <span className="text-foreground border-b border-foreground/50"> artificial intelligence</span>.
        </p>

        {/* Stats Grid */}
        <div 
          className="grid grid-cols-3 gap-4 md:gap-8 max-w-4xl opacity-0 animate-fade-in"
          style={{ animationDelay: '0.7s' }}
        >
          {[
            { label: 'YRS_EXP', value: '03', suffix: '+' },
            { label: 'VENTURES', value: '04', suffix: '' },
            { label: 'IDEAS', value: '∞', suffix: '' }
          ].map((stat, index) => (
            <div 
              key={index}
              className="group relative bg-foreground/5 border border-foreground/20 p-4 md:p-8 hover:border-foreground/60 transition-all duration-300 hover:bg-foreground/10"
            >
              {/* Tech corner accents */}
              <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-foreground/40 group-hover:border-foreground transition-colors" />
              <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-foreground/40 group-hover:border-foreground transition-colors" />
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-foreground/40 group-hover:border-foreground transition-colors" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-foreground/40 group-hover:border-foreground transition-colors" />
              
              <p className="text-mono text-[10px] md:text-xs tracking-widest text-muted-foreground mb-2 md:mb-4">
                {stat.label}
              </p>
              <p className="text-display text-4xl md:text-7xl font-bold text-foreground">
                {stat.value}<span className="text-muted-foreground">{stat.suffix}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
