const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const sName = document.querySelector('#m-name')
const sFunction = document.querySelector('#m-function')
const sSalary = document.querySelector('#m-salary')
const btnSave = document.querySelector('#btnSave')

let items
let id

const getItemsBD = () => JSON.parse(localStorage.getItem('db_localhost')) ?? []
const setItemsBD = () => localStorage.setItem('db_localhost', JSON.stringify(items))

function insertItem(item, index) {
    let tr = document.createElement('tr')

    tr.innerHTML = `
        <td>${item.name}</td>
        <td>${item.function}</td>
        <td>R$ ${item.salary}</td>
        <td class="action">
        <button onclick="editItem(${index})"><i class='bx bx-edit' ></i></button>
        </td>
        <td class="action">
        <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
        </td>
    `
    tbody.appendChild(tr)
}

function loadItems() {
    items = getItemsBD()
    tbody.innerHTML = ''
    items.forEach((item, index) => {
        insertItem(item, index)
    })
}
  
function editItem(index) {
    openModal(true, index)
}
  
function deleteItem(index) {
    items.splice(index, 1)
    setItemsBD()
    loadItems()
}

function openModal(edit = false, index = 0) {
    modal.classList.add('active')
  
    modal.onclick = e => {
      if (e.target.className.indexOf('modal-container') !== -1) {
        modal.classList.remove('active')
      }
    }
  
    if (edit) {
        sName.value = items[index].name
        sFunction.value = items[index].function
        sSalary.value = items[index].salary
        id = index
    } else {
        sName.value = ''
        sFunction.value = ''
        sSalary.value = ''
    }
}


btnSave.onclick = e => {
    if (sName.value == '' || sFunction.value == '' || sSalary.value == '') {
        return
    }

    e.preventDefault();

    if (id !== undefined) {
        items[id].name = sName.value
        items[id].function = sFunction.value
        items[id].salary = sSalary.value
    } else {
        items.push({'name': sName.value, 'function': sFunction.value, 'salary': sSalary.value})
    }

    setItemsBD()

    modal.classList.remove('active')
    loadItems()
    id = undefined
}

loadItems()