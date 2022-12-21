const prompt = require("prompt-sync")({ sigint: true });

const ordersUser = []

const dataDrinks = [
    {
        name: 'Pepsi',
        price: 5,
        id: 1
    },
    {
        name: 'Cola',
        id: 2,
        price: 1,
    },
    {
        name: 'Coffe kenangan',
        id: 3,
        price: 10,
    },
    {
        name: 'Gooday Coffe Botle',
        id: 4,
        price: 20
    },
    {
        name: 'Sprite',
        id: 5,
        price: 50
    },
    {
        name: 'Coffee Starbuck',
        id: 6,
        price: 100
    }
]

const printAllDrinks = () => {
    dataDrinks.map((drink, index) => {
        console.log(`${index + 1}. ${drink.name} dengan Harga : Rp ${drink.price}`);
    })
}

let lopping = true

while (lopping) {

    console.log(`
    -----------------------------------------------------------------------------------
    --------------------------- Mesin Minuman otomatis --------------------------------
    -----------------------------------------------------------------------------------
    
    Tersedia Minuman otomatis
    List minumana sebagai berikut : 
    `);

    // Print minuman
    printAllDrinks()

    console.log('')
    console.log('Silahkan pilih pesanan yang ingin anda pesan dengan nomer minuman')
    // Input nomer minuman
    const drinkIndex = prompt("Pilih minuman nomer berapa ? ");
    const checkIfExistOrder = ordersUser.filter((value) => value.id == drinkIndex)

    if (checkIfExistOrder[0]) {
        console.log('Maaf pesanan sudah ada silahkan pesan yang lain lagi');
    } else {


        const choseeDrink = dataDrinks.filter((value) => value.id == drinkIndex)

        if (typeof parseInt(drinkIndex) === 'number') {

            if (choseeDrink[0]) {

                const drinkQuantity = prompt("berapa jumlah pesanan ? ");
                ordersUser.push({ ...choseeDrink[0], quantity: parseInt(drinkQuantity) })

                const confirmOrder = prompt(`Apakah masih ada pesanan lagi? [iya, tidak]`);
                if (confirmOrder === 'ya' || confirmOrder === 'iya' || confirmOrder === 'yes') {
                    lopping = true
                } else {
                    lopping = false
                }

            } else {
                console.log('Maaf nomer minuman tidak ada, silahkan memilih kembali');
            }

        }


    }
}


console.log(`Konfirmasi pesanan anda`);
ordersUser.map((value, index) => console.log(`${index + 1}. ${value.name} - Rp ${value.price} Jumlah ${value.quantity}`));

let totalPrice = 0
ordersUser.map((a) => totalPrice += (a.price * a.quantity), 0);

console.log(`Total pesanan yang harus dibayarkan adalah Rp ${totalPrice}`);


const returnPrice = (totalPrice, money) => {

    if (money < totalPrice) {
        console.log('Maaf uang anda kurang');
        return {}
    }


    let moneyBack = money - totalPrice
    let payRemainder = money - totalPrice
    const moneyBackisValid = []


    while (payRemainder > 0) {

        if (payRemainder >= 100) {
            payRemainder = payRemainder - 100
            moneyBackisValid.push(100)
        } else if (payRemainder >= 50) {
            payRemainder = payRemainder - 50
            moneyBackisValid.push(50)
        } else if (payRemainder >= 20) {
            payRemainder = payRemainder - 20
            moneyBackisValid.push(20)
        } else if (payRemainder >= 10) {
            payRemainder = payRemainder - 10
            moneyBackisValid.push(10)
        } else if (payRemainder >= 5) {
            payRemainder = payRemainder - 5
            moneyBackisValid.push(5)
        } else {
            payRemainder = payRemainder - 1
            moneyBackisValid.push(1)
        }
    }


    return { moneyBackisValid, moneyBack }
}


let takePay = true

while (takePay) {


    const payPrice = parseInt(prompt(`Silahkan masukan uang ke mesin senilai [Untuk uang hanya bisa di nilai: 10, 20, 50, 100] : `))


    if (isNaN(payPrice)) {
        console.log('Mohon harus angka');
        return
    }

    if (payPrice === 10 || payPrice === 20 || payPrice === 50 || payPrice === 100) {
        const { moneyBack, moneyBackisValid } = returnPrice(totalPrice, payPrice)
        if (moneyBack >= 0 && moneyBackisValid) {
            console.log(`
            Berhasil memesan uang anda senilai Rp ${payPrice}
            silahkan ambil uang kembalian anda senilai Rp ${moneyBack} dengan nominal pecahan ${moneyBackisValid}
            `);
            takePay = false;
        }
    } else {
        console.log('Maaf tidak bisa');
    }

}