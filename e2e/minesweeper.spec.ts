import { expect, test } from '@playwright/test'

test.describe('Minesweeper', () => {
  test('board renders, flagging works, restart resets', async ({ page }) => {
    await page.goto('/')

    const cells = page.locator('.cell')
    await expect(cells).toHaveCount(81)

    const flagCounter = page.locator('.controls__counter').first()
    await expect(flagCounter).toHaveText('009')

    await cells.nth(0).click({ button: 'right' })

    await expect(flagCounter).toHaveText('008')
    await expect(cells.nth(0).locator('img')).toBeVisible()

    await cells.nth(1).click()

    await expect(cells.nth(1)).toHaveClass(/cell--open/)

    await expect(cells.nth(0).locator('img')).toBeVisible()

    await page.locator('.controls__restart-button').click()
    await expect(flagCounter).toHaveText('009')
    await expect(cells.nth(0).locator('img')).not.toBeVisible()
    await expect(cells.nth(1)).not.toHaveClass(/cell--open/)
  })
})
