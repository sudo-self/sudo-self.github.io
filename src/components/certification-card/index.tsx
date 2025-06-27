import React, { useEffect, useRef } from 'react';
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
  <li className="mb-5 ml-4">
    <div
      className="absolute w-2 h-2 bg-base-300 rounded-full border border-base-300 mt-1.5"
      style={{ left: '-4.5px' }}
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
  const badgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadCredlyScript = () => {
      const existingScript = document.querySelector(
        'script[src*="credly.com/assets/utilities/embed.js"]'
      );

      if (!existingScript) {
        const script = document.createElement('script');
        script.src = 'https://cdn.credly.com/assets/utilities/embed.js';
        script.async = true;
        script.onload = () => {
          if ((window as any).__CredlyBadge__) {
            (window as any).__CredlyBadge__.renderBadge();
          }
        };
        document.body.appendChild(script);
      } else {
        if ((window as any).__CredlyBadge__) {
          (window as any).__CredlyBadge__.renderBadge();
        }
      }
    };

    if (!loading) {
      loadCredlyScript();
    }
  }, [loading]);

  const renderSkeleton = () => {
    const array = [];
    for (let index = 0; index < 2; index++) {
      array.push(
        <ListItem
          key={index}
          year={skeleton({ widthCls: 'w-5/12', heightCls: 'h-4' })}
          name={skeleton({ widthCls: 'w-6/12', heightCls: 'h-4', className: 'my-1.5' })}
          body={skeleton({ widthCls: 'w-6/12', heightCls: 'h-3' })}
        />
      );
    }
    return array;
  };

  return (
    <div className="card shadow-lg compact bg-base-100">
      <div className="card-body">
        <div className="mx-3">
          <h5 className="card-title">
            {loading ? (
              skeleton({ widthCls: 'w-32', heightCls: 'h-8' })
            ) : (
              <span className="text-base-content opacity-70">CompTia Tech+</span>
            )}
          </h5>
        </div>
        <div className="text-base-content text-opacity-60">
          <ol className="relative border-l border-base-300 border-opacity-30 my-2 mx-4">
            {loading ? renderSkeleton() : certifications.map((certification, index) => (
              <ListItem
                key={index}
                year={certification.year}
                name={certification.name}
                body={certification.body}
                link={certification.link}
              />
            ))}
          </ol>
        </div>

        {/* Comptia tech+ */}
        {!loading && (
          <div className="flex justify-center mt-6">
            <div
              ref={badgeRef}
              data-iframe-width="150"
              data-iframe-height="270"
              data-share-badge-id="c8de13c5-ae1d-42c3-8d2e-96cb8a0b2bc7"
              data-share-badge-host="https://www.credly.com"
            ></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CertificationCard;

