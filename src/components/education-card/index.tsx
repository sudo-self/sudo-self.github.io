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

  const badges = [
    { src: 'https://github.com/sudo-self/sudo-self/assets/119916323/591566e1-cd9a-445c-9d0b-82ca60b4c37f', alt: 'Pull Shark' },
    { src: 'https://github.com/sudo-self/sudo-self/assets/119916323/9d692e82-ae9f-4703-9355-74a0e8bebbfe', alt: 'Quickdraw' },
    { src: 'https://github.com/sudo-self/sudo-self/assets/119916323/5c4f6626-7c67-4277-97a6-b67b77d08953', alt: 'Starstruck' },
    { src: 'https://github.com/sudo-self/sudo-self/assets/119916323/f135932f-d44f-4bb9-b72a-ac23219112bc', alt: 'Yolo' },
    { src: 'https://github.com/user-attachments/assets/4962670c-d88b-4bfd-8697-753044e16c33', alt: 'Dev Badge 3' },
    { src: 'https://github.com/user-attachments/assets/3aa8db8c-ec26-4248-85a2-a147c1b74e06', alt: 'Dev Badge 2' },
    { src: 'https://github.com/user-attachments/assets/a3a9c3b1-4389-4ccb-a6d7-c48ef81ea222', alt: 'Dev Badge 1' },
    { src: 'https://pub-c1de1cb456e74d6bbbee111ba9e6c757.r2.dev/Android%20studio.svg', alt: 'Android Studio' },
    { src: 'https://pub-c1de1cb456e74d6bbbee111ba9e6c757.r2.dev/gdeveloper.svg', alt: 'GDE Badge' },
    { src: 'https://pub-c1de1cb456e74d6bbbee111ba9e6c757.r2.dev/firebase.svg', alt: 'Firebase Badge' },
    { src: 'https://pub-c1de1cb456e74d6bbbee111ba9e6c757.r2.dev/Image%205.png', alt: 'Dev Badge 7' },
    { src: 'https://pub-c1de1cb456e74d6bbbee111ba9e6c757.r2.dev/techplus.png', alt: 'Tech Plus' },
  ];

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
            <div className="flex-shrink-0 flex items-center justify-center md:justify-start mt-6 md:mt-0">
              <img
                src="/techplus.png"
                alt="Tech Plus Badge"
                className="w-36 h-auto rounded-lg shadow-lg border border-base-300"
              />
            </div>
          )}
        </div>
      </div>

      {/* Developer Badges */}
      {!loading && (
        <>
          <h2 className="text-center text-lg font-semibold mb-4 text-base-content opacity-80">
            Developer Badges
          </h2>
          <div className="flex justify-center">
            <div className="w-[480px] max-w-full">
              <div
                className="mockup-phone border-primary border-4 rounded-3xl shadow-lg"
                style={{ height: '720px' }}
              >
                <div className="mockup-phone-camera" />
                <div className="mockup-phone-display bg-base-300 p-6 flex flex-col h-full rounded-b-3xl">
                  <div className="grid grid-cols-3 gap-6 flex-grow overflow-y-auto mb-4">
                    {badges.map(({ src, alt }, idx) => (
                      <img
                        key={idx}
                        src={src}
                        alt={alt}
                        title={alt}
                        className="w-24 h-24 object-contain rounded-lg cursor-pointer hover:scale-105 shake-hover transition-transform duration-300"
                      />
                    ))}
                  </div>
                  <div className="dock bg-neutral text-neutral-content py-2 rounded-t-lg flex justify-around">
                    <button className="flex flex-col items-center text-xs hover:text-primary">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <polyline points="1 11 12 2 23 11" />
                        <path d="M5 13v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7" />
                      </svg>
                      Home
                    </button>
                    <button className="dock-active flex flex-col items-center text-xs text-primary">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <polyline points="3 14 9 14 9 17 15 17 15 14 21 14" />
                        <rect x="3" y="3" width="18" height="18" rx="2" />
                      </svg>
                      Inbox
                    </button>
                    <button className="flex flex-col items-center text-xs hover:text-primary">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="3" />
                        <path d="M22 13.25v-2.5l-2.318-.966a8.96 8.96 0 0 0-.682-1.654l.954-2.318-1.768-1.768-2.318.954a8.96 8.96 0 0 0-1.654-.682L13.25 2h-2.5l-.966 2.318a8.96 8.96 0 0 0-1.654.682l-2.318-.954L4.044 5.818l.954 2.318a8.96 8.96 0 0 0-.682 1.654L2 10.75v2.5l2.318.966a8.96 8.96 0 0 0 .682 1.654l-.954 2.318 1.768 1.768 2.318-.954a8.96 8.96 0 0 0 1.654.682l.966 2.318h2.5l.966-2.318a8.96 8.96 0 0 0 1.654-.682l2.318.954 1.768-1.768-.954-2.318a8.96 8.96 0 0 0 .682-1.654L22 13.25z" />
                      </svg>
                      Settings
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default EducationCard;

















