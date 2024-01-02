const url = 'https://fakestoreapi.com/products/category/jewelery';
const tableBody = document.getElementById('table-body');
let productsData = {};
let sortDirection = {};

function renderData(data) {
  tableBody.innerHTML = '';
  data.forEach(item => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${item.id}</td>
      <td>${item.title}</td>
      <td>${item.price}</td>
      <td>${item.description}</td>
      <td>${item.category}</td>
      <td>
        <img src="${item.image}" alt="id:${item.id}" />
      </td>
      <td>${item.rating ? item.rating.rate : 'N/A'}</td>
      <td>${item.rating ? item.rating.count : 'N/A'}</td>
    `;
    tableBody.appendChild(row);
  });
}

function sortData(column) {
  const direction = sortDirection[column] === 'asc' ? 'desc' : 'asc';
  sortDirection = { [column]: direction };

  productsData.sort((a, b) => {

    const valueA = (column === 'rate' || column === 'count') ? a.rating[column] : a[column];
    const valueB = (column === 'rate' || column === 'count') ? b.rating[column] : b[column];

    if (typeof valueA === 'string' && typeof valueB === 'string') {
      const compareResult = valueA.localeCompare(valueB, undefined, { sensitivity: 'base' });
      return (direction === 'asc' ? compareResult : -compareResult);
    } 
    else {
      return (direction === 'asc' ? valueA - valueB : valueB - valueA);
    }
  });

  renderData(productsData);
}

fetch(url)
  .then(response => response.json())
  .then(data => {
    productsData = data;
    renderData(productsData);
  })
  .catch(error => {
    console.error('Произошла ошибка:', error);
  });

document.getElementById('idHeader').addEventListener('click', () => sortData('id'));
document.getElementById('titleHeader').addEventListener('click', () => sortData('title'));
document.getElementById('priceHeader').addEventListener('click', () => sortData('price'));
document.getElementById('descriptionHeader').addEventListener('click', () => sortData('description'));
document.getElementById('categoryHeader').addEventListener('click', () => sortData('category'));
document.getElementById('rateHeader').addEventListener('click', () => sortData('rate'));
document.getElementById('countHeader').addEventListener('click', () => sortData('count'));
