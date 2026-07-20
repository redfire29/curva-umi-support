const fs = require('fs');
const content = fs.readFileSync('src/data/songList.js', 'utf-8');
const dataStr = content.replace('export default', '');
const data = eval(dataStr);

const songMap = {};
data.forEach(stream => {
    stream.songList.forEach(song => {
        if (!song.songName || !song.singer) return;
        const name = song.songName.trim();
        const singer = song.singer.trim();
        if (!songMap[name]) songMap[name] = new Set();
        songMap[name].add(singer);
    });
});

console.log('=== 歌名相同但歌手不同 ===');
for (const [name, singers] of Object.entries(songMap)) {
    if (singers.size > 1) {
        console.log(`歌曲: ${name} -> 歌手: ${Array.from(singers).join(' | ')}`);
    }
}

const allSingers = new Set();
data.forEach(stream => {
    stream.songList.forEach(song => {
        if (song.singer) allSingers.add(song.singer.trim());
    });
});

const singersArr = Array.from(allSingers).sort();
console.log('\n=== 歌手名稱可能相同但文字不同 (包含關係) ===');
for (let i = 0; i < singersArr.length; i++) {
    for (let j = i + 1; j < singersArr.length; j++) {
        const s1 = singersArr[i];
        const s2 = singersArr[j];
        if (s1 !== s2 && (s1.includes(s2) || s2.includes(s1))) {
            console.log(`- ${s1} / ${s2}`);
        }
    }
}
