import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="not-found">
      <p>404</p>
      <h1>This page is not part of the practicum profile.</h1>
      <Link href="/">Go to John Tan’s practicum profile</Link>
    </main>
  )
}
