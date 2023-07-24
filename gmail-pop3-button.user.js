// ==UserScript==
// @name         Gmail POP3 Checker
// @namespace    https://github.com/hirohiro716/
// @version      0.2
// @description  Add a button to Gmail to check for new POP3 emails.
// @author       hiro
// @match        https://mail.google.com/mail/*
// @icon         https://mail.google.com/favicon.ico
// @grant        none
// @updateURL    https://github.com/hirohiro716/gmail-pop3-button/raw/main/gmail-pop3-button.user.js
// @downloadURL  https://github.com/hirohiro716/gmail-pop3-button/raw/main/gmail-pop3-button.user.js
// ==/UserScript==

let button;
const displayButton = () => {
    if (button) {
        if (location.href.endsWith('inbox')) {
            const adjustNavigation = () => {
                const navigation = Array.from(window.document.querySelectorAll('div')).find(element => element.role === 'navigation' && element.style.height);
                let height = String(navigation.style.height);
                if (height.match(/em/)) {
                    button.style.display = 'block';
                    return;
                }
                height = 'calc(' + height + ' - 3.5em)';
                navigation.style.height = height;
                setTimeout(adjustNavigation, 500);
            };
            adjustNavigation();
        } else {
            button.style.display = 'none';
        }
    }
}
window.addEventListener('hashchange', () => {
    displayButton();
});
window.addEventListener('load', () => {
    const body = document.querySelector('body');
    const head = document.querySelector('head');
    const style = document.createElement('style');
    style.textContent = "#pop3-checker:hover { transform:scale(1.1); } #pop3-checker:active { transform:scale(0.90); }";
    head.append(style);
    button = document.createElement('img');
    button.id = 'pop3-checker';
    button.src = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjxzdmcKICAgaGVpZ2h0PSIxMjgiCiAgIHZlcnNpb249IjEuMSIKICAgdmlld0JveD0iMCAwIDEyOCAxMjgiCiAgIHdpZHRoPSIxMjgiCiAgIGlkPSJzdmcxMiIKICAgc29kaXBvZGk6ZG9jbmFtZT0iYnV0dG9uLnN2ZyIKICAgaW5rc2NhcGU6dmVyc2lvbj0iMS4xLjIgKDBhMDBjZjUzMzksIDIwMjItMDItMDQpIgogICB4bWxuczppbmtzY2FwZT0iaHR0cDovL3d3dy5pbmtzY2FwZS5vcmcvbmFtZXNwYWNlcy9pbmtzY2FwZSIKICAgeG1sbnM6c29kaXBvZGk9Imh0dHA6Ly9zb2RpcG9kaS5zb3VyY2Vmb3JnZS5uZXQvRFREL3NvZGlwb2RpLTAuZHRkIgogICB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCiAgIHhtbG5zOnN2Zz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgogIDxzb2RpcG9kaTpuYW1lZHZpZXcKICAgICBpZD0ibmFtZWR2aWV3MTQiCiAgICAgcGFnZWNvbG9yPSIjZmZmZmZmIgogICAgIGJvcmRlcmNvbG9yPSIjNjY2NjY2IgogICAgIGJvcmRlcm9wYWNpdHk9IjEuMCIKICAgICBpbmtzY2FwZTpwYWdlc2hhZG93PSIyIgogICAgIGlua3NjYXBlOnBhZ2VvcGFjaXR5PSIwLjAiCiAgICAgaW5rc2NhcGU6cGFnZWNoZWNrZXJib2FyZD0iMCIKICAgICBzaG93Z3JpZD0iZmFsc2UiCiAgICAgd2lkdGg9IjEyOHB4IgogICAgIGJvcmRlcmxheWVyPSJ0cnVlIgogICAgIGlua3NjYXBlOnNuYXAtYmJveD0idHJ1ZSIKICAgICBpbmtzY2FwZTpiYm94LXBhdGhzPSJ0cnVlIgogICAgIGlua3NjYXBlOmJib3gtbm9kZXM9InRydWUiCiAgICAgaW5rc2NhcGU6c25hcC1iYm94LWVkZ2UtbWlkcG9pbnRzPSJ0cnVlIgogICAgIGlua3NjYXBlOnNuYXAtYmJveC1taWRwb2ludHM9InRydWUiCiAgICAgaW5rc2NhcGU6c25hcC1vYmplY3QtbWlkcG9pbnRzPSJ0cnVlIgogICAgIGlua3NjYXBlOnNuYXAtcGFnZT0idHJ1ZSIKICAgICBpbmtzY2FwZTpzbmFwLWNlbnRlcj0idHJ1ZSIKICAgICBpbmtzY2FwZTp6b29tPSIzLjA1NjM3NiIKICAgICBpbmtzY2FwZTpjeD0iNDIuMDQzMjU2IgogICAgIGlua3NjYXBlOmN5PSIzNS44MjY3NDQiCiAgICAgaW5rc2NhcGU6Y3VycmVudC1sYXllcj0ic3ZnMTIiIC8+CiAgPHRpdGxlCiAgICAgaWQ9InRpdGxlMiIgLz4KICA8ZGVzYwogICAgIGlkPSJkZXNjNCIgLz4KICA8ZGVmcwogICAgIGlkPSJkZWZzNiIgLz4KICA8cGF0aAogICAgIHN0eWxlPSJmaWxsOiM4MDgwODA7ZmlsbC1ydWxlOmV2ZW5vZGQ7c3Ryb2tlOm5vbmU7c3Ryb2tlLXdpZHRoOjcuMDI5MDkiCiAgICAgZD0ibSAtMS4wNWUtNSwxMTcuMzMxNzggdiAxMC44MDgwNSBIIDEyOCB2IC0xMC44MDgwNSB6IgogICAgIGlkPSJwYXRoNTI5IiAvPgogIDxwYXRoCiAgICAgaWQ9IlNoYXBlIgogICAgIHN0eWxlPSJmaWxsOiM4MDgwODA7ZmlsbC1ydWxlOmV2ZW5vZGQ7c3Ryb2tlOm5vbmU7c3Ryb2tlLXdpZHRoOjUuOTk3MjIiCiAgICAgZD0iTSA0NC4xODk0NTMsNTAuMjkwMTczIFYgNzIuMTI2MzAxIEggMTcuNzc3MzQ0IEwgNjQsMTEwLjI1MzczIDExMC4yMjI2Niw3Mi4xMjYzMDEgSCA4My44MTA1NDcgViA1MC4yOTAxNzMgWiIgLz4KICA8cGF0aAogICAgIHN0eWxlPSJmaWxsOiM4MDgwODA7ZmlsbC1ydWxlOmV2ZW5vZGQ7c3Ryb2tlOm5vbmU7c3Ryb2tlLXdpZHRoOjYuNjAzMiIKICAgICBkPSJNIC02OS4yMDMwOTYsNy45NTYzNTE5IEggLTk1LjYxNTg5OSBWIC0zMS42NjI4NTkgSCAtMTM1LjIzNTExIFYgNy45NTYzNTE5IGggLTI2LjQxMjgxIGwgNDYuMjIyNDIsNDYuMjIyNDEzMSB6IgogICAgIGlkPSJTaGFwZS0zIiAvPgogIDx0ZXh0CiAgICAgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIKICAgICBzdHlsZT0iZm9udC1zdHlsZTpub3JtYWw7Zm9udC12YXJpYW50Om5vcm1hbDtmb250LXdlaWdodDo1MDA7Zm9udC1zdHJldGNoOm5vcm1hbDtmb250LXNpemU6NDBweDtsaW5lLWhlaWdodDoxLjI1O2ZvbnQtZmFtaWx5OifmupDmmo7jgrTjgrfjg4Pjgq9QJzstaW5rc2NhcGUtZm9udC1zcGVjaWZpY2F0aW9uOifmupDmmo7jgrTjgrfjg4Pjgq9QLCBNZWRpdW0nO2ZvbnQtdmFyaWFudC1saWdhdHVyZXM6bm9ybWFsO2ZvbnQtdmFyaWFudC1jYXBzOm5vcm1hbDtmb250LXZhcmlhbnQtbnVtZXJpYzpub3JtYWw7Zm9udC12YXJpYW50LWVhc3QtYXNpYW46bm9ybWFsO2ZpbGw6IzgwODA4MDtmaWxsLW9wYWNpdHk6MTtzdHJva2U6bm9uZSIKICAgICB4PSI3LjUwMDA4MjUiCiAgICAgeT0iMzQuMTk1NjI1IgogICAgIGlkPSJ0ZXh0OTk0NSI+PHRzcGFuCiAgICAgICBzb2RpcG9kaTpyb2xlPSJsaW5lIgogICAgICAgaWQ9InRzcGFuOTk0MyIKICAgICAgIHg9IjcuNTAwMDgyNSIKICAgICAgIHk9IjM0LjE5NTYyNSI+UE9QMzwvdHNwYW4+PC90ZXh0Pgo8L3N2Zz4K';
    button.style.position = 'fixed';
    button.style.bottom = '1em';
    button.style.left = '1em';
    button.style.zIndex = '5';
    button.style.width = '2em';
    button.style.cursor = 'pointer';
    button.style.transition = 'all 0.1s ease-in-out';
    button.onclick = () => {
        const setting = window.open('https://mail.google.com/mail/u/0/#settings/accounts', 'setting-window', 'width=400,height=400');
        let number = 0;
        const clicker = () => {
            number++;
            const text = 'メールを今すぐ確認する';
            const span = Array.from(setting.window.document.querySelectorAll('span')).find(element => element.textContent === text);
            if (typeof span === 'undefined' && number < 10) {
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
                }, 1000);
            }
        };
        setting.window.addEventListener('load', () => {
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
        });
    };
    body.append(button);
    displayButton();
});
