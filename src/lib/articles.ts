
export interface Article {
    slug: string;
    title: string;
    category: string;
    date: string;
    excerpt: string;
    content: string;
    readTime?: string;
    image?: string;
    [key: string]: any;
}

// Simple frontmatter parser to avoid node dependencies (Buffer) in browser
const parseFrontmatter = (text: string) => {
    const match = text.match(/^---\s*[\r\n]+([\s\S]*?)[\r\n]+---\s*[\r\n]+([\s\S]*)$/);
    if (!match) return { data: {}, content: text };

    const frontmatterRaw = match[1];
    const content = match[2];

    const data: Record<string, string> = {};
    frontmatterRaw.split('\n').forEach(line => {
        const parts = line.split(':');
        if (parts.length >= 2) {
            const key = parts[0].trim();
            // Join back the rest in case value contains colons
            const value = parts.slice(1).join(':').trim();
            // Remove quotes if present
            data[key] = value.replace(/^['"](.*)['"]$/, '$1');
        }
    });

    return { data, content };
};

export const getArticles = (): Article[] => {
    // Use Vite's import.meta.glob to load all markdown files in the articles directory
    // Relative path to src/articles from src/lib is ../articles
    const modules = import.meta.glob('../articles/*.md', { query: '?raw', import: 'default', eager: true });

    const articles: Article[] = [];

    for (const path in modules) {
        const rawContent = modules[path] as string;
        const { data, content } = parseFrontmatter(rawContent);

        // Extract slug from filename (e.g., ../articles/my-post.md -> my-post)
        const slug = path.split('/').pop()?.replace('.md', '') || '';

        articles.push({
            slug,
            title: data.title || 'Untitled',
            category: data.category || 'General',
            date: data.date || new Date().toISOString(),
            excerpt: data.excerpt || '',
            content: content,
            readTime: '5 min read', // Placeholder or calculation logic
            ...data,
        });
    }

    // Sort by date descending
    return articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export const getArticleBySlug = (slug: string): Article | undefined => {
    const articles = getArticles();
    return articles.find(article => article.slug === slug);
};
