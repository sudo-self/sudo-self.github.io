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
  <li className="mb-8 ml-6 relative">
    <div className="absolute w-3 h-3 bg-primary rounded-full -left-1.5 border-2 border-base-100 shadow-md"></div>
    <div className="text-sm text-base-content text-opacity-70 mb-1">{year}</div>
    <a
      href={link}
      target="_blank"
      rel="noreferrer"
      className="text-base font-semibold text-base-content hover:text-primary transition-colors"
    >
      {name}
    </a>
    <p className="text-sm text-base-content text-opacity-60 mt-1">{body}</p>
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
        body={skeleton({ widthCls: 'w-8/12', heightCls: 'h-3' })}
      />
    ));

  return (
    <div className="card shadow-xl bg-base-100">
      <div className="card-body md:flex md:items-start md:justify-between gap-8">
        {/* Left Column */}
        <div className="flex-1">
          <h2 className="text-lg font-bold mb-2 text-base-content">
            {loading ? skeleton({ widthCls: 'w-32', heightCls: 'h-7' }) : 'Certifications'}
          </h2>
          <ol className="relative border-l-2 border-base-200 ml-3 mt-4">
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

        {/* Right Column - Badge */}
        {!loading && (
          <div className="flex-shrink-0 mt-6 md:mt-0">
            <img
              src="/techplus.png"
              alt="Tech Plus Badge"
              className="w-36 h-auto rounded-lg shadow-lg border border-base-300"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CertificationCard;




