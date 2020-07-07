// ts -> js : 터미널에 tsc youtube-sourcecode-editor.ts
var ERROR_notProperSC = "ERROR : Not a proper youtube sourcecode. Please check your code again.";
var ERROR_LengWH = 'ERROR : No width and height inserted!';
var ERROR_LengW = 'ERRO : No width inserted!';
var ERROR_LengH = 'ERROR : No height inserted!';
function youtube_copy() {
    var copyText = document.getElementById("youtube_after");
    copyText.select();
    document.execCommand("copy");
    copyText.setSelectionRange(0, 0);
}
function youtube_numberLength() {
    if (this.value.length > this.maxLength) {
        this.value = this.value.slice(0, this.maxLength);
    }
}
var changeSize = false;
function youtube_openText() {
    if (changeSize == false) {
        changeSize = true;
        document.getElementById("youtube_width").disabled = false;
        document.getElementById("youtube_height").disabled = false;
    }
    else {
        changeSize = false;
        document.getElementById("youtube_width").disabled = true;
        document.getElementById("youtube_height").disabled = true;
    }
}
function sourceConvert() {
    var loop = document.getElementById("youtube_loop").checked;
    var autoplay = document.getElementById("youtube_autoplay").checked;
    var sourceCode = document.getElementById("youtube_before").value;
    var DoNotConvert = false;
    var widthV = document.getElementById("youtube_width").value;
    var heightV = document.getElementById("youtube_height").value;
    if (changeSize == true) {
        if (widthV == "" || heightV == "") {
            // resize == true && ERROR : numbers not inserted
            if (widthV == "" && heightV == "") {
                alert(ERROR_LengWH);
            }
            else if (widthV == "") {
                alert(ERROR_LengW);
            }
            else if (heightV == "") {
                alert(ERROR_LengH);
            }
        }
        else {
            // resize = true && numbers inserted && other functions
            if (sourceCode.includes('width="') && sourceCode.includes('height="')) {
                var width = document.getElementById("youtube_width").value;
                var height = document.getElementById("youtube_height").value;
                var findWidth = sourceCode.split('width="');
                if (findWidth[1].includes('"')) {
                    var widthIndex = findWidth[1].indexOf('"') + 1;
                    var afterWidth = findWidth[1].substr(widthIndex);
                    sourceCode = findWidth[0] + ("width=\"" + width + "\"") + afterWidth;
                }
                else {
                    DoNotConvert = true;
                }
                var findHeight = sourceCode.split('height="');
                if (findHeight[1].includes('"')) {
                    var heightIndex = findHeight[1].indexOf('"');
                    var afterHeight = findHeight[1].substr(heightIndex + 1);
                    sourceCode = findHeight[0] + ("height=\"" + height + "\"") + afterHeight;
                }
                else {
                    DoNotConvert = true;
                }
            }
            else {
                DoNotConvert = true;
            }
            otherThanSize();
        }
    }
    else {
        otherThanSize();
    }
    function otherThanSize() {
        if (sourceCode.includes("embed/") && sourceCode.includes('"')) {
            var youtubeId_split1 = sourceCode.split("embed/");
            var youtubeId_split2 = youtubeId_split1[1].split('"');
            var youtubeId = youtubeId_split2[0];
            var youtube_split3 = sourceCode.split(youtubeId);
            if (autoplay && loop) {
                sourceCode = youtube_split3[0] + youtubeId + "?version=3&autoplay=1&loop=1&playlist=" + youtubeId + youtube_split3[1];
            }
            else if (autoplay) {
                sourceCode = youtube_split3[0] + youtubeId + "?version=3&autoplay=1&playlist=" + youtubeId + youtube_split3[1];
            }
            else if (loop) {
                sourceCode = youtube_split3[0] + youtubeId + "?version=3&loop=1&playlist=" + youtubeId + youtube_split3[1];
            }
        }
        else {
            DoNotConvert = true;
        }
        if (!DoNotConvert) {
            document.getElementById("youtube_after").value = sourceCode;
        }
        else {
            alert(ERROR_notProperSC);
        }
    }
}
