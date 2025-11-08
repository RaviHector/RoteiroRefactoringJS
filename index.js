const { readFileSync } = require("fs");

var Repositorio = require("./repositorio.js");
var ServicoCalculaFatura = require("./servico.js");
var gerarFaturaStr = require("./apresentacao.js");

// function gerarFaturaHTML(fatura, pecas) {
//   const calc = new ServicoCalculaFatura();

//   let faturaHTML = `<html>\n`;
//   faturaHTML += `<p> Fatura ${fatura.cliente} </p>\n`;
//   faturaHTML += `<ul>\n`;
//   for (let apre of fatura.apresentacoes) {
//     faturaHTML += `<li> ${getPeca(pecas, apre).nome}: ${formatarMoeda(
//       calc.calcularTotalApresentacao(pecas, apre)
//     )} (${apre.audiencia} assentos) </li>\n`;
//   }
//   faturaHTML += `</ul>\n`;
//   faturaHTML += `<p> Valor total: ${formatarMoeda(
//     calc.calcularTotalFatura(pecas, fatura.apresentacoes)
//   )} </p>\n`;
//   faturaHTML += `<p> Créditos acumulados: ${calc.calcularTotalCreditos(
//     pecas,
//     fatura.apresentacoes
//   )} </p>\n`;
//   faturaHTML += `</html>`;
//   return faturaHTML;
// }

const faturas = JSON.parse(readFileSync("./faturas.json"));
const calc = new ServicoCalculaFatura(new Repositorio());

const faturaStr = gerarFaturaStr(faturas, calc);
//console.log("\n--- Fatura em String ---\n");
console.log(faturaStr);

// constFaturaHTML = gerarFaturaHTML(faturas, pecas);
// console.log("\n--- Fatura em HTML ---\n");
// console.log(gerarFaturaHTML(faturas, pecas));
