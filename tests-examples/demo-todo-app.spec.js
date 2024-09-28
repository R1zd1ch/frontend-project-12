// @ts-check
/* eslint-disable no-useless-escape */

import { test, expect } from '@playwright/test'

const registeredUser = {
	login: 'admin',
	password: 'admin',
}

const newUser = {
	login: 'user2',
	password: 'password',
}

test.beforeEach(async ({ page }) => {
	await page.goto('http://localhost:3000')
	await page.waitForTimeout(300)

	await page.locator('text=Hexlet Chat').first().click()
})

test.describe('registration', () => {
	test('handle new user creation', async ({ page }) => {
		await page.locator('text=Регистрация').first().click()
		await page.waitForURL('**/signup')
		await page.locator('text=Имя пользователя').first().type(newUser.login)
		await page.locator('text=/^Пароль$/').first().type(newUser.password)
		await page.locator('text=Подтвердите пароль').first().type(newUser.password)
		await page.locator('button[type="submit"]').first().click()
		await page.waitForURL('**/')
		await expect(
			await page.getByRole('button', { name: 'general' })
		).not.toHaveCount(0)
	})

	test('no duplicated users created', async ({ page }) => {
		await page.locator('text=Регистрация').first().click()
		await page.waitForURL('**/signup')
		await page.locator('text=Имя пользователя').first().type(newUser.login)
		await page.locator('text=/^Пароль$/').first().type(newUser.password)
		await page.locator('text=Подтвердите пароль').first().type(newUser.password)
		await page.locator('button[type="submit"]').first().click()
		await page.waitForURL('**/')
		await expect(
			await page.locator('text=Такой пользователь уже существует')
		).not.toHaveCount(0)
	})

	test('handle validation', async ({ page }) => {
		await page.locator('text=Регистрация').first().click()
		await page.waitForURL('**/signup')

		await page.locator('text=Имя пользователя').first().type('u')
		await page.locator('text=/^Пароль$/').first().type('pass')
		await page.locator('text=Подтвердите пароль').first().type('passw')
		await page.locator('button[type="submit"]').first().click()
		await expect(await page.locator('text=От 3 до 20 символов')).toHaveCount(1)
		await expect(await page.locator('text=Не менее 6 символов')).toHaveCount(1)
		await expect(
			await page.locator('text=Пароли должны совпадать')
		).toHaveCount(1)
	})
})

test.describe('auth', () => {
	test('login page on enter as guest', async ({ page }) => {
		await expect(await page.locator('text=Ваш ник')).toHaveCount(1)
		await expect(await page.locator('text=/^Пароль$/')).toHaveCount(1)
	})

	test('successful login', async ({ page }) => {
		await page.locator('text=Ваш ник').first().type(registeredUser.login)
		await page.locator('text=/^Пароль$/').first().type(registeredUser.password)
		await page.locator('button[type="submit"]').first().click()

		await expect(
			await page.locator('text=Неверные имя пользователя или пароль')
		).toHaveCount(0)
	})

	test('handle login error', async ({ page }) => {
		await page.locator('text=Ваш ник').first().type('guest')
		await page.locator('text=/^Пароль$/').first().type('pass')
		await page.locator('button[type="submit"]').first().click()

		await expect(
			await page.locator('text=Неверные имя пользователя или пароль')
		).toHaveCount(1)
	})
})

