import type { Metadata } from 'next';
import { PageTitle, FooterNav } from '@/components/Sections';
import { site } from '@/lib/site';

export const metadata: Metadata = { title: 'Privacy', description: 'How Mahanakorn uses the details you send us.', alternates: { canonical: '/privacy' } };

export default function PrivacyPage() {
  return (
    <>
      <PageTitle title="Privacy" sub="(short and plain)" />
      <section className="sec-sm">
        <div className="in" style={{ maxWidth: 760, display: 'flex', flexDirection: 'column', gap: 18, lineHeight: 1.7 }}>
          <p className="mut" style={{ fontSize: 13 }}>Draft: to be checked by a lawyer before the site goes live.</p>
          <h2 style={{ fontSize: 22, fontWeight: 600 }}>What we collect</h2>
          <p>When you use the &ldquo;Get a quote&rdquo; form we collect the details you type: your name, email, WhatsApp number and the event details you choose to share.</p>
          <h2 style={{ fontSize: 22, fontWeight: 600 }}>Why</h2>
          <p>Only to reply to you about catering and to prepare a menu or proposal. We do not sell or share your details with anyone else.</p>
          <h2 style={{ fontSize: 22, fontWeight: 600 }}>How long</h2>
          <p>We keep inquiries for up to 24 months (to confirm) and then delete them. You can ask us to delete your details at any time{site.email ? <> by emailing <span style={{ userSelect: 'all' }}>{site.email}</span></> : ''}.</p>
          <h2 style={{ fontSize: 22, fontWeight: 600 }}>Your rights</h2>
          <p>Under Thailand&apos;s Personal Data Protection Act (PDPA), and the GDPR if you are in the UK or EU, you can ask to see, correct or delete the personal data we hold about you.</p>
        </div>
      </section>
      <FooterNav />
    </>
  );
}
