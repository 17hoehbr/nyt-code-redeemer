const currentURL = window.location.href;
let previousPage = "https://nytimes.com";

Promise.all([
  browser.storage.local.get('previousPage'),
  browser.storage.local.get('giftCode')
])
  .then(([previousPageResult, giftCodeResult]) => {
    previousPage = previousPageResult.previousPage;
    const giftCode = giftCodeResult.giftCode;
    const url = 'https://www.nytimes.com/subscription/redeem?campaignId=888LK&gift_code=' + giftCode;
    console.log("Gift code: " + giftCode);

    if (giftCode) {
      const observer = new MutationObserver(function (mutationsList, observer) {
        const welcomeAd = document.querySelector(".welcomeAd");
        const gateKeep = document.querySelector("#gateway-content");
        const alreadySubscribed = document.querySelector('div[data-testid="already-subscriber-view"]');

        if (welcomeAd || gateKeep) {
          previousPage = window.location.href;
          browser.storage.local.set({ 'previousPage': previousPage });
          console.log("Previous page: " + previousPage);
          window.location.href = url;
        }

        if (alreadySubscribed !== null) {
          console.log("already subscribed");
          window.location.href = previousPage;
        }
      });

      observer.observe(document.body, { subtree: true, childList: true });

      if (currentURL.includes("subscription/redeem")) {
        const redeembtn = document.querySelector('[data-testid="btn-redeem"]');
        redeembtn.click();
      }

      if (currentURL.includes('activate-access/')) {
        const getstartedbtn = document.querySelector('[data-testid="get-started-btn"]')
        getstartedbtn.click()
      }

      if (currentURL.includes("welcome-subscriber/welcome")) {
        console.log(previousPage);
        window.location.href = previousPage;
      }
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });
