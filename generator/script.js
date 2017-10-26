
function app() {
    document.getElementsByClassName("box")[0].style.height = window.screen.height - 200 + "px";

    console.log(document.getElementsByClassName("box")[0].style.height);

    this.background = ko.observable();
    this.pageLink = ko.observable();
    this.hasPageLink = ko.computed(function () {
        return this.pageLink();
    },this);
    this.logoURL = ko.observable();
    this.link = ko.observable();
    this.hasVideo = ko.computed(function () {
        return this.link();
    },this);
    this.description = ko.observable();
    this.hasDescription = ko.computed(function () {
        return this.description();
    },this);
    this.contacts = ko.observableArray();

    this.hasContacts = ko.computed(function () {
        return this.contacts() && (this.contacts()[0] != "");
    },this);
    this.allowComments = ko.observable();
    this.templateID = ko.observable();
    this.templateIDValue = ko.computed(function () {
        return this.templateID();
    },this);

    this.getdata = ko.computed(function () {
        var url = new URL(window.location.href);
        var id = url.searchParams.get("id");

        var self = this;
        getRequest("getPageSettings.php"+"?id="+id).then(function (resolve){

            resolve = JSON.parse(resolve);

            self.logoURL(resolve.logoURL);
            self.link(resolve.video);
            self.description(resolve.description);
            self.contacts(resolve.contacts);
            self.allowComments(resolve.comments ==1);
            self.templateID(resolve.template);
            self.pageLink(resolve.pageLink);
            self.background(resolve.backgroundColor);
        });
    },this);

    this.getTemplate = ko.computed(function () {

        if(this.templateIDValue()!= undefined){
            getRequest("getTemplate.php?id="+this.templateIDValue()).then(function (resolve) {
              document.head.innerHTML += resolve;
            })
        }
    },this)



    this.commentText = ko.observable();
    this.comments = ko.observableArray();

    this.comments.push("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut " +
        "labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip");

    this.addComment = ko.computed(function () {
        var self = this;
        document.addEventListener("keydown",function (e) {
            if(e.keyCode==13 && document.activeElement.id == "addComment"){
                self.comments.push(self.commentText());
                self.commentText(null);
            }
        })
    },this);
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
