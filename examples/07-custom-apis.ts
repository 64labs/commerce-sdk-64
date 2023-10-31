import {slasHelpers, Custom, Customer } from "../dist";

const CLIENT_ID = "76076412-8f1e-4901-b4b6-705d1c63d415";
const ORG_ID = "f_ecom_zzoc_004";
const SHORT_CODE = "kv7kzm78";
const SITE_ID = "RefArch";
const REDIRECT_URI = "http://localhost:3000/callback";

// client configuration parameters
const config = {
  headers: {},
  parameters: {
    clientId: CLIENT_ID,
    organizationId: ORG_ID,
    shortCode: SHORT_CODE,
    siteId: SITE_ID,
  },
};

const slasClient = new Customer.ShopperLogin(config);

async function getGuestUserAuthToken() {
  return await slasHelpers
    .loginGuestUser(slasClient, { redirectURI: REDIRECT_URI })
    .then((guestTokenResponse) => {
      console.log("Guest Token Response: ", guestTokenResponse);
      return guestTokenResponse;
    });
}

async function getActivePaymentMethods() {
  const customClient = new Custom.Custom64Labs(config);
  const _result = await customClient.getActivePaymentMethods({
    parameters: { siteId: SITE_ID },
  });
  console.log("Active Payment Methods: ", _result);
  return _result;
}

async function getCustomerGroups() {
  const customClient = new Custom.Custom64Labs(config);
  const _result = await customClient.getCustomerGroups({
    parameters: { siteId: SITE_ID },
  });
  console.log("Customer Groups: ", _result);
  return _result;
}

async function getSitePreferences() {
  const customClient = new Custom.Custom64Labs(config);
  const _result = await customClient.getSitePreferences({
    parameters: { siteId: SITE_ID },
  });
  console.log("Site Preferences: ", _result);
  return _result;
}

getGuestUserAuthToken()
  .then((token) => {
    config.headers["authorization"] = `Bearer ${token.access_token}`;
  })
  .then(async () => {
    const _activePaymentMethods = await getActivePaymentMethods();
    const _customerGroups = await getCustomerGroups();
    const _sitePreferences = await getSitePreferences();
    return;
  })
  .catch(async (e) => {
    console.error(e);
    console.error(await e.response.text());
  });

console.log("Hello Dave!");
