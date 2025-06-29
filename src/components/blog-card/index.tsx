import { useEffect, useState } from 'react';
import LazyImage from '../lazy-image';
import { AiOutlineContainer } from 'react-icons/ai';
import { getDevPost, getMediumPost } from '@arifszn/blog-js';
import { formatDistance } from 'date-fns';
import { SanitizedBlog } from '../../interfaces/sanitized-config';
import { ga, skeleton } from '../../utils';
import { Article } from '../../interfaces/article';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

const BlogCard = ({
  loading,
  blog,
  googleAnalyticsId,
}: {
  loading: boolean;
  blog: SanitizedBlog;
  googleAnalyticsId?: string;
}) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [iframeUrl, setIframeUrl] = useState('https://react-builder-ts.vercel.app');
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const posts =
          blog.source === 'medium'
            ? await getMediumPost({ user: blog.username })
            : await getDevPost({ user: blog.username });
        setArticles(posts);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };

    fetchArticles();
  }, [blog.source, blog.username]);

  const handleCopy = async (content: string, label: string) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(label);
      setTimeout(() => setCopied(null), 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

    const EmbedBlock = ({
      label,
      code,
      language,
    }: {
      label: string;
      code: string;
      language: string;
    }) => (
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <label className="font-semibold text-sm">{label}</label>
          <button
            onClick={() => handleCopy(code, label)}
            className="btn btn-xs btn-ghost"
            aria-label="Copy to clipboard"
          >
            {copied === label ? 'ok!' : '⧉'}
          </button>
        </div>
        <div className="mockup-code bg-base-300 rounded-md overflow-hidden">
          <SyntaxHighlighter
            language={language}
            style={atomDark}
            customStyle={{
              margin: 0,
              padding: '1rem',
              background: 'transparent',
              fontSize: '0.8rem',
              lineHeight: '1.5',
            }}
            showLineNumbers
            wrapLines
          >
            {code}
          </SyntaxHighlighter>
        </div>
      </div>
    );


  const renderSkeleton = () =>
    Array.from({ length: blog.limit }).map((_, index) => (
      <div key={index} className="card bg-base-200 shadow animate-pulse">
        <div className="flex p-4 items-center gap-4">
          <div className="avatar">
            <div className="w-16 h-16 mask mask-squircle bg-base-300" />
          </div>
          <div className="flex-1 space-y-2">
            <div className="h-5 bg-base-300 rounded-md w-3/4" />
            <div className="h-4 bg-base-300 rounded-md w-1/3" />
          </div>
        </div>
      </div>
    ));

  const renderArticles = () => {
    if (!articles.length) {
      return (
        <div className="flex flex-col items-center justify-center py-16 opacity-60 space-y-2">
          <AiOutlineContainer className="w-14 h-14 text-base-content" />
          <p className="text-sm text-center">No recent posts</p>
        </div>
      );
    }

    return (
      <div className="flex flex-col gap-4">
        {articles.slice(0, blog.limit).map((article, idx) => (
          <a
            key={`${article.title}-${idx}`}
            href={article.link}
            target="_blank"
            rel="noopener noreferrer"
            className="card bg-base-100 shadow hover:shadow-lg transition group p-4"
            onClick={(e) => {
              e.preventDefault();
              if (googleAnalyticsId) {
                try {
                  ga.event('Click Blog Post', { post: article.title });
                } catch (error) {
                  console.error(error);
                }
              }
              window.open(article.link, '_blank');
            }}
          >
            <div className="flex gap-4 items-start">
              <div className="avatar">
                <div className="w-16 h-16 mask mask-squircle overflow-hidden bg-base-300 group-hover:scale-105 transition-transform duration-300">
                  <LazyImage
                    src={article.thumbnail}
                    alt={`Thumbnail for ${article.title}`}
                    placeholder={skeleton({
                      widthCls: 'w-full',
                      heightCls: 'h-full',
                      shape: '',
                    })}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1 flex-1 text-base-content">
                <h3 className="font-medium text-base group-hover:text-primary transition-colors">
                  {article.title}
                </h3>
                <time
                  className="text-xs opacity-60"
                  dateTime={article.publishedAt.toISOString()}
                >
                  {formatDistance(article.publishedAt, new Date(), { addSuffix: true })}
                </time>
                <p className="text-sm opacity-80 line-clamp-3">{article.description}</p>
                {!!article.categories?.length && (
                  <div className="mt-2 flex flex-wrap gap-1">
                    {article.categories.map((category, i) => (
                      <span
                        key={`${category}-${i}`}
                        className="badge badge-outline badge-sm lowercase opacity-70"
                      >
                        #{category}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </a>
        ))}
      </div>
    );
  };

  const htmlEmbed = `<iframe src="${iframeUrl}" width="100%" height="600" frameborder="0" allowfullscreen></iframe>`;
  const jsxEmbed = `<iframe\n  src="${iframeUrl}"\n  width="100%"\n  height="600"\n  frameBorder="0"\n  allow="clipboard-write; fullscreen"\n/>`;
  const jsEmbed = `const iframe = document.createElement('iframe');\niframe.src = "${iframeUrl}";\niframe.width = "100%";\niframe.height = "600";\niframe.frameBorder = "0";\niframe.allow = "clipboard-write; fullscreen";\ndocument.body.appendChild(iframe);`;

  return (
    <section className="col-span-1 lg:col-span-2 space-y-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left side: iframe and embeds */}
        <div className="w-full lg:w-2/3 space-y-4">
          <input
            type="text"
            value={iframeUrl}
            onChange={(e) => setIframeUrl(e.target.value)}
            placeholder="Enter a URL to embed"
            className="input input-bordered w-full"
          />

          <div className="card bg-base-100 shadow-md">
            <div className="card-body p-0">
              <iframe
                src={iframeUrl}
                title="Embedded content preview"
                className="w-full h-[600px] rounded-lg"
                frameBorder="0"
                allow="clipboard-write; fullscreen"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <EmbedBlock label="html" code={htmlEmbed} language="html" />
            <EmbedBlock label="react" code={jsxEmbed} language="jsx" />
            <EmbedBlock label="Js" code={jsEmbed} language="javascript" />
          </div>
        </div>

        {/* Right side: blog posts */}
        <div className="w-full lg:w-1/3">
          {loading ? renderSkeleton() : renderArticles()}
        </div>
      </div>
    </section>
  );
};

export default BlogCard;










