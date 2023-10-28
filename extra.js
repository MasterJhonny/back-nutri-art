const puppeteer = require('puppeteer');


const username = '1757554';
const password = 'demo22fin##';



(async () => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto('http://200.7.160.155/admivirtual/my/');
    await page.type('#username', username);
    await page.type('#password', password);
    await page.click('#loginbtn');

    await page.waitForNavigation();


    
    await page.click('#instance-202291-header');
    
    await page.screenshot({ path: 'example.png' });


    const list  = await page.$eval('#page-container-2', el => el.textContent.trim())

    // const data = list.split('\n');

    console.log(list)
  
    await browser.close();
})();