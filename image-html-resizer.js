var ERROR_LengWH = 'ERROR : No width and height inserted!';
var ERROR_LengW = 'ERROR : No width inserted!';
var ERROR_LengH = 'ERROR : No height inserted!';
var ERROR_INW_LengWH = 'ERROR : No original width and height inserted!';
var ERROR_INW_LengW = 'ERROR : No original width inserted!';
var ERROR_INW_LengH = 'ERROR : No original height inserted!';
// ts -> js : 터미널에 tsc image-html-resizer.ts
function image_copy() {
    var copyText = document.getElementById("image_after");
    copyText.select();
    document.execCommand("copy");
    copyText.setSelectionRange(0, 0);
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
