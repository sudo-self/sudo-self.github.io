import { skeleton } from '../../utils';

const SkillCard = ({
  loading,
}: {
  loading: boolean;
}) => {
  const username = 'sudo-self';

  return (
    <div className="card shadow-lg compact bg-base-100">
      <div className="card-body">
        {/* Header with centered profile‑views badge */}
        <div className="mx-3">
          <h5 className="card-title flex justify-center">
            {loading ? (
              skeleton({ widthCls: 'w-32', heightCls: 'h-8' })
            ) : (
              <img
                src={`https://komarev.com/ghpvc/?username=${username}&style=flat-square&color=blue`}
                alt="Profile Views Counter"
                className="h-6"
              />
            )}
          </h5>
        </div>

        {/* Top languages chart with blue-green theme */}
        <div className="p-3 flex justify-center">
          {loading ? (
            skeleton({ widthCls: 'w-64', heightCls: 'h-32' })
          ) : (
            <img
              src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${username}&theme=blue-green`}
              alt="Top Languages"
              className="rounded-lg"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SkillCard;




