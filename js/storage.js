const SPENDLY_KEYS={user:"spendly_user",transactions:"spendly_transactions",budgets:"spendly_budgets",goals:"spendly_goals",settings:"spendly_settings",theme:"spendly_theme"};
const expenseCategories=["Food","Shopping","Transport","Bills","Entertainment","Health","Education","Travel","Subscriptions","Other"];
const incomeCategories=["Salary","Freelance","Business","Investment","Gift","Other"];
const categoryIcons={Food:"🍔",Shopping:"🛍️",Transport:"🚗",Bills:"💡",Entertainment:"🎬",Health:"❤️",Education:"📚",Travel:"✈️",Subscriptions:"📺",Salary:"💼",Freelance:"💻",Business:"🏢",Investment:"📈",Gift:"🎁",Other:"•"};
const currencySymbols={INR:"₹",USD:"$",EUR:"€",GBP:"£"};
function uid(){return (crypto&&crypto.randomUUID)?crypto.randomUUID():"id-"+Date.now()+"-"+Math.random().toString(16).slice(2)}
function safeParse(key,fallback){try{const raw=localStorage.getItem(key);return raw?JSON.parse(raw):fallback}catch(e){return fallback}}
function save(key,value){localStorage.setItem(key,JSON.stringify(value))}
function getUser(){return safeParse(SPENDLY_KEYS.user,{name:"Rajneesh Dwivedi",email:"demo@spendly.app"})}
function getSettings(){return safeParse(SPENDLY_KEYS.settings,{currency:"INR",defaultType:"expense",defaultCategory:"Food",monthStart:1})}
function getTransactions(){return safeParse(SPENDLY_KEYS.transactions,[])}
function getBudgets(){return safeParse(SPENDLY_KEYS.budgets,[])}
function getGoals(){return safeParse(SPENDLY_KEYS.goals,[])}
function saveUser(v){save(SPENDLY_KEYS.user,v)}
function saveSettings(v){save(SPENDLY_KEYS.settings,v)}
function saveTransactions(v){save(SPENDLY_KEYS.transactions,v)}
function saveBudgets(v){save(SPENDLY_KEYS.budgets,v)}
function saveGoals(v){save(SPENDLY_KEYS.goals,v)}
function formatMoney(amount){const s=currencySymbols[getSettings().currency]||"₹";return s+Number(amount||0).toLocaleString("en-IN",{minimumFractionDigits:0,maximumFractionDigits:2})}
function formatDate(date){if(!date)return "";return new Date(date+"T00:00:00").toLocaleDateString("en-IN",{day:"2-digit",month:"short",year:"numeric"})}
function monthKey(date){return date instanceof Date?`${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,"0")}`:String(date).slice(0,7)}
function todayISO(){const d=new Date();return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`}
function createDemoData(){const now=new Date(), ym=monthKey(now);const prev=new Date(now.getFullYear(),now.getMonth()-1,15);const p=monthKey(prev);
 const transactions=[
 {id:uid(),type:"income",amount:50000,description:"Salary",category:"Salary",date:`${ym}-01`,payment:"Bank Transfer",notes:"Monthly salary",recurring:true,frequency:"Monthly"},
 {id:uid(),type:"income",amount:8000,description:"Freelance project",category:"Freelance",date:`${ym}-05`,payment:"UPI",notes:"Client payment",recurring:false},
 {id:uid(),type:"expense",amount:12000,description:"Rent",category:"Bills",date:`${ym}-02`,payment:"Bank Transfer",notes:"Monthly rent",recurring:true,frequency:"Monthly"},
 {id:uid(),type:"expense",amount:3500,description:"Groceries",category:"Food",date:`${ym}-04`,payment:"UPI",notes:"Weekly groceries",recurring:false},
 {id:uid(),type:"expense",amount:2000,description:"Fuel",category:"Transport",date:`${ym}-06`,payment:"Credit Card",notes:"Bike fuel",recurring:false},
 {id:uid(),type:"expense",amount:649,description:"Netflix",category:"Subscriptions",date:`${ym}-07`,payment:"Credit Card",notes:"Monthly subscription",recurring:true,frequency:"Monthly"},
 {id:uid(),type:"expense",amount:850,description:"Restaurant dinner",category:"Food",date:`${ym}-08`,payment:"UPI",notes:"Dinner",recurring:false},
 {id:uid(),type:"expense",amount:2500,description:"Shopping",category:"Shopping",date:`${ym}-09`,payment:"Debit Card",notes:"Clothes",recurring:false},
 {id:uid(),type:"expense",amount:1800,description:"Electricity",category:"Bills",date:`${ym}-10`,payment:"UPI",notes:"Power bill",recurring:false},
 {id:uid(),type:"expense",amount:900,description:"Badminton court",category:"Entertainment",date:`${ym}-11`,payment:"UPI",notes:"Sports",recurring:false},
 {id:uid(),type:"expense",amount:1400,description:"Medicine",category:"Health",date:`${p}-15`,payment:"UPI",notes:"Pharmacy",recurring:false},
 {id:uid(),type:"income",amount:42000,description:"Salary",category:"Salary",date:`${p}-01`,payment:"Bank Transfer",notes:"Monthly salary",recurring:true,frequency:"Monthly"},
 {id:uid(),type:"expense",amount:11500,description:"Rent",category:"Bills",date:`${p}-02`,payment:"Bank Transfer",notes:"Monthly rent",recurring:true,frequency:"Monthly"},
 {id:uid(),type:"expense",amount:2900,description:"Groceries",category:"Food",date:`${p}-08`,payment:"UPI",notes:"Groceries",recurring:false}
 ];
 const budgets=expenseCategories.slice(0,7).map((c,i)=>({id:uid(),category:c,amount:[5000,4000,3000,16000,2500,3000,2000][i],month:ym}));
 const goals=[{id:uid(),name:"New Bike",category:"Vehicle",target:100000,current:45000,targetDate:`${now.getFullYear()+1}-06-30`,description:"Save toward a new motorcycle."},{id:uid(),name:"Emergency Fund",category:"Safety",target:150000,current:68000,targetDate:`${now.getFullYear()+1}-12-31`,description:"Build a six-month safety cushion."}];
 saveUser({name:"Rajneesh Dwivedi",email:"demo@spendly.app"});saveSettings({currency:"INR",defaultType:"expense",defaultCategory:"Food",monthStart:1});saveTransactions(transactions);saveBudgets(budgets);saveGoals(goals);localStorage.setItem("spendly_initialized","true")}
function ensureInitialized(){if(!localStorage.getItem("spendly_initialized")||!Array.isArray(getTransactions()))createDemoData()}
function exportAllData(){return {user:getUser(),transactions:getTransactions(),budgets:getBudgets(),goals:getGoals(),settings:getSettings(),theme:localStorage.getItem(SPENDLY_KEYS.theme)||"light"}}
function validateImport(o){return o&&typeof o==="object"&&Array.isArray(o.transactions)&&Array.isArray(o.budgets)&&Array.isArray(o.goals)&&o.user&&o.settings}
