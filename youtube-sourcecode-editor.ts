// ts -> js : 터미널에 tsc youtube-sourcecode-editor.ts

let ERROR_notProperSC = "ERROR : Not a proper youtube sourcecode. Please check your code again."
let ERROR_LengWH = 'ERROR : No width and height inserted!'
let ERROR_LengW = 'ERRO : No width inserted!'
let ERROR_LengH = 'ERROR : No height inserted!'

function youtube_copy() {
    let copyText = document.getElementById("youtube_after") as HTMLInputElement;
    copyText.select();
    document.execCommand("copy");
    copyText.setSelectionRange(0, 0);
}

function youtube_numberLength(){
    if (this.value.length > this.maxLength){
        this.value = this.value.slice(0, this.maxLength);
    }
}

var changeSize = false
function youtube_openText() {
    if (changeSize == false) {
        changeSize = true;
        (<HTMLInputElement>document.getElementById("youtube_width")).disabled=false;
        (<HTMLInputElement>document.getElementById("youtube_height")).disabled=false;
    } else {
        changeSize = false;
        (<HTMLInputElement>document.getElementById("youtube_width")).disabled=true;
        (<HTMLInputElement>document.getElementById("youtube_height")).disabled=true;
    }
}

function sourceConvert() {
    let loop = (<HTMLInputElement>document.getElementById("youtube_loop")).checked
    let autoplay = (<HTMLInputElement>document.getElementById("youtube_autoplay")).checked

    var sourceCode = (<HTMLInputElement>document.getElementById("youtube_before")).value;
    var DoNotConvert = false;

    let widthV = (<HTMLInputElement>document.getElementById("youtube_width")).value
    let heightV = (<HTMLInputElement>document.getElementById("youtube_height")).value

    if (changeSize == true) {
        if (widthV == "" || heightV == "") {
            // resize == true && ERROR : numbers not inserted
            if (widthV == "" && heightV == "") {
                alert(ERROR_LengWH);
            } else if (widthV == "") {
                alert(ERROR_LengW);
            } else if (heightV == "") {
                alert(ERROR_LengH);
            }
        } else {
            // resize = true && numbers inserted && other functions
            if (sourceCode.includes('width="') && sourceCode.includes('height="')) {
                let width = (<HTMLInputElement>document.getElementById("youtube_width")).value
                let height = (<HTMLInputElement>document.getElementById("youtube_height")).value
                
                let findWidth = sourceCode.split('width="');
                if (findWidth[1].includes('"')) {
                    let widthIndex = findWidth[1].indexOf('"') + 1
                    let afterWidth = findWidth[1].substr(widthIndex);
                    sourceCode = findWidth[0] + `width="${width}"` + afterWidth;
                } else {
                    DoNotConvert = true;
                }

                let findHeight = sourceCode.split('height="');
                if (findHeight[1].includes('"')) {
                    let heightIndex = findHeight[1].indexOf('"');
                    let afterHeight = findHeight[1].substr(heightIndex + 1);
                    sourceCode = findHeight[0] + `height="${height}"` + afterHeight
                } else {
                    DoNotConvert = true;
                }
            } else {
                DoNotConvert = true;
            }
            otherThanSize();
        }
    } else {
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
            } else if (autoplay) {
                sourceCode = youtube_split3[0] + youtubeId + "?version=3&autoplay=1&playlist=" + youtubeId + youtube_split3[1];
            } else if (loop) {
                sourceCode = youtube_split3[0] + youtubeId + "?version=3&loop=1&playlist=" + youtubeId + youtube_split3[1];
            }
        } else {
            DoNotConvert = true;
        }

        if (!DoNotConvert) {
            (<HTMLInputElement>document.getElementById("youtube_after")).value = sourceCode;
        } else {
            alert(ERROR_notProperSC);
        }
    }
}
