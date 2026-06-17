import ExcelJS from 'exceljs';import { saveAs } from 'file-saver';import { allowance } from './allowanceCalculator';
function excelDate(date){const d=new Date(date+'T00:00:00');return d}
function t2n(t){if(!t)return '';const[a,b]=String(t).split(':').map(Number);return (a*60+b)/1440}
export async function exportServiceHoursTemplate(data, month, volunteerName){
 const res=await fetch('/templates/service-hours-template.xlsx');const buf=await res.arrayBuffer();const wb=new ExcelJS.Workbook();await wb.xlsx.load(buf);
 const src=wb.getWorksheet(volunteerName)||wb.worksheets[0];src.name=volunteerName.slice(0,31);
 const settings=data.settings;const a=allowance(data.records,settings,month,volunteerName);const rows=a.records;
 src.getCell('C4').value=volunteerName;src.getCell('K4').value=Number(month.split('-')[1]);src.getCell('N4').value=Number(month.split('-')[0]);
 for(let r=7;r<=40;r++){['B','C','D','E','F','G','H','J','K','L','M','N'].forEach(c=>{src.getCell(`${c}${r}`).value=null})}
 rows.forEach((rec,i)=>{const r=7+i;src.getCell(`B${r}`).value=excelDate(rec.date);src.getCell(`C${r}`).value=rec.serviceTarget||rec.caseNo||'/';src.getCell(`D${r}`).value=t2n(rec.startTime);src.getCell(`E${r}`).value=t2n(rec.endTime);src.getCell(`F${r}`).value=Number(rec.hours||0)+Number(rec.supervisionHours||0);src.getCell(`G${r}`).value=rec.form||rec.type;src.getCell(`H${r}`).value=rec.remark||rec.activityName||'';src.getCell(`J${r}`).value=rec.from||'';src.getCell(`K${r}`).value=rec.to||'';src.getCell(`L${r}`).value=rec.transport||'';src.getCell(`M${r}`).value=Number(rec.transportFee||0);});
 const totalRow=7+rows.length+1;src.getCell(`D${totalRow}`).value='總服務時數：';src.getCell(`F${totalRow}`).value=a.total;src.getCell(`G${totalRow}`).value='小時';src.getCell(`J${totalRow}`).value='交通費總和：';src.getCell(`M${totalRow}`).value=a.transport;
 const calcRow=totalRow+5;src.getCell(`F${calcRow}`).value=a.total;src.getCell(`J${calcRow}`).value=a.serviceAllowance;src.getCell(`J${calcRow+1}`).value=a.transport;
 src.getCell(`D${calcRow+6}`).value=volunteerName;src.getCell(`L${calcRow+6}`).value=settings.checker;
 const out=await wb.xlsx.writeBuffer();saveAs(new Blob([out]),`服務時數紀錄表_${volunteerName}_${month}.xlsx`)
}
export async function exportAllowanceMaster(data, month){
 const res=await fetch('/templates/allowance-master-template.xlsx');const buf=await res.arrayBuffer();const wb=new ExcelJS.Workbook();await wb.xlsx.load(buf);let ws=wb.getWorksheet('VHMS_Export')||wb.addWorksheet('VHMS_Export');ws.spliceRows(1,ws.rowCount||1);
 ws.columns=[{header:'月份',key:'month',width:12},{header:'義工姓名',key:'name',width:16},{header:'服務時數',key:'service',width:12},{header:'督導時數',key:'supervision',width:12},{header:'總時數',key:'total',width:12},{header:'交通費',key:'transport',width:12},{header:'津貼總額',key:'grandTotal',width:14}];
 data.volunteers.forEach(v=>{const a=allowance(data.records,data.settings,month,v.name);ws.addRow({month,name:v.name,service:a.service,supervision:a.supervision,total:a.total,transport:a.transport,grandTotal:a.grandTotal})});
 ws.getRow(1).font={bold:true};ws.eachRow(r=>r.eachCell(c=>{c.border={top:{style:'thin'},left:{style:'thin'},bottom:{style:'thin'},right:{style:'thin'}}}));
 const out=await wb.xlsx.writeBuffer();saveAs(new Blob([out]),`津貼master匯出_${month}.xlsx`)
}
