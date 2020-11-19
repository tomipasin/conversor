//captura o código de 3 dígitos da moeda base da conversão.
const from_currencyEl = document.getElementById('from_currency');
//captura o valor que será convertido.
const from_ammountEl = document.getElementById('from_ammount');
//captura o campo da moeda que será convertida.
const to_currencyEl = document.getElementById('to_currency');
//campo que mostrará o valor da conversão.
const to_ammountEl = document.getElementById('to_ammount');
//captura posição da div que mostrará a taxa de conversão entre 2 moedas. 
const rateEl = document.getElementById('rate');
//botão para inverter as moedas na conversão.
const exchange = document.getElementById('exchange');
//pega o símbolo da moeda from. placeholder é $
const from_cur = document.getElementById('from_cur')
//pega o símbolo da moeda to. placeholder é $.
const to_cur = document.getElementById('to_cur')
//variável com valor atribuido do código de 3 dígitos da moeda base.
const fromCur = from_currencyEl.value
//variável com valor atribuido com código de 3 dígitos da moeda convertida. 
const toCur = to_currencyEl.value

from_currencyEl.addEventListener('change', calculate);
from_ammountEl.addEventListener('input', calculate);
to_currencyEl.addEventListener('change', calculate);
to_ammountEl.addEventListener('input', calculate);

exchange.addEventListener('click', () => {
	const temp = from_currencyEl.value;
	from_currencyEl.value = to_currencyEl.value;
	to_currencyEl.value = temp;

	calculate();
});


function calculate() {
	const from_currency = from_currencyEl.value;
	const to_currency = to_currencyEl.value;
	
	
	//função para mudar o placeholder dos campos de moeda base e convertida.
function mudarS(){
	//insere o resultado da função simbolos com o parâmetro de código de moeda. Retorna o símbolo.
	from_cur.innerText = simbolos(fromCur);
	to_cur.innerText = simbolos(toCur);
	//teoricamente neste momento os campos de valor devem estar refletindo as moedas escolhidas e seu símbolo amigável.
}

//simbolos recebe o código de 3 dígitos e converte para uma string amigável para quem está convertendo, tipo R$ ou USS.
function simbolos(code){
	if (code === 'USD'){
		return 'US$'
	} 
	if (code === 'BRL'){
		return 'R$'
	} 
	//falta implementar o resto.
	else {
		return code
	}
}


    //fetch(`https://v6.exchangerate-api.com/v6/516e5bc223ba1d77a81ba97f/latest/USD`)
	fetch(`https://api.exchangerate-api.com/v4/latest/${from_currency}`)
        .then(res => res.json())
        .then(res => {
		const rate = res.rates[to_currency];
		console.log(`A cotação de 1 ${from_currency} para ${to_currency} é ${rate}`)
		rateEl.innerText = `${from_currency} 1.00 = ${to_currency} ${rate.toFixed(2)} `
		to_ammountEl.value = (from_ammountEl.value * rate).toFixed(2);
	})


	

	
}

calculate();