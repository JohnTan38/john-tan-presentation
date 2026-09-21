import { profile } from '../data/profile'

const ArrowIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 16 16" width="16" height="16">
    <path d="M4 12 12 4M6 4h6v6" fill="none" stroke="currentColor" strokeWidth="1.5" />
  </svg>
)

const WhatsAppIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 16 16" width="16" height="16" fill="currentColor">
    <path d="M13.6 2.4A7.9 7.9 0 0 0 8 0C3.6 0 0 3.6 0 8c0 1.4.4 2.8 1.1 4L0 16l4.2-1.1c1.2.6 2.5 1 3.8 1h.1c4.4 0 8-3.6 8-8 0-2.1-.8-4.2-2.5-5.5zM8 14.6c-1.2 0-2.4-.3-3.4-.9l-.2-.1-2.5.7.7-2.5-.2-.3c-.7-1-1-2.3-1-3.5 0-3.7 3-6.6 6.6-6.6 1.8 0 3.4.7 4.7 1.9 1.2 1.3 1.9 2.9 1.9 4.7 0 3.6-3 6.6-6.6 6.6zm3.6-4.9c-.2-.1-1.2-.6-1.4-.7-.2-.1-.3-.1-.5.1-.1.2-.5.7-.7.8-.1.1-.3.2-.5.1-.2-.1-.9-.3-1.7-1-.6-.6-1.1-1.3-1.2-1.5-.1-.2 0-.3.1-.4.1-.1.2-.2.3-.4.1-.1.1-.2.2-.3 0-.1 0-.2-.1-.3s-.5-1.2-.7-1.7c-.2-.4-.4-.4-.5-.4h-.4c-.2 0-.4.1-.6.3-.2.2-.8.8-.8 2 0 1.2.8 2.3.9 2.5.1.2 1.7 2.6 4.1 3.6.6.2 1 .4 1.4.5.6.2 1.1.2 1.5.1.5-.1 1.2-.5 1.4-1 .2-.5.2-1 .1-1.1-.1-.1-.2-.2-.4-.3z"/>
  </svg>
)

export function ContactLinks({ context = 'hero' }: { readonly context?: 'hero' | 'footer' }) {
  const prefix = context === 'footer' ? 'contact' : 'hero'

  return (
    <div className={`contact-links contact-links--${prefix}`}>
      <a className="button button--primary" href={`mailto:${profile.email}`} aria-label="Email John">
        Start a conversation <ArrowIcon />
      </a>
      <a className="text-link" href={`tel:${profile.phoneHref}`} aria-label="Call John">
        {profile.phoneDisplay}
      </a>
      <a
        className="text-link text-link--whatsapp"
        href={profile.whatsappHref}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat with John on WhatsApp"
      >
        <WhatsAppIcon /> WhatsApp
      </a>
      <a
        className="text-link text-link--document"
        href={profile.resume}
        download="John_Tan_Resume_Case_Manager_Selarang_Halfway_House.pdf"
        aria-label="Download resume"
      >
        Resume PDF <ArrowIcon />
      </a>
      <a
        className="text-link text-link--document"
        href={profile.coverLetter}
        download="John_Tan_Cover_Letter_Case_Manager_Selarang_Halfway_House.pdf"
        aria-label="Download cover letter"
      >
        Cover Letter PDF <ArrowIcon />
      </a>
    </div>
  )
}
