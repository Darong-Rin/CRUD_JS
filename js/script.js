
const txtId = document.getElementById('txt-id');
const txtName = document.getElementById('txt-name');
const txtQty = document.getElementById('txt-qty');
const txtPrice = document.getElementById('txt-price');
const btnSave = document.getElementById('btn-save');
let showData = document.getElementById('show-data')
let storeProduct = [
    {
        id: 0,
        name: 'exampleProduct',
        qty: 0,
        price: 0,
        total: 0
    }
];
let totalPrice = 0;
let isSave = true
loadData();
btnSave.addEventListener('click', () => {
    if (isSave) {
        if (validation() && validationId(txtId)) {
            if (storeProduct[0].id == 0) {
                storeProduct.splice(0, 1);
            }
            let product = {
                id: txtId.value,
                name: txtName.value,
                qty: txtQty.value,
                price: parseFloat(txtPrice.value),
                total: parseFloat(txtPrice.value) * parseInt(txtQty.value)
            }
            storeProduct.push(product);
            ClearData();
            loadData();
        }
        // console.log(storeProduct);

    }
    else {
        EditData();
        loadData();
        isSave = true;
        txtId.readOnly = false;
        btnSave.innerText = 'Save';
        ClearData();
    }

});

function validationId(txtId) {
    let isValue = true;
    storeProduct.forEach((product) => {
        if (product.id == txtId.value) {
            alert('ID already exists!');
            isValue = false;
            return isValue;
        }
    })
    return isValue;
}
function validation() {
    let isValue = true;
    if (txtId.value == '' || txtName.value == '' || txtPrice.value == '' || txtQty.value == '') {
        alert('All fields are required!');
        isValue = false;
    }
    return isValue;
}

function loadData() {
    showData.innerHTML = '';
    totalPrice = 0;
    storeProduct.forEach((product) => {
        showData.innerHTML += ` <tr>
                            <td>${product.id}</td>
                            <td>${product.name}</td>
                            <td>${product.qty}</td>
                            <td>$ ${product.price.toLocaleString()}</td>
                            <td>$ ${product.total.toLocaleString()}</td>
                            <td>
                                <div>
                                    <button type="button" data-product='${JSON.stringify(product)}' onclick="getDataEidt(this)" class="btn-edit">Edit</button>
                                    <button type="button" data-product='${JSON.stringify(product)}' onclick="deleteProduct(this)" class="btn-delete">Delete</button>
                                </div>
                            </td>
                        </tr>
            `;
        totalPrice += product['total'];
    })
    document.getElementById('total-price').innerText = totalPrice.toLocaleString();
}

function getDataEidt(data) {
    const getProduct = data.getAttribute('data-product');
    const product = JSON.parse(getProduct);
    txtId.readOnly = true;
    txtId.value = product.id;
    txtName.value = product.name;
    txtQty.value = product.qty;
    txtPrice.value = product.price;
    btnSave.innerText = 'Update';
    isSave = false;
    sessionStorage.setItem('productId', product.id)
}
function EditData() {
    const productId = sessionStorage.getItem('productId');
    console.log(productId);
    storeProduct.forEach((product) => {
        if (product.id === productId) {
            product.name = txtName.value;
            product.qty = txtQty.value;
            product.price = txtPrice.value;
            product.total = parseFloat(txtPrice.value) * parseInt(txtQty.value)
        }
        return;
    });
}
function deleteProduct(data) {
    const getProduct = data.getAttribute('data-product');
    const product = JSON.parse(getProduct);
    if (confirm(`Are you sure to delete ?
        Product ID   : ${product.id}
        Product Name : ${product.name}`) == true) {
        storeProduct.forEach((item) => {
            if (product.id === item.id) {
                storeProduct.splice(storeProduct.indexOf(item), 1);
            }
            loadData();
            return;
        });
    }
}

function ClearData() {
    txtId.value = '';
    txtName.value = '';
    txtQty.value = '';
    txtPrice.value = '';
    sessionStorage.removeItem('productId');
    txtId.focus();
}