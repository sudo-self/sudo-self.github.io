import React from 'react';
import { SanitizedCertification } from '../../interfaces/sanitized-config';
import { skeleton } from '../../utils';

const ListItem = ({
  year,
  name,
  body,
  link,
}: {
  year?: React.ReactNode;
  name?: React.ReactNode;
  body?: React.ReactNode;
  link?: string;
}) => (
  <li className="mb-5 ml-4 relative">
    <div
      className="absolute w-2 h-2 bg-base-300 rounded-full border border-base-300 mt-1.5 -left-4.5"
    ></div>
    <div className="my-0.5 text-xs">{year}</div>
    <div className="font-medium">
      <a href={link} target="_blank" rel="noreferrer">
        {name}
      </a>
    </div>
    <h3 className="mb-4 font-normal">{body}</h3>
  </li>
);

const CertificationCard = ({
  certifications,
  loading,
}: {
  certifications: SanitizedCertification[];
  loading: boolean;
}) => {
  const renderSkeleton = () =>
    Array.from({ length: 2 }, (_, i) => (
      <ListItem
        key={i}
        year={skeleton({ widthCls: 'w-5/12', heightCls: 'h-4' })}
        name={skeleton({ widthCls: 'w-6/12', heightCls: 'h-4', className: 'my-1.5' })}
        body={skeleton({ widthCls: 'w-6/12', heightCls: 'h-3' })}
      />
    ));

  return (
    <div className="card shadow-lg compact bg-base-100">
      <div className="card-body flex flex-col md:flex-row justify-between items-start">
        {/* Left: Title + List */}
        <div className="flex-1">
          <div className="mx-3">
            <h5 className="card-title">
              {loading ? (
                skeleton({ widthCls: 'w-32', heightCls: 'h-8' })
              ) : (
                <span className="text-base-content opacity-70">Certifications</span>
              )}
            </h5>
          </div>
          <div className="text-base-content text-opacity-60">
            <ol className="relative border-l border-base-300 border-opacity-30 my-2 mx-4">
              {loading
                ? renderSkeleton()
                : certifications.map((cert, i) => (
                    <ListItem
                      key={i}
                      year={cert.year}
                      name={cert.name}
                      body={cert.body}
                      link={cert.link}
                    />
                  ))}
            </ol>
          </div>
        </div>

        {/* Right: Badge */}
        {!loading && (
          <div className="mt-6 md:mt-0 md:ml-6 flex-shrink-0">
            <img
              src="/techplus.png"
              alt="Tech Plus Badge"
              className="w-[150px] h-auto rounded shadow"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CertificationCard;



