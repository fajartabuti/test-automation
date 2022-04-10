import { Selector } from 'testcafe';

class Page {
    constructor () {
        //text
        this.titleLoginPage = Selector('h1').withAttribute('class','pageCopy__title').withText('Ayo Masuk!')
        
        //button
        this.masukButton = Selector('button').withText('Masuk')
        this.berandaButton = Selector('span').withText('Beranda')

        //field
        this.noTlpTextBox = Selector('input').withAttribute('placeholder','Nomor Telepon Anda')
        this.passwordTextBox = Selector('input').withAttribute('placeholder','Kata Sandi Anda')
    }
}

export default new Page();
