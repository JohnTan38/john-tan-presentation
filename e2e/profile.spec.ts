import { expect, test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
})

test('renders the complete recruiter story without runtime errors', async ({ page }, testInfo) => {
  const errors: string[] = []
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text())
  })
  page.on('pageerror', (error) => errors.push(error.message))

  await page.goto('/')
  await expect(page).toHaveTitle(/John Tan \| Selarang Halfway House Case Manager/)
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(
    'Guiding Reintegration with Empathy, Structure, and Purpose.',
  )
  await expect(
    page.getByAltText('Yellow Ribbon Singapore - Selarang Halfway House logo'),
  ).toBeVisible()

  // Key sections verification
  await expect(page.getByRole('region', { name: 'Evidence for High-Impact Case Management' })).toBeVisible()
  await expect(page.getByRole('region', { name: '10-Point Selarang Job Scope Alignment' })).toBeVisible()
  await expect(page.getByRole('region', { name: 'A 5-Stage Pathway from Admission to Sustainable Desistance' })).toBeVisible()
  await expect(page.getByRole('region', { name: 'Selarang Case Vignette: Workplace Crisis & Relapse Intervention' })).toBeVisible()
  await expect(page.getByRole('region', { name: 'Beyond Second Chances: Rebuilding Lives and Restoring Hope' })).toBeVisible()

  // Test interactive Job Alignment Matrix
  await page.locator('#alignment').scrollIntoViewIfNeeded()
  await expect(page.locator('#alignment')).toBeInViewport()
  await expect(page.getByText('Rehabilitation & Reintegration Programme Delivery')).toBeVisible()
  const collapseAllBtn = page.getByRole('button', { name: 'Collapse All' })
  await collapseAllBtn.click()
  const expandAllBtn = page.getByRole('button', { name: 'Expand All' })
  await expandAllBtn.click()

  // Test interactive Case Vignette tabs
  await page.locator('#vignette').scrollIntoViewIfNeeded()
  await expect(page.locator('#vignette')).toBeInViewport()
  await page.getByRole('tab', { name: '3. The Outcome' }).click()
  await expect(page.getByText('100%')).toBeVisible()
  await expect(page.getByText('Employment Retention')).toBeVisible()

  // Test interactive Evidence Finder
  await page.locator('#evidence').scrollIntoViewIfNeeded()
  await expect(page.locator('#evidence')).toBeInViewport()
  await page.locator('#evidence').getByRole('button', { name: 'Statutory & Records' }).click()
  await page.getByPlaceholder(/try suss, cbp/i).fill('attendance')
  await expect(page.getByRole('status')).toHaveText('1 piece of evidence')
  await expect(page.getByRole('heading', { name: 'Attendance & Progress Reporting' })).toBeVisible()

  // Check no horizontal overflow
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true)
  expect(errors).toEqual([])

  await page.evaluate(() => window.scrollTo(0, 0))
  await expect(page.getByRole('heading', { level: 1 })).toBeInViewport()
  await page.screenshot({ path: `output/playwright/${testInfo.project.name}-profile.png`, fullPage: true })
})

test('supports responsive navigation and keyboard dismissal', async ({ page, isMobile }) => {
  await page.goto('/')
  if (isMobile) {
    const menu = page.getByRole('button', { name: 'Open navigation' })
    await expect(menu).toBeVisible()
    await menu.click()
    await expect(page.getByRole('navigation', { name: 'Mobile navigation' })).toBeVisible()
    await page.keyboard.press('Escape')
    await expect(page.getByRole('navigation', { name: 'Mobile navigation' })).toBeHidden()
  } else {
    const navigation = page.getByRole('navigation', { name: 'Primary navigation' })
    await expect(navigation).toBeVisible()
    await navigation.getByRole('link', { name: 'Job Alignment' }).click()
    await expect(page.locator('#alignment')).toBeInViewport()
  }
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true)
})

test('serves deployment metadata and all public application assets', async ({ request }) => {
  const assets = [
    ['/brand/yellow-ribbon-logo.svg', 'image/svg+xml'],
    ['/opengraph-image', 'image/png'],
    ['/docs/John_Tan_Resume_Case_Manager_Selarang_Halfway_House.pdf', 'application/pdf'],
    ['/docs/John_Tan_Cover_Letter_Case_Manager_Selarang_Halfway_House.pdf', 'application/pdf'],
    ['/images/john-tan-tech-social.png', 'image/png'],
    ['/robots.txt', 'text/plain'],
    ['/sitemap.xml', 'application/xml'],
  ] as const

  for (const [path, contentType] of assets) {
    const response = await request.get(path)
    expect(response.ok(), `${path} should return 2xx`).toBe(true)
    expect(response.headers()['content-type']).toContain(contentType)
    expect((await response.body()).byteLength, `${path} should not be empty`).toBeGreaterThan(20)
  }

  const home = await request.get('/')
  expect(home.headers()['x-content-type-options']).toBe('nosniff')
  expect(home.headers()['x-frame-options']).toBe('DENY')
  expect(home.headers()['referrer-policy']).toBe('strict-origin-when-cross-origin')
})

test('has no horizontal overflow at every required breakpoint', async ({ page }, testInfo) => {
  const widths = testInfo.project.name === 'desktop-chromium' ? [320, 390, 768, 1024, 1440] : [390]

  for (const width of widths) {
    await page.setViewportSize({ width, height: width < 700 ? 844 : 1000 })
    await page.goto('/')
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth),
      `${width}px viewport should not overflow`,
    ).toBe(true)
  }
})
