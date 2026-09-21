import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach, vi } from 'vitest'

vi.mock('next/font/google', () => ({
  Urbanist: () => ({ className: 'font-urbanist', variable: 'font-urbanist-variable' }),
  Edu_QLD_Beginner: () => ({ className: 'font-edu', variable: 'font-edu-variable' }),
}))

class IntersectionObserverMock implements IntersectionObserver {
  readonly root = null
  readonly rootMargin = '0px'
  readonly scrollMargin = '0px'
  readonly thresholds = [0]

  disconnect() {}
  observe() {}
  takeRecords(): IntersectionObserverEntry[] { return [] }
  unobserve() {}
}

window.IntersectionObserver = IntersectionObserverMock
globalThis.IntersectionObserver = IntersectionObserverMock

afterEach(cleanup)
