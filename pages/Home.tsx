import React from 'react';
import { Sprout, Feather, Activity, CheckCircle, ArrowRight, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
   const [email, setEmail] = React.useState('');
   const [isSubmitting, setIsSubmitting] = React.useState(false);
   const [message, setMessage] = React.useState('');

   const handleNewsletterSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsSubmitting(true);
      setMessage('');

      // Debug: Log key presence (first 4 chars for safety)
      const key = import.meta.env.VITE_WEB3FORMS_KEY;
      console.log("Web3Forms Key present:", !!key, "First 4 chars:", key ? key.substring(0, 4) : "N/A");

      try {
         const response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
               'Accept': 'application/json'
            },
            body: JSON.stringify({
               access_key: import.meta.env.VITE_WEB3FORMS_KEY,
               email: email,
               subject: 'Newsletter Signup'
            })
         });

         const result = await response.json();
         if (result.success) {
            setMessage('Thanks for subscribing! Use "digital-gardening" for 20% off.');
            setEmail('');
         } else {
            setMessage('Something went wrong. Please try again.');
         }
      } catch (error) {
         setMessage('Something went wrong. Please try again.');
      } finally {
         setIsSubmitting(false);
      }
   };

   return (
      <div className="max-w-6xl mx-auto space-y-32">

         {/* Hero Section */}
         {/* Hero Section */}
         <section className="text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-[#2A2E26] shadow-sm mb-8 animate-fade-in-up">
               <span className="text-xs font-medium tracking-widest uppercase opacity-60">Luis Almeida</span>
            </div>

            <h1 className="font-serif text-6xl md:text-7xl mb-8 leading-tight animate-fade-in-up delay-100">
               Always <br />
               <span className="italic text-[#D4A373]">Learning & Building</span>
            </h1>

            <p className="max-w-2xl mx-auto text-lg md:text-xl opacity-70 mb-12 leading-relaxed animate-fade-in-up delay-200">
               Hi, I'm Luis. I'm a hobbyist developer and engineer. Welcome to LAMAs, where I intend on sharing my takes on software, tech, and personal projects.
            </p>

            <div className="flex flex-wrap justify-center gap-6 animate-fade-in-up delay-300">
               <Link to="/insights" className="px-10 py-4 bg-[#2C3E2D] dark:bg-[#E2E8D5] text-white dark:text-[#1A1C18] rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 font-medium flex items-center gap-2">
                  Read My Thoughts <Feather className="w-4 h-4" />
               </Link>
            </div>
         </section>

         {/* Newsletter Signup (Web3Forms) */}
         <section className="bg-white dark:bg-[#232620] rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden shadow-sm border border-[#E5E7E1] dark:border-[#333]">
            <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none"
               style={{ backgroundImage: 'radial-gradient(#D4A373 1px, transparent 1px)', backgroundSize: '30px 30px' }}>
            </div>

            <div className="relative z-10 max-w-2xl mx-auto">
               <Mail className="w-12 h-12 mx-auto text-[#D4A373] mb-6" />
               <h2 className="font-serif text-3xl md:text-4xl mb-4">Grow with us.</h2>
               <p className="opacity-60 mb-8">
                  Join me as I build LAMAs.
               </p>

               <form className="flex flex-col md:flex-row gap-4" onSubmit={handleNewsletterSubmit}>
                  <input
                     type="email"
                     required
                     placeholder="your@email.com"
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                     className="flex-grow px-6 py-4 rounded-full bg-[#F3F4F1] dark:bg-[#1A1C18] border-none focus:ring-2 focus:ring-[#D4A373] outline-none transition-all placeholder:opacity-50"
                  />
                  <button
                     type="submit"
                     disabled={isSubmitting}
                     className="px-8 py-4 bg-[#2C3E2D] dark:bg-[#E2E8D5] text-white dark:text-[#1A1C18] font-bold rounded-full hover:shadow-lg transition-shadow disabled:opacity-50"
                  >
                     {isSubmitting ? 'Subscribing...' : 'Subscribe'}
                  </button>
               </form>
               <p className="text-[10px] uppercase tracking-widest opacity-40 mt-6 min-h-[1.5em]">
                  {message || 'No Spam, ever.'}
               </p>
            </div>
         </section>

      </div>
   );
};

export default HomePage;