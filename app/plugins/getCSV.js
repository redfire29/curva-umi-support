// 影片網址
const videoUrl = "https://www.youtube.com/watch?v=qt18UsOjumA";

// 從 YouTube 抓影片上傳日期
const uploadDate = document?.querySelector('#info-strings yt-formatted-string')?.textContent?.replace(/.*?(\d{4})年(\d{1,2})月(\d{1,2})日/, '$1/$2/$3');

// 貼上資訊欄文字
const rawText = `
00:12:46 01.366日 / HY
00:21:32 02.heavenly days / 新垣結衣
00:29:06 03.赤い糸 / コブクロ
00:39:28 04.カブトムシ / aiko
00:51:06 05.未来予想図II / DREAMS COME TRUE
00:56:53 06.ルージュの伝言 / 松任谷由実
01:04:35 07.さようなら、花泥棒さん / メル
01:14:14 08.キヤキ / GReeeeN
01:19:44 09.青のすみか / キタニタツヤ
01:26:53 10.TSUNAMI / サザンオールスターズ
01:37:09 11.すきなうた / Saucy Dog
01:44:43 12.オオカミと少女 / 宮崎歩
01:53:25 13.夜明けと蛍 / n-buna
02:00:33 14.小さな恋のうた / MONGOL800
`;

// 時間轉換成秒
function timeToSeconds(hms) {
  const [h, m, s] = hms.split(":").map(Number);
  return h * 3600 + m * 60 + s;
}

// Regex 支援全形括號
const lineRegex = /^(\d{2}:\d{2}:\d{2})\s+\d+\.\s*(.*?)\s*\/\s*(.*?)(?:[（(](\d{4})[）)])?\s*$/;

// 處理每一行
const rows = rawText.trim().split("\n").map(line => {
  const match = line.match(lineRegex);
  if (!match) return null;
  const [, time, title, artist] = match;
  const seconds = timeToSeconds(time);
  const link = `${videoUrl}&t=${seconds}s`;
  return [uploadDate, title.trim(), artist.trim(), link];
}).filter(Boolean);

// 轉 CSV (日文欄位)
let csv = "日付,曲名,アーティスト,動画リンク\n" + rows.map(r => r.join(",")).join("\n");

console.log(csv);