// 1. استيراد مكتبات Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, set, get, child } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

// 2. إعدادات Firebase الخاصة بمشروعك (من الصورة اللي بعتها)
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

// --- [وظيفة حفظ البيانات في البروفايل] ---
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
            id: myID
        }).then(() => {
            document.getElementById('status').innerText = "✅ تم الحفظ بنجاح!";
            document.getElementById('status').style.color = "#00a884";
        }).catch((error) => {
            alert("حدث خطأ أثناء الحفظ: " + error.message);
        });
    } else {
        alert("من فضلك اكتب الاسم ورقم الهاتف");
    }
}

// --- [وظيفة البحث عن صديق بالـ ID] ---
window.searchUser = function() {
    const searchId = document.getElementById('searchInput').value.trim();
    const resultDiv = document.getElementById('searchResult');

    if(!searchId) {
        resultDiv.innerHTML = '<p style="text-align:center; color:#8696a0;">اكتب الـ ID للبحث</p>';
        return;
    }

    const dbRef = ref(getDatabase());
    get(child(dbRef, `users/${searchId}`)).then((snapshot) => {
        if (snapshot.exists()) {
            const data = snapshot.val();
            // إظهار النتيجة بتصميم الـ Dark Mode اللي زي واتساب
            resultDiv.innerHTML = `
                <div class="user-card" onclick="startChat('${data.id}')" style="display: flex; align-items: center; padding: 15px; border-bottom: 0.5px solid #222d34; cursor: pointer;">
                    <div class="user-avatar" style="width: 50px; height: 50px; background: #687782; border-radius: 50%; margin-left: 15px; display: flex; align-items: center; justify-content: center; font-size: 20px; color: white;">
                        ${data.username.charAt(0).toUpperCase()}
                    </div>
                    <div class="user-details" style="flex: 1;">
                        <b style="font-size: 17px; display: block; color: #e9edef;">${data.username}</b>
                        <p style="color: #8696a0; font-size: 14px; margin: 0;">${data.bio || 'متوفر'}</p>
                    </div>
                    <span style="color:#00a884; font-size: 12px; font-weight: bold;">${data.id}</span>
                </div>
            `;
        } else {
            resultDiv.innerHTML = '<p style="text-align:center; color:#ff4b4b; margin-top:20px;">الـ ID ده مش موجود!</p>';
        }
    }).catch((error) => {
        console.error(error);
        alert("خطأ في الاتصال بالسيرفر");
    });
}

// --- [وظيفة بدء الدردشة] ---
window.startChat = function(userId) {
    // دي الخطوة الجاية اللي هنعمل فيها صفحة المحادثة
    alert("سيتم فتح المحادثة مع: " + userId);
}
