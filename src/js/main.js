let myCustomers = [];
const input = document.getElementById('input');
const saveInput = document.getElementById('save-input');
const crmList = document.getElementById('crm-list');
const deleteCrm = document.getElementById('delete-btn');
const tabBtn = document.getElementById('tab-btn');

function render(crm) {
  let listItems = '';
  for (let i = 0; i < crm.length; i += 1) {
    listItems += `
            <li>
                <a target='_blank' href='${crm[i]}'>
                    ${crm[i]}
                </a>
            </li>
        `;
  }
  crmList.innerHTML = listItems;
}

const crmFromLocalStorage = JSON.parse(localStorage.getItem('myCustomers'));

if (crmFromLocalStorage) {
  myCustomers = crmFromLocalStorage;
  render(myCustomers);
}

function deleteFunction() {
  localStorage.clear();
  myCustomers = [];
  render(myCustomers);
}

deleteCrm.addEventListener('dblclick', deleteFunction);

function handleButtonClick() {
  const inputValue = input.value.trim();
  if (inputValue) {
    myCustomers.push(inputValue);
    input.value = '';
    localStorage.setItem('myCustomers', JSON.stringify(myCustomers));
    render(myCustomers);
  }
}

saveInput.addEventListener('click', handleButtonClick);

function pickTab(tabs) {
  if (tabs.length > 0) {
    myCustomers.push(tabs[0].url);
    localStorage.setItem('myCustomers', JSON.stringify(myCustomers));
    render(myCustomers);
  }
}

function saveTab() {
  // eslint-disable-next-line no-undef
  chrome.tabs.query({ active: true, currentWindow: true }, pickTab);
}

tabBtn.addEventListener('click', saveTab);
