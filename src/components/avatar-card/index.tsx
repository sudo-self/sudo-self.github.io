import { useState, Suspense } from 'react';
import { FALLBACK_IMAGE } from '../../constants';
import { Profile } from '../../interfaces/profile';
import { skeleton } from '../../utils';
import AudioPlayer from 'react-h5-audio-player';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import 'react-h5-audio-player/lib/styles.css';

interface AvatarCardProps {
  profile: Profile | null;
  loading: boolean;
  avatarRing: boolean;
  resumeFileUrl?: string;
}

const Equalizer: React.FC<{ isActive?: boolean }> = ({ isActive = true }) => {
  return (
    <div className="flex items-end space-x-1 w-16 h-10 mx-auto mb-4">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className={`bg-primary rounded-sm w-2 ${
            isActive ? `animate-equalizer-delay${i}` : 'h-1'
          }`}
          style={{
            animationDuration: '1s',
            animationTimingFunction: 'ease-in-out',
            animationIterationCount: 'infinite',
            animationDirection: 'alternate',
          }}
        />
      ))}
      <style jsx>{`
        .animate-equalizer-delay0 {
          animation-name: equalizer;
          animation-delay: 0s;
          height: 4px;
        }
        .animate-equalizer-delay1 {
          animation-name: equalizer;
          animation-delay: 0.2s;
          height: 6px;
        }
        .animate-equalizer-delay2 {
          animation-name: equalizer;
          animation-delay: 0.4s;
          height: 8px;
        }
        .animate-equalizer-delay3 {
          animation-name: equalizer;
          animation-delay: 0.6s;
          height: 5px;
        }
        .animate-equalizer-delay4 {
          animation-name: equalizer;
          animation-delay: 0.8s;
          height: 7px;
        }

        @keyframes equalizer {
          0% {
            height: 4px;
          }
          50% {
            height: 20px;
          }
          100% {
            height: 4px;
          }
        }
      `}</style>
    </div>
  );
};

// Component to load and display firebase.glb
const FirebaseAvatar = () => {
  const gltf = useGLTF('/firebase.glb', true);
  return <primitive object={gltf.scene} scale={1.5} />;
};

const AvatarCard: React.FC<AvatarCardProps> = ({
  profile,
  loading,
  avatarRing,
}): JSX.Element => {
  const [currentTrack, setCurrentTrack] = useState<'No_Magician' | 'TheStrokes'>('No_Magician');
  const [isPlaying, setIsPlaying] = useState(false);

  const tracks = {
    No_Magician: '/Vincent - Im No Magician.mp3',
    TheStrokes: '/TheStrokes.mp3',
  };

  const albumArts = {
    No_Magician: '/art1.png',
    TheStrokes: '/art2.png',
  };

  return (
    <div className="card shadow-lg compact bg-base-100">
      <div className="grid place-items-center py-8">
        {/* Top GIFs */}
        <div className="flex gap-3 mb-4">
          <img
            src="https://user-images.githubusercontent.com/65187002/144930161-2f783401-8d27-4fdf-a2f7-cc0ba32f1f1f.gif"
            width="80"
            alt="GIF 1"
            className="rounded"
          />
          <img
            src="https://user-images.githubusercontent.com/65187002/144930161-2f783401-8d27-4fdf-a2f7-cc0ba32f1f1f.gif"
            width="80"
            alt="GIF 2"
            className="rounded"
          />
        </div>

        {/* Avatar with firebase.glb */}
        <div
          className={`avatar opacity-90 mb-8 rounded-full w-32 h-32 ${
            avatarRing ? 'ring ring-primary ring-offset-base-100 ring-offset-2' : ''
          }`}
        >
          <Canvas className="rounded-full" camera={{ position: [0, 0, 5], fov: 35 }}>
            <ambientLight intensity={0.6} />
            <directionalLight position={[0, 5, 5]} intensity={1} />
            <Suspense fallback={null}>
              <FirebaseAvatar />
            </Suspense>
            <OrbitControls enableZoom={false} autoRotate />
          </Canvas>
        </div>

        {/* Name & Bio */}
        <div className="text-center mx-auto px-8">
          <h5 className="font-bold text-2xl">
            {loading || !profile ? (
              skeleton({ widthCls: 'w-48', heightCls: 'h-8' })
            ) : (
              <span className="text-base-content opacity-70">{profile.name}</span>
            )}
          </h5>
          <div className="mt-3 text-base-content text-opacity-60 font-mono">
            {loading || !profile
              ? skeleton({ widthCls: 'w-48', heightCls: 'h-5' })
              : profile.bio}
          </div>
        </div>

        {/* Equalizer */}
        {!loading && <Equalizer isActive={isPlaying} />}

        {/* Audio Player Section */}
        {!loading && (
          <div className="mt-2 w-full max-w-md px-4 space-y-4">
            <div className="flex justify-center gap-4">
              {(['No_Magician', 'TheStrokes'] as const).map((track) => (
                <button
                  key={track}
                  onClick={() => setCurrentTrack(track)}
                  className={`btn btn-sm ${
                    currentTrack === track ? 'btn-primary' : 'btn-outline'
                  }`}
                >
                  {track.replace('_', ' ')}
                </button>
              ))}
            </div>

            <div className="flex justify-center mb-2">
              <img
                src={albumArts[currentTrack]}
                alt={`${currentTrack} album art`}
                className="w-48 h-48 rounded-xl shadow-lg object-cover"
              />
            </div>

            <div className="bg-base-200 border border-base-300 p-4 rounded-xl shadow-lg flex items-center justify-center">
              <AudioPlayer
                src={tracks[currentTrack]}
                showJumpControls={false}
                autoPlayAfterSrcChange={true}
                style={{
                  borderRadius: '0.75rem',
                  background: 'transparent',
                  boxShadow: 'none',
                  width: '100%',
                  maxWidth: '400px',
                }}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onEnded={() => setIsPlaying(false)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AvatarCard;




