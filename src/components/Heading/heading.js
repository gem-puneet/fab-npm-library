import "./heading.css";
export class HeadingComponent {
    constructor() {
    }
    testHeadingFun(){
    var TestHeading = document.createElement("div");
    TestHeading.innerHTML = "Hello How are you all";

    const hh = document.getElementsByClassName('test-heading')[0];
    hh.appendChild(TestHeading);
    }
}
