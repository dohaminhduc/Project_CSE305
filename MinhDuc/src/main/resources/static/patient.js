let allPatientsData = [];
        let currentLoggedInPatient = null;

        // Thêm biến này để lưu thông tin tư vấn đang được thanh toán
        let currentConsultationToPay = null;

        const allDoctorsData = [
            { email: 'doduc1605@gmail.com', name: 'BS. Đỗ Hà Minh Đức', contact: '0901234567', specialty: 'Nội tổng quát' },
            { email: 'bacsi.nguyena@example.com', name: 'BS. Nguyễn Văn A', contact: '0911223344', specialty: 'Tim mạch' },
            { email: 'bacsi.leb@example.com', name: 'BS. Lê Thị B', contact: '0922334455', specialty: 'Nhi khoa' },
        ];

        // --- Các hàm lưu/tải dữ liệu bác sĩ (cần được định nghĩa hoặc đảm bảo có) ---
        // Hàm này có thể nằm trong doctor.js hoặc một file utility chung nếu bạn có
        function saveDoctorData(doctorToSave) {
            let doctors = JSON.parse(localStorage.getItem('doctorsData')) || []; // Đảm bảo key 'doctorsData' khớp với key bạn dùng ở doctor.js
            const doctorIndex = doctors.findIndex(d => d.email === doctorToSave.email);
            if (doctorIndex !== -1) {
                doctors[doctorIndex] = doctorToSave;
            } else {
                // Nếu bác sĩ không tồn tại, thêm mới (trường hợp này ít xảy ra nếu dữ liệu được quản lý tốt)
                doctors.push(doctorToSave);
            }
            localStorage.setItem('doctorsData', JSON.stringify(doctors)); // Lưu lại vào 'doctorsData'
        }

        // Hàm này để lấy toàn bộ dữ liệu bác sĩ
        function loadAllDoctorsData() {
            const storedDoctors = localStorage.getItem('doctorsData');
            if (storedDoctors) {
                return JSON.parse(storedDoctors);
            }
            return [];
        }
        // --- End của các hàm lưu/tải dữ liệu bác sĩ ---

        function loadInitialPatientsData() {
            const storedPatients = localStorage.getItem('patientsData');
            if (storedPatients) {
                allPatientsData = JSON.parse(storedPatients);
            } else {
                console.warn('localStorage "patientsData" trống. Vui lòng đảm bảo bạn đã đăng nhập vào trang Doctor Dashboard ít nhất một lần để khởi tạo dữ liệu.');
                allPatientsData = [];
            }
        }

        function loadPatientDetails() {
            const loggedInUserId = localStorage.getItem('loggedInUserId');
            // Tìm bệnh nhân trong allPatientsData dựa trên patientEmail
            currentLoggedInPatient = allPatientsData.find(p => p.patientEmail === loggedInUserId);

            if (!currentLoggedInPatient) {
                alert('Không tìm thấy dữ liệu cho bệnh nhân này. Vui lòng đăng nhập lại hoặc đảm bảo dữ liệu bệnh nhân đã được tạo qua trang Doctor Dashboard.');
                logout();
                return;
            }

            document.getElementById('patientNameDisplay').textContent = currentLoggedInPatient.name;

            const healthData = currentLoggedInPatient.healthData;
            document.getElementById('temperature').textContent = `${healthData.temperature}°C`;
            document.getElementById('heartRate').textContent = `${healthData.heartRate} bpm`;
            document.getElementById('bloodPressure').textContent = healthData.bloodPressure;
            document.getElementById('lastUpdated').textContent = `Cập nhật lần cuối: ${healthData.lastUpdated}`;

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

            updateConsultationHistory();
            loadMessages();
        }

        // Hàm tải tin nhắn
        function loadMessages() {
            const messageHistoryElement = document.getElementById('messageHistory');
            messageHistoryElement.innerHTML = '';

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
            messageHistoryElement.scrollTop = messageHistoryElement.scrollHeight;
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

            // Cập nhật và lưu dữ liệu bệnh nhân
            savePatientData();

            loadMessages();
            messageInput.value = '';
        }

        // Hàm cập nhật và hiển thị lịch sử tư vấn
        function updateConsultationHistory() {
            const table = document.getElementById('consultation-history');
            table.innerHTML = '';

            if (!currentLoggedInPatient || !currentLoggedInPatient.consultationHistory || currentLoggedInPatient.consultationHistory.length === 0) {
                table.innerHTML = `<tr><td colspan="6" class="text-center text-muted">Bạn chưa có lịch sử tư vấn nào.</td></tr>`;
                return;
            }

            currentLoggedInPatient.consultationHistory.forEach((c, index) => {
                const doctorInfo = allDoctorsData.find(d => d.email === c.doctorEmail);
                const doctorName = doctorInfo ? doctorInfo.name : c.doctorEmail;

                // Xác định trạng thái mặc định nếu không có hoặc là null
                const statusDisplay = c.status || 'Đang chờ';
                const statusColor = getStatusColor(statusDisplay);

                let paymentCellContent = '';
                if (c.status === 'Hoàn thành' && !c.isPaid) {
                    paymentCellContent = `<button class="btn btn-sm btn-success" onclick="openPaymentModal(${index})">Thanh toán</button>`;
                } else if (c.isPaid) {
                    paymentCellContent = `<span class="badge bg-success">Đã thanh toán</span>`;
                } else if (statusDisplay === 'Hoàn thành' && !c.isPaid) {
                    paymentCellContent = `<span class="badge bg-danger">Chưa thanh toán</span>`;
                } else {
                    paymentCellContent = '';
                }


                table.innerHTML += `
                <tr>
                    <td>${c.date}</td>
                    <td>${doctorName}</td>
                    <td>${c.type || 'Tư vấn'}</td>
                    <td><span class="badge bg-${statusColor}">${statusDisplay}</span></td>
                    <td>$${c.fee ?? '0'}</td>
                    <td>${paymentCellContent}</td>
                </tr>`;
            });
        }

        // Hàm mở modal thanh toán
        function openPaymentModal(consultationIndex) {
            currentConsultationToPay = currentLoggedInPatient.consultationHistory[consultationIndex];
            const doctorInfo = allDoctorsData.find(d => d.email === currentConsultationToPay.doctorEmail);
            const doctorName = doctorInfo ? doctorInfo.name : currentConsultationToPay.doctorEmail;

            document.getElementById('paymentDate').innerText = currentConsultationToPay.date;
            document.getElementById('paymentDoctor').innerText = doctorName;
            document.getElementById('paymentAmount').innerText = `$${currentConsultationToPay.fee ?? '0'}`;

            const paymentModal = new bootstrap.Modal(document.getElementById('paymentModal'));
            paymentModal.show();
        }

        // Hàm xử lý form thanh toán
        document.addEventListener('DOMContentLoaded', function() {
            // ... (các đoạn mã đã có trong DOMContentLoaded)

            const paymentForm = document.getElementById('paymentForm');
            if (paymentForm) {
                paymentForm.addEventListener('submit', function(event) {
                    event.preventDefault(); // Ngăn chặn form submit mặc định

                    // Giả lập quá trình thanh toán thành công
                    alert('Thanh toán thành công!');

                    // Cập nhật trạng thái tư vấn
                    if (currentConsultationToPay) {
                        currentConsultationToPay.isPaid = true; // Đánh dấu là đã thanh toán
                        currentConsultationToPay.status = 'Hoàn thành'; // Cập nhật trạng thái
                        savePatientData(); // Lưu dữ liệu bệnh nhân

                        // Gửi thông báo đến bác sĩ (cập nhật trạng thái trong dữ liệu của bác sĩ)
                        sendPaymentConfirmationToDoctor(currentConsultationToPay);

                        updateConsultationHistory(); // Cập nhật lại bảng lịch sử

                        // Đóng modal thanh toán
                        const paymentModal = bootstrap.Modal.getInstance(document.getElementById('paymentModal'));
                        if (paymentModal) {
                            paymentModal.hide();
                        }
                    }
                });
            }
        });


        // Hàm giả lập gửi thông báo thanh toán đến bác sĩ
        function sendPaymentConfirmationToDoctor(consultation) {
            // Tải lại toàn bộ dữ liệu bác sĩ để đảm bảo cập nhật mới nhất
            const doctors = loadAllDoctorsData();
            const doctor = doctors.find(d => d.email === consultation.doctorEmail);

            if (doctor) {
                if (!doctor.consultationHistory) {
                    doctor.consultationHistory = []; // Đảm bảo có mảng consultationHistory
                }
                const docConsultation = doctor.consultationHistory.find(c =>
                    c.patientEmail === currentLoggedInPatient.patientEmail && // Sử dụng patientEmail để khớp
                    c.date === consultation.date &&
                    c.type === consultation.type
                );
                if (docConsultation) {
                    docConsultation.status = 'Hoàn thành'; // Cập nhật trạng thái cho bác sĩ
                    docConsultation.isPaid = true; // Đánh dấu là đã thanh toán cho bác sĩ
                    saveDoctorData(doctor); // Lưu dữ liệu bác sĩ
                    console.log(`Đã cập nhật trạng thái tư vấn cho bác sĩ ${doctor.name} về bệnh nhân ${currentLoggedInPatient.name} là 'Hoàn thành'.`);
                } else {
                    console.warn(`Không tìm thấy tư vấn của bệnh nhân ${currentLoggedInPatient.name} trong lịch sử của bác sĩ ${doctor.name} để cập nhật.`);
                }
            } else {
                console.error(`Không tìm thấy bác sĩ với email ${consultation.doctorEmail} để cập nhật trạng thái tư vấn.`);
            }
        }


        // Hàm để lưu dữ liệu bệnh nhân vào Local Storage
        function savePatientData() {
            const patients = JSON.parse(localStorage.getItem('patientsData')) || []; // Đảm bảo key 'patientsData' khớp với key bạn dùng
            const patientIndex = patients.findIndex(p => p.patientEmail === currentLoggedInPatient.patientEmail); // Tìm theo patientEmail
            if (patientIndex !== -1) {
                patients[patientIndex] = currentLoggedInPatient;
                localStorage.setItem('patientsData', JSON.stringify(patients));
            } else {
                console.error('Không tìm thấy bệnh nhân hiện tại để lưu dữ liệu.');
            }
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

            loadInitialPatientsData();
            loadPatientDetails();

            document.getElementById('sendMessageBtn').addEventListener('click', sendMessage);
            document.getElementById('messageInput').addEventListener('keypress', function (event) {
                if (event.key === 'Enter') {
                    sendMessage();
                }
            });
        });

        