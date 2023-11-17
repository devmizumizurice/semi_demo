# 後期サブゼミ用 demo

### Update

---

2023/11/17

- Frontend デモの追加
- Frontend フォルダの構成を変更
- Backend に Cookie を Revoke する為のルートを追加
  ```javascript
  res.clearCookie("refresh_token");
  ```
  これは，Cookie を CORS 対策の為に，httpOnly 属性を true にしている為に設けたものです。  
  （ログアウトできないため）
