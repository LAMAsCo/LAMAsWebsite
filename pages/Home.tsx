import React from 'react';
import { Sprout, Feather, Activity, CheckCircle, ArrowRight, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
   const [status, setStatus] = React.useState<'live' | 'connecting' | 'offline'>('connecting');

   React.useEffect(() => {
      const checkStatus = async () => {
         try {
            // In development, you might need to point to localhost if pulseboard is running locally
            // For now, we point to production as requested, but logic handles failure gracefully
            // Points to the Pulseboard Worker API
            const apiUrl = import.meta.env.VITE_PULSEBOARD_API_URL || 'https://api.pulseboard.lamas-co.com';
            const res = await fetch(`${apiUrl}/health`);

            if (res.ok) {
               const data = await res.json();

               if (data.status === 'healthy') {
                  setStatus('live');
               } else {
                  setStatus('offline');
               }
            } else {
               setStatus('offline');
            }
         } catch (e) {
            console.error("Failed to check status", e);
            setStatus('offline');
         }
      };

      checkStatus();
      // Poll every 30 seconds
      const interval = setInterval(checkStatus, 30000);
      return () => clearInterval(interval);
   }, []);

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
               <Sprout className="w-4 h-4 text-[#D4A373]" />
               <span className="text-xs font-medium tracking-widest uppercase opacity-60">Luis Almeida</span>
            </div>

            <h1 className="font-serif text-6xl md:text-7xl mb-8 leading-tight animate-fade-in-up delay-100">
               Always <br />
               <span className="italic text-[#D4A373]">Learning & Building</span>
            </h1>

            <p className="max-w-2xl mx-auto text-lg md:text-xl opacity-70 mb-12 leading-relaxed animate-fade-in-up delay-200">
               Hi, I'm Luis. I'm a hobbyist developer and engineer. Welcome to LAMAs, where I intend on sharing my takes on software, tech, and personal projects like PulseBoard.
            </p>

            <div className="flex flex-wrap justify-center gap-6 animate-fade-in-up delay-300">
               <Link to="/insights" className="px-10 py-4 bg-[#2C3E2D] dark:bg-[#E2E8D5] text-white dark:text-[#1A1C18] rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 font-medium flex items-center gap-2">
                  Read My Thoughts <Feather className="w-4 h-4" />
               </Link>

               <a href="https://pulseboard.lamas-co.com" target="_blank" rel="noopener noreferrer" className="px-10 py-4 bg-white dark:bg-[#2A2E26] rounded-full shadow-sm border border-[#E5E7E1] dark:border-[#333] hover:bg-[#F3F4F1] dark:hover:bg-[#333] transition-colors duration-300 font-medium text-[#D4A373]">
                  Check PulseBoard
               </a>
            </div>
         </section>

         {/* PulseBoard Feature Section */}
         <section className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
               <div className="bg-[#D4A373] text-white rounded-[2.5rem] p-10 shadow-lg flex flex-col relative overflow-hidden group aspect-square justify-between">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full blur-2xl -mr-10 -mt-10"></div>

                  <div className="flex justify-between items-start">
                     <h3 className="font-serif text-2xl italic">PulseBoard</h3>
                     <div className={`px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium flex items-center gap-2 ${status === 'live' ? 'opacity-100' : 'opacity-80'
                        }`}>
                        <div className={`w-2 h-2 rounded-full ${status === 'live' ? 'bg-green-400 animate-pulse' :
                           status === 'connecting' ? 'bg-yellow-400 animate-pulse' :
                              'bg-red-400'
                           }`}></div>
                        {status === 'live' ? 'Live' : status === 'connecting' ? 'Connecting...' : 'Offline'}
                     </div>
                  </div>

                  <div className="flex justify-center items-center my-8 relative">
                     <div className={`absolute w-48 h-48 bg-white/10 rounded-full ${status === 'live' ? 'animate-ping' : ''}`} style={{ animationDuration: '3s' }}></div>
                     <div className={`absolute w-36 h-36 bg-white/20 rounded-full ${status === 'live' ? 'animate-ping' : ''}`} style={{ animationDuration: '2s' }}></div>
                     <Activity className="w-16 h-16 relative z-10" />
                  </div>

                  <div className="space-y-2">
                     <div className="flex items-center gap-2 text-white/90">
                        <CheckCircle className="w-4 h-4" /> <span>Performance Metrics</span>
                     </div>
                     <div className="flex items-center gap-2 text-white/90">
                        <CheckCircle className="w-4 h-4" /> <span>Real-time Checks & Alerts</span>
                     </div>
                     <div className="flex items-center gap-2 text-white/90">
                        <CheckCircle className="w-4 h-4" /> <span>Minimal Overhead</span>
                     </div>
                  </div>
               </div>
            </div>
            <div className="order-1 md:order-2 space-y-6">
               <h2 className="font-serif text-4xl md:text-5xl leading-tight">
                  The quiet guardian of your <span className="text-[#D4A373] italic">uptime</span>.
               </h2>
               <p className="text-lg opacity-70 leading-relaxed">
                  PulseBoard isn't just a status page. It's a promise to your users. We monitor your API endpoints with the gentleness of a gardener and the precision of a clockmaker.
               </p>
               <ul className="space-y-4 pt-4">
                  {[
                     "Minimal overhead monitoring",
                     "Beautiful, public status pages",
                     "Instant alerts via Email"
                  ].map((item, i) => (
                     <li key={i} className="flex items-center gap-3 font-medium">
                        <div className="w-6 h-6 rounded-full bg-[#D4A373]/20 flex items-center justify-center text-[#D4A373]">
                           <ArrowRight className="w-3 h-3" />
                        </div>
                        {item}
                     </li>
                  ))}
               </ul>
               <div className="pt-6">
                  <a href="https://pulseboard.lamas-co.com/docs" target="_blank" rel="noopener noreferrer" className="text-[#D4A373] font-bold tracking-widest uppercase text-xs border-b border-[#D4A373] pb-1 hover:opacity-70 transition-opacity">
                     View Documentation
                  </a>
               </div>
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
                  Join me as I build LAMAs & PulseBoard.
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