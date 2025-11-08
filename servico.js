module.exports = class ServicoCalculaFatura {
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
};
