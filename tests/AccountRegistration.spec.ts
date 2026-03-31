/*
Test case : Account registration

test : @master @regression @sanity
Steps:

1. Navigate to appliation URL
2. Go to my account and click register
3.Complete registration form with random data
4.Agree to privacy policy and submit form
5. Validate the conformation message
*/
// import page classes , randomutil , test config.ts for app URL
import { test, expect } from "../fixtures/baseTest";;
import { HomePage } from '../pages/HomePage';
import { RegistrationPage } from "../pages/RegistrationPage";
import { RandomDataUtil } from '../utils/randomDataGenerator';
import { TestConfig } from "../test.config";

//Hooks for before and after tests (Common)

//before each  -launching URL , creating objects for Page objects

let homepage: HomePage;
let regPage: RegistrationPage;
let testconfig: TestConfig;
test.use({ storageState: undefined });

// create test
test('user registration test @master @sanity @regression' , async ({homepage , regPage }) => {

    //Go to my account and click register
    //await homepage.clickMyAccount();
    await homepage.clickRegister();

    //Complete registration form with random data

    await regPage.setFirstName(RandomDataUtil.getFirstName());  // never hardcode , call from utils - randomdata/dataprovider
    await regPage.setLastName(RandomDataUtil.getLastName());
    await regPage.setEmail(RandomDataUtil.getEmail());
    await regPage.setTelephoneNumber(RandomDataUtil.getTelephoneNumber());
    const passwrd = RandomDataUtil.getpassword();
    await regPage.setpassword(passwrd);
    await regPage.setConfirmPassword(passwrd);
    await regPage.setPrivacyPolicy();
    await regPage.clickContinue();

    //validate confirmation message

    const confirmationMessage = await regPage.getConfirmationMsg();
    expect(confirmationMessage).toContain("Your Account Has Been Created!");


});