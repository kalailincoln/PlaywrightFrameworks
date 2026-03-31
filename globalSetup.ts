import { chromium, FullConfig } from "@playwright/test";
import { TestConfig } from "./test.config";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { MyAccountPage } from "./pages/MyaccountPage";

export default globalSetup;
async function globalSetup(config: FullConfig) {

    const browser = await chromium.launch();

    const context = await browser.newContext();
    const page = await context.newPage();

    const testconfig = new TestConfig();

    // ✅ Navigate
    await page.goto(testconfig.appUrl);

    const homepage = new HomePage(page);

    // ✅ Navigate to login
    await homepage.clickMyAccount();
    await homepage.clickLoginButton();

    const loginpage = new LoginPage(page);

    // enter username and password and Login
    await loginpage.setEmailAddress(testconfig.email);
    await loginpage.setpassword(testconfig.password);
    await loginpage.clickLoginButton();

    // ✅ Wait for successful login
    const myaccount = new MyAccountPage(page);
    await myaccount.isMyAccountDisplayed();

    // ✅ Save storage state
    await context.storageState({
        path: 'auth/user.json'
    });

    await browser.close();



       




      
 







    
}