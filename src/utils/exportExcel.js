import * as XLSX from 'xlsx';
import { allowance } from './allowanceCalculator';
function downloadWorkbook(wb, filename){XLSX.writeFile(wb, filename, { compression:true });}
export async function exportServiceHoursTemplate(data, month, volunteerName){
 const a=allowance(data.records,data.settings,month,volunteerName); const s=data.settings;
 const rows=[];
 rows.push(['賽馬會樂齡同行計劃']);
 rows.push(['樂齡之友服務時數紀錄表 + 交通費申請表']);
 rows.push([]);
 rows.push(['樂齡之友姓名',volunteerName,'服務月份',month.split('-')[1],'服務年份',month.split('-')[0]]);
 rows.push([]);
 rows.push(['日期','服務對象','到達時間','離開時間','服務時數','服務形式','備註','出發地','目的地','交通工具','交通費']);
 a.records.forEach(r=>rows.push([r.date,r.serviceTarget||r.caseNo||'/',r.startTime,r.endTime,Number(r.hours||0)+Number(r.supervisionHours||0),r.form||r.type,r.remark||r.activityName||'',r.from||'',r.to||'',r.transport||'',Number(r.transportFee||0)]));
 rows.push([]);
 rows.push(['總服務時數',a.total,'小時','','交通費總和',a.transport]);
 rows.push(['津貼 / 薪金計算',`${a.total} 小時 x $${s.allowancePerHour}`,a.serviceAllowance]);
 rows.push(['交通費計算',a.transport]);
 rows.push(['總金額',a.grandTotal]);
 rows.push([]);
 rows.push(['樂齡之友簽署','','負責職員簽署',s.checker]);
 const ws=XLSX.utils.aoa_to_sheet(rows); ws['!cols']=[{wch:14},{wch:16},{wch:12},{wch:12},{wch:12},{wch:24},{wch:24},{wch:14},{wch:14},{wch:14},{wch:10}];
 const wb=XLSX.utils.book_new(); XLSX.utils.book_append_sheet(wb,ws,'服務時數紀錄表'); downloadWorkbook(wb,`服務時數紀錄表_${volunteerName}_${month}.xlsx`);
}
export async function exportAllowanceMaster(data, month){
 const rows=[['月份','義工姓名','服務時數','督導時數','總時數','交通費','服務津貼','津貼總額']];
 data.volunteers.forEach(v=>{const a=allowance(data.records,data.settings,month,v.name); rows.push([month,v.name,a.service,a.supervision,a.total,a.transport,a.serviceAllowance,a.grandTotal]);});
 const ws=XLSX.utils.aoa_to_sheet(rows); ws['!cols']=[{wch:12},{wch:16},{wch:12},{wch:12},{wch:12},{wch:12},{wch:12},{wch:14}];
 const wb=XLSX.utils.book_new(); XLSX.utils.book_append_sheet(wb,ws,'津貼總表'); downloadWorkbook(wb,`津貼master匯出_${month}.xlsx`);
}
