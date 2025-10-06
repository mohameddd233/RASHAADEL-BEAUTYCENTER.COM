
(function(){
  function gid(id){return document.getElementById(id)}
  function save(key,val){localStorage.setItem(key,JSON.stringify(val))}
  function load(key){return JSON.parse(localStorage.getItem(key)||'null')}

  function seed(){
    if(!load('users')){
      save('users',[{username:'rashaadel23',password:'rashaadel2333',role:'admin'},{username:'mariam',password:'mariam123',role:'staff'}]);
    }
    if(!load('services')){
      save('services',[{id:1,name:'Facial Basic',price:250},{id:2,name:'Deep Clean',price:400},{id:3,name:'Wax Face',price:150},{id:4,name:'Wax Legs',price:300},{id:5,name:'Manicure',price:120},{id:6,name:'Pedicure',price:150}]);
    }
    if(!load('clients')) save('clients',[]);
    if(!load('invoices')) save('invoices',[]);
  }

  function login(u,p){ const us=load('users')||[]; return us.find(x=>x.username===u && x.password===p) || null }
  function logout(){ localStorage.removeItem('currentUser') }
  function currentUser(){ return load('currentUser') }

  window.app={
    init:function(){seed()},
    login:function(u,p){ const user=login(u,p); if(user){ localStorage.setItem('currentUser',JSON.stringify(user)); } return user },
    logout:logout,
    currentUser:currentUser,
    getServices:function(){return load('services')||[]},
    getClients:function(){return load('clients')||[]},
    addClient:function(c){ const cl=load('clients')||[]; cl.push(c); save('clients',cl); return cl },
    addUser:function(u){ const us=load('users')||[]; us.push(u); save('users',us); return us },
    getUsers:function(){return load('users')||[]},
    addInvoice:function(inv){ const iv=load('invoices')||[]; iv.push(inv); save('invoices',iv); return iv },
    getInvoices:function(){return load('invoices')||[]},
    addService:function(s){ const ss=load('services')||[]; ss.push(s); save('services',ss); return ss }
  };

  document.addEventListener('DOMContentLoaded', seed);
})();
