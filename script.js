const menuBtn = document.getElementById('menu-btn');
const osamaMenu = document.getElementById('osama-menu');

// فتح وقفل المنيو
menuBtn.onclick = function(e) {
    e.stopPropagation();
    if (osamaMenu.style.display === "block") {
        osamaMenu.style.display = "none";
    } else {
        osamaMenu.style.display = "block";
    }
};

// قفل المنيو لو دوست في أي حتة بره
window.onclick = function() {
    osamaMenu.style.display = "none";
};
