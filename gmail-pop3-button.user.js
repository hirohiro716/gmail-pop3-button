// ==UserScript==
// @name         Gmail POP3 Checker
// @namespace    https://github.com/hirohiro716/
// @version      2.1
// @description  Add the ability to check for new POP3 mail to the refresh button.
// @author       hiro
// @match        https://mail.google.com/mail/*
// @exclude      https://mail.google.com/mail/u/0/?*
// @icon         https://mail.google.com/favicon.ico
// @grant        none
// @updateURL    https://github.com/hirohiro716/gmail-pop3-button/raw/main/gmail-pop3-button.user.js
// @downloadURL  https://github.com/hirohiro716/gmail-pop3-button/raw/main/gmail-pop3-button.user.js
// ==/UserScript==

const addEvnetHandler = () => {
    const button = Array.from(window.document.querySelectorAll('div')).find(element => element.getAttribute('data-tooltip') === '更新');
    if (button && button.getAttribute('data-pop3-button') === null) {
        button.addEventListener('click', () => {
            const setting = window.open('https://mail.google.com/mail/u/0/#settings/accounts', 'setting-window', 'width=400,height=400');
            let number = 0;
            const clicker = () => {
                const title = setting.window.document.querySelector('title');
                title.text = '新着メール確認中';
                number++;
                const text = 'メールを今すぐ確認する';
                const span = Array.from(setting.window.document.querySelectorAll('span')).find(element => element.textContent === text);
                if (typeof span === 'undefined' && number < 20) {
                    setTimeout(clicker, 500);
                } else {
                    if (span) {
                        span.click();
                    }
                    setTimeout(() => {
                        try {
                            setting.window.close();
                        } catch (error) {
                        }
                    }, 10000);
                }
            };
            setting.window.addEventListener('DOMContentLoaded', () => {
                setTimeout(() => {
                    const div = setting.window.document.createElement('div');
                    div.style.position = 'fixed';
                    div.style.top = '0';
                    div.style.right = '0';
                    div.style.bottom = '0';
                    div.style.left = '0';
                    div.style.zIndex = '65535';
                    div.style.background = '#fff';
                    div.style.display = 'flex';
                    div.style.justifyContent = 'center';
                    div.style.alignItems = 'center';
                    const span = setting.window.document.createElement('span');
                    span.style.color = '#ccc';
                    span.textContent = '新着メールを確認中...';
                    div.append(span);
                    setting.window.document.body.append(div);
                    clicker();
                }, 3000);
            });
        });
        button.setAttribute('data-pop3-button', 'on');
    } else {
        setTimeout(addEvnetHandler, 1000);
    }
};
window.addEventListener('load', () => {
    addEvnetHandler();
});
window.addEventListener('hashchange', () => {
    addEvnetHandler();
});
