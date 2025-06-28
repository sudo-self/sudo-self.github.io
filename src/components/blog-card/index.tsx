import { useEffect, useState } from 'react';
import LazyImage from '../lazy-image';
import { AiOutlineContainer } from 'react-icons/ai';
import { getDevPost, getMediumPost } from '@arifszn/blog-js';
import { formatDistance } from 'date-fns';
import { SanitizedBlog } from '../../interfaces/sanitized-config';
import { ga, skeleton } from '../../utils';
import { Article } from '../../interfaces/article';

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

  useEffect(() => {
    if (blog.source === 'medium') {
      getMediumPost({ user: blog.username }).then(setArticles);
    } else if (blog.source === 'dev') {
      getDevPost({ user: blog.username }).then(setArticles);
    }
  }, [blog.source, blog.username]);

  const renderSkeleton = () =>
    Array.from({ length: blog.limit }).map((_, index) => (
      <div key={index} className="card bg-base-200 shadow animate-pulse">
        <div className="flex p-6 items-center gap-6">
          <div className="avatar">
            <div className="w-20 h-20 mask mask-squircle bg-base-300" />
          </div>
          <div className="flex-1 space-y-3">
            <div className="h-6 bg-base-300 rounded-md w-4/5" />
            <div className="h-4 bg-base-300 rounded-md w-1/4" />
            <div className="h-4 bg-base-300 rounded-md w-full mt-2" />
            <div className="h-4 bg-base-300 rounded-md w-1/2 mt-1" />
          </div>
        </div>
      </div>
    ));

  const renderArticles = () => {
    if (!articles.length) {
      return (
        <div className="flex flex-col items-center justify-center py-16 opacity-60 space-y-2">
          <AiOutlineContainer className="w-14 h-14 text-base-content" />
          <p className="text-sm text-center">No recent post</p>
        </div>
      );
    }

    const gridColsClass = articles.length === 2 ? 'grid-cols-2' : 'grid-cols-1';

    return (
      <div className={`grid ${gridColsClass} gap-6`}>
        {articles.slice(0, blog.limit).map((article, idx) => (
          <a
            key={idx}
            href={article.link}
            target="_blank"
            rel="noopener noreferrer"
            className="card bg-base-100 shadow-md hover:shadow-lg transition group"
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
            <div className="flex p-6 items-center gap-6">
              <div className="avatar shrink-0">
                <div className="w-24 h-24 mask mask-squircle overflow-hidden bg-base-300 group-hover:scale-105 transition-transform duration-300">
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
              <div className="flex flex-col flex-1 text-base-content">
                <h3 className="text-lg font-semibold leading-tight opacity-90 group-hover:text-primary transition-colors">
                  {article.title}
                </h3>
                <time
                  className="text-xs opacity-60 mt-1"
                  dateTime={article.publishedAt.toISOString()}
                >
                  {formatDistance(article.publishedAt, new Date(), { addSuffix: true })}
                </time>
                <p className="mt-3 text-sm opacity-70 line-clamp-3">{article.description}</p>

                {!!article.categories.length && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {article.categories.map((category, i) => (
                      <span
                        key={i}
                        className="badge badge-outline badge-sm lowercase cursor-default opacity-70"
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

  return (
    <section className="col-span-1 lg:col-span-2 space-y-8">
      {/* Two Column Layout: Iframe + Articles */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left: Iframe */}
        <div className="w-full lg:w-1/2">
          <div className="card bg-base-100 shadow-md h-full">
            <div className="card-body p-0 h-full">
              <iframe
                src="https://edge-chat-demo.jessejesse.workers.dev/"
                title="GitReactRepos"
                className="w-full h-[600px] rounded-lg"
                frameBorder="0"
                allow="clipboard-write; fullscreen"
              />
            </div>
          </div>
        </div>

        {/* Right: Articles */}
        <div className="w-full lg:w-1/2">
          {loading ? renderSkeleton() : renderArticles()}
        </div>
      </div>
    </section>
  );
};

export default BlogCard;









