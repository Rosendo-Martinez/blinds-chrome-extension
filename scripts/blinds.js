const topBlind = document.createElement("div");
const bottomBlind = document.createElement("div");
const leftBlind = document.createElement("div");
const rightBlind = document.createElement("div");
createAndInitializeBlind(topBlind, "top-blind", "top-blind-resizer", true, "10%");
createAndInitializeBlind(bottomBlind, "bottom-blind", "bottom-blind-resizer", true, "10%");
createAndInitializeBlind(leftBlind, "left-blind", "left-blind-resizer", false, "10%");
createAndInitializeBlind(rightBlind, "right-blind", "right-blind-resizer", false, "10%");

const body = document.querySelector("body");
body.append(topBlind, bottomBlind, leftBlind, rightBlind);

let currentBlindBeingResized = null;

function createAndInitializeBlind(blind, blindClass, resizerID, isTopOrBottomBlind, initialDimension) {
    blind.classList.add(blindClass);
    if (isTopOrBottomBlind) {
        blind.style.height = initialDimension;
    } else {
        blind.style.width = initialDimension;
    }
    
    const resizer = document.createElement("button");
    resizer.id = resizerID;
    blind.append(resizer);
    resizer.addEventListener("mousedown", function(e) {
        e.preventDefault();
        setUpResizeFunctionality(blindClass);
    })
}

function setUpResizeFunctionality(blindToResize) {
    currentBlindBeingResized = blindToResize;
    window.addEventListener('mousemove', resize);
    window.addEventListener("mouseup", stopResize);
}

function resize(e) {
    if (currentBlindBeingResized === "top-blind") {
        let newHeight = Math.ceil(((e.clientY/window.innerHeight) * 100));
        if (newHeight < 3) {
            newHeight = 3;
        } else if (newHeight > 100 - parseInt(bottomBlind.style.height)) {
            newHeight = 100 - parseInt(bottomBlind.style.height);
        }
        topBlind.style.height = newHeight + "%";
    } else if (currentBlindBeingResized === "bottom-blind") {
        let newHeight = Math.ceil(((1 -(e.clientY/window.innerHeight)) * 100));
        if (newHeight < 3) {
            newHeight = 3;
        } else if (newHeight > 100 - parseInt(topBlind.style.height)) {
            newHeight = 100 - parseInt(topBlind.style.height);
        }
        bottomBlind.style.height = newHeight + "%";
    } else if (currentBlindBeingResized === "left-blind") {
        let newWidth = Math.ceil(((e.clientX/window.innerWidth) * 100));
        if (newWidth < 3) {
            newWidth = 3;
        } else if (newWidth > 100 - parseInt(rightBlind.style.width)) {
            newWidth = 100 - parseInt(rightBlind.style.width);
        }
        leftBlind.style.width = newWidth + "%";
    } else if (currentBlindBeingResized === "right-blind") {
        let newWidth = Math.ceil(((1 - (e.clientX/window.innerWidth)) * 100));
        if (newWidth < 3) {
            newWidth = 3;
        } else if (newWidth > 100 - parseInt(leftBlind.style.width)) {
            newWidth = 100 - parseInt(leftBlind.style.width);
        }
        rightBlind.style.width = newWidth + "%";
    }
}

function stopResize() {
    currentBlindBeingResized = null;
    window.removeEventListener("mousemove", resize);
}