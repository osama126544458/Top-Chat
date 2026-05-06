import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, set, get, child } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

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

// دالة نسخ الـ ID
window.copyID = function(id) {
    navigator.clipboard.writeText(id);
    alert("تم نسخ الـ ID: " + id);
}

// البحث عن مستخدم وعرضه بتصميم جديد
window.searchUser = function() {
    const searchId = document.getElementById('searchInput').value.trim();
    const resultDiv = document.getElementById('searchResult');
    if(!searchId) return;

    const dbRef = ref(getDatabase());
    get(child(dbRef, `users/${searchId}`)).then((snapshot) => {
        if (snapshot.exists()) {
            const data = snapshot.val();
            resultDiv.innerHTML = `
                <div class="user-card">
                    <div class="user-avatar">${data.username.charAt(0)}</div>
                    <div class="user-details" onclick="startChat('${data.id}')">
                        <b>${data.username}</b>
                        <p>${data.bio || 'متوفر حالياً'}</p>
                    </div>
                    <button class="copy-btn" onclick="copyID('${data.id}')">
                        ${data.id} <i class="fas fa-copy"></i>
                    </button>
                </div>
            `;
        } else {
            resultDiv.innerHTML = '<p style="text-align:center; padding:20px;">لم يتم العثور على هذا الـ ID</p>';
        }
    });
}

// الوظائف المطلوبة للقائمة السفلية (هنكمل برمجتها صفحة صفحة)
window.showStatus = function() { alert("ميزة الاستوري قيد التطوير - هتقدر تنزل صور قريب!"); }
window.showGroups = function() { alert("قائمة الأصدقاء لعمل جروب هتظهر هنا"); }
window.openSettings = function() { alert("الإعدادات: تغيير السيم وتأمين الحساب برقم سري"); }

// تحديث عداد الرسايل (مثال وهمي دلوقتي وهنربطه بجد في صفحة الشات)
document.getElementById('unreadCount').innerText = "5"; 
