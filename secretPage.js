// ts -> js : 터미널에 tsc secretPage.ts
var ERROR_notProperSC = "ERROR : 비정상적인 유튜브 소스 코드. 복사부터 다시해서 붙여넣기.";
var ERROR_LengWH = 'ERROR : 가로와 세로 길이가 입력되지 않음. 1500 * 800으로 두고 싶으면, 앞에 체크박스 풀기.';
var ERROR_LengW = 'ERRO : 가로 길이가 입력되지 않음. 1500 * 800으로 두고 싶으면, 앞에 체크박스 풀기.';
var ERROR_LengH = 'ERROR : 세로 길이가 입력되지 않음. 1500 * 800으로 두고 싶으면, 앞에 체크박스 풀기.';
var ERROR_INW_LengWH = 'ERROR : 원본 HTML 이미지 길이가 입력되지 않음. 이미 제대로 변환되고 있었다면 아래 체크박스 풀기.';
var ERROR_INW_LengW = 'ERRO : 원본 HTML 이미지 가로 길이가 입력되지 않음. 이미 제대로 변환되고 있었다면 아래 체크박스 풀기.';
var ERROR_INW_LengH = 'ERROR : 원본 HTML 이미지 세로 길이가 입력되지 않음. 이미 제대로 변환되고 있었다면 아래 체크박스 풀기.';
function copy(place) {
    var copyText = document.getElementById(place);
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
        if (sourceCode.includes('width="') && sourceCode.includes('height="')) {
            var width = "1500";
            var height = "800";
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
    function otherThanSize() {
        if (sourceCode.includes("embed/") && sourceCode.includes('"')) {
            var youtubeId_split1 = sourceCode.split("embed/");
            var youtubeId_split2 = youtubeId_split1[1].split('"');
            var youtubeId = youtubeId_split2[0];
            var youtube_split3 = sourceCode.split(youtubeId);
            sourceCode = youtube_split3[0] + youtubeId + "?version=3&autoplay=1&loop=1&playlist=" + youtubeId + youtube_split3[1];
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
function image_numberLength() {
    if (this.value.length > this.maxLength) {
        this.value = this.value.slice(0, this.maxLength);
    }
}
var INW = false;
function image_openText() {
    if (INW == false) {
        INW = true;
        document.getElementById("INW_width").disabled = false;
        document.getElementById("INW_height").disabled = false;
    }
    else {
        INW = false;
        document.getElementById("INW_width").disabled = true;
        document.getElementById("INW_height").disabled = true;
    }
}
function image_convert() {
    var Image_resizer_HTML = document.getElementById("image_before").value;
    var width_wanted = document.getElementById("image_width").value;
    var height_wanted = document.getElementById("image_height").value;
    if (width_wanted == "" && height_wanted == "") {
        alert(ERROR_LengWH);
    }
    else if (width_wanted == "") {
        alert(ERROR_LengW);
    }
    else if (height_wanted == "") {
        alert(ERROR_LengH);
    }
    else {
        if (document.getElementById("INW_checkBox").checked == true) {
            var width_TC = document.getElementById("INW_width").value;
            var height_TC = document.getElementById("INW_height").value;
            Image_resizer_HTML = Image_resizer_HTML.split(width_TC).join(width_wanted);
            Image_resizer_HTML = Image_resizer_HTML.split(height_TC).join(height_wanted);
            if (width_TC == "" && height_TC == "") {
                alert(ERROR_INW_LengWH);
            }
            else if (width_TC == "") {
                alert(ERROR_INW_LengW);
            }
            else if (height_TC == "") {
                alert(ERROR_INW_LengH);
            }
            else {
                convert();
            }
        }
        else {
            convert();
        }
    }
    function convert() {
        var widthList = Image_resizer_HTML.split("width");
        var regExp = /\d([0-9]{0,10})/im;
        var finConv_WD;
        var finConv_HT;
        function IMG_width_convert(lines) {
            if (lines == widthList[0]) {
                finConv_WD = lines;
            }
            else {
                if (regExp.test(lines) == true) {
                    var widthSampleHTML = lines;
                    var LengthOfOriginal = lines.match(regExp);
                    widthSampleHTML = widthSampleHTML.replace(LengthOfOriginal[0], width_wanted);
                    finConv_WD = finConv_WD + "width" + widthSampleHTML;
                }
                else {
                    finConv_WD = finConv_WD + "width" + lines;
                }
            }
        }
        widthList.forEach(function (lines) { return IMG_width_convert(lines); });
        var heightList = finConv_WD.split("height");
        function IMG_height_convert(lines) {
            if (lines == heightList[0]) {
                finConv_HT = lines;
            }
            else {
                if (regExp.test(lines) == true) {
                    var heightSampleHTML = lines;
                    var LengthOfOriginal = lines.match(regExp);
                    heightSampleHTML = heightSampleHTML.replace(LengthOfOriginal[0], height_wanted);
                    finConv_HT = finConv_HT + "height" + heightSampleHTML;
                }
                else {
                    finConv_HT = finConv_HT + "height" + lines;
                }
            }
        }
        heightList.forEach(function (lines) { return IMG_height_convert(lines); });
        Image_resizer_HTML = finConv_HT;
        document.getElementById("image_after").value = Image_resizer_HTML;
    }
}
