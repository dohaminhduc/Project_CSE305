let allUsersData = [];

// Hàm khởi tạo dữ liệu người dùng mặc định trong localStorage
function loadInitialUsersData() {
    const storedUsers = localStorage.getItem('usersData');
    if (storedUsers) {
        allUsersData = JSON.parse(storedUsers);
    } else {
        // Dữ liệu người dùng mặc định (Email, Mật khẩu, Tên hiển thị, Vai trò)
        allUsersData = [
            { email: 'doduc1605@gmail.com', password: 'doctorpassword', name: 'Bác sĩ Minh Đức', role: 'doctor' },
            { email: 'bacsi.nguyena@example.com', password: 'doctorpassword', name: 'Bác sĩ Nguyễn A', role: 'doctor' },
            { email: 'bacsi.leb@example.com', password: 'doctorpassword', name: 'Bác sĩ Lê B', role: 'doctor' },
            // Thêm các tài khoản bệnh nhân khớp với 'patientEmail' trong doctor.js
            { email: 'patient.a@example.com', password: 'patientpassword', name: 'Nguyễn Văn A (Bệnh nhân)', role: 'patient' },
            { email: 'patient.b@example.com', password: 'patientpassword', name: 'Trần Thị B (Bệnh nhân)', role: 'patient' },
            { email: 'patient.c@example.com', password: 'patientpassword', name: 'Lê Văn C (Bệnh nhân)', role: 'patient' },
            { email: 'patient.d@example.com', password: 'patientpassword', name: 'Phạm Thị D (Bệnh nhân)', role: 'patient' }
            
        ];
        localStorage.setItem('usersData', JSON.stringify(allUsersData));
    }
}

let selectedRole = null;

document.addEventListener('DOMContentLoaded', function () {
    loadInitialUsersData(); // Tải dữ liệu người dùng khi trang load

    // Handle role selection
    document.querySelectorAll('.role-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            document.querySelectorAll('.role-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            selectedRole = this.dataset.role;
            const roleInput = document.getElementById('role');
            if (roleInput) roleInput.value = selectedRole; // Kiểm tra tồn tại
            
            document.querySelectorAll('.role-info').forEach(info => info.classList.remove('show'));
            const selectedInfo = document.getElementById(selectedRole + 'Info');
            if (selectedInfo) selectedInfo.classList.add('show'); // Kiểm tra tồn tại

            const roleAlert = document.getElementById('roleAlert');
            if (roleAlert) roleAlert.style.display = 'none'; // Kiểm tra tồn tại
        });
    });

    document.getElementById('loginForm')?.addEventListener('submit', function (e) { // Optional Chaining
        e.preventDefault();

        const roleAlert = document.getElementById('roleAlert');
        if (!selectedRole) {
            if (roleAlert) roleAlert.style.display = 'block';
            return;
        }

        const emailInput = document.getElementById('email');
        const passwordInput = document.getElementById('password');

        if (!emailInput || !passwordInput) {
            console.error("Missing email or password input field.");
            return;
        }

        const email = emailInput.value.toLowerCase();
        const password = passwordInput.value;

        // Tìm người dùng trong dữ liệu đã tải
        const user = allUsersData.find(u => u.email === email && u.password === password && u.role === selectedRole);

        if (user) {
            // Lưu thông tin vào localStorage
            localStorage.setItem('loggedInUserId', user.email);
            localStorage.setItem('loggedInUserName', user.name);
            localStorage.setItem('loggedInUserRole', user.role);

            alert(`Đăng nhập thành công với vai trò ${user.role.charAt(0).toUpperCase() + user.role.slice(1)}!\nEmail: ${user.email}`);

            if (user.role === 'doctor') {
                window.location.href = 'doctor.html';
            } else if (user.role === 'patient') {
                window.location.href = 'patient.html';
            }
        } else {
            alert('Email, mật khẩu hoặc vai trò không đúng. Vui lòng thử lại!');
        }
    });

    document.querySelectorAll('.form-control').forEach(input => {
        input.addEventListener('focus', function () {
            this.parentElement?.classList.add('focused'); // Optional Chaining
        });
        input.addEventListener('blur', function () {
            if (!this.value) {
                this.parentElement?.classList.remove('focused'); // Optional Chaining
            }
        });
    });
});