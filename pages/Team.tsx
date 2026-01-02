import React from 'react';
import { Code, Globe, Terminal, Cpu, Layers } from 'lucide-react';

const TeamPage: React.FC = () => {
   return (
      <div className="max-w-5xl mx-auto">

         <div className="grid md:grid-cols-12 gap-12 items-start mt-12">

            {/* Profile Column */}
            <div className="md:col-span-5 sticky top-32">
               <div className="aspect-[3/4] rounded-2xl bg-[#E5E7E1] dark:bg-[#2A2E26] overflow-hidden relative mb-8 border border-black/5 dark:border-white/5 shadow-sm">
                  {/* 
                  TODO: Place your profile image here.
                  1. Add your photo to: /public/images/profile.jpg
                  2. Uncomment the img tag below
               */}
                  {/* <img src="/images/profile.jpg" alt="Luis Almeida" className="w-full h-full object-cover" /> */}

                  <div className="absolute inset-0 flex flex-col items-center justify-center text-[#2C3E2D]/20 dark:text-[#E2E8D5]/20 p-6 text-center">
                     <span className="text-sm font-mono mb-2">/public/images/profile.jpg</span>
                     <p className="text-xs opacity-60">Add your photo here</p>
                  </div>
               </div>

               <div className="space-y-4">
                  <h3 className="font-serif text-3xl">Luis Almeida</h3>
                  <p className="text-sm font-mono text-[#D4A373]">Full-Stack Engineer & Designer</p>

                  <div className="flex gap-3 pt-2">
                     <a href="https://github.com/lamalmeida" target="_blank" rel="noreferrer" className="p-2 rounded-lg bg-white dark:bg-[#232620] hover:text-[#D4A373] transition-colors border border-black/5 dark:border-white/5">
                        <Code className="w-5 h-5" />
                     </a>
                     <a href="https://pulseboard.lamas-co.com" target="_blank" rel="noreferrer" className="p-2 rounded-lg bg-white dark:bg-[#232620] hover:text-[#D4A373] transition-colors border border-black/5 dark:border-white/5">
                        <Globe className="w-5 h-5" />
                     </a>
                  </div>
               </div>
            </div>

            {/* Biography & Content */}
            <div className="md:col-span-7 space-y-16">

               <section>
                  <h1 className="font-serif text-5xl md:text-6xl mb-8 leading-tight">
                     Building software that <span className="text-[#D4A373] italic">respects</span> your time.
                  </h1>
                  <div className="space-y-6 text-lg opacity-80 leading-relaxed font-light">
                     <p>
                        I'm Luis, the engineer and designer behind LAMAs and PulseBoard. My work sits at the intersection of robust backend systems and intuitive, calm user interfaces.
                     </p>
                     <p>
                        In an era of noisy software and constant notifications, I build tools that do their job quietly and effectively. Whether it's a personal blog or a critical uptime monitor, details matter.
                     </p>
                  </div>
               </section>

               <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 rounded-2xl bg-white dark:bg-[#232620] border border-[#E5E7E1] dark:border-[#333]">
                     <Terminal className="w-8 h-8 text-[#D4A373] mb-4" />
                     <h3 className="font-bold mb-2">Engineering</h3>
                     <p className="text-sm opacity-60">
                        Clean, maintainable code. I prioritize stability and performance over chasing the latest hype cycle.
                     </p>
                  </div>
                  <div className="p-6 rounded-2xl bg-white dark:bg-[#232620] border border-[#E5E7E1] dark:border-[#333]">
                     <Layers className="w-8 h-8 text-[#D4A373] mb-4" />
                     <h3 className="font-bold mb-2">Design</h3>
                     <p className="text-sm opacity-60">
                        Interfaces should be invisible. The best design is the one you don't notice because it just works.
                     </p>
                  </div>
               </section>

               <section>
                  <h2 className="font-mono text-xs font-bold tracking-widest uppercase opacity-40 mb-6">Technical Stack</h2>
                  <div className="flex flex-wrap gap-2">
                     {["React", "TypeScript", "Node.js", "Go", "PostgreSQL", "Tailwind CSS", "Docker", "System Design"].map(skill => (
                        <span key={skill} className="px-3 py-1 bg-[#F3F4F1] dark:bg-[#2A2E26] rounded-md text-xs font-medium font-mono text-[#2C3E2D] dark:text-[#E2E8D5]">
                           {skill}
                        </span>
                     ))}
                  </div>
               </section>

            </div>

         </div>

      </div>
   );
};

export default TeamPage;