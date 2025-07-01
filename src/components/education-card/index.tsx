import React from 'react';
import { SanitizedEducation } from '../../interfaces/sanitized-config';
import { skeleton } from '../../utils';

const ListItem = ({
  time,
  degreeName,
  institution,
}: {
  time?: React.ReactNode;
  degreeName?: React.ReactNode;
  institution?: React.ReactNode;
}) => (
  <li className="mb-6 ml-6 relative">
    <div className="absolute w-3 h-3 bg-primary rounded-full -left-1.5 border-2 border-base-100 shadow-md"></div>
    <div className="text-sm text-base-content text-opacity-70 mb-1">{time}</div>
    <div className="font-semibold text-base-content">{degreeName}</div>
    <p className="text-sm text-base-content text-opacity-60">{institution}</p>
  </li>
);

const EducationCard = ({
  educations,
  loading,
}: {
  educations: SanitizedEducation[];
  loading: boolean;
}) => {
  const renderSkeleton = () =>
    Array.from({ length: 2 }, (_, i) => (
      <ListItem
        key={i}
        time={skeleton({ widthCls: 'w-4/12', heightCls: 'h-4' })}
        degreeName={skeleton({ widthCls: 'w-6/12', heightCls: 'h-4', className: 'my-1' })}
        institution={skeleton({ widthCls: 'w-5/12', heightCls: 'h-3' })}
      />
    ));

  return (
    <>
      <style>{`
        @keyframes shake {
          0% { transform: translate(1px, 1px) rotate(0deg); }
          10% { transform: translate(-1px, -2px) rotate(-1deg); }
          20% { transform: translate(-3px, 0px) rotate(1deg); }
          30% { transform: translate(3px, 2px) rotate(0deg); }
          40% { transform: translate(1px, -1px) rotate(1deg); }
          50% { transform: translate(-1px, 2px) rotate(-1deg); }
          60% { transform: translate(-3px, 1px) rotate(0deg); }
          70% { transform: translate(3px, 1px) rotate(-1deg); }
          80% { transform: translate(-1px, -1px) rotate(1deg); }
          90% { transform: translate(1px, 2px) rotate(0deg); }
          100% { transform: translate(1px, -2px) rotate(-1deg); }
        }
        .shake-hover:hover {
          animation: shake 0.6s linear infinite;
        }
      `}</style>

      {/* Education Section */}
      <div className="card shadow-lg bg-base-100 mb-8">
        <div className="card-body md:flex md:flex-row gap-8">
          <div className="flex-1">
            <h2 className="text-lg font-bold text-base-content mb-2">
              {loading ? skeleton({ widthCls: 'w-32', heightCls: 'h-7' }) : 'Education'}
            </h2>
            <ol className="relative border-l-2 border-base-200 ml-3 mt-4">
              {loading ? renderSkeleton() : educations.map((edu, i) => (
                <ListItem
                  key={i}
                  time={`${edu.from} – ${edu.to}`}
                  degreeName={edu.degree}
                  institution={edu.institution}
                />
              ))}
            </ol>
          </div>

          {!loading && (
            <div className="flex-shrink-0 flex flex-col items-center justify-center md:justify-start mt-6 md:mt-0 space-y-4">
              <img
                src="/degree.png"
                alt="Degree Badge"
                className="w-36 h-auto rounded-lg shadow-lg border border-base-300"
              />
              <img
                src="/techplus.png"
                alt="Tech Plus Badge"
                className="w-36 h-auto rounded-lg shadow-lg border border-base-300"
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default EducationCard;