test.describe('chat', () => {
	test.beforeEach(async ({ page }) => {
		await page.locator('text=Ваш ник').first().type(registeredUser.login)
		await page.locator('text=/^Пароль$/').first().type(registeredUser.password)
		await page.locator('button[type="submit"]').first().click()
		await page.locator('[aria-label="Новое сообщение"]')
	})

	test('messaging', async ({ page }) => {
		await page.locator('[aria-label="Новое сообщение"]').first().type('hello')
		await page.keyboard.press('Enter')
		await expect(await page.locator('text=hello')).not.toHaveCount(0)
	})

	test('profanity filter', async ({ page }) => {
		const profanityText = 'you have nice boobs'
		await page
			.locator('[aria-label="Новое сообщение"]')
			.first()
			.type(profanityText)
		await page.keyboard.press('Enter')
		await expect(await page.locator(`text=${profanityText}`)).toHaveCount(0)
		await expect(
			await page.locator('text=you have nice *****')
		).not.toHaveCount(0)

		// проверка для имени канала
		await page.locator('text=+').first().click()
		await page.locator('text=Имя канала').first().type('boobs')
		await page.keyboard.press('Enter')

		await expect(
			await page.getByRole('button', { name: '*****' })
		).not.toHaveCount(0)
	})

	test('different channels', async ({ page }) => {
		await page
			.locator('[aria-label="Новое сообщение"]')
			.first()
			.type('message for general')
		await page.keyboard.press('Enter')
		await expect(
			await page.locator('text=message for general')
		).not.toHaveCount(0)
		await page.locator('text=random').first().click()
		await expect(await page.locator('text=message for general')).toHaveCount(0)
		await page
			.locator('[aria-label="Новое сообщение"]')
			.first()
			.type('message for random')
		await page.keyboard.press('Enter')
		await expect(await page.locator('text=message for random')).not.toHaveCount(
			0
		)
	})

	test('adding channel', async ({ page }) => {
		await page.locator('text=+').first().click()
		await page.locator('text=Имя канала').first().type('test channel')
		await page.keyboard.press('Enter')

		await expect(await page.locator('text=Канал создан')).toBeVisible()
		await expect(await page.locator('text=test channel')).not.toHaveCount(0)

		// проверка, что имя канала от 3 до 20 символов
		await page.locator('text=+').first().click()
		await page.locator('text=Имя канала').first().type('test long channel name')
		await page.keyboard.press('Enter')

		await expect(await page.locator('text=От 3 до 20 символов')).toHaveCount(1)
	})

	test('rename channel', async ({ page }) => {
		await page.locator('text="Управление каналом"').first().click()
		await page.locator('text=Переименовать').first().click()
		const input = await page.locator('text=Имя канала')
		await input.fill('')
		await input.first().type('new test channel')
		await page.keyboard.press('Enter')

		await expect(await page.locator('text=Канал переименован')).toBeVisible()
		await expect(await page.locator('text=new test channel')).not.toHaveCount(0)
	})

	test('remove channel', async ({ page }) => {
		await page.locator('text=Управление каналом').first().click()
		await page.locator('text=Удалить').first().click()

		await page.locator('button.btn-danger').first().click()

		await expect(await page.locator('text=Канал удалён')).toBeVisible()

		await page.waitForSelector('.modal', { state: 'hidden' })

		await expect(await page.locator('text=# new test channel')).toHaveCount(0)
	})
})

test.describe('two users chatting', () => {
	let page2

	test.beforeEach(async ({ page, browser }) => {
		await page.locator('text=Ваш ник').first().type(registeredUser.login)
		await page.locator('text=/^Пароль$/').first().type(registeredUser.password)
		await page.locator('button[type="submit"]').first().click()

		const context2 = await browser.newContext()
		page2 = await context2.newPage()
		await page2.goto('http://localhost:3000')

		await page2.locator('text=Hexlet Chat').first().click()
		await page2.locator('text=Ваш ник').first().type(newUser.login)
		await page2.locator('text=/^Пароль$/').first().type(newUser.password)
		await page2.locator('button[type="submit"]').first().click()
	})

	test('login second user', async () => {
		await expect(
			await page2.locator('text=Неверные имя пользователя или пароль')
		).toHaveCount(0)
	})

	test('messages are accurately displayed', async ({ page }) => {
		await page
			.locator('[aria-label="Новое сообщение"]')
			.first()
			.type('How are you?')
		await page.keyboard.press('Enter')
		await expect(
			await page2.locator(`text=${registeredUser.login}`)
		).not.toHaveCount(0)
		await expect(await page2.locator('text=How are you')).not.toHaveCount(0)

		await page2
			.locator('[aria-label="Новое сообщение"]')
			.first()
			.type('Good. You?')
		await page2.keyboard.press('Enter')
		await expect(await page.locator('text=user')).not.toHaveCount(0)
		await expect(await page.locator('text=Good. You?')).not.toHaveCount(0)
	})

	test('only initiator is switched to new channel', async ({ page }) => {
		await page.locator('text=+').first().click()
		await page.locator('text=Имя канала').first().type('test channel 2')
		await page.keyboard.press('Enter')

		await expect(
			await page.getByRole('button', { name: 'test channel 2' })
		).toHaveClass('w-100 rounded-0 text-start text-truncate btn btn-secondary')
		await expect(
			await page2.getByRole('button', { name: 'test channel 2' })
		).not.toHaveClass(
			'w-100 rounded-0 text-start text-truncate btn btn-secondary'
		)
	})
})
