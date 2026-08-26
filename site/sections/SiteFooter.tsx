import { IProfile } from '../../component/profile/IProfile';

export function SiteFooter({ profile }: { profile: IProfile.Payload }) {
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto max-w-6xl px-5 py-8">
        <p className="font-display text-sm">{profile.name.title} · Backend Engineer</p>
      </div>
    </footer>
  );
}
