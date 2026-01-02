import React from 'react';
import { User, Code, Coffee, Globe } from 'lucide-react';

const TeamPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      
      <div className="mb-16">
        <h1 className="font-serif text-5xl md:text-7xl mb-6">The <span className="text-[#D4A373] italic">Human</span> element.</h1>
        <p className="text-xl opacity-70 max-w-2xl">
           Behind every line of code and every pixel is a person trying to make the web a little bit calmer, and a little bit faster.
        </p>
      </div>

      <div className="grid md:grid-cols-12 gap-12 items-start">
         
         {/* Sidebar / Photo Area */}
         <div className="md:col-span-4 sticky top-32">
            <div className="aspect-[3/4] rounded-[2rem] bg-[#E0E2DB] dark:bg-[#2F332B] overflow-hidden relative mb-6 group">
               {/* Placeholder for Profile Image */}
               <div className="absolute inset-0 flex items-center justify-center text-[#D4A373]/20 group-hover:text-[#D4A373]/40 transition-colors">
                  <User className="w-32 h-32" />
               </div>
               <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/50 to-transparent">
                  <h3 className="text-white font-serif text-2xl italic">Founder</h3>
               </div>
            </div>
            
            <div className="flex gap-4 justify-center">
               <a href="#" className="w-10 h-10 rounded-full bg-white dark:bg-[#2A2E26] flex items-center justify-center hover:text-[#D4A373] transition-colors shadow-sm">
                  <Code className="w-4 h-4" />
               </a>
               <a href="#" className="w-10 h-10 rounded-full bg-white dark:bg-[#2A2E26] flex items-center justify-center hover:text-[#D4A373] transition-colors shadow-sm">
                  <Globe className="w-4 h-4" />
               </a>
               <a href="#" className="w-10 h-10 rounded-full bg-white dark:bg-[#2A2E26] flex items-center justify-center hover:text-[#D4A373] transition-colors shadow-sm">
                  <Coffee className="w-4 h-4" />
               </a>
            </div>
         </div>

         {/* Content Area */}
         <div className="md:col-span-8 space-y-12">
            
            <section>
               <h2 className="text-sm font-bold tracking-widest uppercase opacity-40 mb-4">About Me</h2>
               <p className="text-lg leading-relaxed mb-6">
                  Hello, I'm the creator behind LAMAs and PulseBoard. I'm a full-stack engineer with a background in digital product design. 
                  My mission is to bridge the gap between rigid engineering standards and organic, human-centric design.
               </p>
               <p className="text-lg leading-relaxed">
                  I believe that software should be quiet. It should work, it should be fast, and it should get out of your way. That's why I built PulseBoard—to take the anxiety out of uptime monitoring.
               </p>
            </section>

            <section className="bg-white dark:bg-[#232620] p-8 rounded-[2rem] border border-[#E5E7E1] dark:border-[#333]">
               <h2 className="text-sm font-bold tracking-widest uppercase opacity-40 mb-6">Core Philosophy</h2>
               <div className="space-y-6">
                  <div className="flex gap-4">
                     <div className="text-[#D4A373] font-serif text-2xl font-bold">01.</div>
                     <div>
                        <h3 className="font-bold mb-2">Simplicity First</h3>
                        <p className="opacity-70 text-sm">Features are a liability. We only build what is essential, ensuring reliability stays high.</p>
                     </div>
                  </div>
                  <div className="flex gap-4">
                     <div className="text-[#D4A373] font-serif text-2xl font-bold">02.</div>
                     <div>
                        <h3 className="font-bold mb-2">Organic Growth</h3>
                        <p className="opacity-70 text-sm">We don't chase trends. We iterate based on real feedback and sustainable pace.</p>
                     </div>
                  </div>
                  <div className="flex gap-4">
                     <div className="text-[#D4A373] font-serif text-2xl font-bold">03.</div>
                     <div>
                        <h3 className="font-bold mb-2">Transparency</h3>
                        <p className="opacity-70 text-sm">Open metrics, open roadmap. Trust is earned through visibility.</p>
                     </div>
                  </div>
               </div>
            </section>

            <section>
               <h2 className="text-sm font-bold tracking-widest uppercase opacity-40 mb-4">Skills & Tech Stack</h2>
               <div className="flex flex-wrap gap-2">
                  {["React", "TypeScript", "Node.js", "Tailwind CSS", "Go", "PostgreSQL", "System Architecture", "UI/UX Design"].map(skill => (
                     <span key={skill} className="px-4 py-2 bg-white dark:bg-[#2A2E26] rounded-full text-sm font-medium border border-[#E5E7E1] dark:border-[#333]">
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