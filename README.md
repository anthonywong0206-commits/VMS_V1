# Volunteer Hours Management System

中文 NGO 義工服務時數管理網站，可部署到 Vercel。

## 功能
- Dashboard KPI、排行榜、Chart.js 圖表
- 活動服務時數，支援多選義工及重複建立
- 個案服務時數，支援手動、批量及 Excel / CSV 匯入
- 義工資料管理
- 津貼計算：總時數 × 每小時津貼 + 交通費
- 使用上載附件作 Excel 模板匯出：
  - `public/templates/service-hours-template.xlsx`
  - `public/templates/allowance-master-template.xlsx`
- PDF / Word 津貼簽收表
- Supabase schema

## 安裝
```bash
npm install
npm run dev
```

## Vercel 部署
1. 上載整個資料夾到 GitHub。
2. Vercel Import Project。
3. Framework Preset 選 Vite。
4. Build Command: `npm run build`。
5. Output Directory: `dist`。
6. 如使用 Supabase，加入環境變數：
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`

## Supabase
在 Supabase SQL Editor 執行：
`supabase/schema.sql`

## 模板替換
如要使用正式表格，覆蓋以下同名檔案：
- `public/templates/service-hours-template.xlsx`
- `public/templates/allowance-master-template.xlsx`
- `public/templates/allowance-receipt-template.docx`

## 注意
瀏覽器直接生成 PDF / Word 的版面未必可 100% 等同複雜 Word Mail Merge。Excel 匯出採用原 Excel 模板填入資料，最能保留附件格式。
