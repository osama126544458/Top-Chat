// 1. استيراد مكتبات Firebase اللازمة
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, set, get, child } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

// 2. إعدادات مشروعك الحقيقية من الـ Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyBEqkFs4g83-34SUBFTxiwX9lcXkFIsbp0",
  authDomain: "top-chat-267af.firebaseapp.com",
  databaseURL: "https://top-chat-267af-default-rtdb.firebaseio.com",
  projectId: "top-chat-267af",
  storageBucket: "top-chat-267af.appspot.com",
  messagingSenderId: "901699645382",
  appId: "1:901699645382:web:10b437d43437cbc39c8cc7"
};

// 3. تشغيل Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// --- وظيفة صفحة البروفايل (حفظ البيانات) ---
window.saveProfile = function() {
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const bio = document.getElementById('bio').value;
    const myID = "OS-2581"; // الـ ID الثابت بتاعك

    if(name && phone) {
        set(ref(db, 'users/' + myID), {
            username: name,
            phone: phone,
            bio: bio,
            id: myID,
            lastSeen: new Date().toLocaleString()
        }).then(() => {
            document.getElementById('status').innerText = "✅ تم الحفظ في السيرفر بنجاح!";
            document.getElementById('status').style.color = "green";
        }).catch((error) => {
            alert("خطأ في الحفظ: " + error.message);
        });
    } else {
        alert("يا أسامة لازم تكتب الاسم ورقم التليفون الأول!");
    }
}

// --- وظيفة صفحة البحث (البحث عن ID) ---
window.searchUser = function() {
    const searchId = document.getElementById('searchInput').value.trim();
    const resultDiv = document.getElementById('searchResult');

    if(!searchId) return alert("اكتب الـ ID اللي عايز تدور عليه");

    const dbRef = ref(getDatabase());
    get(child(dbRef, `users/${searchId}`)).then((snapshot) => {
        if (snapshot.exists()) {
            const data = snapshot.val();
            resultDiv.innerHTML = `
                <div style="background: #f0f0f0; padding: 15px; border-radius: 10px; margin-top: 10px;">
                    <p><b>الاسم:</b> ${data.username}</p>
                    <p><b>الحالة:</b> ${data.bio}</p>
                    <button onclick="startChat('${data.id}')" style="background: #25d366; color: white; border: none; padding: 5px 10px; border-radius: 5px;">بدء دردشة</button>
                </div>
            `;
        } else {
            resultDiv.innerHTML = "<p style='color:red;'>الـ ID ده مش موجود في السيرفر!</p>";
        }
    }).catch((error) => {
        console.error(error);
    });
}

window.startChat = function(userId) {
    alert("جارٍ فتح الشات مع: " + userId + " (الميزة دي هنبرمجها الخطوة الجاية)");
}
