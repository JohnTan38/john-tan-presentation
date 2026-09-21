import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="not-found">
      <p>404</p>
      <h1>This page is not part of the application profile.</h1>
      <Link href="/">Return to John Tan’s profile</Link>
    </main>
  )
}
