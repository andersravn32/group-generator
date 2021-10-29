//shorthand selector
const $ = (ele) => {
    return document.querySelector(ele);
}

// people
var people = []

// groups 
var groups = [
    /* Object Structure
    {
        name:"AlkoHold",
        members: [
            'Anders',
            'Lasse',
            'Peter'
        ]
    },
    {
        name:"MilesFanboys",
        members: [
            'Anders',
            'Lasse',
            'Peter'
        ]
    },
    */
]
// determine if redy to generate groups
var ready = false;

// get forms
const personForm = $(".personForm");
const groupForm = $(".groupForm");

// get lists
const peopleList = $(".peopleList");
const groupList = $(".groupList");

var groupSize = 4;

personForm.children[2].addEventListener("click", (e) => {
    //submit personform
    e.preventDefault();
    addPerson(personForm.children[1].value);
    personForm.children[1].value = "";
    updateUI();
});

groupForm.children[2].addEventListener("click", (e) => {
    // submit groupform
    e.preventDefault();
    createGroup(groupForm.children[1].value);
    groupForm.children[1].value = "";
    updateUI();
});

// add event listener for generating groups.
$(".generateBtn").addEventListener("click", (e) => {
    e.preventDefault();
    if (ready){
        groupSize = $(".settingsForm").children[1].value;
        assignPeople();
    }
});

// add event listener for resetting
$(".resetBtn").addEventListener("click", (e) => {
    e.preventDefault();
    resetApp();
});

// add person to people array
const addPerson = (person) => {
    if(person == "" || person.length <= 3){
        return;
    }
    people.push(person);
};

// add groups object to groups array
const createGroup = (groupName) => {
    if (groupName == ""){
        return;
    }
    groups.push({
        name:groupName,
        members: []
    });
};

const assignPeople = () => {
    // reset groups
    for (let i = 0; i < groups.length; i++){
        groups[i].members = [];
    };

    // go through people array
    for (let i = 0; i < people.length; i++){
        let rand = Math.floor(Math.random() * groups.length);
        if (groups[rand].members.length < groupSize){
            groups[rand].members.push(people[i]);
        }else{
            return;
        }
    }

    updateUI();
};

// update user interface
const updateUI = () => {
    if (groups.length > 0){
        $(".generateBtn").classList.remove("disabled");
        ready = true;
    }else{
        $(".generateBtn").classList.add("disabled");
        ready = false;
    }

    // update list of people
    peopleList.innerHTML = "";
    for (let i = 0; i < people.length; i++){
        let listItem = document.createElement("li");
        listItem.classList.add("person");
        listItem.innerText = people[i];
        listItem.addEventListener("click", (e) => {
            listItem.classList.add("fadeOut");
            setTimeout(() => {
                people.splice(i, 1);
                updateUI();
            },500);
        });
        peopleList.appendChild(listItem);
    }
    
    // update list of groups
    groupList.innerHTML = "";
    for (let i = 0; i < groups.length; i++){
        let listItem = document.createElement("li");
        listItem.classList.add("group");
        if (groups[i].members.length < groupSize){
            listItem.innerHTML = "<span>" + groups[i].name + "</span>" + '<i class="fas fa-plus"></i>';
        }else{
            listItem.innerHTML = "<span>" + groups[i].name + "</span>" + '<i class="fas fa-lock"></i>';
        }

        listItem.addEventListener("click", () => {
            $(".modalTitle").innerText = groups[i].name;
            $(".modalList").innerHTML = "";
            for (let index = 0; index < groups[i].members.length; index++){
                let listItem = document.createElement("li");
                listItem.innerText = groups[i].members[index];
                $(".modalList").appendChild(listItem);
            }
            toggleModal();
            updateUI();
        });
        groupList.appendChild(listItem);
    }
    
}

// modal
const modal = $(".modalBackground");
$(".modalHeader").addEventListener("click", (e) => {
    toggleModal();
});

// toggles modal on/off
const toggleModal = () => {
    if (modal.style.display == "flex"){
        modal.classList.add("fadeOut");
        setTimeout(() => {
            modal.style.display = "none";
            modal.classList.remove("fadeOut");
        }, 500);
    }else{
        modal.style.display = "flex";
        modal.classList.add("fadeIn");
        setTimeout(() => {
            modal.classList.remove("fadeIn");
        }, 500);
    }
}

const resetApp = () => {
    people = [];
    groups = [];
    updateUI();
}