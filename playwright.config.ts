import { defineConfig, devices } from '@playwright/test';


export default defineConfig({

  globalSetup:require.resolve('./globalSetup'),
  timeout : 30*1000 , 
  testDir: './tests',
 
  fullyParallel: true,
 
   
  retries: process.env.CI ? 2 : 0,
  
  workers:1,
  
  reporter: [
   ['html' , {outputFolder:'../reports/html-report'}],
   ['allure-playwright'],
   ['dot'],
   ['list']
  
  ],

  
  use: {

    storageState:'auth/user.json',
    trace: 'on-first-retry',
    screenshot:'only-on-failure',
    video:'retain-on-failure',
    ignoreHTTPSErrors:true, //ignore SSL errors if necessary
    permissions:['geolocation'],

  },

 
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

  /*  {
      name: 'firefox'
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },*/

    
   
  ],

  
});