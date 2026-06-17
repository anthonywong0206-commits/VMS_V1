import * as XLSX from 'xlsx';
import { uid } from './storage';
const aliases={日期:'date',服務日期:'date',個案編號:'caseNo',服務對象:'serviceTarget',服務形式:'form',義工姓名:'volunteerName',樂齡之友:'volunteerName',開始時間:'startTime',到達時間:'startTime',結束時間:'endTime',離開時間:'endTime',服務時數:'hours',時數:'hours',備註:'remark',出發地:'from',目的地:'to',交通工具:'transport',交通費:'transportFee'};
export async function importWorkbook(file, volunteers=[]){
 const buf=await file.arrayBuffer();const wb=XLSX.read(buf,{type:'array',cellDates:true});const ws=wb.Sheets[wb.SheetNames[0]];const rows=XLSX.utils.sheet_to_json(ws,{defval:''});const errors=[];
 const known=new Set(volunteers.map(v=>v.name));
 const records=rows.map((row,i)=>{const out={id:uid(),type:'個案服務',activityName:''};Object.entries(row).forEach(([k,v])=>{out[aliases[String(k).trim()]||k]=v});
  if(out.date instanceof Date) out.date=out.date.toISOString().slice(0,10); if(typeof out.date==='number') out.date=XLSX.SSF.format('yyyy-mm-dd',out.date);
  out.hours=Number(out.hours||0); out.transportFee=Number(out.transportFee||0); out.supervisionHours=0;
  if(!out.date) errors.push(`第 ${i+2} 行：缺少日期`); if(!out.volunteerName) errors.push(`第 ${i+2} 行：缺少義工姓名`); if(out.volunteerName&&!known.has(out.volunteerName)) errors.push(`第 ${i+2} 行：義工姓名不存在：${out.volunteerName}`); if(Number.isNaN(out.hours)) errors.push(`第 ${i+2} 行：服務時數不是數字`);
  return out});
 return {records,errors};
}
export function makeImportTemplate(){
 const ws=XLSX.utils.json_to_sheet([{日期:'2026-06-15',個案編號:'C2026-001',服務對象:'陳婆婆',服務形式:'電話聯絡 / 慰問',義工姓名:'楊耀榮',開始時間:'10:00',結束時間:'10:30',服務時數:0.5,備註:'',出發地:'',目的地:'',交通工具:'',交通費:0}]);
 const wb=XLSX.utils.book_new(); XLSX.utils.book_append_sheet(wb,ws,'Import Template'); XLSX.writeFile(wb,'個案服務匯入範本.xlsx');
}
