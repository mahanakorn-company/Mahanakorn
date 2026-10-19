import type { Metadata } from 'next';
import { PageTitle, FooterNav } from '@/components/Sections';
import { site } from '@/lib/site';
import { photoCredits } from '@/lib/content';

export const metadata: Metadata = { title: 'Privacy', description: 'How Mahanakorn uses the details you send us, and credits for photos we did not take.', alternates: { canonical: '/privacy' } };

export default function PrivacyPage() {
  return (
    <>
      <PageTitle title="Privacy" sub="(short and plain)" />
      <section className="sec-sm">
        <div className="in" style={{ maxWidth: 760, display: 'flex', flexDirection: 'column', gap: 18, lineHeight: 1.7 }}>
          <p className="mut" style={{ fontSize: 13 }}>Draft: to be checked by a lawyer before the site goes live.</p>
          <h2 style={{ fontSize: 22, fontWeight: 600 }}>What we collect</h2>
          <p>When you use the &ldquo;Get a quote&rdquo; or planner pack forms we collect the details you type: your name, email, WhatsApp number and the wedding details you choose to share.</p>
          <h2 style={{ fontSize: 22, fontWeight: 600 }}>Why</h2>
          <p>Only to reply to you about catering and to prepare a menu or proposal. We do not sell or share your details with anyone else.</p>
          <h2 style={{ fontSize: 22, fontWeight: 600 }}>How long</h2>
          <p>We keep inquiries for up to 24 months (to confirm) and then delete them. You can ask us to delete your details at any time{site.email ? <> by emailing <span style={{ userSelect: 'all' }}>{site.email}</span></> : ''}.</p>
          <h2 style={{ fontSize: 22, fontWeight: 600 }}>Your rights</h2>
          <p>Under Thailand&apos;s Personal Data Protection Act (PDPA), and the GDPR if you are in the UK or EU, you can ask to see, correct or delete the personal data we hold about you.</p>
          <h2 id="credits" style={{ fontSize: 22, fontWeight: 600, scrollMarginTop: 96 }}>Photo credits</h2>
          <p>Most photos on this site are our own. These ones come from Wikimedia Commons and were resized for the web:</p>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: 6, paddingLeft: 18, listStyle: 'disc' }}>
            {photoCredits.map((c) => (
              <li key={c.what}>
                {c.what}: photo by {c.author}, <a href={c.source} target="_blank" rel="noopener noreferrer">source</a>, licence{' '}
                <a href={c.licenceUrl} target="_blank" rel="noopener noreferrer">{c.licence}</a>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <FooterNav />
    </>
  );
}
