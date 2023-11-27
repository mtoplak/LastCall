const { Builder, By, Key, until } = require('selenium-webdriver');
require('chromedriver');

async function testSearchProductsInput() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        await driver.get('https://lastcall-1d57c.web.app/');

        const searchInput = await driver.findElement(By.xpath('//input[@id="outlined-basic"]'));
        await searchInput.sendKeys('rumeni');

        await driver.sleep(1000);

        const displayedProducts = await driver.findElements(By.xpath('//div[@class="drink-container"]'));

        for (const product of displayedProducts) {
            const productTitle = await product.findElement(By.xpath('.//h2')).getText();
            expect(productTitle.toLowerCase()).toContain('rumeni');
        }
        console.log('Test filtriranje izdelkov je uspešno zaključen.');
    } catch (e) {
        console.error(e);
    }
}

testSearchProductsInput();
