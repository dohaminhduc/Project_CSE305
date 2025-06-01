// Biến toàn cục để lưu trữ dữ liệu bệnh nhân
        let allPatientsData = [];
        let currentLoggedInPatient = null; // Để lưu trữ object bệnh nhân đã đăng nhập

        // Dữ liệu bác sĩ (tĩnh, có thể được tải động nếu có backend)
        const allDoctorsData = [
            { email: 'doduc1605@gmail.com', name: 'BS. Đỗ Hà Minh Đức', contact: '0901234567', specialty: 'Nội tổng quát' },
            { email: 'bacsi.nguyena@example.com', name: 'BS. Nguyễn Văn A', contact: '0911223344', specialty: 'Tim mạch' },
            { email: 'bacsi.leb@example.com', name: 'BS. Lê Thị B', contact: '0922334455', specialty: 'Nhi khoa' },
        ];

        // Hàm tải dữ liệu bệnh nhân từ localStorage
        function loadInitialPatientsData() {
            const storedPatients = localStorage.getItem('patientsData');
            if (storedPatients) {
                allPatientsData = JSON.parse(storedPatients);
            } else {
                // KHÔNG TẠO DỮ LIỆU MẶC ĐỊNH Ở ĐÂY.
                // allPatientsData sẽ là mảng rỗng [] nếu localStorage trống.
                // Hàm loadPatientDetails() sẽ xử lý việc không tìm thấy bệnh nhân.
                console.warn('localStorage "patientsData" trống. Vui lòng đảm bảo bạn đã đăng nhập vào trang Doctor Dashboard ít nhất một lần để khởi tạo dữ liệu.');
                allPatientsData = []; // Đảm bảo nó là mảng rỗng nếu không có dữ liệu
            }
        }

        // Hàm hiển thị chi tiết bệnh nhân
        function loadPatientDetails() {
            const loggedInUserId = localStorage.getItem('loggedInUserId');
            currentLoggedInPatient = allPatientsData.find(p => p.patientEmail === loggedInUserId);

            if (!currentLoggedInPatient) {
                alert('Không tìm thấy dữ liệu cho bệnh nhân này. Vui lòng đăng nhập lại hoặc đảm bảo dữ liệu bệnh nhân đã được tạo qua trang Doctor Dashboard.');
                logout(); // Đăng xuất nếu không tìm thấy dữ liệu
                return;
            }

            // Hiển thị tên bệnh nhân trên sidebar
            document.getElementById('patientNameDisplay').textContent = currentLoggedInPatient.name;

            // Hiển thị dữ liệu sức khỏe
            const healthData = currentLoggedInPatient.healthData;
            document.getElementById('temperature').textContent = `${healthData.temperature}°C`;
            document.getElementById('heartRate').textContent = `${healthData.heartRate} bpm`;
            document.getElementById('bloodPressure').textContent = healthData.bloodPressure;
            document.getElementById('lastUpdated').textContent = `Cập nhật lần cuối: ${healthData.lastUpdated}`;

            // Cập nhật màu sắc cho các chỉ số quan trọng
            const tempElement = document.getElementById('temperature');
            if (healthData.temperature > 37.5) {
                tempElement.className = 'vital-danger';
            } else if (healthData.temperature > 37.0) {
                tempElement.className = 'vital-warning';
            } else {
                tempElement.className = 'vital-normal';
            }

            const hrElement = document.getElementById('heartRate');
            if (healthData.heartRate > 100 || healthData.heartRate < 60) {
                hrElement.className = 'vital-warning';
            } else {
                hrElement.className = 'vital-normal';
            }

            const bpElement = document.getElementById('bloodPressure');
            const systolic = parseInt(healthData.bloodPressure.split('/')[0]);
            if (systolic > 140) {
                bpElement.className = 'vital-danger';
            } else if (systolic > 130) {
                bpElement.className = 'vital-warning';
            } else {
                bpElement.className = 'vital-normal';
            }


            // Hiển thị thông tin bác sĩ được gán
            const assignedDoctor = allDoctorsData.find(doc => doc.email === currentLoggedInPatient.assignedDoctorEmail);
            if (assignedDoctor) {
                document.getElementById('assignedDoctorName').textContent = assignedDoctor.name;
                document.getElementById('assignedDoctorEmail').textContent = assignedDoctor.email;
                document.getElementById('assignedDoctorContact').textContent = assignedDoctor.contact;
                document.getElementById('assignedDoctorSpecialty').textContent = assignedDoctor.specialty;
            } else {
                document.getElementById('assignedDoctorName').textContent = 'Chưa được gán';
                document.getElementById('assignedDoctorEmail').textContent = 'N/A';
                document.getElementById('assignedDoctorContact').textContent = 'N/A';
                document.getElementById('assignedDoctorSpecialty').textContent = 'N/A';
            }

            // Tải và hiển thị lịch sử tư vấn
            updateConsultationHistory();
            // Tải và hiển thị tin nhắn
            loadMessages();
        }

        // Hàm tải tin nhắn
        function loadMessages() {
            const messageHistoryElement = document.getElementById('messageHistory');
            messageHistoryElement.innerHTML = ''; // Clear existing messages

            if (!currentLoggedInPatient || !currentLoggedInPatient.messages || currentLoggedInPatient.messages.length === 0) {
                messageHistoryElement.innerHTML = '<p class="text-muted text-center">Chưa có tin nhắn nào. Bắt đầu cuộc trò chuyện với bác sĩ của bạn!</p>';
                return;
            }

            currentLoggedInPatient.messages.forEach(msg => {
                const isMyMessage = (msg.sender === 'patient');
                const messageClass = isMyMessage ? 'text-end text-primary' : 'text-start text-secondary';
                const senderName = isMyMessage ? 'Bạn' : (msg.sender === 'doctor' ? `Bác sĩ (${msg.doctorEmail})` : 'Không xác định');

                messageHistoryElement.innerHTML += `
                    <div class="${messageClass}">
                        <strong>${senderName}:</strong> ${msg.message}
                        <small class="text-muted d-block">${msg.timestamp}</small>
                    </div>
                `;
            });
            messageHistoryElement.scrollTop = messageHistoryElement.scrollHeight; // Cuộn xuống cuối
        }

        // Hàm gửi tin nhắn
        function sendMessage() {
            const messageInput = document.getElementById('messageInput');
            const messageText = messageInput.value.trim();

            if (messageText === '') {
                alert('Vui lòng nhập tin nhắn.');
                return;
            }

            if (!currentLoggedInPatient) {
                alert('Không thể gửi tin nhắn. Không tìm thấy dữ liệu bệnh nhân.');
                return;
            }

            if (!currentLoggedInPatient.messages) {
                currentLoggedInPatient.messages = [];
            }

            const now = new Date();
            const timestamp = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

            currentLoggedInPatient.messages.push({
                sender: 'patient',
                message: messageText,
                timestamp: timestamp
            });

            // Cập nhật lại allPatientsData trong localStorage
            const patientIndex = allPatientsData.findIndex(p => p.id === currentLoggedInPatient.id);
            if (patientIndex !== -1) {
                allPatientsData[patientIndex] = currentLoggedInPatient;
                localStorage.setItem('patientsData', JSON.stringify(allPatientsData));
            }

            loadMessages(); // Tải lại tin nhắn để hiển thị tin mới
            messageInput.value = ''; // Xóa input
        }


        function updateConsultationHistory() {
            const table = document.getElementById('consultation-history');
            table.innerHTML = ''; // Clear existing history

            if (!currentLoggedInPatient || !currentLoggedInPatient.consultationHistory || currentLoggedInPatient.consultationHistory.length === 0) {
                table.innerHTML = `<tr><td colspan="6" class="text-center text-muted">Bạn chưa có lịch sử tư vấn nào.</td></tr>`;
                return;
            }

            currentLoggedInPatient.consultationHistory.forEach(c => {
                const doctorInfo = allDoctorsData.find(d => d.email === c.doctorEmail);
                const doctorName = doctorInfo ? doctorInfo.name : c.doctorEmail; // Hiển thị tên nếu tìm thấy, không thì hiển thị email

                table.innerHTML += `
                <tr>
                    <td>${c.date}</td>
                    <td>${doctorName}</td>
                    <td>${c.type || 'Tư vấn'}</td>
                    <td><span class="badge bg-${getStatusColor(c.status)}">${c.status}</span></td>
                    <td>$${c.fee ?? '0'}</td>
                    <td><button class="btn btn-sm btn-outline-info" onclick="alert('Chi tiết tư vấn: ${c.notes}')">Chi tiết</button></td>
                </tr>`;
            });
        }

        function getStatusColor(status) {
            switch (status) {
                case 'Hoàn thành':
                    return 'success';
                case 'Đang chờ':
                    return 'warning';
                case 'Đã hủy':
                    return 'danger';
                default:
                    return 'secondary';
            }
        }

        function logout() {
            if (confirm('Bạn có chắc muốn đăng xuất?')) {
                localStorage.removeItem('loggedInUserId');
                localStorage.removeItem('loggedInUserName');
                localStorage.removeItem('loggedInUserRole');
                alert('Đăng xuất thành công!');
                window.location.href = 'login.html';
            }
        }

        document.addEventListener('DOMContentLoaded', function () {
            const loggedInUserId = localStorage.getItem('loggedInUserId');
            const loggedInUserRole = localStorage.getItem('loggedInUserRole');

            if (!loggedInUserId || loggedInUserRole !== 'patient') {
                alert('Bạn cần đăng nhập với tư cách Bệnh nhân để truy cập trang này.');
                window.location.href = 'login.html';
                return;
            }

            // Tải dữ liệu bệnh nhân từ localStorage
            loadInitialPatientsData();
            // Sau khi tải dữ liệu, hiển thị chi tiết bệnh nhân hiện tại
            loadPatientDetails();

            // Gắn sự kiện cho nút gửi tin nhắn
            document.getElementById('sendMessageBtn').addEventListener('click', sendMessage);
            document.getElementById('messageInput').addEventListener('keypress', function (event) {
                if (event.key === 'Enter') {
                    sendMessage();
                }
            });
        });