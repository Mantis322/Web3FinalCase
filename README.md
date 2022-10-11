

## Final Case Dökümantasyonu

V.2 Update:

- Select box eklendi(Css'i yapılmadı).
- React contract adress kısmı hala çalışmıyor
- Fonksiyonlara alert eklendi.



Bu kontratın amacı, gizli olmayan(açık artırmaya katılan adreslerin gizli tutulması) bir açık artırmanın genel olarak nasıl
olduğunu anlamak ve bunun bir simülasyonunu oluşturmaktır.

Solidity kodunu şuradan bulabilirsiniz.
```
contracts/FinalCase.sol
```

Bu kontrat next.js üzerinden frontend tabanlı yapılmıştır.

```
npm run dev
```
komutunu çalıştırarak kontrat ile etkileşime girebilirsiniz.Fakat daha önce kullanmış olduğunuz test network'üne kontratı
deploy etmiş olmanız gerekmektedir. Web sitesi test network üzerinde deploy edilmiş kontrat adresi ile etkileşime geçmektedir.

Websitesi için bir üst kodu çalıştırdıktan sonra
```
http://localhost:3000
```
adresine gidip kullandığınız wallet'ı web sitesine bağlamalısınız.

Daha sonra bir açık arttırma launchlamanız gerekiyor. Gerekli adımları izleyerek açık arttırma launchlayınız.
```
->truffle console
let instance = await FinalCase.deployed()
instance.launch("Açık arttırma ismi","Sembol","Açık Attırma Süresi(Dk)")
```


## Final Case Documentation

V.2 Update:

- Select box added(Css still waiting to coding).
- In react page, contract address input not working.
- Alert has been added to the functions.

The purpose of this contract is to describe how a non-confidential (confidentiality of auction addresses) auction is
generally held.

You can find Solidity code  here.

```
contracts/FinalCase.sol
```

This contract is based on the frontend over next.js.

```
npm run dev
```
You can interact with the contract by running the command but first you must have deployed the contract . The website interacts
with the contract address deployed on the test network.

For the Website after running code above

```
http://localhost:3000
```
Go to the this address and connect the wallet you use to the website.

Next you need to launch an bid. Start the bid by following the necessary steps.

```
->truffle console
let instance = await FinalCase.deployed()
instance.launch("BidName","Symbol","BidTime(Min)")
```
