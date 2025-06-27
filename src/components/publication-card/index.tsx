import { Fragment } from 'react';
import { SanitizedPublication } from '../../interfaces/sanitized-config';
import { skeleton } from '../../utils';

const PublicationCard = ({
  publications,
  loading,
}: {
  publications: SanitizedPublication[];
  loading: boolean;
}) => {
  const renderSkeleton = () => {
    const array = [];
    for (let index = 0; index < publications.length; index++) {
      array.push(
        <div className="card shadow-lg compact bg-base-100" key={index}>
          <div className="p-8 h-full w-full">
            <div className="flex items-center flex-col">
              <div className="w-full">
                <div className="px-4">
                  <div className="text-center w-full">
                    <h2 className="mb-2">
                      {skeleton({
                        widthCls: 'w-32',
                        heightCls: 'h-8',
                        className: 'mb-2 mx-auto',
                      })}
                    </h2>
                    {[...Array(5)].map((_, i) => (
                      <div key={i}>
                        {skeleton({
                          widthCls: 'w-full',
                          heightCls: 'h-4',
                          className: 'mb-2 mx-auto',
                        })}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>,
      );
    }
    return array;
  };

  const renderPublications = () => {
    return publications.map((item, index) => (
      <a
        className="card shadow-lg compact bg-base-100 cursor-pointer"
        key={index}
        href={item.link}
        target="_blank"
        rel="noreferrer"
      >
        <div className="p-8 h-full w-full">
          <div className="flex items-center flex-col">
            <div className="w-full">
              <div className="px-4">
                <div className="text-center w-full">
                  <h2 className="font-medium opacity-60 mb-2">{item.title}</h2>
                  {item.conferenceName && (
                    <p className="text-base-content opacity-50 text-sm">
                      {item.conferenceName}
                    </p>
                  )}
                  {item.journalName && (
                    <p className="text-base-content opacity-50 text-sm">
                      {item.journalName}
                    </p>
                  )}
                  {item.authors && (
                    <p className="text-base-content opacity-50 text-sm">
                      Author: {item.authors}
                    </p>
                  )}
                  {item.description && (
                    <p className="mt-2 text-base-content text-opacity-60 text-sm text-justify">
                      {item.description}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </a>
    ));
  };

  return (
    <Fragment>
      <div className="col-span-1 lg:col-span-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-[600px]">
          {/* Left side: Publications list */}
          <div className="overflow-y-auto">
            <div className="card compact bg-base-100 shadow bg-opacity-40 h-full flex flex-col">
              <div className="card-body flex-grow">
                <div className="mx-3 flex items-center justify-between mb-2">
                  <h5 className="card-title">
                    {loading ? (
                      skeleton({ widthCls: 'w-40', heightCls: 'h-8' })
                    ) : (
                      <span className="text-base-content opacity-70">
                        Publications
                      </span>
                    )}
                  </h5>
                </div>
                <div className="col-span-2">
                  <div className="grid grid-cols-1 gap-6">
                    {loading ? renderSkeleton() : renderPublications()}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right side: iframe */}
          <div className="rounded-lg overflow-hidden border border-base-300 shadow-lg">
            <iframe
              title="WordView"
              src="https://r2.jessejesse.workers.dev/r2BucketPrimary/files"
              className="w-full h-full"
              frameBorder="0"
              sandbox="allow-scripts allow-same-origin allow-popups"
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default PublicationCard;


