var roles;
const NUMBER_OF_EMPLOYEES = 3;
var employees;
window.onload = function(){
    roles = document.getElementById("keyword");
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
        if(roles.value){
            url += "?roles="+roles.value;
        }
        var xmlHttpReq = new XMLHttpRequest();
        var jsonObj;
        xmlHttpReq.open("GET",url);
        xmlHttpReq.onreadystatechange = function(){
            if(xmlHttpReq.readyState === 4 && xmlHttpReq.status === 200){
                employees = document.getElementById("employees");
                employees.innerHTML = "";
                
                jsonObj = JSON.parse(xmlHttpReq.responseText);
                let result;
                if(!jsonObj.Error){//Error does not happen
                    transformEmployeeFromJsonToHTML(jsonObj);
                    result = "Found some employee(s)";
                }
                else{
                    result = jsonObj.Error;
                }
                document.getElementById("result").innerText = result;
                
            }
        }
        xmlHttpReq.send();
    })
}

/*
Create a drop-down list for all roles of employees from jsonArrayOfRoles parameter as a JSON array
*/
function createDropDownListOfRolesFromJSONArray(jsonArrayOfRoles){
    var dropDownListOfRoles = document.getElementById("roles");


    dropDownListOfRoles.addEventListener('change',function(){
        const regexStr = new RegExp("^"+this.value+",|,"+this.value+",|,"+this.value+"$");
        console.log(regexStr);
            if(regexStr.test(roles.value) === false){
                if(roles.value)//not empty string
                {
                    roles.value += ',';
                }
                
                roles.value += this.value;
            }
    });

    //Add option elements for select element
    jsonArrayOfRoles.forEach(element=>{
        var newOption = document.createElement("option");
        newOption.value = element.roleid;
        newOption.innerText = element.rolename;
        newOption.style.backgroundColor = element.rolecolor;
        dropDownListOfRoles.appendChild(newOption);
    });
}

/*
Description: transfrom the input param from JSON to HTML text
*/
function transformEmployeeFromJsonToHTML(input){
    for(iter in input){
        createUserProfile(input[iter]);
    }
}

/*
Create an employee profile in HTML based on jsonEmployeeObject param
*/
function createUserProfile(jsonEmployeeObject){
    var userProfile = document.createElement("div");
    userProfile.setAttribute("class","employee_profile");
    if(jsonEmployeeObject.employeeisfeatured === 1){
        var featureElement = document.createElement("div");
        featureElement.setAttribute("class","crown");
        var featuredImage = document.createElement("img");
        featuredImage.setAttribute("src","image/crown.svg");
        featuredImage.setAttribute("class","featured");
        featureElement.appendChild(featuredImage);
        userProfile.appendChild(featureElement);
    }
    var avatar = document.createElement("img");
    avatar.src = "http://sandbox.bittsdevelopment.com/code1/employeepics/"+jsonEmployeeObject.employeeid+".jpg";
    avatar.setAttribute("class","avatar");

    userProfile.appendChild(avatar);

    var employeeName = document.createElement("h3");
    var name = document.createTextNode(jsonEmployeeObject.employeefname+" "+jsonEmployeeObject.employeelname);
    employeeName.appendChild(name);
    userProfile.appendChild(employeeName);

    var bioElement = document.createElement("p");
    var bioTextNode = document.createTextNode(jsonEmployeeObject.employeebio);
    bioElement.appendChild(bioTextNode);
    userProfile.appendChild(bioElement);

    if(jsonEmployeeObject.roles.length !== 0){
        var roleArrays = document.createElement("div");
        roleArrays.setAttribute("class","flex-container");
        jsonEmployeeObject.roles.forEach(element => {
            var roleElement = document.createElement("div");
            roleElement.style.backgroundColor = element.rolecolor;
            roleElement.style.color = "azure";
            roleElement.style.textShadow = "2px 2px 4px #000000";
            roleElement.style.boxShadow = "2px 2px 2px grey";
            roleElement.appendChild(document.createTextNode(element.rolename));
            roleArrays.appendChild(roleElement);
        });
        userProfile.appendChild(roleArrays);
    }
    employees.appendChild(userProfile);
}