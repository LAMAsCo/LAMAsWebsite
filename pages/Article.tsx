import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Markdown from 'react-markdown';
import { ArrowLeft, Calendar, Tag, Clock } from 'lucide-react';
import { getArticleBySlug, Article } from '../src/lib/articles';

const ArticlePage: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const [article, setArticle] = useState<Article | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (slug) {
            const found = getArticleBySlug(slug);
            setArticle(found || null);
            setLoading(false);
        }
    }, [slug]);

    if (loading) {
        return <div className="min-h-[50vh] flex items-center justify-center">Loading...</div>;
    }

    if (!article) {
        return (
            <div className="max-w-4xl mx-auto py-20 text-center">
                <h1 className="text-4xl font-serif mb-6">Article not found</h1>
                <Link to="/insights" className="text-[#D4A373] hover:underline">Back to Insights</Link>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto py-12 px-6">
            <Link to="/insights" className="inline-flex items-center gap-2 text-sm font-medium opacity-60 hover:opacity-100 transition-opacity mb-12 group">
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Back to Insights
            </Link>

            <header className="mb-12">
                <div className="flex items-center gap-4 text-xs font-bold tracking-widest uppercase opacity-60 mb-6">
                    <span className="flex items-center gap-2">
                        <Tag className="w-3 h-3" /> {article.category}
                    </span>
                    <span className="w-1 h-1 bg-current rounded-full"></span>
                    <span className="flex items-center gap-2">
                        <Calendar className="w-3 h-3" /> {new Date(article.date).toLocaleDateString()}
                    </span>
                    <span className="w-1 h-1 bg-current rounded-full"></span>
                    <span className="flex items-center gap-2">
                        <Clock className="w-3 h-3" /> {article.readTime}
                    </span>
                </div>

                <h1 className="font-serif text-4xl md:text-5xl leading-tight mb-8">
                    {article.title}
                </h1>

                <p className="text-xl opacity-70 leading-relaxed font-serif italic">
                    {article.excerpt}
                </p>
            </header>

            <div className="prose dark:prose-invert prose-lg max-w-none prose-headings:font-serif prose-headings:font-normal prose-a:text-[#D4A373] prose-a:no-underline hover:prose-a:underline prose-img:rounded-[2rem] prose-img:shadow-lg">
                <Markdown
                    components={{
                        img: ({ node, ...props }) => (
                            <figure className="my-8">
                                <img
                                    {...props}
                                    className="rounded-[2rem] shadow-lg w-full"
                                    alt={props.alt}
                                />
                                {props.alt && (
                                    <figcaption className="text-center text-sm mt-3 opacity-60 font-serif italic">
                                        {props.alt}
                                    </figcaption>
                                )}
                            </figure>
                        )
                    }}
                >
                    {article.content}
                </Markdown>
            </div>
        </div>
    );
};

export default ArticlePage;
