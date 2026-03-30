//creating custom fixture file

import { test as base, Page } from "@playwright/test"
import { HomePage } from "../pages/HomePage"
import { RegistrationPage } from "../pages/RegistrationPage"
import { TestConfig } from "../test.config"

type Myfixtures = {
    homepage: HomePage;
    regPage: RegistrationPage;
    testconfig: TestConfig;
};

export const test = base.extend<Myfixtures>({


    testconfig: async ({ }, use) => {

        const testconfig = new TestConfig();
        await use(testconfig);

    },

    homepage: async ({ page, testconfig }, use) => {

        await page.goto(testconfig.appUrl);

        await use(new HomePage(page));

    },

    regPage: async ({ page }, use) => {

        await use(new RegistrationPage(page));

    },

});
export {expect} from "@playwright/test";