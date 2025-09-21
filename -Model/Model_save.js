// Model concernant : 
//  - L'initialisation des variable de base
//  - Chagement d'une sauvegarde deja exsitante


export async function loadBalanceData() {
  const response = await fetch("../data/Balancedata.json");
  const data = await response.json();
  return data;
}
