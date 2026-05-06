// 1. استيراد مكتبات Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, set, get, child } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

// 2. إعدادات Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBEqkFs4g83-34SUBFTxiwX9lcXkFIsbp0",
  authDomain: "top-chat-267af.firebaseapp.com",
  databaseURL: "https://top-chat-267af-default-rtdb.firebaseio.com",
  projectId: "top-chat-267af",
  storageBucket: "top-chat-267af.appspot.com",
  messagingSenderId: "901699645382",
  appId: "1:901699645382:web:10b437d43437cbc39c8cc7"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const myID = "OS-2581"; // الـ ID الثابت بتاعك يا أسامة

// --- [ وظائف البروفايل ] ---

// دالة لجلب بياناتك من السيرفر فور فتح الصفحة عشان متتمسحش
window.loadMyProfile = function() {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `users/${myID}`)).then((snapshot) => {
        if (snapshot.exists()) {
            const data = snapshot.val();
            // تعبئة الخانات بالبيانات المحفوظة
            if(document.getElementById('name')) document.getElementById('name').value = data.username || "";
            if(document.getElementById('phone')) document.getElementById('phone').value = data.phone || "";
            if(document.getElementById('bio')) document.getElementById('bio').value = data.bio || "";
            console.log("تم استعادة بياناتك من السيرفر");
        }
    }).catch((error) => console.error("خطأ في جلب البيانات:", error));
}

// دالة حفظ البيانات في السيرفر
window.saveProfile = function() {
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const bio = document.getElementById('bio').value;

    if(!name || !phone) {
        alert("لازم تكتب الاسم ورقم التليفون يا بطل");
        return;
    }

    set(ref(db, 'users/' + myID), {
        username: name,
        phone: phone,
        bio: bio,
        id: myID
    }).then(() => {
        const status = document.getElementById('status');
        if(status) {
            status.innerText = "✅ تم حفظ بياناتك بنجاح في السيرفر!";
            status.style.color = "#00a884";
        }
    }).catch((error) => alert("خطأ في الحفظ: " + error.message));
}

// دالة فتح استوديو الموبايل لاختيار صورة
window.openGallery = function() {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.onchange = e => {
        const file = e.target.files[0];
        if(file) {
            alert("تم اختيار صورة: " + file.name + "\n(قريباً هنبرمج رفعها للسيرفر وتغيير الصورة الشخصية)");
        }
    };
    fileInput.click();
}

// --- [ وظائف الصفحة الرئيسية ] ---

// دالة البحث عن ID الصديق
window.searchUser = function() {
    const searchId = document.getElementById('searchInput').value.trim();
    const resultDiv = document.getElementById('searchResult');

    if(!searchId) return;

    const dbRef = ref(getDatabase());
    get(child(dbRef, `users/${searchId}`)).then((snapshot) => {
        if (snapshot.exists()) {
            const data = snapshot.val();
            resultDiv.innerHTML = `
                <div class="user-card" onclick="startChat('${data.id}')">
                    <div class="user-avatar">${data.username.charAt(0).toUpperCase()}</div>
                    <div class="user-details">
                        <b>${data.username}</b>
                        <p>${data.bio || 'متوفر حالياً'}</p>
                    </div>
                    <button class="copy-btn" onclick="event.stopPropagation(); copyID('${data.id}')">
                        ${data.id} <i class="fas fa-copy"></i>
                    </button>
                </div>
            `;
        } else {
            resultDiv.innerHTML = '<p style="text-align:center; padding:20px; color:#8696a0;">هذا الـ ID غير مسجل لدينا</p>';
        }
    }).catch((error) => console.error(error));
}

// دالة نسخ الـ ID
window.copyID = function(id) {
    navigator.clipboard.writeText(id).then(() => {
        alert("تم نسخ الـ ID: " + id);
    });
}

// وظائف القائمة السفلية
window.showStatus = function() { alert("جاري تجهيز نظام الاستوري (الحالات)..."); }
window.showGroups = function() { alert("قريباً: قائمة الأصدقاء لإنشاء مجموعات"); }
window.openSettings = function() { alert("إعدادات الأمان وتغيير السيمات قيد التطوير"); }

// بدء المحادثة
window.startChat = function(userId) {
    alert("فتح المحادثة مع: " + userId);
}

// تشغيل جلب البيانات تلقائياً لو إحنا في صفحة البروفايل
if(window.location.href.includes("profile.html")) {
    window.onload = loadMyProfile;
}

// تحديث عداد الرسائل الوهمي (كمثال)
if(document.getElementById('unreadCount')) {
    document.getElementById('unreadCount').innerText = "3";
}
