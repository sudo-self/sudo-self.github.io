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
      <div
        key={index}
        className="card compact bg-base-200 shadow-md animate-pulse cursor-wait"
      >
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
            className="card compact bg-base-100 shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer group"
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
                <div className="w-24 h-24 mask mask-squircle bg-base-300 group-hover:scale-105 transition-transform duration-300 overflow-hidden">
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
                <h3 className="font-semibold text-lg leading-tight opacity-90 group-hover:text-primary transition-colors">
                  {article.title}
                </h3>
                <time
                  className="text-xs opacity-60 mt-1"
                  dateTime={article.publishedAt.toISOString()}
                >
                  {formatDistance(article.publishedAt, new Date(), { addSuffix: true })}
                </time>
                <p className="mt-3 text-sm opacity-70 line-clamp-3">{article.description}</p>

                {article.categories.length > 0 && (
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
    <section className="col-span-1 lg:col-span-2">
      <div className="space-y-8">
        {/* CodePen Embed */}
        <div className="card compact bg-base-100 shadow-md">
          <div className="card-body p-0">
            <iframe
              height={320}
              style={{ width: '100%' }}
              scrolling="no"
              title="ToyStoryJessie"
              src="https://codepen.io/sudo-self/embed/dyEMJzw?default-tab=html%2Cresult&theme-id=dark"
              frameBorder="0"
              loading="lazy"
              allowTransparency
              allowFullScreen
              className="rounded-b-lg"
            />
          </div>
        </div>

        {/* DEV.to Badge */}
        <div className="flex justify-center">
          {loading ? (
            skeleton({ widthCls: 'w-32', heightCls: 'h-10', className: 'rounded-lg' })
          ) : (
            <img
              src="https://img.shields.io/badge/dev.to-0A0A0A?style=for-the-badge&logo=devdotto&logoColor=white"
              alt="Dev.to Badge"
              className="h-10 rounded-lg"
            />
          )}
        </div>

        {/* Articles List */}
        <div>{loading || !articles ? renderSkeleton() : renderArticles()}</div>

        {/* Apple Music inside DaisyUI browser mockup */}
        <div className="mockup-browser border border-base-300 rounded-lg">
          <div className="mockup-browser-toolbar bg-base-200 border-b border-base-300 rounded-t-lg">
            <div className="input input-sm input-bordered w-full max-w-full select-none text-sm truncate">
              https://sudo-self.com
            </div>
          </div>
          <div className="p-4 space-y-4 bg-base-200 rounded-b-lg">
            <img
              src="https://img.shields.io/badge/apple%20music-F34E68?style=for-the-badge&logo=apple%20music&logoColor=white"
              alt="Apple Music Badge"
              className="h-8 mx-auto"
            />
            {[
              'https://embed.music.apple.com/us/album/no/1428721890?i=1428724823',
              'https://embed.music.apple.com/us/album/superposition/1430224633?i=1430224650',
              'https://embed.music.apple.com/us/album/youth/1440840097?i=1440840432',
              'https://embed.music.apple.com/us/album/you-only-live-once/299740383?i=299740483',
              'https://embed.music.apple.com/us/album/nobody-else/1716121730?i=1716121731',
            ].map((url, idx) => (
              <iframe
                key={idx}
                allow="autoplay *; encrypted-media *;"
                frameBorder="0"
                height={150}
                className="w-full rounded-lg"
                style={{ background: 'transparent' }}
                sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
                src={url}
                title={`Apple Music Player ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogCard;






