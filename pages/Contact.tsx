import React, { useState } from 'react';
import { Send, MapPin, Mail as MailIcon } from 'lucide-react';

const ContactPage: React.FC = () => {
   const [result, setResult] = useState("");

   const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setResult("Sending....");
      const form = event.currentTarget;
      const formData = new FormData(form);

      const accessKey = import.meta.env.VITE_WEB3FORMS_KEY;

      if (!accessKey) {
         console.error("VITE_WEB3FORMS_KEY is missing in .env file");
         setResult("Error: Contact form not configured.");
         return;
      }

      formData.append("access_key", accessKey);

      const response = await fetch("https://api.web3forms.com/submit", {
         method: "POST",
         body: formData
      });

      const data = await response.json();

      if (data.success) {
         setResult("Form Submitted Successfully");
         form.reset();
      } else {
         console.log("Error", data);
         setResult(data.message);
      }
   };

   return (
      <div className="max-w-6xl mx-auto">

         <div className="grid md:grid-cols-2 gap-12 md:gap-24">

            {/* Info Column */}
            <div className="space-y-12">
               <div>
                  <h1 className="font-serif text-5xl md:text-7xl mb-6">Let's <span className="text-[#D4A373] italic">talk</span>.</h1>
                  <p className="text-xl opacity-70">
                     Whether you have a question about PulseBoard, want to collaborate on a project, or just want to say hi.
                  </p>
               </div>

               <div className="space-y-8">
                  <div className="flex items-start gap-6">
                     <div className="w-12 h-12 rounded-full bg-white dark:bg-[#2A2E26] flex items-center justify-center shrink-0 shadow-sm border border-[#E5E7E1] dark:border-[#333]">
                        <MailIcon className="w-5 h-5 text-[#D4A373]" />
                     </div>
                     <div>
                        <h3 className="font-bold text-lg mb-1">Email Me</h3>
                        <p className="opacity-60 text-sm mb-2">For general inquiries and partnerships.</p>
                        <a href="mailto:hello@lamas.com" className="text-[#D4A373] hover:underline">hello@lamas.com</a>
                     </div>
                  </div>

                  <div className="flex items-start gap-6">
                     <div className="w-12 h-12 rounded-full bg-white dark:bg-[#2A2E26] flex items-center justify-center shrink-0 shadow-sm border border-[#E5E7E1] dark:border-[#333]">
                        <MapPin className="w-5 h-5 text-[#D4A373]" />
                     </div>
                     <div>
                        <h3 className="font-bold text-lg mb-1">Location</h3>
                        <p className="opacity-60 text-sm">
                           Based in San Francisco, CA.<br />
                           Operating globally.
                        </p>
                     </div>
                  </div>
               </div>
            </div>

            {/* Form Column */}
            <div className="bg-white dark:bg-[#232620] p-8 md:p-12 rounded-[2.5rem] shadow-sm border border-[#E5E7E1] dark:border-[#333]">
               <form onSubmit={onSubmit} className="space-y-6">
                  {/* Hidden Subject Field for Web3Forms */}
                  <input type="hidden" name="subject" value="New Submission from LAMAs Website" />
                  <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />

                  <div className="space-y-2">
                     <label htmlFor="name" className="text-sm font-bold tracking-widest uppercase opacity-60">Name</label>
                     <input
                        type="text"
                        name="name"
                        required
                        className="w-full px-6 py-4 rounded-2xl bg-[#F3F4F1] dark:bg-[#1A1C18] border-none focus:ring-2 focus:ring-[#D4A373] outline-none transition-all"
                        placeholder="Jane Doe"
                     />
                  </div>

                  <div className="space-y-2">
                     <label htmlFor="email" className="text-sm font-bold tracking-widest uppercase opacity-60">Email</label>
                     <input
                        type="email"
                        name="email"
                        required
                        className="w-full px-6 py-4 rounded-2xl bg-[#F3F4F1] dark:bg-[#1A1C18] border-none focus:ring-2 focus:ring-[#D4A373] outline-none transition-all"
                        placeholder="jane@example.com"
                     />
                  </div>

                  <div className="space-y-2">
                     <label htmlFor="message" className="text-sm font-bold tracking-widest uppercase opacity-60">Message</label>
                     <textarea
                        name="message"
                        required
                        rows={5}
                        className="w-full px-6 py-4 rounded-2xl bg-[#F3F4F1] dark:bg-[#1A1C18] border-none focus:ring-2 focus:ring-[#D4A373] outline-none transition-all resize-none"
                        placeholder="Tell me about your project..."
                     ></textarea>
                  </div>

                  <button type="submit" className="w-full px-8 py-4 bg-[#2C3E2D] dark:bg-[#E2E8D5] text-white dark:text-[#1A1C18] font-bold rounded-2xl hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2">
                     Send Message <Send className="w-4 h-4" />
                  </button>

                  {result && (
                     <div className="text-center text-sm font-medium animate-fade-in text-[#D4A373]">
                        {result}
                     </div>
                  )}
               </form>
            </div>

         </div>

      </div>
   );
};

export default ContactPage;