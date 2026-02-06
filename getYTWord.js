var array = [];
var splitWord = '/'
var getIndex = 0;
var startIndex = 0;
var songSing = true;

document.querySelectorAll('.ytd-expander#content #content-text')[getIndex].querySelectorAll('a').forEach((item, index) => {
    var songlist = document.querySelectorAll('.ytd-expander#content #content-text')[getIndex].querySelectorAll('span')[0].textContent.split('\n').filter(line => line.trim() !== "");

    var getListName1 = songlist[index + startIndex]?.split(splitWord)[1]?.trim();
    var getListName2 = songlist[index + startIndex]?.split(splitWord)[0]?.split(item.textContent)[1]?.trim();
    var data = {
        showDate: true,
        songName: songSing ? getListName1 : getListName2,
        singer: songSing ? getListName2 : getListName1,
        songTime: item.textContent,
        songLink: item.href,
    };
    array.push(data);
})
console.log(array);


const streamName = document?.querySelector('h1 yt-formatted-string.ytd-watch-metadata')?.textContent;
const date = document?.querySelector('#info-strings yt-formatted-string')?.textContent?.replace(/.*?(\d{4})年(\d{1,2})月(\d{1,2})日/, '$1/$2/$3');
const songData = {
    date,
    streamName,
    showList: true,
    showDate: true,
    songList: array,
}

console.log(songData, 'songData');