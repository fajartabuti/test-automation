import { Selector } from 'testcafe';
import uiHelper from '../../_helper/ui-helper';
import generalHelper from '../../_helper/general';

require('dotenv').config();

const helper = new uiHelper();

fixture `UI Test Automation`
    //go to base url
    .page`${process.env.EVERMOS_WEB_URL}`
    .beforeEach(async t => {
        await t.getBrowserConsoleMessages();
        // login forstok
        await helper.Login();
    });

test('Filter Product by Price', async t => {
    let minPrice = '50000'
    let maxPrice = '50000'

    //filter product by price menggunakan helper
    await helper.FilterProductByPrice(minPrice,maxPrice);

    //hitung berapa banyak element produk yang tampil
    let productCartBody = await Selector('.productCard__body')
    let totalProduct = await productCartBody.count
    
    //definisi variable untuk penampung dari harga produk yang difilter
    let productPrice = []

    for (let i = 0; i < totalProduct; i++) {
        if(await productCartBody.nth(i).child('.productCard__price--before').exists){
            let price = await productCartBody.nth(i).child('.productCard__price--before').innerText
            price = parseInt(await generalHelper.removeCurrency(price))
            productPrice.push(price)
        }
        else{
            let price = await productCartBody.nth(i).child('.productCard__price').innerText
            price = parseInt(await generalHelper.removeCurrency(price))
            productPrice.push(price)
        }
    }

    //expect harga produk yang tampil sesuai dengan data filter harga
    let isTrueProductPrice = true
    for (let i = 0; i < productPrice.length; i++) {
        if(productPrice[i] < parseInt(minPrice) || productPrice[i] > parseInt(maxPrice)){
            isTrueProductPrice = false
        }
    }

    await t.expect(isTrueProductPrice).eql(true)
})

test('Apply Voucher with Invalid Requirements', async t => {
    let minPrice = '25000'
    let maxPrice = '25000'
    let kodePromo = 'BERKAH5'

    //filter product by price menggunakan helper
    await helper.FilterProductByPrice(minPrice,maxPrice);

    //hitung berapa banyak element produk yang tampil
    let productCartBody = await Selector('.productCard__body')

    //expect produk tampil
    await t.expect(productCartBody.exists).ok('expect produk tampil')

    let price = 0
    //ambil harga produk untuk expect apakah sesuai filter
    if(await productCartBody.nth(0).child('.productCard__price--before').exists){
        price = await productCartBody.nth(i).child('.productCard__price--before').innerText
        price = parseInt(await generalHelper.removeCurrency(price))
    }
    else{
        price = await productCartBody.nth(0).child('.productCard__price').innerText
        price = parseInt(await generalHelper.removeCurrency(price))
    }

    let isTrueProductPrice = true
    //expect harga produk yang tampil sesuai dengan data filter harga
    if(price < parseInt(minPrice) || price > parseInt(maxPrice)){
        isTrueProductPrice = false
    }

    await t
        .expect(isTrueProductPrice).eql(true)
        //click produk pertama dari hasil filter
        .click(productCartBody.nth(0).prevSibling('.productCard__head'))
        //expect masuk ke product detail page
        .expect(Selector('span').withText('Beli Sekarang').exists).ok('expect masuk ke product detail page')
        //click button beli sekarang
        .click(Selector('span').withText('Beli Sekarang'))
        //expect tampil modal pilih alamat
        .expect(Selector('.appLayoutHeading__title').withText('Pilih Alamat Pengiriman').exists).ok('expect tampil modal pilih alamat')
        //click alamat teratas
        .click(Selector('.addressList__title').nth(0))
        //click button pilih alamat
        .click(Selector('button').withExactText('Pilih Alamat'))
        //expect berhasil pilih alamat
        .expect(Selector('button').withText('Lihat Keranjang').exists).ok('expect berhasil pilih alamat')
        //click button lihat keranjang
        .click(Selector('button').withText('Lihat Keranjang'))
        //expect masuk ke page keranjang
        .expect(Selector('.appLayoutHeading__title').withExactText('Keranjang').exists).ok('expect masuk ke page keranjang')
        //click button lanjut checkout
        .click(Selector('a').withText('Lanjut ke Checkout'))
        //expect masuk ke page checkout
        .expect(Selector('.appLayoutHeading__title').withExactText('Checkout').exists).ok('expect masuk ke page checkout')
        //input kode promo
        .typeText(Selector('input').withAttribute('placeholder','Masukkan Kode Promo'),kodePromo)
        //click gunakan promo button
        .click(Selector('.promo__button').withExactText('Gunakan'))
        //expect tampil popup voucher tidak dapat digunakan
        .expect(Selector('.appDialog__title').withText('Wah, Gagal!').exists).ok('expect tampil popup voucher tidak dapat digunakan')
})