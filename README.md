# Volunteer Hours Management System - Vercel Safe Static Version

這是無 npm / pnpm / build step 的靜態版本，用來避開 Vercel install timeout。

## 部署方法

1. 將本資料夾三個檔案放到 GitHub repo 根目錄：
   - index.html
   - vercel.json
   - README.md
2. 刪除 repo 內舊有檔案：
   - package.json
   - package-lock.json
   - pnpm-lock.yaml
   - vite.config.js
   - node_modules
   - src 資料夾
3. Vercel Project Settings：
   - Framework Preset: Other
   - Build Command: 留空
   - Install Command: 留空
   - Output Directory: .

## 功能

- Dashboard
- 活動時數管理
- 個案時數管理
- 義工資料管理
- CSV 匯入及匯出
- 服務時數紀錄表預覽及列印 PDF
- 津貼簽收表預覽及列印 PDF
- 深色模式
- Mobile Responsive
- JSON 備份及還原

## 注意

此版本為「先部署成功」版本，資料儲存在瀏覽器 LocalStorage。正式多用戶 / Supabase 版本可在部署成功後再逐步加入。
