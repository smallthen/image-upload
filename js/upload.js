var upload = (function () {
    var upload = {}, upImg = document.getElementsByClassName("upImg"), allImg = document.getElementById("allImg"), haveSrc = [];
    var addNew = function () {
        var newInput = document.createElement("div");
        newInput.className = 'uploadImg';
        newInput.innerHTML = '<input type = "file" name = "uploadImg"  accept="image/*" onchange = "upload.putImg(this)" ><div class="uploadButton"><i></i><p>点击上传照片</p></div>';
        allImg.appendChild(newInput);
    };
    var closeImg = function (obj) {
        var thisImg = obj.parentNode;
        delete haveSrc[haveSrc.indexOf(thisImg.childNodes[1].src)];
        thisImg.parentNode.removeChild(thisImg);
        if (upImg.length == (upload.limit - 1)) {
            addNew();
        }
    };
    var watch = function (obj) {
        var imgWatch = document.createElement("div");
        imgWatch.className = "imgWatch";
        imgWatch.innerHTML = '<img src="' + obj.src + '"><div class="iconfont imgClose" onclick = "upload.closeWatch(this)"></div>';
        allImg.appendChild(imgWatch);
    };
    upload.putImg = function (obj) {
        var file = obj.files[0];
        var oFReader = new FileReader();
        oFReader.readAsDataURL(file);
        oFReader.onload = function (oFREvent) {
            var src = oFREvent.target.result;
            if (haveSrc.indexOf(src) > -1) {
                return;
            }
            else {
                haveSrc.push(src);
            }
            var img = document.createElement("img");
            img.src = src;
            img.onclick = function () {
                watch(img);
            };
            var close = document.createElement("div");
            close.className = 'close';
            close.onclick = function () {
                closeImg(close);
            };
            var uploadImg = obj.parentNode;
            var uploadButton = uploadImg.getElementsByClassName("uploadButton")[0];
            uploadImg.removeChild(uploadButton);
            uploadImg.appendChild(img);
            uploadImg.appendChild(close);
            if (upImg.length < upload.limit - 1) {
                addNew();
            }
            uploadImg.className = 'upImg';
            obj.name = "haveImg";
        };
    };
    upload.closeWatch = function () {
        var imgWatch = allImg.getElementsByClassName("imgWatch")[0];
        allImg.removeChild(imgWatch);
    };
    return upload;
})();
