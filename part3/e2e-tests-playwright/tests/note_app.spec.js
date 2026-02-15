const { test, expect, describe } = require('@playwright/test')

describe('Note app', () => {
  test('front page can be opened', async ({ page }) => {
    await page.goto('http://localhost:5173')
    
    const locater = page.getByText('Notes')
    await expect(locater).toBeVisible()
    await expect(page.getByText('Note app, Department of Computer Science, University of Helsinki 2025')).toBeVisible() 
  })

  test('user can log in', async ({ page }) => {
    await page.goto('http://localhost:5173')

    await page.getByRole('button', { name: 'login' }).click()
    await page.getByLabel('username').fill('joel_miller')
    await page.getByLabel('password').fill('i love golf')
    await page.getByRole('button', { name: 'login' }).click()

    await expect(page.getByText('Joel Miller logged in')).toBeVisible()
  })
})