var upload = function (e, name) {
  var limit = 6;
  var upImg = document.getElementsByClassName("upImg");    //所有上传图片的
  var allImg = document.getElementById("allImg");
  var haveSrc = [];

  var addNew = function () {                                     //添加新上传按钮函数
    var newInput = document.createElement("div");
    newInput.className = 'uploadImg';
    newInput.innerHTML = '<input type = "file" name = "uploadImg"  accept="image/*" onchange = "upload(this,\'putImg\')" ><div class="uploadButton"><i></i><p>点击上传照片</p></div>';
    allImg.appendChild(newInput);
  }

  var closeImg = function (obj) {
    var thisImg = obj.parentNode;     //获取删除图片的父元素
    delete haveSrc[haveSrc.indexOf(thisImg.childNodes[1].src)]   //删除判断数组内存储已有src
    thisImg.parentNode.removeChild(thisImg);                 //删除该图片
    if (upImg.length == (limit - 1)) {                               //判断图片数量是否是超过限制后删除
      addNew()                                          //添加点击上传的按钮
    }
  }

  var watch = function (obj) {            //预览
    var imgWatch = document.createElement("div");
    imgWatch.className = "imgWatch";
    imgWatch.innerHTML = '<img src="' + obj.src + '"><div class="iconfont imgClose" onclick = "upload(this,\'closeWatch\')" ></div>'
    allImg.appendChild(imgWatch);
  }


  if (name == 'putImg') {                     //判断传入参
    var putImg = function () {                   //点击点击上传按钮的函数
      var file = e.files[0];   //获取文件引用
      var oFReader = new FileReader();
      oFReader.readAsDataURL(file); // 开始在后台进行读取操作。当图像文件的所有内容加载后,转换成一个data:URL,传递到onload回调函数中
      oFReader.onload = function (oFREvent) { //当读取操作成功完成时调用.
        var src = oFREvent.target.result;     //获取src
        if (haveSrc.indexOf(src) > -1) {      //判断内部是否已存在该图片的src
          return;
        } else {
          haveSrc.push(src);             //未重复，添加入数组
        }
        var img = document.createElement("img");   //创建图片
        img.src = src;                       //赋值src
        img.onclick = function () {    //点击图片进行预览
          watch(img);
        }
        var close = document.createElement("div");   //创建删除图片按钮
        close.className = 'close';
        close.onclick = function () {      //点击删除
          closeImg(close)
        }
        var uploadImg = e.parentNode;    //整个按钮的div
        var uploadButton = uploadImg.getElementsByClassName("uploadButton")[0];    //获取上传按钮
        uploadImg.removeChild(uploadButton)               //移除按钮
        uploadImg.appendChild(img);                       //添加图片
        uploadImg.appendChild(close);                    //添加删除
        if (upImg.length < limit) {                          //判断是否小于图片数量限制
          addNew()
        }
        uploadImg.className = 'upImg';                      //图片已上传成功，修改classname
        e.name = "haveImg";                                //修改已上传input的name
      }
    }
    return putImg();
  } else if (name == 'closeWatch') {
    var closeWatch = function () {    //关闭预览
      // document.getElementById("watch").className = "hide";
      var imgWatch = allImg.getElementsByClassName("imgWatch")[0];
      allImg.removeChild(imgWatch);
    }
    return closeWatch();
  }

}