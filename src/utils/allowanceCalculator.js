export function monthOf(date){return (date||'').slice(0,7)}
export function calcHours(records, month, name){
 const filtered=records.filter(r=>(!month||monthOf(r.date)===month)&&(!name||r.volunteerName===name));
 const service=filtered.reduce((s,r)=>s+(Number(r.hours)||0),0);
 const supervision=filtered.reduce((s,r)=>s+(Number(r.supervisionHours)||0),0);
 const group=filtered.filter(r=>['小組服務','活動支援','講座','培訓'].includes(r.type)).reduce((s,r)=>s+(Number(r.hours)||0),0);
 const cases=filtered.filter(r=>r.type==='個案服務').reduce((s,r)=>s+(Number(r.hours)||0),0);
 const transport=filtered.reduce((s,r)=>s+(Number(r.transportFee)||0),0);
 return {records:filtered,service,supervision,group,cases,transport,total:service+supervision};
}
export function allowance(records, settings, month, name){const x=calcHours(records,month,name);return {...x, serviceAllowance:x.total*Number(settings.allowancePerHour||0), grandTotal:x.total*Number(settings.allowancePerHour||0)+x.transport}}
export function ranking(records, volunteers, month){return volunteers.map(v=>({name:v.name,...calcHours(records,month,v.name)})).sort((a,b)=>b.total-a.total)}
