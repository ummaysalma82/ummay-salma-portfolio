/**
 * Ummay Salma portfolio — "Have any question?" form receiver (Google Apps Script)
 *
 * What it does for every question submitted on the website:
 *   1. adds a row to a Google Sheet tab called "Questions"      (always)
 *   2. adds a paragraph to a Google Doc                          (optional — set DOC_ID)
 *   3. emails you a copy, with Reply-To set to the visitor       (optional — set NOTIFY_EMAIL)
 *
 * Setup steps are in DOCUMENTATION.md ("Option B").
 */

const SHEET_NAME   = 'Questions';
const NOTIFY_EMAIL = 'salmamonowara@gmail.com'; // '' = do not send an email copy
const DOC_ID       = '';                        // optional: the long ID from a Google Doc URL (docs.google.com/document/d/<ID>/edit)

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    const name    = clean(data.name, 80);
    const email   = clean(data.email, 120);
    const message = clean(data.message, 2000);
    const page    = clean(data.page, 300);

    if (!name || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return reply({ ok: false, error: 'invalid input' });
    }

    // 1) Google Sheet (the sheet this script is attached to)
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
    if (sheet.getLastRow() === 0) sheet.appendRow(['Date', 'Name', 'Email', 'Message', 'Page']);
    sheet.appendRow([new Date(), name, email, message, page]);

    // 2) Google Doc (optional)
    if (DOC_ID) {
      const body = DocumentApp.openById(DOC_ID).getBody();
      body.appendParagraph(new Date().toLocaleString() + ' — ' + name + ' <' + email + '>')
          .setHeading(DocumentApp.ParagraphHeading.HEADING3);
      body.appendParagraph(message);
      body.appendHorizontalRule();
    }

    // 3) Email copy (optional)
    if (NOTIFY_EMAIL) {
      MailApp.sendEmail({
        to: NOTIFY_EMAIL,
        replyTo: email,
        subject: 'New question from your portfolio: ' + name,
        body: 'Name: ' + name + '\nEmail: ' + email + '\n\nMessage:\n' + message + '\n\nSent from: ' + page
      });
    }

    return reply({ ok: true });
  } catch (err) {
    return reply({ ok: false, error: String(err) });
  }
}

// Opening the Web App URL in a browser is only a quick "is it alive?" check.
function doGet() {
  return reply({ ok: true, message: 'Question form receiver is running.' });
}

/** Trims, limits length, and neutralises spreadsheet formulas (=, +, -, @ at the start of a cell). */
function clean(value, maxLength) {
  let v = String(value || '').trim().slice(0, maxLength);
  if (/^[=+\-@]/.test(v)) v = "'" + v;
  return v;
}

function reply(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
