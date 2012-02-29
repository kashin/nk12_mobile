function onPageLoaded()
{
 var str = localStorage.getItem("email");
 document.form.emailAddress.value = str;
 
 str = localStorage.getItem("password");
 document.form.password.value = str;

 str = localStorage.getItem("uik");
 document.form.uik.value = str;
}
  	
function onSubmitClicked()
{
 if (document.form.emailAddress.value === "" ||
 document.form.password.value === "") {
 	alert("Пожалуйста, заполните все необходимые поля");
	return;
 }
  	 
 localStorage.setItem("email", document.form.emailAddress.value);
 localStorage.setItem("password", document.form.password.value);
 localStorage.setItem("uik", document.form.uik.value);
  	 

 if (sessionStorage.getItem("imagesCount") !== null) {
	if (sessionStorage.getItem("uploadedFilesCount")!==null){
		sessionStorage.uploadedFilesCount = 0;
		uploadFile(sessionStorage.getItem("picture" + 0))
	} else {
		sessionStorage.uploadedFilesCount = 0;
		uploadFile(sessionStorage.getItem("picture" + 0))
		sessionStorage.setItem("uploadedFilesCount", 1);
	}
} else {
	//TODO: WTF??
       }	
}
  	
function uploadFile(imgSrc) { // test URI = http://borki67km.ru/67/tst_upload.php
	/*var http = new XMLHttpRequest();
	http.open("POST", "http://borki67km.ru/67/tst_upload.php", true);
	http.setRequestHeader("login", localStorage.getItem("email"));
	http.setRequestHeader("password", localStorage.getItem("password"));
	http.send(null);*/
var uploadSuccess = function(response) {
	if (sessionStorage.getItem("uploadedFilesCount") !== null) {
		sessionStorage.uploadedFilesCount = sessionStorage.uploadedFilesCount + 1;
		if (sessionStorage.uploadedFilesCount === sessionStorage.imagesCount) {
			alert("Файлы успешно загружены");
			return;
		}
		uploadFile(sessionStorage.getItem("picture" + sessionStorage.uploadedFilesCount))
		return;
	} else {
		// something strange. Looks like assert...
	}
	alert("Файлы успешно загружены" + response.response);
}

var uploadFailed = function(error) {
	alert("Произошла ошибка: " + error.code);
}

 var options = new FileUploadOptions();
 var src = new String(imgSrc);
 options.fileKey="file";
 options.fileName="UIK_" + localStorage.getItem("uik") + "_picture_" + sessionStorage.uploadedFilesCount + ".jpg";
 options.mimeType="image/jpeg";
 options.chunkedMode = false;

 var params = new Object();
 params.login = localStorage.getItem("email");
 params.password = localStorage.getItem("password");

 options.params = params;

 var transfer = new FileTransfer();
 transfer.upload(imgSrc, "http://borki67km.ru/67/tst_upload.php?login=" + localStorage.getItem("email") + "&password=" + localStorage.getItem("password"), uploadSuccess, uploadFailed, options);  
	
} 

