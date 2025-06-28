import { Fragment } from 'react';
import {
  AiFillGithub,
  AiFillInstagram,
  AiFillMediumSquare,
} from 'react-icons/ai';
import { CgDribbble } from 'react-icons/cg';
import {
  FaBehanceSquare,
  FaBuilding,
  FaDev,
  FaFacebook,
  FaGlobe,
  FaLinkedin,
  FaMastodon,
  FaReddit,
  FaSkype,
  FaStackOverflow,
  FaTelegram,
  FaYoutube,
} from 'react-icons/fa';
import { FaSquareThreads } from 'react-icons/fa6';
import { MdLocationOn } from 'react-icons/md';
import { RiMailFill, RiPhoneFill } from 'react-icons/ri';
import { SiResearchgate, SiX, SiUdemy } from 'react-icons/si';
import { Profile } from '../../interfaces/profile';
import {
  SanitizedGithub,
  SanitizedSocial,
} from '../../interfaces/sanitized-config';
import { skeleton } from '../../utils';

type Props = {
  profile: Profile | null;
  loading: boolean;
  social: SanitizedSocial;
  github: SanitizedGithub;
};

const isCompanyMention = (company: string): boolean => {
  return company.startsWith('@') && !company.includes(' ');
};

const companyLink = (company: string): string => {
  return `https://github.com/${company.substring(1)}`;
};

const getFormattedMastodonValue = (
  mastodonValue: string,
  isLink: boolean,
): string => {
  const [username, server] = mastodonValue.split('@');
  if (isLink) {
    return `https://${server}/@${username}`;
  } else {
    return `${username}@${server}`;
  }
};

