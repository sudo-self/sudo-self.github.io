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
    <div className="absolute w-2 h-2 bg-base-300 rounded-full border border-base-300 mt-1.5 -left-4.5"></div>
    <div className="my-0.5 text-xs">{time}</div>
    <div className="font-medium">{degreeName}</div>
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

  const badges = [
    {
      src: 'https://github.com/sudo-self/sudo-self/assets/119916323/591566e1-cd9a-445c-9d0b-82ca60b4c37f',
      alt: 'Pull Shark',
    },
    {
      src: 'https://github.com/sudo-self/sudo-self/assets/119916323/9d692e82-ae9f-4703-9355-74a0e8bebbfe',
      alt: 'Quickdraw',
    },
    {
      src: 'https://github.com/sudo-self/sudo-self/assets/119916323/5c4f6626-7c67-4277-97a6-b67b77d08953',
      alt: 'Starstruck',
    },
    {
      src: 'https://github.com/sudo-self/sudo-self/assets/119916323/f135932f-d44f-4bb9-b72a-ac23219112bc',
      alt: 'Yolo',
    },
    {
      src: 'https://github.com/user-attachments/assets/4962670c-d88b-4bfd-8697-753044e16c33',
      alt: 'Dev Badge 3',
    },
    {
      src: 'https://github.com/user-attachments/assets/3aa8db8c-ec26-4248-85a2-a147c1b74e06',
      alt: 'Dev Badge 2',
    },
    {
      src: 'https://github.com/user-attachments/assets/a3a9c3b1-4389-4ccb-a6d7-c48ef81ea222',
      alt: 'Dev Badge 1',
    },
    {
      src: 'https://pub-c1de1cb456e74d6bbbee111ba9e6c757.r2.dev/Android%20studio.svg',
      alt: 'Dev Badge 4',
    },
    {
      src: 'https://pub-c1de1cb456e74d6bbbee111ba9e6c757.r2.dev/gdeveloper.svg',
      alt: 'Dev Badge 5',
    },
    {
      src: 'https://pub-c1de1cb456e74d6bbbee111ba9e6c757.r2.dev/firebase.svg',
      alt: 'Dev Badge 6',
    },
    {
      src: 'https://pub-c1de1cb456e74d6bbbee111ba9e6c757.r2.dev/Image%205.png',
      alt: 'Dev Badge 7',
    },
    {
      src: 'https://pub-c1de1cb456e74d6bbbee111ba9e6c757.r2.dev/techplus.png',
      alt: 'Dev Badge 8',
    },
  ];

  return (
    <>
      <style>
        {`
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
        `}
      </style>

      {/* Education Card */}
      <div className="card shadow-lg compact bg-base-100 mb-8">
        <div className="card-body flex flex-col md:flex-row justify-between items-start">
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

          {/* Right: Degree Icon */}
          {!loading && (
            <div className="mt-6 md:mt-0 md:ml-6 w-full md:w-auto flex justify-center md:justify-start">
              <img
                src="/degree.png"
                alt="Degree Icon"
                className="w-[150px] h-auto rounded shadow"
              />
            </div>
          )}
        </div>
      </div>

      {/* Badges Card */}
      {!loading && (
        <div className="card shadow-lg compact bg-base-100">
          <div className="card-body">
            <h5 className="card-title text-base-content opacity-70 mx-3">Badges</h5>
            <div className="my-4 mx-4 grid grid-cols-2 sm:grid-cols-3 gap-6 justify-center">
              {badges.map(({ src, alt }, idx) => (
                <img
                  key={idx}
                  src={src}
                  alt={alt}
                  className="w-32 h-32 sm:w-40 sm:h-40 object-contain rounded cursor-pointer transition-transform duration-300 ease-in-out shake-hover"
                  title={alt}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EducationCard;









