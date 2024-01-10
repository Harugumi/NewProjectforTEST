document.addEventListener("DOMContentLoaded", function () {
    if (window.location.pathname === "/views/2profileem.html") {
        console.log("Fetching user profile data...");
        loadProfileData();  // เรียกฟังก์ชันดึงข้อมูลผู้ใช้
    }
});

async function loadProfileData() {
    try {
        // เรียก API เพื่อดึงข้อมูลผู้ใช้
        const response = await fetch("/api/user/profile");
        const data = await response.json();

        // แสดงข้อมูลผู้ใช้บนหน้า Profile
        document.getElementById("id_mem").textContent = data.id_mem;
        document.getElementById("fname").textContent = data.fname;
        document.getElementById("lname").textContent = data.lname;
        document.getElementById("department").textContent = data.department;
        document.getElementById("email").textContent = data.email;
        document.getElementById("phone").textContent = data.phone;

    } catch (error) {
        console.error("Error fetching user data:", error);
    }
}
