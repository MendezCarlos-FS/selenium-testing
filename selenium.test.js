const { Builder, By, Key, until } = require("selenium-webdriver");

describe("Selenium Tests", () => {
    let driver;

    beforeAll(async () => {
        driver = await new Builder().forBrowser("chrome").build();
        // await driver.manage().window().maximize();
    });

    afterAll(async () => {
        await driver.quit();
    });

    const setDelay = async() => {
        await driver.sleep(1000);
    };

    it("As a user, I want to open the homepage.", async () => {
        await driver.get("http://127.0.0.1:3000/");
        await driver.getTitle().then(title => {
            expect(title).toEqual("Home");
        });
        await setDelay();
    });

    it("As a user, I want to open the Contact Us page.", async () => {
        await driver.get(driver.getCurrentUrl());
        await driver.findElement(By.id("contactLink")).click();
        await driver.wait(until.titleContains("Contact Us"));
        await driver.getTitle().then(title => {
            expect(title).toEqual("Contact Us");
        });
        await setDelay();
    });

    it("As a user, I want to sign up for more info via email.", async () => {
        await driver.get(driver.getCurrentUrl());

        const email = "selenium.test@gmail.com";
        await driver.findElement(By.id("formInput")).sendKeys(email);
        await driver.findElement(By.id("formSubmit")).click();
        const text = await driver.findElement(By.id("formMessage")).getText();

        expect(text).toEqual(`More info coming to ${email} a`);
        await setDelay();
    });
});