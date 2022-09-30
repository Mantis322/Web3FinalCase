

## Final Case Dökümantasyonu 

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

## Final Case Documentation

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