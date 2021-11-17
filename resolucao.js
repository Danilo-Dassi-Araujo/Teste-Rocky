//Ajusta o json
function fixJson() {
  json.map((e) => {
    let array = e.name.split("");
    e.name = correctName(array);
  
    e.price = stringToNumber(e.price);
  
    e.quantity = recoverQuantity(e?.quantity);
  
    return e;
  });
}

//Ajusta o nome dos objetos do json
function correctName(array) {
  let newName = "";

  array.forEach((el) => {
    switch (el) {
      case "æ":
        el = "a"
        break;
      case "¢":
        el = "c"
        break;
      case "ø":
        el = "o"
        break;
      case "ß":
        el = "b"
        break;
    }
    newName += el;
  });
  return newName;
}

//Ajusta o tipo do price
function stringToNumber(price) {
  return parseFloat(price);
}

//Adiciona o quantity zerado caso não haja no objeto
function recoverQuantity(quantity) {
  if (!quantity) {
    return 0;
  } else {
    return quantity;
  }
}

//Atualiza o json da saida
function exportJson() {
  let fs = require("fs");
  fs.writeFile(saida, JSON.stringify(json), function (err) {
    if (err) {
      throw err;
    }
  });

  console.log(`\n--------- Questão 1-E ---------\n`);
  console.log("\nArquivo exportado com sucesso!\n");
}

//Atualiza o json filtrado pelo id e pela categoria
function showCategoryProduct() {
  const alphabeticalOrder = [];
  const idOrder = [];
  const categorias = [];

  json.forEach((e) => {
    !categorias.includes(e?.category) ? categorias.push(e.category) : null;
  })

  categorias.forEach((e) => {
    const filtered = json.filter((m) => m.category === e); 
    const cat = e.normalize("NFD").replace(/[^a-zA-Zs]/g, "");
    idOrder[cat] = filtered.map((m) => m.id).sort();
  })

  const keys = Object.keys(idOrder).sort();

  keys.forEach((e) => {
    idOrder[e].forEach((f) => {
      alphabeticalOrder.push(json.find((el) => el.id === f));
    });
  });

  console.log(`\n--------- Questão 2-A ---------\n`);
  console.log(alphabeticalOrder);
}

//Soma o preço do total de estoque de cada produto
function sumCategory() {
  const categorias = [];
  json.forEach((e) => {
    !categorias.includes(e?.category) ? categorias.push(e.category) : null;
  });

  console.log('\n--------- Questão 2-B ---------\n')
  categorias.forEach((e) => {
    const soma = json
      .filter((el) => el.category === e)
      .reduce((total, item) => total + item.quantity * item.price, 0)
      .toFixed(2);
    console.log(`A soma da categoria ${e} é ${soma}`);
  });
}

/* ------------------ MAIN ---------------- */

const fileName = "./broken-database.json";
const saida = "./saida.json";
const json = require(fileName);

fixJson();
exportJson();
sumCategory();
showCategoryProduct();