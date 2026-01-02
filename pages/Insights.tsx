import React from 'react';
import { Wind, Sun, BookOpen, Mic, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const InsightsPage: React.FC = () => {
   const [posts, setPosts] = React.useState<any[]>([]);

   React.useEffect(() => {
      // Dynamically import the articles function to avoid SSR/build issues if needed, 
      // though standard import works fine with Vite.
      import('../src/lib/articles').then(({ getArticles }) => {
         const articles = getArticles();

         // Map articles to the display format (adding icons/colors based on category)
         const mappedPosts = articles.map(article => {
            let icon = <Wind className="w-8 h-8 opacity-40" />;
            let color = "bg-[#E0E2DB] dark:bg-[#2F332B]";

            if (article.category === "Design") {
               icon = <Sun className="w-8 h-8 opacity-40" />;
               color = "bg-[#F4E4D4] dark:bg-[#3D342B]";
            } else if (article.category === "Philosophy") {
               icon = <BookOpen className="w-8 h-8 opacity-40" />;
               color = "bg-[#D4E4F4] dark:bg-[#2B343D]";
            } else if (article.category === "Update") {
               icon = <Mic className="w-8 h-8 opacity-40" />;
               color = "bg-[#E5E7E1] dark:bg-[#232620]";
            }

            return {
               ...article,
               icon,
               color
            };
         });

         setPosts(mappedPosts);
      });
   }, []);

   return (
      <div className="max-w-6xl mx-auto">

         <div className="text-center mb-20">
            <h1 className="font-serif text-5xl md:text-7xl mb-6">Insights & <span className="text-[#D4A373] italic">Essays</span></h1>
            <p className="text-xl opacity-70 max-w-2xl mx-auto">
               Thoughts on engineering, design, and the slow process of building things that last.
            </p>
         </div>

         {posts.length > 0 ? (
            <>
               <div className="grid md:grid-cols-2 gap-8">
                  {posts.map((post, index) => (
                     <Link to={`/insights/${post.slug}`} key={index} className="block group">
                        <article className="h-full bg-white dark:bg-[#232620] rounded-[2.5rem] p-4 hover:shadow-lg transition-all duration-500 hover:-translate-y-2 border border-[#E5E7E1] dark:border-[#333] cursor-pointer">
                           <div
                              className={`h-64 rounded-[2rem] ${post.color} relative flex items-center justify-center mb-6 overflow-hidden isolate transform-gpu`}
                              style={{ WebkitMaskImage: '-webkit-radial-gradient(white, black)' }}
                           >
                              {post.image ? (
                                 <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                              ) : (
                                 <div className="transform group-hover:scale-110 transition-transform duration-700">
                                    {post.icon}
                                 </div>
                              )}
                              <div className="absolute top-6 right-6 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                 <ArrowUpRight className="w-4 h-4 text-[#2C3E2D] dark:text-white" />
                              </div>
                           </div>

                           <div className="px-6 pb-6">
                              <div className="flex justify-between items-center mb-4">
                                 <div className="flex gap-2 items-center text-xs font-serif italic text-[#D4A373]">
                                    <span>{post.category}</span>
                                    <span className="w-1 h-1 bg-current rounded-full opacity-40"></span>
                                    <span>{new Date(post.date).toLocaleDateString()}</span>
                                 </div>
                                 <span className="text-[10px] font-medium uppercase tracking-widest opacity-40">{post.readTime}</span>
                              </div>

                              <h2 className="text-2xl font-serif mb-3 group-hover:text-[#D4A373] transition-colors">
                                 {post.title}
                              </h2>

                              <p className="text-sm opacity-60 leading-relaxed mb-4">
                                 {post.excerpt}
                              </p>

                              <div className="text-xs font-bold tracking-widest uppercase opacity-40 group-hover:opacity-100 transition-opacity">
                                 Read Article
                              </div>
                           </div>
                        </article>
                     </Link>
                  ))}
               </div>

               <div className="mt-20 text-center">
                  <button className="px-8 py-3 rounded-full border border-[#D4A373] text-[#D4A373] hover:bg-[#D4A373] hover:text-white transition-colors font-medium text-sm">
                     Load Older Posts
                  </button>
               </div>
            </>
         ) : (
            <div className="flex justify-center py-20">
               <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F3F4F1] dark:bg-[#2A2E26] shadow-sm border border-[#E5E7E1] dark:border-[#333]">
                  <span className="w-2 h-2 rounded-full bg-[#D4A373] animate-pulse"></span>
                  <span className="text-xs font-medium tracking-widest uppercase opacity-60">Coming Soon</span>
               </div>
            </div>
         )}

      </div>
   );
};

export default InsightsPage;