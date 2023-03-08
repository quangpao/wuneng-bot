const string = "PAUSE RESUME".toUpperCase();

const mask = "ᴀʙᴄᴅᴇғɢʜɪᴊᴋʟᴍɴᴏᴘQʀsᴛᴜᴠᴡxʏᴢ";
const qChar = "ǫ";
let result = "";

for (let x = 0; x < string.length; x++) {
  const num = string.charCodeAt(x) - 65;
  num >= 0 && num < 26
    ? (result = result + mask.charAt(num))
    : (result = result + string[x]);
}
while (result.includes("Q")) {
  result = result.replace("Q", qChar);
}

console.log(`Input: ${string}`);
console.log(`Output: ${result}`);
