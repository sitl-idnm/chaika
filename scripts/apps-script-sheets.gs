// ─────────────────────────────────────────────────────────────────────────
// Google Apps Script для приёма заявок из VK в Google-таблицу.
// Как использовать:
//   1. Откройте свою таблицу на sheets.google.com
//   2. Меню: Расширения → Apps Script
//   3. Удалите весь код в редакторе и вставьте ВЕСЬ этот файл
//   4. Развернуть → Новое развёртывание → тип «Веб-приложение»
//        • Выполнять от имени: Я
//        • У кого есть доступ: Все
//      → Развернуть → авторизовать доступ
//   5. Скопируйте выданный URL (оканчивается на /exec) — это SHEETS_WEBAPP_URL
// ─────────────────────────────────────────────────────────────────────────

const SECRET = 'PASTE_YOUR_SHEETS_WEBAPP_SECRET_HERE'; // must equal SHEETS_WEBAPP_SECRET in env
const SHEET_NAME = 'Лист1'; // имя листа с заявками (поменяйте, если другое)

function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents || '{}');
    if (body.secret !== SECRET) {
      return json({ ok: false, error: 'forbidden' });
    }
    const rows = Array.isArray(body.rows) ? body.rows : [];
    const sh =
      SpreadsheetApp.getActive().getSheetByName(SHEET_NAME) ||
      SpreadsheetApp.getActive().getSheets()[0];

    // Дедуп по id (первый столбец).
    const existing = {};
    const last = sh.getLastRow();
    if (last > 0) {
      sh.getRange(1, 1, last, 1)
        .getValues()
        .forEach(function (r) {
          if (r[0] !== '') existing[String(r[0])] = true;
        });
    }

    let added = 0;
    rows.forEach(function (row) {
      const id = String(row[0] || '');
      if (id && existing[id]) return; // уже есть — пропускаем
      sh.appendRow(row);
      existing[id] = true;
      added++;
    });

    return json({ ok: true, added: added });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  }
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}
