const { readFileSync } = require("fs");

class Repositorio {
  constructor() {
    this.pecas = JSON.parse(readFileSync("./pecas.json"));
  }

  getPeca(apre) {
    return this.pecas[apre.id];
  }
}
class ServicoCalculaFatura {
  constructor(repo) {
    this.repo = repo;
  }

  // Função para calcular os Créditos
  calcularCredito(apresentacoes) {
    let creditos = 0;
    creditos += Math.max(apresentacoes.audiencia - 30, 0);
    if (this.repo.getPeca(apresentacoes).tipo === "comedia")
      creditos += Math.floor(apresentacoes.audiencia / 5);
    return creditos;
  }

  // Função para calcular o total de créditos
  calcularTotalCreditos(apresentacoes) {
    let totalCreditos = 0;
    for (let apre of apresentacoes) {
      totalCreditos += this.calcularCredito(apre);
    }
    return totalCreditos;
  }

  // Função para calcular o total de cada apresentação
  calcularTotalApresentacao(apre) {
    let total = 0;
    const peca = this.repo.getPeca(apre);
    switch (peca.tipo) {
      case "tragedia":
        total = 40000;
        if (apre.audiencia > 30) {
          total += 1000 * (apre.audiencia - 30);
        }
        break;
      case "comedia":
        total = 30000;
        if (apre.audiencia > 20) {
          total += 10000 + 500 * (apre.audiencia - 20);
        }
        total += 300 * apre.audiencia;
        break;
      default:
        throw new Error(`Peça desconhecia: ${peca.tipo}`);
    }
    return total;
  }

  // Função para calcular o total da fatura
  calcularTotalFatura(apresentacoes) {
    let total = 0;
    for (let apre of apresentacoes) {
      total += this.calcularTotalApresentacao(apre);
    }
    return total;
  }
}

// Função para formatar moeda
function formatarMoeda(valor) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  }).format(valor / 100);
}

function gerarFaturaStr(fatura, calc) {
  let faturaStr = `Fatura ${fatura.cliente}\n`;
  for (let apre of fatura.apresentacoes) {
    faturaStr += `  ${calc.repo.getPeca(apre).nome}: ${formatarMoeda(
      calc.calcularTotalApresentacao(apre)
    )} (${apre.audiencia} assentos)\n`;
  }
  faturaStr += `Valor total: ${formatarMoeda(
    calc.calcularTotalFatura(fatura.apresentacoes)
  )}\n`;
  faturaStr += `Créditos acumulados: ${calc.calcularTotalCreditos(
    fatura.apresentacoes
  )} \n`;
  return faturaStr;
}

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
const repo = new Repositorio();
const calc = new ServicoCalculaFatura(repo);

const faturaStr = gerarFaturaStr(faturas, calc);
//console.log("\n--- Fatura em String ---\n");
console.log(faturaStr);

// constFaturaHTML = gerarFaturaHTML(faturas, pecas);
// console.log("\n--- Fatura em HTML ---\n");
// console.log(gerarFaturaHTML(faturas, pecas));
