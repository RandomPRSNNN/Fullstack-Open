import { test, expect } from '@playwright/test'
import { loginWith, createBlog } from './helper'

test.describe('Blog app', () => {
    test.beforeEach(async ({ page, request }) => {
        await request.post('http://localhost:3003/api/testing/reset')

        await request.post('http://localhost:3003/api/users', {
            data: {
                name: 'Edwin James',
                username: 'blogTEST',
                password: '87654321'
            }
        })

        await request.post('http://localhost:3003/api/users', {
            data: {
                name: 'Mary Joe',
                username: 'removerUser',
                password: '12345678'
            }
        })

        await page.goto('http://localhost:5173')
    })

    test('Login form is shown', async ({ page }) => {
        await expect(page.getByRole('textbox', { name: 'username' })).toBeVisible()
        await expect(page.getByRole('textbox', { name: 'password' })).toBeVisible()
        await expect(page.getByRole('button', { name: 'Login' })).toBeVisible()
    })

    test.describe('Login', () => {
        test('succeeds with correct credentials', async ({ page }) => {
            loginWith(page, 'blogTEST', '87654321')

            await expect(page.getByText('Edwin James is logged in')).toBeVisible()
        })

        test('fails with wrong credentials', async ({ page }) => {
            loginWith(page, 'blogTest', 'WRONG')

            await expect(page.getByText('invalid username or password')).toBeVisible()
        })
    })
    test.describe('When logged in', () => {
        test.beforeEach(async ({ page }) => {
            loginWith(page, 'blogTEST', '87654321')
        })

        test('a new blog can be created', async ({ page }) => {
            await createBlog(page,
                'Playwright created blog',
                'James Oliver',
                'ilovetesting.com')

            await createBlog(page,
                'Just another Blog TEST',
                'Mary Jones',
                'howtoeataburger.com')

            const targetBlog = page.locator('.blog').filter({ hasText: 'Playwright created blog by James Oliver' })

            await expect(targetBlog).toBeVisible()
            await expect(targetBlog.getByRole('button', { name: 'view' })).toBeVisible()
        })

        test('blog can be liked', async ({ page }) => {
            await createBlog(page,
                'Playwright created blog',
                'James Oliver',
                'ilovetesting.com')

            const targetBlog = page.locator('.blog').filter({ hasText: 'Playwright created blog by James Oliver' })
            await expect(targetBlog).toBeVisible()
            await targetBlog.getByRole('button', { name: 'view' }).click()
            await targetBlog.getByRole('button', { name: 'Like' }).click()

            await expect(page.locator('.likes-count')).toHaveText('1')
        })
        test('blog can be deleted', async ({ page }) => {
            await createBlog(page,
                'Playwright created blog',
                'James Oliver',
                'ilovetesting.com')

            const targetBlog = page.locator('.blog').filter({ hasText: 'Playwright created blog by James Oliver' })
            await expect(targetBlog).toBeVisible()
            await targetBlog.getByRole('button', { name: 'view' }).click()

            page.once('dialog', async (dialog) => { await dialog.accept() })
            await page.getByRole('button', { name: 'Remove' }).click()

            await expect(targetBlog).toBeHidden()
        })
        test('blog can be deleted by user who created it', async ({ page }) => {
            await createBlog(page,
                'Playwright created blog',
                'James Oliver',
                'ilovetesting.com')

            const targetBlog = page.locator('.blog').filter({ hasText: 'Playwright created blog by James Oliver' })
            await expect(targetBlog).toBeVisible()
            await targetBlog.getByRole('button', { name: 'view' }).click()

            await expect(page.locator('.removeButton')).toBeVisible()//remove button visible for user 1
            await page.getByRole('button', { name: 'Logout' }).click()
            await loginWith(page, 'removerUser', '12345678')

            await targetBlog.getByRole('button', { name: 'view' }).click()

            await expect(page.locator('.removeButton')).toBeHidden()
        })
        test('blogs sorted by likes', async ({ page }) => {
            await createBlog(page,
                'Playwright created blog',
                'James Oliver',
                'ilovetesting.com')

            const targetBlog = page.locator('.blog').filter({ hasText: 'Playwright created blog by James Oliver' })
            await expect(targetBlog).toBeVisible()
            await targetBlog.getByRole('button', { name: 'view' }).click()

            await targetBlog.getByRole('button', { name: 'Like' }).click()
            await expect(targetBlog.locator('.likes-count')).toHaveText('1')
            await targetBlog.getByRole('button', { name: 'Like' }).click()
            await expect(targetBlog.locator('.likes-count')).toHaveText('2')

            await page.getByRole('button', { name: 'Logout' }).click()

            await loginWith(page, 'removerUser', '12345678')
            await createBlog(page,
                'Second blog',
                'McDonald',
                'thisTestisCute.com')

            const secondBlog = page.locator('.blog').filter({ hasText: 'Second blog by McDonald' })
            await expect(secondBlog).toBeVisible()
            await secondBlog.getByRole('button', { name: 'view' }).click()

            await secondBlog.getByRole('button', { name: 'Like' }).click()
            await expect(secondBlog.locator('.likes-count')).toHaveText('1')

            await secondBlog.getByRole('button', { name: 'Like' }).click()
            await expect(secondBlog.locator('.likes-count')).toHaveText('2')

            await secondBlog.getByRole('button', { name: 'Like' }).click()
            await expect(secondBlog.locator('.likes-count')).toHaveText('3')
        })
    })
})