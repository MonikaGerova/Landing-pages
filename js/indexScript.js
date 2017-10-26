function app() {
    document.getElementById("newPageBtn").addEventListener("click",function () {
        window.location.href = "createNewPage.html";
    });


    this.pagesNames = ko.observableArray();


    this.getPages = ko.computed(function () {
        var self = this;
        getRequest("getPages.php").then(function (resolve) {

            //console.log(resolve);
            self.pagesNames(JSON.parse(resolve));
        })
    },this);



    // this.pagesNamesValue = ko.computed(function () {
    //     console.log(this.pagesNames());
    // },this)
}

function generatePage(pageName) {
   // console.log(pageName);
    window.location.href = "generator/index.html?id="+pageName;
}
function getRequest(url) {
    return new Promise(function(resolve, reject) {
        var httpRequest = new XMLHttpRequest();
        httpRequest.open('GET', url);
        httpRequest.send();
        httpRequest.onload = function () {
            if (httpRequest.status == 200) {
                resolve(httpRequest.responseText);
            }else{
                reject("false");
            }
        };
    }, 250);

}

ko.applyBindings(new app);