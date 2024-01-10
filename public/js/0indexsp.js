function goToProfile() {
    // ดึงข้อมูลผู้ใช้โดยใช้ fetch หรือ AJAX
    fetch("/user", { method: "GET", credentials: "same-origin" })
        .then(response => response.json())
        .then(user => {
            // ทำการ redirect พร้อมส่งข้อมูลผู้ใช้ไปที่ 2profileem.html
            window.location.href = `/views/2profileem.html?id=${user.id}`;
        })
        .catch(error => console.error("Error fetching user data:", error));
}