document.addEventListener('DOMContentLoaded', function () {
  browser.storage.local.get('giftCode')
    .then(result => {
      const giftCode = result.giftCode;
      if (giftCode) {
        document.getElementById('codeInput').value = giftCode;
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });

  document.getElementById('codeForm').addEventListener('submit', function (event) {
    event.preventDefault();
    let giftCode = document.getElementById('codeInput').value;
    console.log(giftCode);

    // Update the form with the submitted code value
    document.getElementById('codeInput').value = giftCode;

    // Store the input value
    browser.storage.local.set({ 'giftCode': giftCode });
  });

});
