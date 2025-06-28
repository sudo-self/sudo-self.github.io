import { useEffect, useState } from 'react';
import { skeleton } from '../../utils';

const languageData = [
  { name: 'JavaScript', percent: 57.51, color: 'bg-yellow-400' },
  { name: 'HTML', percent: 22.49, color: 'bg-red-400' },
  { name: 'CSS', percent: 11.22, color: 'bg-blue-400' },
  { name: 'TypeScript', percent: 4.94, color: 'bg-cyan-400' },
  { name: 'PHP', percent: 3.84, color: 'bg-purple-400' },
];

const SkillCard = ({ loading }: { loading: boolean }) => {
  const username = 'sudo-self';
  const [totalStars, setTotalStars] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (loading) return;

    const fetchStars = async () => {
      try {
        let page = 1;
        let starsCount = 0;
        let keepFetching = true;

        while (keepFetching) {
          const res = await fetch(
            `https://api.github.com/users/${username}/repos?per_page=100&page=${page}`
          );
          if (!res.ok) {
            setError('Failed to fetch GitHub repos');
            return;
          }
          const repos = await res.json();

          if (repos.length === 0) {
            keepFetching = false;
            break;
          }

          starsCount += repos.reduce(
            (acc: number, repo: any) => acc + repo.stargazers_count,
            0
          );
          page++;
        }

        setTotalStars(starsCount);
      } catch (e) {
        setError('Error fetching GitHub stars');
      }
    };

    fetchStars();
  }, [loading, username]);

  return (
    <div className="card shadow-lg compact bg-base-100">
      <div className="card-body space-y-6">
        {/* Total Stars Badge */}
        <div className="mx-3 text-center">
          {loading ? (
            skeleton({ widthCls: 'w-32', heightCls: 'h-8' })
          ) : error ? (
            <div className="text-sm text-error">{error}</div>
          ) : totalStars !== null ? (
            <div className="badge badge-primary text-lg px-6 py-3">
              ⭐ {totalStars.toLocaleString()}
            </div>
          ) : null}
        </div>

        {/* Most Used Languages Progress */}
        <div className="px-4">
          <h2 className="text-base font-semibold text-center text-base-content opacity-70 mb-2">
            Most Used Languages
          </h2>

          {loading
            ? Array.from({ length: 5 }, (_, i) => (
                <div key={i} className="mb-4">
                  {skeleton({
                    widthCls: 'w-8/12',
                    heightCls: 'h-4',
                    className: 'mb-2',
                  })}
                  {skeleton({ widthCls: 'w-full', heightCls: 'h-4' })}
                </div>
              ))
            : languageData.map(({ name, percent, color }) => (
                <div key={name} className="mb-4">
                  <div className="flex justify-between text-sm text-base-content mb-1">
                    <span>{name}</span>
                    <span className="opacity-60">{percent.toFixed(2)}%</span>
                  </div>
                  <progress
                    className={`progress ${color} w-full h-4`}
                    value={percent}
                    max={100}
                  />
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default SkillCard;








