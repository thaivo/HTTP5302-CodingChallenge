window.onload = function(){
    
    //console.log(jsonObj);
    var roles = document.getElementById("roles");
    var url = "http://sandbox.bittsdevelopment.com/code1/fetchroles.php";
    var xmlHttpRequest = new XMLHttpRequest();
    xmlHttpRequest.open("GET",url);
    xmlHttpRequest.onreadystatechange = function(){
        if(xmlHttpRequest.readyState === 4 && xmlHttpRequest.status === 200){
            createDropDownListOfRolesFromJSONArray(JSON.parse(xmlHttpRequest.responseText));
        }
    }
    xmlHttpRequest.send();

    var searchBtn = document.getElementById("searchForm");
    searchBtn.addEventListener("submit",function(e){
        e.preventDefault();
        var url = "http://sandbox.bittsdevelopment.com/code1/fetchemployees.php";
        var xmlHttpReq = new XMLHttpRequest();
        var jsonObj;
        xmlHttpReq.open("GET",url);
        xmlHttpReq.onreadystatechange = function(){
            if(xmlHttpReq.readyState === 4 && xmlHttpReq.status === 200){
                jsonObj = JSON.parse(xmlHttpReq.responseText);
                transformJsonToHTML(jsonObj);
            }
        }
        xmlHttpReq.send();
    })
}

function createDropDownListOfRolesFromJSONArray(jsonArrayOfRoles){
    var dropDownListOfRoles = document.getElementById("roles");
    jsonArrayOfRoles.forEach(element=>{
        var newOption = document.createElement("option");
        newOption.value = element.roleid;
        newOption.innerText = element.rolename;
        newOption.style.backgroundColor = element.rolecolor;
        newOption.onclick = function(){
            
        }
        dropDownListOfRoles.appendChild(newOption);
    });
}

function transformJsonToHTML(input){
    for(var i = 1; i < 4; i++){
        createUserProfile(input[i]);
    }
}

function createUserProfile(jsonUserObj){
    var userProfile = document.createElement("div");
    userProfile.setAttribute("class","employee_profile");
    if(jsonUserObj.employeeisfeatured == 1){
        var featureElement = document.createElement("div");
        featureElement.setAttribute("class","crown");
        var featuredImage = document.createElement("img");
        featuredImage.setAttribute("src","image/crown.svg");
        featuredImage.setAttribute("class","featured");
        featureElement.appendChild(featuredImage);
        userProfile.appendChild(featureElement);
    }
    var avatar = document.createElement("img");
    avatar.src = "http://sandbox.bittsdevelopment.com/code1/employeepics/"+jsonUserObj.employeeid+".jpg";
    avatar.setAttribute("class","avatar");

    userProfile.appendChild(avatar);

    var employeeName = document.createElement("h3");
    var name = document.createTextNode(jsonUserObj.employeefname+" "+jsonUserObj.employeelname);
    employeeName.appendChild(name);
    userProfile.appendChild(employeeName);

    var bioElement = document.createElement("p");
    var bioTextNode = document.createTextNode(jsonUserObj.employeebio);
    bioElement.appendChild(bioTextNode);
    userProfile.appendChild(bioElement);

    if(jsonUserObj.roles.length !== 0){
        var roleArrays = document.createElement("div");
        roleArrays.setAttribute("class","flex-container");
        jsonUserObj.roles.forEach(element => {
            var roleElement = document.createElement("div");
            roleElement.style.backgroundColor = element.rolecolor;
            roleElement.style.color = "azure";
            roleElement.appendChild(document.createTextNode(element.rolename));
            roleArrays.appendChild(roleElement);
        });
        userProfile.appendChild(roleArrays);
    }
    document.getElementById("employees").appendChild(userProfile);
}