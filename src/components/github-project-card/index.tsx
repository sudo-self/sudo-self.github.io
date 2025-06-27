import { useEffect, Fragment } from 'react';
import { AiOutlineFork, AiOutlineStar } from 'react-icons/ai';
import { MdInsertLink } from 'react-icons/md';
import { ga, getLanguageColor, skeleton } from '../../utils';
import { GithubProject } from '../../interfaces/github-project';

const GithubProjectCard = ({
  header,
  githubProjects,
  loading,
  limit,
  username,
  googleAnalyticsId,
}: {
  header: string;
  githubProjects: GithubProject[];
  loading: boolean;
  limit: number;
  username: string;
  googleAnalyticsId?: string;
}) => {
  useEffect(() => {
    const scriptId = 'github-buttons-script';
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.setAttribute('async', '');
      script.setAttribute('defer', '');
      script.src = 'https://buttons.github.io/buttons.js';
      script.id = scriptId;
      document.body.appendChild(script);
    }
  }, []);

  if (!loading && githubProjects.length === 0) return null;

  const renderSkeleton = () => {
    return Array.from({ length: limit }, (_, index) => (
      <div className="card shadow-lg compact bg-base-100" key={index}>
        <div className="flex justify-between flex-col p-8 h-full w-full">
          <div>
            <div className="flex items-center">
              <h5 className="card-title text-lg">
                {skeleton({ widthCls: 'w-32', heightCls: 'h-8', className: 'mb-1' })}
              </h5>
            </div>
            <div className="mb-5 mt-1">
              {skeleton({ widthCls: 'w-full', heightCls: 'h-4', className: 'mb-2' })}
              {skeleton({ widthCls: 'w-full', heightCls: 'h-4' })}
            </div>
          </div>
          <div className="flex justify-between">
            <div className="flex flex-grow">
              <span className="mr-3 flex items-center">
                {skeleton({ widthCls: 'w-12', heightCls: 'h-4' })}
              </span>
              <span className="flex items-center">
                {skeleton({ widthCls: 'w-12', heightCls: 'h-4' })}
              </span>
            </div>
            <div>
              <span className="flex items-center">
                {skeleton({ widthCls: 'w-12', heightCls: 'h-4' })}
              </span>
            </div>
          </div>
        </div>
      </div>
    ));
  };

  const renderProjects = () => {
    return githubProjects.map((item, index) => (
      <a
        className="card shadow-lg compact bg-base-100 cursor-pointer"
        href={item.html_url}
        key={index}
        onClick={(e) => {
          e.preventDefault();
          try {
            if (googleAnalyticsId) {
              ga.event('Click project', { project: item.name });
            }
          } catch (error) {
            console.error(error);
          }
          window?.open(item.html_url, '_blank');
        }}
      >
        <div className="flex justify-between flex-col p-8 h-full w-full">
          <div>
            <div className="flex items-center truncate">
              <div className="card-title text-lg tracking-wide flex text-base-content opacity-60">
                <MdInsertLink className="my-auto" />
                <span>{item.name}</span>
              </div>
            </div>
            <p className="mb-5 mt-1 text-base-content text-opacity-60 text-sm">
              {item.description}
            </p>
          </div>
          <div className="flex justify-between text-sm text-base-content text-opacity-60 truncate">
            <div className="flex flex-grow">
              <span className="mr-3 flex items-center">
                <AiOutlineStar className="mr-0.5" />
                <span>{item.stargazers_count}</span>
              </span>
              <span className="flex items-center">
                <AiOutlineFork className="mr-0.5" />
                <span>{item.forks_count}</span>
              </span>
            </div>
            <div>
              <span className="flex items-center">
                <div
                  className="w-3 h-3 rounded-full mr-1 opacity-60"
                  style={{ backgroundColor: getLanguageColor(item.language) }}
                />
                <span>{item.language}</span>
              </span>
            </div>
          </div>
        </div>
      </a>
    ));
  };

  return (
    <Fragment>
      <div className="col-span-1 lg:col-span-2">
        <div className="grid grid-cols-2 gap-6">
          <div className="col-span-2">
            <div className="card compact bg-base-100 shadow bg-opacity-40">
              <div className="card-body">
                <div className="mx-3 flex items-center justify-between mb-2">
                  {loading ? (
                    skeleton({ widthCls: 'w-40', heightCls: 'h-8' })
                  ) : (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: `<a class="github-button" href="https://github.com/buttons/github-buttons" data-color-scheme="no-preference: light; light: light; dark: dark;" data-icon="octicon-star" data-size="large" aria-label="Star buttons/github-buttons on GitHub">Star</a>`,
                      }}
                    />
                  )}
                </div>
                <div className="col-span-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {loading ? renderSkeleton() : renderProjects()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default GithubProjectCard;






