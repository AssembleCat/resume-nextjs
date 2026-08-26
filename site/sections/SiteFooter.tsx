import { IProfile } from '../../component/profile/IProfile';

export function SiteFooter({ profile }: { profile: IProfile.Payload }) {
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-8 md:flex-row md:items-center md:justify-between">
        <p className="font-display text-sm">{profile.name.title} · Backend Engineer</p>
        <p className="text-xs text-zinc-500">
          Motion-inspired layout · payload 데이터 기반
        </p>
      </div>
    </footer>
  );
}
