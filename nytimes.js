const currentURL = window.location.href;

browser.storage.local.get('giftCode')
  .then(result => {
    const giftCode = result.giftCode;
    const url = 'https://www.nytimes.com/subscription/redeem?campaignId=888LK&gift_code=' + giftCode;
    console.log(url);

    if (giftCode) {
      if (currentURL.includes("https://www.nytimes.com/subscription/redeem")) {
        const redeembtn = document.querySelector(".giftRedeem__submitButton");
        redeembtn.click();
      }

      else if (currentURL.includes("https://www.nytimes.com/welcome-subscriber/welcome")) {
        window.location.href = "https://www.nytimes.com/";
      }

      else if (currentURL.includes("https://www.nytimes.com/activate-access/access-code")) {
        const observer = new MutationObserver(function (mutationsList, observer) {
          const alreadySubscribed = document.querySelector('div[data-testid="already-subscriber-view"]');
          if (alreadySubscribed !== null) {
            console.log("already subscribed")
            window.location.href = "https://www.nytimes.com/";
          }
        });
        observer.observe(document.body, { subtree: true, childList: true });
      }

      else {
        const observer = new MutationObserver(function (mutationsList, observer) {
          const welcomeAd = document.querySelector(".welcomeAd");
          const gateKeep = document.querySelector("#gateway-content");
          if (welcomeAd || gateKeep) {
            window.location.href = url;
            observer.disconnect();
          };
        });

        observer.observe(document.body, { subtree: true, childList: true });
      };
    };

  })
  .catch(error => {
    console.error('Error:', error);
  });
