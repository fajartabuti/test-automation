## Requirements ##
1. Pastikan telah terinstall NodeJS dan npm
2. jalankan perintah `npm i`
3. buat file `.env` pada root folder project
4. copy data `.env` sesuai dengan yang ada pada pdf yang saya kirimkan

## A. Menjalankan UI automation ##
1. Buka terminal pada root folder folder
2. jalankan perintah `npm run test_ui`
3. UI automation test berhasil dijalankan ditandai dengan kalimat 'allure reporter started...' pada terminal
4. tunggu sampai automation selesai berjalan, ditandai dengan kalimat 'allure reporter closed...' pada terminal

## B. Menjalankan API automation ##
1. Buka terminal pada root folder folder
2. jalankan perintah `npm run test_api`
3. tunggu sampai automation selesai berjalan.

## C. Membuka report hasil dari pengetesan ##
1. jalankan perintah `npm run allure_report` pada terminal untuk generate dan membuka report dari hasil pengetesan
2. automation report terbuka secara otomatis pada browser.