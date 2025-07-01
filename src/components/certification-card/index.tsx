import React from 'react';

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
  { src: 'https://bucket.jessejesse.com/avatar.svg', alt: 'Tech Plus' },
];

const CertificationCard = ({ loading }: { loading: boolean }) => {
  return (
    <div className="card shadow-xl bg-base-100">
      <div className="card-body">
        <h2 className="text-lg font-bold mb-4 text-base-content text-center">
          Developer Badges
        </h2>
        {loading ? (
          <p className="text-center text-base-content opacity-50">Loading badges...</p>
        ) : (
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6 justify-center">
            {badges.map(({ src, alt }, i) => (
              <img
                key={i}
                src={src}
                alt={alt}
                title={alt}
                className="w-24 h-24 object-contain cursor-pointer hover:scale-105 transition-transform duration-300"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CertificationCard;






