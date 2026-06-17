export const seed = {
  volunteers:[
    {id:'v001',code:'JY001',name:'楊耀榮',enName:'Yeung Yiu Wing',phone:'91234567',startDate:'2026-01-01',status:'啟用',transportEligible:true,remark:''},
    {id:'v002',code:'JY002',name:'李小明',enName:'Lee Siu Ming',phone:'92345678',startDate:'2026-02-01',status:'啟用',transportEligible:true,remark:''},
    {id:'v003',code:'JY003',name:'陳大文',enName:'Chan Tai Man',phone:'93456789',startDate:'2026-03-01',status:'啟用',transportEligible:false,remark:''}
  ],
  records:[
    {id:'r1',date:'2026-06-15',type:'小組服務',activityName:'精神健康小組',caseNo:'/',serviceTarget:'/',form:'陪同及協助參與小組',volunteerName:'楊耀榮',startTime:'09:30',endTime:'11:30',hours:2,supervisionHours:0,transportFee:0,from:'',to:'',transport:'',remark:'小組支援'},
    {id:'r2',date:'2026-06-18',type:'督導',activityName:'督導會議',caseNo:'/',serviceTarget:'/',form:'其他',volunteerName:'楊耀榮',startTime:'13:00',endTime:'14:00',hours:1,supervisionHours:1,transportFee:0,from:'',to:'',transport:'',remark:'督導會議'},
    {id:'r3',date:'2026-06-20',type:'個案服務',activityName:'',caseNo:'C2026-001',serviceTarget:'陳婆婆',form:'電話聯絡 / 慰問',volunteerName:'李小明',startTime:'10:00',endTime:'10:30',hours:.5,supervisionHours:0,transportFee:0,from:'',to:'',transport:'',remark:''}
  ],
  settings:{unitName:'聖公會聖匠堂長者地區中心',programmeName:'賽馬會樂齡同行計劃',organisation:'香港聖公會福利協會有限公司',allowancePerHour:75,checker:'袁祉筠',approver:'梁善姚',voucherPrefix:'II-A1-c-HCC',yearBudget:100000}
};
export function loadData(){const raw=localStorage.getItem('vhms-data');return raw?JSON.parse(raw):structuredClone(seed)}
export function saveData(data){localStorage.setItem('vhms-data',JSON.stringify(data))}
export const uid=()=>Math.random().toString(36).slice(2,10);
