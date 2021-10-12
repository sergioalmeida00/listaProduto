const form = document.querySelector('#form #adicionar');
const btnRemoveAll = document.querySelector('#remover');
arrayProdutos = [];

form.addEventListener('click', (e) => {
    e.preventDefault();
    salvar();
})

let dbStorage = {
    getStorage: () => {
        return localStorage.getItem('produto');
    },
    setStorage: (valueProduto) => {
        return localStorage.setItem('produto', JSON.stringify(valueProduto));
    },
    removeAll: btnRemoveAll.onclick = () => {
        arrayProdutos = [];
        dbStorage.setStorage(arrayProdutos);
        listaTable();

    }
}

function salvar() {
    let produto = lerDados();
    if (validaCampos(produto)) {
        adicionar(produto);
    }
    listaTable();
    limparDados();
}

function listaTable() {
    let tbody = document.querySelector('tbody');
    tbody.innerHTML = '';
    if (dbStorage.getStorage() != null) {
        arrayProdutos = JSON.parse(dbStorage.getStorage());
    }
    for (let i = 0; i < arrayProdutos.length; i++) {
        tbody.innerHTML += `
        <tr>
            <td>${i}</td>
            <td>${arrayProdutos[i].nome}</td>
            <td>${arrayProdutos[i].quantidade}</td>
            <td>
                 <span onclick=deleteProduto(${i}) class="icon-delete"></span>
            </td>
        </tr>
        `
    }
}

function adicionar(valueProduto) {
    if (dbStorage.getStorage() != null) {
        arrayProdutos = JSON.parse(dbStorage.getStorage());
    }
    arrayProdutos.push(valueProduto);
    dbStorage.setStorage(arrayProdutos);
}

function deleteProduto(valueId) {
    arrayProdutos = JSON.parse(dbStorage.getStorage());
    arrayProdutos.splice(valueId, 1);
    dbStorage.setStorage(arrayProdutos);
    listaTable();
}

function validaCampos(valueProduto) {
    if (valueProduto.nome != '' && valueProduto.quantidade != '') {
        return true;
    } else {
        alert("Preencha todos os campos");
        return false;
    }
}

function lerDados() {
    let produto = {}
    produto.nome = document.querySelector('#produto').value;
    produto.quantidade = document.querySelector('#quantidade').value;
    return produto;
}

function limparDados() {
    document.querySelector('#produto').value = '';
    document.querySelector('#quantidade').value = '';
}

listaTable();