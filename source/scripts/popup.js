import browser from 'webextension-polyfill';
import axios from 'axios';
import '../styles/popup.scss';
var envConfig = require('./constants')

function openWebPage(url) {
  return browser.tabs.create({ url });
}

function showMessage(message) {
  document.getElementById('button').textContent = message;
  document.getElementById('spinner').classList.add("hidden");
}

document.addEventListener('DOMContentLoaded', async () => {

  // const response = await browser.runtime.sendMessage({
  //   msg: 'hello',
  //   url,
  // });

  document.getElementById('button').addEventListener('click', async (event) => {
    document.getElementById('spinner').classList.remove("hidden");

    const tabs = await browser.tabs.query({
      active: true,
      currentWindow: true
    });

    const url = tabs.length && tabs[0].url;
    const title = tabs.length && tabs[0].title;
    axios.post(`${envConfig.BASE_URL}/add-to-board`, { url: url, title: title })
    .then((response) => {
      showMessage("Job added ✅");
    }).catch(err => {
      if (err.response) {
        if (err.response.status == 401) {
          showMessage("Please sign in first");
          openWebPage(`${envConfig.BASE_URL}/users/sign_in`);
        }
        else {
          showMessage("There was an error, please retry or click on help");
        }
      } else if (err.request) {
        // client never received a response, or request never left
        showMessage("There was an error, please retry or click on help");
      } else {
        // anything else
        showMessage("There was an error, please retry or click on help");
      }
    })
  });
});
