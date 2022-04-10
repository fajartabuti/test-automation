/* eslint-disable no-undef */
import { Selector, t } from 'testcafe';
import Page from '../ui-test/pom/page-object';

require('dotenv').config();

export default class helper {
    async Login() {
        await t
        //expect masuk ke login page
        .expect(Page.titleLoginPage.exists).ok('expected masuk ke login page')
        //input nomor telepon
        .typeText(Page.noTlpTextBox,process.env.USER)
        //input password
        .typeText(Page.passwordTextBox,process.env.PASSWORD)
        //klik button masuk
        .click(Page.masukButton)
        //expect masuk ke home page
        .expect(Page.berandaButton.exists).ok('expected masuk ke home page')
    }

    async FilterProductByPrice(minPrice, maxPrice) {
        await t
            //click kategori daftar produk
            .click(Selector('span').withText('Daftar Produk'))
            //expect masuk ke page daftar produk
            .expect(Selector('h1').withAttribute('class','appLayoutHeading__title').withText('Daftar Produk').exists).ok('expect masuk ke page daftar produk')
            //click button filter
            .click(Selector('span').withExactText('Filter'))
            //expect tampil panel filter produk
            .expect(Selector('.productFilter__panel').exists).ok('expect tampil panel filter produk')
            //input minimum price
            .typeText(Selector('.productFilter__price').find('.inputText__label').withText('Minimum').nextSibling('span').find('input'), minPrice)
            //input maximum price
            .typeText(Selector('.productFilter__price').find('.inputText__label').withText('Maksimum').nextSibling('span').find('input'), maxPrice)
            //click button terapkan
            .click(Selector('button').withExactText('Terapkan'))
            //expect product tampil
            .expect(Selector('.productItems').exists).ok('expect product tampil')
    }
}
