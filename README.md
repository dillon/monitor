## <span id="about"> Monitor - Ethereum Tracker<a href="https://github.com/dillon/monitor"><img align="left" src="https://github.com/dillon/monitor/blob/master/assets/web_hi_res_512.png?raw=true" width="85px" style="padding-right:15px"></a>

[![developer](https://img.shields.io/badge/developer-dillon-red.svg)](https://github.com/dillon/)
![](https://img.shields.io/github/last-commit/dillon/monitor.svg)

<span id="description">
A mobile app that keeps track of Ethereum transactions and balances.<br/>
Email app@dillonpetito.com for Testflight invite.
</span>

___

Separate repository with firebase cloud functions: [monitor-cloud-functions](https://github.com/dillon/monitor-cloud-functions)
___
<div style="line-height:1.2">

### Table of Contents

__[About](#about)__<br>
&nbsp;&nbsp;&nbsp;&nbsp;[Description](#description)<br>
&nbsp;&nbsp;&nbsp;&nbsp;[Screenshots](#screenshots)<br>
&nbsp;&nbsp;&nbsp;&nbsp;[Demo Video](#demo)<br>

__[Technical Details](#technical-details)__<br>
&nbsp;&nbsp;&nbsp;&nbsp;[Dependencies](#dependencies)<br>
&nbsp;&nbsp;&nbsp;&nbsp;[APIs](#apis)<br>

__[Firebase](#firebase)__<br>
&nbsp;&nbsp;&nbsp;&nbsp;[Firebase Cloud Functions](#functions)<br>
&nbsp;&nbsp;&nbsp;&nbsp;[Realtime Database](#database)<br>
&nbsp;&nbsp;&nbsp;&nbsp;[Cloud Messaging](#cloud-messaging)<br>
&nbsp;&nbsp;&nbsp;&nbsp;[User Authentication](#authentication)<br>

</div>

___
#### <span id="screenshots">Screenshots</span>
<div style="display:flex;flex-direction:row">
<img alt="app gif 1" width="33%" align="center" src="https://github.com/dillon/monitor/blob/master/assets/screenshots/gifs/one-compressed.gif?raw=true">
<img alt="app gif 2" width="33%" align="center" src="https://github.com/dillon/monitor/blob/master/assets/screenshots/gifs/two-compressed.gif?raw=true">
<img alt="app gif 3" width="33%" align="center" src="https://github.com/dillon/monitor/blob/master/assets/screenshots/gifs/three-compressed.gif?raw=true">
</div>

<div style="display:flex;flex-direction:row">
<img alt="screenshot" width="33%" align="center" src="https://github.com/dillon/monitor/blob/master/assets/screenshots/images/one.jpg?raw=true">
<img alt="screenshot" width="33%" align="center" src="https://github.com/dillon/monitor/blob/master/assets/screenshots/images/six.jpg?raw=true">
<img alt="screenshot" width="33%" align="center" src="https://github.com/dillon/monitor/blob/master/assets/screenshots/images/four.jpg?raw=true">
</div>


<!-- <div style="display:flex;flex-direction:row"> -->
<!-- <img alt="screenshot" width="33%" align="center" src="https://github.com/dillon/monitor/blob/master/assets/screenshots/images/two.jpg?raw=true"> -->
<!-- <img alt="screenshot" width="33%" align="center" src="https://github.com/dillon/monitor/blob/master/assets/screenshots/images/three.jpg?raw=true"> -->
<!-- <img alt="screenshot" width="33%" align="center" src="https://github.com/dillon/monitor/blob/master/assets/screenshots/images/five.jpg?raw=true"> -->
<!-- </div> -->


<!-- #### <span id="demo">Demo Video</span>

<a href="http://www.youtube.com/watch?feature=player_embedded&v=3HaIw0yAygI
" target="_blank"><img src="http://img.youtube.com/vi/3HaIw0yAygI/0.jpg" 
alt="Youtube Video" width="480" height="360" border="10" /></a>
-->

___
### <span id="technical-details">Technical Details</span>

#### <span id="dependencies">Dependencies</span>

|react|react-native|react-native-firebase|
|--|--|--|

|react-navigation|react-native-swipeout|
|--|--|

|react-native-vector-icons|react-native-gesture-handler|
|--|--|

|crypto-js|moment|
|--|--|


#### <span id="apis">APIs</span>

[__BlockCypher__](https://www.blockcypher.com/dev/ethereum/)
> Fetching address balances and previous transactions

[__Etherscan__](https://etherscan.io/apis)
> Subscribing to webhooks for new transactions on specified wallets.


___
### <span id="firebase">Firebase</span>

#### <span id="functions">Firebase Cloud Functions</span>

Code comprising all four firebase cloud functions can be found in [this repository](https://github.com/dillon/monitor-cloud-functions)

1. `newUser` creates a corresponding database entry for each new user sign up.
2. `deleteUser` deletes all corresponding database info and deletes all associated webhooks users who delete their firebase auth account
3. `newWallet` fetches balance and most recent 10,000 transactions for new wallets via the Etherscan API and populates the Firebase Realtime Database. Also listens for new transactions by creating a webhook with the BlockCypher API
4. `webhookEndpoint` a webhook callback function that accents new transactions, sends a push notification to the user associated with the wallet and populates the Firebase Realtime Database with new transactions.


#### <span id="database">Realtime Database</span>
```
.
└── users 
│   └── uid : user id from firebase auth
|       ├── email     : email associated with account
|       ├── createdOn : date account was created
|       ├── pushToken : token used for push notifications
|       └── wallets
│           └── key 
│               ├── address    : wallet address
│               ├── nickname   : user-defined name
│               ├── balance    : ETH balance
│               ├── createdOn  : date wallet was created
│               ├── webhookId  : BlockCypher webhook id
│               ├── isFetchingTransactions : true while using etherscan api
│               └── transactions 
│                   └── key 
│                       ├── txHash      : full tx hash
│                       └── value       : value in ETH
│                       ├── type        : outgoing/incoming/other
│                       ├── fromAddress : outgoing wallet
│                       ├── toAddress   : incoming wallet
│                       ├── blockHash   : hash of mined block tx was in
│                       ├── blockNumber : number of mined block tx was in
│                       ├── timeStamp   : unix timestamp
│                       ├── dateString  : parsed timestamp
│                       ├── gasPrice    : price of gas
│                       ├── gasUsed     : gas used
```


#### <span id="cloud-messaging">Cloud Messaging</span>

1. Push notification permissions are initialized on login.
2. The client collects the unique device token (as well as listens for changes) and pushes it to the realtime database.
3. [Firebase Functions](#functions) handles webhook callbacks and sending push notifications to users on new transactions.

#### <span id="authentication">User Authentication</span>
Standard email/password user auth using [react-native-firebase](https://github.com/invertase/react-native-firebase)

___
### More 

Good Test Wallets
- wallet with 17 txs 0xe8f6f556d571d149a4156aeb642a3acc7e966fe8
- 230 txs 0x995a25a5bc27c239cc40453ce4a436532b9fc01c
- 0 txs 0x27337b5363ebfd784775cc85b978fc7b02f59cae
