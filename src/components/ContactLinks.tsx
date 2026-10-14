import { profile } from '../data/practicum'

export function ContactLinks({ context = 'hero' }: { readonly context?: 'hero' | 'footer' }) {
  return (
    <div className={`contact-links contact-links--${context}`}>
      <a className="button button--primary" href={`mailto:${profile.email}`} aria-label="Email John">
        Email John
      </a>
      <a
        className="button button--ghost"
        href={profile.resume}
        download="John_Tan_Resume_SWK512_Practicum.pdf"
        aria-label="Download resume"
      >
        Download resume (PDF)
      </a>
      <a className="text-link" href={`tel:${profile.phoneHref}`} aria-label="Call John">
        {profile.phoneDisplay}
      </a>
      <a className="text-link" href={profile.whatsappHref} target="_blank" rel="noreferrer" aria-label="Chat with John on WhatsApp">
        WhatsApp
      </a>
    </div>
  )
}
