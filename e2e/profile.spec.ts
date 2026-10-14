import { expect, test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
})

test('renders the practicum profile without runtime errors', async ({ page }, testInfo) => {
  const errors: string[] = []
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text())
  })
  page.on('pageerror', (error) => errors.push(error.message))

  await page.goto('/')
  await expect(page).toHaveTitle(/John Tan \| SUSS Social Work Practicum Candidate/)
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(/400-hour practicum/)

  await page.getByRole('button', { name: 'Week 19, phase 2, submission due' }).click()
  await expect(page.locator('.hours__detail')).toContainText('Mid-practicum evaluation (A6)')

  await page.locator('#competencies').getByRole('tab', { name: /Policy practice/ }).click()
  await expect(page.getByRole('tabpanel')).toContainText('Policy brief')

  for (const name of [
    'Six competencies, one learning objective each',
    'How the work assignments build each competency',
    'Submission schedule across four phases',
    'Evaluation plan',
    'Supervision plan and shared responsibilities',
  ]) {
    await expect(page.getByRole('region', { name })).toBeAttached()
  }

  expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true)
  expect(errors).toEqual([])
  await page.screenshot({ path: `output/playwright/${testInfo.project.name}-profile.png`, fullPage: true })
})

test('supports responsive navigation and keyboard dismissal', async ({ page, isMobile }) => {
  await page.goto('/')
  if (isMobile) {
    await page.getByRole('button', { name: 'Open navigation' }).click()
    await expect(page.getByRole('navigation', { name: 'Mobile navigation' })).toBeVisible()
    await page.keyboard.press('Escape')
    await expect(page.getByRole('navigation', { name: 'Mobile navigation' })).toBeHidden()
  } else {
    await page.getByRole('navigation', { name: 'Primary navigation' }).getByRole('link', { name: 'Schedule' }).click()
    await expect(page.locator('#schedule')).toBeInViewport()
  }
})

test('serves metadata and the practicum resume', async ({ request }) => {
  for (const [path, contentType] of [
    ['/opengraph-image', 'image/png'],
    ['/docs/John_Tan_Resume_SWK512_Practicum.pdf', 'application/pdf'],
    ['/robots.txt', 'text/plain'],
    ['/sitemap.xml', 'application/xml'],
  ] as const) {
    const response = await request.get(path)
    expect(response.ok(), `${path} should return 2xx`).toBe(true)
    expect(response.headers()['content-type']).toContain(contentType)
  }
  const home = await request.get('/')
  expect(home.headers()['x-frame-options']).toBe('DENY')
})

test('has no horizontal overflow at every breakpoint', async ({ page }, testInfo) => {
  const widths = testInfo.project.name === 'desktop-chromium' ? [320, 390, 768, 1024, 1440] : [390]
  for (const width of widths) {
    await page.setViewportSize({ width, height: width < 700 ? 844 : 1000 })
    await page.goto('/')
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth),
      `${width}px viewport should not overflow`,
    ).toBe(true)
  }
})