const DetailsCard = ({ profile, loading, social, github }: Props) => {
  const renderSkeleton = () => (
    <div className="grid grid-cols-2 gap-y-2 gap-x-4 px-4 py-2">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="h-5 rounded bg-base-300 animate-pulse col-span-2"
        />
      ))}
    </div>
  );

  // Render label (icon + title) and value for each item
  const renderItem = (
    icon: React.ReactNode,
    title: string,
    value: React.ReactNode,
    link?: string,
  ) => (
    <>
      <div className="flex items-center gap-2 text-primary text-sm font-semibold select-none px-4">
        {icon}
        <span>{title}</span>
      </div>
      <div className="text-sm truncate px-4">
        {link ? (
          <a
            href={link}
            target="_blank"
            rel="noreferrer"
            className="text-primary hover:underline block"
            title={typeof value === 'string' ? value : undefined}
          >
            {value}
          </a>
        ) : (
          value
        )}
      </div>
    </>
  );

  const renderOrganizationValue = (value: string | React.ReactNode) => {
    if (typeof value !== 'string') return value;
    return value.split(' ').map((company, i) => {
      company = company.trim();
      if (!company) return null;
      if (isCompanyMention(company)) {
        return (
          <a
            href={companyLink(company)}
            target="_blank"
            rel="noreferrer"
            key={company + i}
            className="text-primary hover:underline mr-1 whitespace-nowrap"
          >
            {company}
          </a>
        );
      }
      return (
        <span key={company + i} className="mr-1 whitespace-nowrap">
          {company}
        </span>
      );
    });
  };

  if (loading || !profile) {
    return (
      <div className="card shadow-lg compact bg-base-100">
        {renderSkeleton()}
      </div>
    );
  }

  return (
    <div className="card shadow-lg compact bg-base-100">
      <div className="grid grid-cols-2 gap-y-2 gap-x-4 px-4 py-2 text-base-content text-opacity-80">
        {profile.location &&
          renderItem(<MdLocationOn />, 'Based in:', profile.location)}
        {profile.company &&
          renderItem(
            <FaBuilding />,
            'Organization:',
            renderOrganizationValue(profile.company),
            isCompanyMention(profile.company.trim())
              ? companyLink(profile.company.trim())
              : undefined,
          )}
        {renderItem(
          <AiFillGithub />,
          'GitHub:',
          github.username,
          `https://github.com/${github.username}`,
        )}
        {social.researchGate &&
          renderItem(
            <SiResearchgate />,
            'ResearchGate:',
            social.researchGate,
            `https://www.researchgate.net/profile/${social.researchGate}`,
          )}
        {social.x &&
          renderItem(
            <SiX />,
            'X:',
            social.x,
            `https://x.com/${social.x}`,
          )}
        {social.mastodon &&
          renderItem(
            <FaMastodon />,
            'Mastodon:',
            getFormattedMastodonValue(social.mastodon, false),
            getFormattedMastodonValue(social.mastodon, true),
          )}
        {social.linkedin &&
          renderItem(
            <FaLinkedin />,
            'LinkedIn:',
            social.linkedin,
            `https://www.linkedin.com/in/${social.linkedin}`,
          )}
        {social.dribbble &&
          renderItem(
            <CgDribbble />,
            'Dribbble:',
            social.dribbble,
            `https://dribbble.com/${social.dribbble}`,
          )}
        {social.behance &&
          renderItem(
            <FaBehanceSquare />,
            'Behance:',
            social.behance,
            `https://www.behance.net/${social.behance}`,
          )}
        {social.facebook &&
          renderItem(
            <FaFacebook />,
            'Facebook:',
            social.facebook,
            `https://www.facebook.com/${social.facebook}`,
          )}
        {social.instagram &&
          renderItem(
            <AiFillInstagram />,
            'Instagram:',
            social.instagram,
            `https://www.instagram.com/${social.instagram}`,
          )}
        {social.reddit &&
          renderItem(
            <FaReddit />,
            'Reddit:',
            social.reddit,
            `https://www.reddit.com/user/${social.reddit}`,
          )}
        {social.threads &&
          renderItem(
            <FaSquareThreads />,
            'Threads:',
            social.threads,
            `https://www.threads.net/@${social.threads.replace('@', '')}`,
          )}
        {social.youtube &&
          renderItem(
            <FaYoutube />,
            'YouTube:',
            `@${social.youtube}`,
            `https://www.youtube.com/@${social.youtube}`,
          )}
        {social.udemy &&
          renderItem(
            <SiUdemy />,
            'Udemy:',
            social.udemy,
            `https://www.udemy.com/user/${social.udemy}`,
          )}
        {social.medium &&
          renderItem(
            <AiFillMediumSquare />,
            'Medium:',
            social.medium,
            `https://medium.com/@${social.medium}`,
          )}
        {social.dev &&
          renderItem(
            <FaDev />,
            'Dev:',
            social.dev,
            `https://dev.to/${social.dev}`,
          )}
        {social.stackoverflow &&
          renderItem(
            <FaStackOverflow />,
            'Stack Overflow:',
            social.stackoverflow.split('/').slice(-1),
            `https://stackoverflow.com/users/${social.stackoverflow}`,
          )}
        {social.website &&
          renderItem(
            <FaGlobe />,
            'Website:',
            social.website.replace(/^https?:\/\//, ''),
            !social.website.startsWith('http')
              ? `http://${social.website}`
              : social.website,
          )}
        {social.skype &&
          renderItem(
            <FaSkype />,
            'Skype:',
            social.skype,
            `skype:${social.skype}?chat`,
          )}
        {social.telegram &&
          renderItem(
            <FaTelegram />,
            'Telegram:',
            social.telegram,
            `https://t.me/${social.telegram}`,
          )}
        {social.phone &&
          renderItem(
            <RiPhoneFill />,
            'Phone:',
            social.phone,
            `tel:${social.phone}`,
          )}
        {social.email &&
          renderItem(
            <RiMailFill />,
            'Email:',
            social.email,
            `mailto:${social.email}`,
          )}
      </div>
    </div>
  );
};

export default DetailsCard;


