import nodemailer from 'nodemailer';

/** Sends an email alert for each new lead when SMTP is configured; otherwise logs a summary. */
export function createNotifier(smtp, logger = console) {
  const enabled = Boolean(smtp.host && smtp.to);
  const transport = enabled
    ? nodemailer.createTransport({
        host: smtp.host,
        port: smtp.port,
        secure: smtp.secure,
        auth: smtp.user ? { user: smtp.user, pass: smtp.pass } : undefined
      })
    : null;

  return async function notify(subject, lines) {
    const body = lines.filter(Boolean).join('\n');
    if (!transport) {
      logger.info(`[lead] ${subject}\n${body}`);
      return { sent: false };
    }
    try {
      await transport.sendMail({ from: smtp.from, to: smtp.to, subject, text: body });
      return { sent: true };
    } catch (err) {
      // A failed email must never lose the lead: it is already stored.
      logger.error('[lead] email alert failed:', err.message);
      return { sent: false, error: err.message };
    }
  };
}
