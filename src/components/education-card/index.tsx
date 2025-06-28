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
  <li className="mb-5 ml-4 relative">
    <div
      className="absolute w-2 h-2 bg-base-300 rounded-full border border-base-300 mt-1.5 -left-4.5"
    ></div>
    <div className="my-0.5 text-xs">{time}</div>
    <div className="font-medium">
      {degreeName}
    </div>
    <h3 className="mb-4 font-normal">{institution}</h3>
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
        time={skeleton({ widthCls: 'w-5/12', heightCls: 'h-4' })}
        degreeName={skeleton({ widthCls: 'w-6/12', heightCls: 'h-4', className: 'my-1.5' })}
        institution={skeleton({ widthCls: 'w-6/12', heightCls: 'h-3' })}
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
                <span className="text-base-content opacity-70">Education</span>
              )}
            </h5>
          </div>
          <div className="text-base-content text-opacity-60">
            <ol className="relative border-l border-base-300 border-opacity-30 my-2 mx-4">
              {loading
                ? renderSkeleton()
                : educations.map((edu, i) => (
                    <ListItem
                      key={i}
                      time={`${edu.from} – ${edu.to}`}
                      degreeName={edu.degree}
                      institution={edu.institution}
                    />
                  ))}
            </ol>
          </div>
        </div>

        {/* Right: Degree Badge */}
        {!loading && (
          <div className="mt-6 md:mt-0 md:ml-6 flex-shrink-0">
            <img
              src="/degree.png"
              alt="Degree Icon"
              className="w-[150px] h-auto rounded shadow"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default EducationCard;



