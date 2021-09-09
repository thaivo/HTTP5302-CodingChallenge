window.onload = function(){
    var url = "http://sandbox.bittsdevelopment.com/code1/fetchemployees.php";
    var xmlHttpReq = new XMLHttpRequest();
    var jsonObj;
    xmlHttpReq.open("GET",url);
    xmlHttpReq.onreadystatechange = function(){
        if(xmlHttpReq.readyState === 4 && xmlHttpReq.status === 200){
            jsonObj = JSON.parse(xmlHttpReq.responseText);
        }
    }
    xmlHttpReq.send();
    console.log(jsonObj);
}