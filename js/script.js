function app() {

    this.templates = ko.observableArray();
    this.getTemplates = ko.computed(function () {
        var self = this;
        getRequest("getTemplates.php").then(function (resolve) {

            console.log(resolve);
           self.templates(JSON.parse(resolve));
        });
    },this);

    this.allowLogo = ko.observable();
    this.allowVideo = ko.observable();
    this.allowDescription = ko.observable();
    this.allowContacts = ko.observable();
    this.allowComments = ko.observable();
    this.allowButton = ko.observable();
    this.allowBackground = ko.observable();

    this.background = ko.observable("#FFFFFF");
    this.backgroundValue = ko.computed(function () {
        if(this.allowBackground()== false){
            this.background("");
        }
        return this.background();
    },this);

    this.templateID = ko.observable();
    this.changeTemplateID = function (templateID) {
        this.templateID(templateID);
        var settings = this.getTemplateSettings(templateID);
       // console.log(settings.split(", "));
        this.allowLogo(settings.indexOf("logo")!=-1);
        this.allowVideo(settings.indexOf("video")!=-1);
        this.allowDescription(settings.indexOf("description")!=-1);
        this.allowComments(settings.indexOf("comments")!=-1);
        this.allowContacts(settings.indexOf("contacts")!=-1);
        this.allowButton(settings.indexOf("button")!=-1);
        this.allowBackground(settings.indexOf("background")!=-1);

    }.bind(this);

    this.getTemplateID = ko.computed(function () {
        return this.templateID();
    },this);

    // this.templateSettings = ko.observableArray();
    this.getTemplateSettings = function (id) {
        // console.log(this.templates())
        for (var i = 0; i < this.templates().length; i++) {
            if(this.templates()[i].id == id){
                return this.templates()[i].settings;
            }
        }
    }.bind(this)



//------------------------------------



    this.name = ko.observable("");
    this.nameValue = ko.computed(function () {
        return this.name();
    },this);

    //----------------------------

    this.logoURL = ko.observable();
    this.logoValue = ko.computed(function () {
       return this.logoURL();
    },this);


    this.deleteLogo = function () {
        this.logoURL("");
    }.bind(this)
 

    this.hasLogo = ko.computed(function () {
        return !!this.logoURL()
    }, this);

//Video
//-----------------------

    this.link = ko.observable();
    this.linkValue = ko.computed(function () {
        return this.link()
    },this);

    this.wantVideo = ko.observable(false);
    this.wantVideoValue = ko.computed(function () {
        if(this.allowVideo() == false){
            this.wantVideo(false);
        }
        return this.wantVideo();
    },this);

    this.hasLink = ko.computed(function () {
        if (!!this.link()) {
            var string = this.link();
            string = string.replace("watch?v=", "embed/");
            this.link(string);
        }
        return !!this.link() ;
    }, this);

    this.deleteVideo = function () {
        this.link("");
    };


//-----------------------


//Description
//-------------------------
    this.description = ko.observable();
    this.descriptionValue = ko.computed(function () {
        return this.description();
    },this);
    this.wantDescription = ko.observable(false);
    this.wantDescriptionValue = ko.computed(function () {
        if(!this.wantDescription()){
            this.description("");
        }
        if(this.allowDescription() == false){
            this.wantDescription(false);
        }
        return this.wantDescription();
    },this);
    this.activeEditingDescription = ko.observable(false);
    this.editingDescription = function () {
        this.activeEditingDescription(true);
    }.bind(this);


    this.focusout = ko.computed(function () {
        var self = this;
        document.getElementById("descriptionContent").addEventListener('focusout', function () {
            self.activeEditingDescription(false);
        });
    }, this)


   
//------------------------
// Contacts
//--------------------------------

    this.contacts = ko.observableArray();
    this.contactsValue = ko.computed(function () {
        return this.contacts()
    },this);
    // this.contacts.push({name: "Monika", number: 0888890958});
    this.wantContacts = ko.observable(false);
    this.wantContactsVaue = ko.computed(function () {
        if(this.allowContacts() == false){
            this.wantContacts(false);
        }
        return this.wantContacts();
    },this);

    this.tempContactName = ko.observable("");
    this.tempContactNumber = ko.observable("");

    this.newContact = ko.observable(false);

    this.createNewContact = function () {
        this.newContact(!this.newContact());
    }.bind(this);

    this.addNewContact = function () {
        this.contacts.push({name: this.tempContactName(), number: this.tempContactNumber()});
        this.tempContactName(null);
        this.tempContactNumber(null);

    }.bind(this);

//----------------------------------

//CommentBox
//----------------------------------
    this.wantCommentBox = ko.observable(false);
    this.wantCommentBoxValue = ko.computed(function () {
        if(this.allowComments() == false){
            this.wantCommentBox(false);
        }
        return this.wantCommentBox();
    },this);

//ButtonLink

    this.pageLink = ko.observable("");
    this.pageLinkValue = ko.computed(function () {
        return this.pageLink();
    },this);
    this.wantButton = ko.observable();
    this.wantButtonValue = ko.computed(function () {
        if(this.allowButton() == false){
            this.wantButton(false);
        }
        return this.wantButton();
    },this);

// ---------------------------------

    this.stopForm = ko.computed(function () {
        var self = this;
        var forms = document.forms;


           forms[0].addEventListener("submit",function (event) {


               var data = {
                   "backgroundColor": self.backgroundValue(),
                   "name": self.nameValue(),
                   "logo": self.logoValue(),
                  "video": {
                       "wantVideo": self.wantVideoValue(),
                       "link": self.linkValue()
                   },
                   "description":{
                       "wantDescription": self.wantDescriptionValue(),
                       "text": self.descriptionValue()
                   },
                   "contactsField": {
                       "wantContacts": self.wantContactsVaue(),
                       "contacts": self.contactsValue()
                   },
                   "comments": self.wantCommentBoxValue(),
                   "pageLink": self.pageLinkValue(),
                   "template": self.getTemplateID()
               };

               var json = getJson(data);
              // console.log(json);
               sendData(json);
              //event.preventDefault();
            }, false);

    },this);


}


function sendData (data) {
    var httpRequest = new XMLHttpRequest();
    httpRequest.open("POST", "sendData.php", true);
    httpRequest.onload = function () {
        if (httpRequest.status == 200) {
           //console.log(httpRequest.responseText);
        }
    };

    httpRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    httpRequest.send("data="+data);

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

// function getTemplates() {
//
//     return new Promise(function(resolve, reject) {
//         var httpRequest = new XMLHttpRequest();
//         httpRequest.open('GET', "getTemplates.php");
//         httpRequest.send();
//         httpRequest.onload = function () {
//             if (httpRequest.status == 200) {
//                 console.log(httpRequest.responseText);
//                 resolve(httpRequest.responseText);
//             }else{
//                 reject("false");
//             }
//         };
//     }, 250);
// }

//
function getJson(fields) {

    var json = {};
    Object.keys(fields).forEach(function(key) {

        json[key] = fields[key];
        //console.log(key, fields[key]);

    });

    json = JSON.stringify(json);
    return json;
}


ko.applyBindings(new app);

