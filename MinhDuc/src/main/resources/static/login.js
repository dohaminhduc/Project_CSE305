let selectedRole = null;

    // Handle role selection
    document.querySelectorAll('.role-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            document.querySelectorAll('.role-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            selectedRole = this.dataset.role;
            document.getElementById('role').value = selectedRole;

            document.querySelectorAll('.role-info').forEach(info => info.classList.remove('show'));
            document.getElementById(selectedRole + 'Info').classList.add('show');

            document.getElementById('roleAlert').style.display = 'none';
        });
    });

    document.getElementById('loginForm').addEventListener('submit', function (e) {
        e.preventDefault();

        if (!selectedRole) {
            document.getElementById('roleAlert').style.display = 'block';
            return;
        }

        const email = document.getElementById('email').value.toLowerCase(); // Lấy email và chuyển về chữ thường để so sánh
        const password = document.getElementById('password').value; // Mật khẩu không được sử dụng trong demo này

        let mockUserName;
        let mockUserRole;

        if (selectedRole === 'doctor') {
            mockUserRole = 'doctor';
            
            if (email === 'doduc1605@gmail.com') {
                mockUserName = 'Minh Duc';
            } else if (email === 'bacsi.nguyena@example.com') {
                mockUserName = 'Nguyen Van A';
            } else if (email === 'bacsi.leb@example.com') { 
                mockUserName = 'le Thi B';
            } else if (email === 'bacsi.tranc@example.com') { 
                mockUserName = 'Nguyen Phuong C';
            }
            else {
                const namePart = email.split('@')[0].replace('.', ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
                mockUserName = `Bác sĩ ${namePart}`;
            }
            // --- Kết thúc logic thay đổi tên bác sĩ ---
        } else if (selectedRole === 'patient') {
            mockUserRole = 'patient';
            // Bạn cũng có thể làm tương tự để thay đổi tên bệnh nhân dựa trên email
            if (email === 'patientabc@gmail.com') {
                mockUserName = 'Trần Thị B';
            } else if (email === 'benhnhan.hoang@example.com') {
                mockUserName = 'Bệnh nhân Hoàng';
            } else {
                 const namePart = email.split('@')[0].replace('.', ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
                mockUserName = `Bệnh nhân ${namePart}`;
            }
        } else {
            document.getElementById('roleAlert').style.display = 'block';
            return;
        }

        // Lưu thông tin vào localStorage
        localStorage.setItem('loggedInUserId', email); 
        localStorage.setItem('loggedInUserName', mockUserName); 
        localStorage.setItem('loggedInUserRole', mockUserRole);

        alert(`Đăng nhập thành công với vai trò ${selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)}!\nEmail: ${email}`);

        window.location.href = selectedRole === 'doctor' ? 'doctor.html' : 'patient.html';
    });

    document.querySelectorAll('.form-control').forEach(input => {
        input.addEventListener('focus', function () {
            this.parentElement.classList.add('focused');
        });
        input.addEventListener('blur', function () {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
    });