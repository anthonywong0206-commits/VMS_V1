import { saveAs } from 'file-saver';
import { allowance } from './allowanceCalculator';
function wordBlob(html){return new Blob(['\ufeff', html], {type:'application/msword;charset=utf-8'});}
export async function exportReceiptWord(data, month, name){
 const a=allowance(data.records,data.settings,month,name); const s=data.settings;
 const html=`<html><head><meta charset="utf-8"><style>body{font-family:"Microsoft JhengHei"} table{border-collapse:collapse;width:100%}td,th{border:1px solid #333;padding:6px}.sign td{height:70px}</style></head><body><h3>${s.organisation}</h3><h3>${s.programmeName}</h3><h2>「樂齡之友」服務津貼及交通費 簽收表</h2><p>單位名稱：${s.unitName}</p><p>月／年：${month}</p><p>樂齡之友姓名：${name}</p><p>茲收到 ${s.organisation} 港幣 $ ${a.grandTotal}</p><table><tr><th>服務類別</th><th>服務日期</th><th>總服務時數</th><th>每小時津貼</th><th>合計金額</th></tr><tr><td>詳見附件－服務時數紀錄表</td><td>${month}</td><td>${a.total}</td><td>$${s.allowancePerHour}</td><td>$${a.serviceAllowance}</td></tr><tr><td>交通費</td><td>如附件</td><td>-</td><td>-</td><td>$${a.transport}</td></tr></table><p>(A)服務津貼 $${a.serviceAllowance} + (B)交通費 $${a.transport} = (C)津貼總額 $${a.grandTotal}</p><table class="sign"><tr><td>核對人姓名：${s.checker}<br><br>簽署：</td><td>批准人姓名：${s.approver}<br><br>簽署：</td><td>收款人姓名：${name}<br><br>簽署：</td></tr><tr><td>日期：</td><td>日期：</td><td>日期：</td></tr></table></body></html>`;
 saveAs(wordBlob(html),`津貼簽收表_${name}_${month}.doc`);
}
