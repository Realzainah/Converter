document.addEventListener('DOMContentLoaded', () => {
    fetchCoinData();
    document.getElementById('currency-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const amount = document.getElementById('amount').value;
        const fromCoin = document.getElementById('from').value;
        const toCoin = document.getElementById('to').value;
        
        fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${fromCoin}&vs_currencies=${toCoin}`)
        .then(response => response.json())
        .then(data => {
            const rate = data[fromCoin][toCoin];
            const convertedAmount = (rate / 1).toLocaleString('en-US', {
                style: 'currency',
                currency: toCoin,
            });
            alert(`${amount} ${fromCoin} is approximately ${convertedAmount} ${toCoin}`);
        })
        .catch(error => console.error('Error:', error));
    });
});

function fetchCoinData() {
    fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false')
        .then(response => response.json())
        .then(data => {
            const priceData = document.getElementById('price-data');
            data.forEach(coin => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${coin.name}</td>
                    <td>${coin.current_price.toLocaleString('en-US')}</td>
                `;
                priceData.appendChild(row);
            });
        })
        .catch(error => console.error('Error:', error));
}