App = {
    web3Provider: null,
    contracts: {},
  
    init: function() {
      return App.initWeb3();
    },  
    initWeb3: function() {
      if(typeof web3 !== 'undefined'){ App.web3Provider = web3.currentProvider; }
      else { App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545'); }

      App.web3 = new Web3(App.web3Provider);
      
      console.log("Web3 initialized. (" + web3.version.api + ")");
      // return App.initContract();
      return App.initTruffleContract();
    },

    initTruffleContract: function() {
      $.getJSON("SampleContract.json", function(data){
        var artifact = data;
        App.contracts.SampleContract = TruffleContract(artifact);
        App.contracts.SampleContract.setProvider(App.web3Provider);

        console.log("Truffle contract initialized.");
      }).then(function(){
        setTimeout(function() {
          App.callTruffleContract();
        }, 6000);
      });

      // App.testBlock();      
      // App.getBalance();
      // App.callContract();
      // App.filter();
    },

    sendToTruffleContract : function(value){
      web3.eth.getAccounts(function(error, accounts){
        if(error){ 
          console.log(error);
          return ;
        }

        var account = accounts[0];
        
        App.contracts.SampleContract.deployed()
        .then(function(instance){
          return instance.Update(value, {from: account});
        })
        .then(function(result){
          console.log("...");
          setTimeout(function() {
            App.callTruffleContract();
          }, 3000);
        })
        .catch(function(err) {
          console.error(err.message);
        });  
      });
    },

    callTruffleContract : function(){
      App.contracts.SampleContract.deployed()
      .then(function(instance){
        //Call Get method from contract 
        instance.Get.call().then(function(result){
          console.log(result.toNumber());
        });
      });
    },

    initContract: function() {
      $.getJSON("SampleContract.json", function(data){
        var MyContract = web3.eth.contract(data.abi);
        var myContractInstance = MyContract.at('0x9213e98a5f580a4e4f94f77f72a4a695b4087a49');

        console.log("Contract initialized.");
        return myContractInstance;
      }).then(function(myContractInstance){
        var result = myContractInstance.Get();
        console.log(result)
      });

      // App.testBlock();      
      // App.getBalance();
      // App.callContract();
      // App.filter();
    },

    filter : function(){
      //TODO : Not working!!!!

      // var filter = web3.eth.filter(filterString);
      // var filter = web3.eth.filter(options);

      // // watch for changes
      // filter.watch(function(error, result){
      //   if (!error)
      //     console.log(result);
      // });

      // //////
      // web3.eth.filter(options, function(error, result){
      //   if (!error)
      //     console.log(result);
      // });
    },
    callContract : function (){
      //TODO : Not working!!!!
      // callObject = {
      //   to: "0x9213e98a5f580a4e4f94f77f72a4a695b4087a49", 
      //   data: "0xc6888fa10000000000000000000000000000000000000000000000000000000000000003"
      // };

      // web3.eth.call(callObject, web3.eth.defaultBlock, function(err, res){

      // });
    },
    getBalance : function (){
      var balance = web3.eth.getBalance("0xC475Ac0eA09A087d16d86e181832AE0B91D3f626", function(error, balance){
        console.log(balance.toNumber());
      });
    },

    testBlock : function(){
      web3.eth.getBlock(1, function(error, result){
        if(!error)
            console.log(JSON.stringify(result));
        else
            console.error(error);
      })
    }
  };
  
  $(function(){
    $(window).load(function(){
      App.init();
    });
  });