import browser from 'webextension-polyfill';
import axios from 'axios';
import '../styles/popup.scss';

function openWebPage(url) {
  return browser.tabs.create({url});
}

document.addEventListener('DOMContentLoaded', async () => {

  // const response = await browser.runtime.sendMessage({
  //   msg: 'hello',
  //   url,
  // });

  // console.emoji('🦄', response);

  document.getElementById('github__button').addEventListener('click', async (event) => {
    const tabs = await browser.tabs.query({
      active: true,
      currentWindow: true
    });
  
    const url = tabs.length && tabs[0].url;
    const title = tabs.length && tabs[0].title;
    axios.post("http://0.0.0.0:3000/add-to-board", { url: url, title: title}).then((response)=>{
      document.getElementById('github__button').textContent = "success";
    })
  });
});
