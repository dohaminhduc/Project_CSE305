// Biến toàn cục để lưu trữ dữ liệu bệnh nhân và bệnh nhân đang được chọn
let allPatientsData = [];
let currentSelectedPatientId = null;

// Hàm để tải dữ liệu bệnh nhân (ưu tiên từ localStorage)
function loadInitialPatientsData() {
    const storedPatients = localStorage.getItem('patientsData');
    if (storedPatients) {
        allPatientsData = JSON.parse(storedPatients);
    } else {
        // Dữ liệu mặc định nếu chưa có trong localStorage
        // Đây là DỮ LIỆU MẶC ĐỊNH CHÂN LÝ.
        // Bất kỳ thay đổi nào về cấu trúc dữ liệu bệnh nhân HOẶC thêm/sửa/xóa bệnh nhân mặc định
        // chỉ cần thực hiện ở đây.
        allPatientsData = [
            {
                id: 'P001',
                name: 'Nguyễn Văn A',
                dob: '1990-01-15',
                gender: 'Nam',
                contact: '0912345678',
                address: '123 Đường ABC, Quận 1, TP.HCM',
                lastVisit: '2025-05-20',
                status: 'Ổn định',
                assignedDoctorEmail: 'doduc1605@gmail.com', // Bác sĩ Minh Đức
                patientEmail: 'patient.a@example.com', // Email của bệnh nhân để đăng nhập
                healthData: {
                    temperature: 36.8,
                    heartRate: 72,
                    bloodPressure: '120/80',
                    lastUpdated: '2025-05-28 10:30'
                },
                consultationHistory: [
                    { date: '2025-05-20', doctorEmail: 'doduc1605@gmail.com', type: 'Khám định kỳ', status: 'Hoàn thành', fee: 200, notes: 'Kiểm tra tổng quát.' },
                    { date: '2025-05-25', doctorEmail: 'doduc1605@gmail.com', type: 'Tư vấn trực tuyến', status: 'Đang chờ', fee: 50, notes: 'Hẹn tư vấn về chế độ ăn.' },
                ],
                messages: [
                    { sender: 'doctor', message: 'Chào anh A, anh có khỏe không? Có vấn đề gì cần tư vấn không?', timestamp: '2025-05-29 09:00', doctorEmail: 'doduc1605@gmail.com' },
                    { sender: 'patient', message: 'Tôi ổn, cảm ơn bác sĩ! Mấy hôm nay tôi cảm thấy hơi mệt mỏi.', timestamp: '2025-05-29 09:05' }
                ]
            },
            {
                id: 'P002',
                name: 'Trần Thị B',
                dob: '1985-11-22',
                gender: 'Nữ',
                contact: '0987654321',
                address: '456 Đường XYZ, Quận 2, TP.HCM',
                lastVisit: '2025-05-18',
                status: 'Cần theo dõi',
                assignedDoctorEmail: 'bacsi.nguyena@example.com', // Bác sĩ Nguyễn Văn A
                patientEmail: 'patient.b@example.com', // Email của bệnh nhân để đăng nhập
                healthData: {
                    temperature: 37.2,
                    heartRate: 95,
                    bloodPressure: '135/85',
                    lastUpdated: '2025-05-28 11:00'
                },
                consultationHistory: [
                    { date: '2025-05-18', doctorEmail: 'bacsi.nguyena@example.com', type: 'Khám định kỳ', status: 'Hoàn thành', fee: 200, notes: 'Kiểm tra tổng quát.' },
                ],
                messages: []
            },
            {
                id: 'P003',
                name: 'Lê Văn C',
                dob: '1970-03-01',
                gender: 'Nam',
                contact: '0901234567',
                address: '789 Đường DEF, Quận 3, TP.HCM',
                lastVisit: '2025-05-22',
                status: 'Ổn định',
                assignedDoctorEmail: 'doduc1605@gmail.com', // Bác sĩ Minh Đức
                patientEmail: 'patient.c@example.com', // Email của bệnh nhân để đăng nhập
                healthData: {
                    temperature: 36.6,
                    heartRate: 68,
                    bloodPressure: '110/70',
                    lastUpdated: '2025-05-28 12:00'
                },
                consultationHistory: [
                    { date: '2025-05-22', doctorEmail: 'doduc1605@gmail.com', type: 'Tư vấn kết quả', status: 'Đang chờ', fee: 100, notes: 'Chờ kết quả xét nghiệm.' },
                ],
                messages: []
            },
            {
                id: 'P004',
                name: 'Phạm Thị D',
                dob: '2000-07-07',
                gender: 'Nữ',
                contact: '0909876543',
                address: '101 Đường GHI, Quận 4, TP.HCM',
                lastVisit: '2025-05-29',
                status: 'Khỏe mạnh',
                assignedDoctorEmail: 'bacsi.leb@example.com', // Bác sĩ Lê Thị B
                patientEmail: 'patient.d@example.com', // Email của bệnh nhân để đăng nhập
                healthData: {
                    temperature: 36.7,
                    heartRate: 70,
                    bloodPressure: '115/75',
                    lastUpdated: '2025-05-29 09:00'
                },
                consultationHistory: [],
                messages: []
            }
        ];
        localStorage.setItem('patientsData', JSON.stringify(allPatientsData)); // Lưu mặc định vào localStorage
    }
}

// Hàm để thêm bệnh nhân mới
// Thêm event listener cho form thêm bệnh nhân
document.getElementById('addPatientForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Ngăn chặn form gửi đi

    const newPatient = {
        id: 'P' + (allPatientsData.length + 1).toString().padStart(3, '0'), // Tạo ID mới
        name: document.getElementById('newPatientName').value,
        patientEmail: document.getElementById('newPatientEmail').value,
        password: document.getElementById('newPatientPassword').value, // Mật khẩu bệnh nhân
        dob: document.getElementById('newPatientDob').value,
        gender: document.getElementById('newPatientGender').value,
        contact: document.getElementById('newPatientContact').value,
        address: document.getElementById('newPatientAddress').value,
        lastVisit: new Date().toISOString().slice(0, 10), // Ngày thêm là ngày thăm khám gần nhất
        status: 'Mới',
        assignedDoctorEmail: localStorage.getItem('loggedInUserId'), // Gán cho bác sĩ đang đăng nhập
        healthData: {
            temperature: 37.0,
            heartRate: 75,
            bloodPressure: '120/80',
            lastUpdated: new Date().toISOString().slice(0, 16).replace('T', ' ')
        },
        consultationHistory: [],
        messages: []
    };

    // Kiểm tra trùng email bệnh nhân
    const existingPatient = allPatientsData.find(p => p.patientEmail === newPatient.patientEmail);
    if (existingPatient) {
        alert('Email bệnh nhân này đã tồn tại. Vui lòng sử dụng email khác.');
        return;
    }

    allPatientsData.push(newPatient);
    localStorage.setItem('patientsData', JSON.stringify(allPatientsData)); // Cập nhật localStorage
    alert('Đã thêm bệnh nhân mới thành công!');

    // Đóng modal và tải lại danh sách bệnh nhân
    const addPatientModal = bootstrap.Modal.getInstance(document.getElementById('addPatientModal'));
    if (addPatientModal) addPatientModal.hide(); // Kiểm tra sự tồn tại của modal
    loadPatients();
    // Sau khi thêm bệnh nhân mới, đảm bảo hiển thị phần chi tiết bệnh nhân
    showPatientDetailsUI();
});

/**
 * Calculates the age of a person based on their date of birth.
 * @param {string} dobString - The date of birth in 'YYYY-MM-DD' format.
 * @returns {number} The age in years, or null if dobString is invalid.
 */
function calculateAge(dobString) {
    if (!dobString) {
        return null;
    }
    const birthDate = new Date(dobString);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

// Hàm tải và hiển thị danh sách bệnh nhân
async function loadPatients() {
    const loggedInDoctorEmail = localStorage.getItem('loggedInUserId');
    const patientListElement = document.getElementById('patientList');
    patientListElement.innerHTML = ''; // Clear existing list

    const patientsForCurrentDoctor = allPatientsData.filter(patient =>
        patient.assignedDoctorEmail === loggedInDoctorEmail
    );

    // Xóa logic ẩn/hiện showStatisticsUI() khỏi đây.
    // Logic hiển thị mặc định khi tải trang sẽ nằm trong DOMContentLoaded.
    if (patientsForCurrentDoctor.length === 0) {
        patientListElement.innerHTML = '<p class="text-muted text-center mt-3">Bạn chưa có bệnh nhân nào được gán.</p>';
        document.getElementById('completeConsultationBtn').style.display = 'none';
        currentSelectedPatientId = null; // Đảm bảo không có bệnh nhân nào được chọn
        // Không return ở đây để các card bệnh nhân (nếu có) vẫn được xử lý sau này
        // (mặc dù trong trường hợp này sẽ không có gì để xử lý).
    } else {
        // Tự động chọn bệnh nhân đầu tiên nếu có, hoặc giữ bệnh nhân đã chọn
        let patientToDisplay = null;
        if (currentSelectedPatientId) {
            patientToDisplay = patientsForCurrentDoctor.find(p => p.id === currentSelectedPatientId);
        }
        if (!patientToDisplay) {
            patientToDisplay = patientsForCurrentDoctor[0];
        }

        if (patientToDisplay) {
            currentSelectedPatientId = patientToDisplay.id;
            showPatientDetails(currentSelectedPatientId);
            // showPatientDetailsUI(); // Việc hiển thị UI do DOMContentLoaded hoặc click đảm nhiệm
            document.getElementById('completeConsultationBtn').style.display = 'inline-block';
        } else {
            // Trường hợp này xảy ra nếu patientsForCurrentDoctor.length > 0 nhưng patientToDisplay vẫn null
            // (ví dụ: filterPatients đã lọc ra hết, nhưng loadPatients() lại không được gọi lại)
            console.warn("Không tìm thấy bệnh nhân để hiển thị chi tiết mặc dù danh sách không rỗng.");
            // Ẩn nút hoàn thành tư vấn nếu không có bệnh nhân để hiển thị chi tiết
            document.getElementById('completeConsultationBtn').style.display = 'none';
        }
    }


    patientsForCurrentDoctor.forEach(patient => {
        const patientCard = `
                        <div class="col-12 mb-3">
                            <div class="card patient-card shadow-sm" data-patient-id="${patient.id}">
                                <div class="card-body">
                                    <h5 class="card-title mb-1">${patient.name}</h5>
                                    <p class="card-text text-muted mb-1">ID: ${patient.id}</p>
                                    <p class="card-text text-muted mb-0"><span class="badge bg-secondary">${patient.status}</span></p>
                                </div>
                            </div>
                        </div>
                `;
        patientListElement.innerHTML += patientCard;
    });

    // Gắn sự kiện click cho các thẻ bệnh nhân
    document.querySelectorAll('.patient-card').forEach(card => {
        card.addEventListener('click', function () {
            // Xóa active khỏi tất cả các thẻ trước đó
            document.querySelectorAll('.patient-card').forEach(c => c.classList.remove('active'));
            // Thêm active vào thẻ hiện tại
            this.classList.add('active');
            currentSelectedPatientId = this.dataset.patientId; // Lưu ID bệnh nhân đang chọn
            showPatientDetails(currentSelectedPatientId);
            showPatientDetailsUI(); // Đảm bảo UI chi tiết bệnh nhân được hiển thị
            document.getElementById('completeConsultationBtn').style.display = 'inline-block'; // Hiện nút hoàn thành
        });
    });

    // Kích hoạt lại thẻ bệnh nhân trong danh sách nếu có bệnh nhân đang chọn
    if (currentSelectedPatientId) {
        const activeCard = document.querySelector(`.patient-card[data-patient-id="${currentSelectedPatientId}"]`);
        if (activeCard) {
            activeCard.classList.add('active');
        }
    }
}

// Hàm lấy màu sắc cho trạng thái
function getStatusColor(status) {
    switch (status) {
        case 'Hoàn thành': return 'success';
        case 'Đang chờ': return 'warning';
        case 'Đã hủy': return 'danger';
        default: return 'secondary';
    }
}

// Hàm hiển thị chi tiết bệnh nhân
async function showPatientDetails(patientId) {
    const patient = allPatientsData.find(p => p.id === patientId);

    if (!patient) {
        console.error('Không tìm thấy bệnh nhân với ID:', patientId);
        return;
    }

    // Hiển thị thông tin bệnh nhân
    document.getElementById('patientName').textContent = patient.name;
    document.getElementById('patientId').textContent = patient.id;
    // Calculate and display age
    const age = calculateAge(patient.dob);
    document.getElementById('patientAge').textContent = age !== null ? `${age} tuổi` : 'N/A';
    document.getElementById('patientDob').textContent = patient.dob; // Still display DOB for context
    document.getElementById('patientGender').textContent = patient.gender;
    document.getElementById('patientContact').textContent = patient.contact;
    document.getElementById('patientAddress').textContent = patient.address;

    // Hiển thị dữ liệu sức khỏe
    const healthData = patient.healthData;
    document.getElementById('temperature').textContent = `${healthData.temperature}°C`;
    document.getElementById('heartRate').textContent = `${healthData.heartRate} bpm`;
    document.getElementById('bloodPressure').textContent = healthData.bloodPressure;
    document.getElementById('lastUpdated').textContent = `Cập nhật lần cuối: ${healthData.lastUpdated}`;

    // Cập nhật màu sắc cho các chỉ số quan trọng
    const tempElement = document.getElementById('temperature');
    if (tempElement) { // Thêm kiểm tra null để an toàn
        if (healthData.temperature > 37.5) {
            tempElement.className = 'vital-danger';
        } else if (healthData.temperature > 37.0) {
            tempElement.className = 'vital-warning';
        } else {
            tempElement.className = 'vital-normal';
        }
    }


    const hrElement = document.getElementById('heartRate');
    if (hrElement) { // Thêm kiểm tra null để an toàn
        if (healthData.heartRate > 100 || healthData.heartRate < 60) {
            hrElement.className = 'vital-warning';
        } else {
            hrElement.className = 'vital-normal';
        }
    }


    const bpElement = document.getElementById('bloodPressure');
    if (bpElement) { // Thêm kiểm tra null để an toàn
        const systolic = parseInt(healthData.bloodPressure.split('/')[0]);
        if (systolic > 140) {
            bpElement.className = 'vital-danger';
        } else if (systolic > 130) {
            bpElement.className = 'vital-warning';
        } else {
            bpElement.className = 'vital-normal';
        }
    }


    // Hiển thị lịch sử tư vấn
    const consultationHistoryTable = document.getElementById('consultation-history');
    if (consultationHistoryTable) { // Thêm kiểm tra null để an toàn
        consultationHistoryTable.innerHTML = '';
        if (patient.consultationHistory && patient.consultationHistory.length > 0) {
            const loggedInDoctorEmail = localStorage.getItem('loggedInUserId');
            let hasConsultationsForDoctor = false;
            patient.consultationHistory.forEach(c => {
                if (c.doctorEmail === loggedInDoctorEmail) { // Chỉ hiển thị các tư vấn mà bác sĩ hiện tại đã hoặc đang tham gia
                    hasConsultationsForDoctor = true;
                    consultationHistoryTable.innerHTML += `
                                <tr>
                                    <td>${c.date}</td>
                                    <td>${c.doctorEmail === loggedInDoctorEmail ? 'Bạn' : c.doctorEmail}</td>
                                    <td>${c.type || 'Tư vấn'}</td>
                                    <td><span class="badge bg-${getStatusColor(c.status)}">${c.status}</span></td>
                                    <td>$${c.fee ?? '0'}</td>
                                    <td><button class="btn btn-sm btn-outline-info" onclick="alert('Chi tiết tư vấn: ${c.notes}')">Chi tiết</button></td>
                                </tr>
                            `;
                }
            });
            if (!hasConsultationsForDoctor) {
                consultationHistoryTable.innerHTML = `<tr><td colspan="6" class="text-center text-muted">Bệnh nhân này chưa có lịch sử tư vấn với bạn.</td></tr>`;
            }
        } else {
            consultationHistoryTable.innerHTML = `<tr><td colspan="6" class="text-center text-muted">Bệnh nhân này chưa có lịch sử tư vấn.</td></tr>`;
        }
    }


    // Load và hiển thị tin nhắn
    loadMessages(patientId);
}

// Hàm hiển thị thống kê
function showStatistics() {
    const today = new Date().toISOString().slice(0, 10); // Lấy ngày hiện tại YYYY-MM-DD
    const loggedInDoctorEmail = localStorage.getItem('loggedInUserId');
    let completedConsultationsToday = 0;

    allPatientsData.forEach(patient => {
        if (patient.consultationHistory) {
            patient.consultationHistory.forEach(consultation => {
                if (consultation.doctorEmail === loggedInDoctorEmail &&
                    consultation.status === 'Hoàn thành' &&
                    consultation.date === today) {
                    completedConsultationsToday++;
                }
            });
        }
    });
    const consultationsTodayElement = document.getElementById('consultationsToday');
    if (consultationsTodayElement) { // Thêm kiểm tra null để an toàn
        consultationsTodayElement.textContent = completedConsultationsToday;
    }

    // showStatistics() sẽ chỉ cập nhật số liệu, việc ẩn/hiện do showStatisticsUI() đảm nhiệm
}

// Hàm hoàn thành tư vấn
function completeConsultation() {
    if (!currentSelectedPatientId) {
        alert('Vui lòng chọn một bệnh nhân để hoàn thành tư vấn.');
        return;
    }

    const patient = allPatientsData.find(p => p.id === currentSelectedPatientId);
    if (!patient) return;

    const loggedInDoctorEmail = localStorage.getItem('loggedInUserId');
    const today = new Date().toISOString().slice(0, 10);

    // Tìm tư vấn đang chờ hoặc tạo mới
    let consultationFound = false;
    if (patient.consultationHistory) {
        patient.consultationHistory.forEach(c => {
            if (c.doctorEmail === loggedInDoctorEmail && c.status === 'Đang chờ' && c.date === today) {
                c.status = 'Hoàn thành';
                consultationFound = true;
            }
        });
    }

    if (!consultationFound) {
        // Nếu không tìm thấy tư vấn "Đang chờ" cho ngày hôm nay từ bác sĩ này, tạo một cái mới
        if (!patient.consultationHistory) patient.consultationHistory = [];
        patient.consultationHistory.push({
            date: today,
            doctorEmail: loggedInDoctorEmail,
            type: 'Tư vấn nhanh',
            status: 'Hoàn thành',
            fee: 0, // Có thể thêm input để nhập phí
            notes: 'Tư vấn hoàn thành trong ngày.'
        });
    }

    localStorage.setItem('patientsData', JSON.stringify(allPatientsData)); // Lưu cập nhật vào localStorage
    alert(`Tư vấn cho bệnh nhân ${patient.name} đã được đánh dấu là Hoàn thành!`);
    showPatientDetails(currentSelectedPatientId); // Cập nhật lại UI chi tiết
    showStatistics(); // Cập nhật lại thống kê
}

// Hàm tải tin nhắn
function loadMessages(patientId) {
    const patient = allPatientsData.find(p => p.id === patientId);
    const messageHistoryElement = document.getElementById('messageHistory');
    messageHistoryElement.innerHTML = ''; // Clear existing messages

    if (!patient || !patient.messages || patient.messages.length === 0) {
        messageHistoryElement.innerHTML = '<p class="text-muted text-center">Chưa có tin nhắn nào. Bắt đầu cuộc tư vấn!</p>';
        return;
    }

    const loggedInDoctorEmail = localStorage.getItem('loggedInUserId');
    patient.messages.forEach((msg, index) => {
        const isMyMessage = (msg.sender === 'doctor' && msg.doctorEmail === loggedInDoctorEmail);
        const messageClass = isMyMessage ? 'text-end text-primary' : 'text-start text-secondary';
        const senderName = isMyMessage ? 'Bạn' : (msg.sender === 'doctor' ? `Bác sĩ (${msg.doctorEmail})` : 'Bệnh nhân');


        const deleteButton = isMyMessage ?
            `<button class="btn btn-sm btn-outline-danger ms-2" style="width: 30px; height: 30px;" onclick="deleteMessage('${patientId}', ${index})">
                        <i class="fas fa-trash"></i>
                    </button>` : '';

        messageHistoryElement.innerHTML += `
                    <div class="${messageClass} d-flex align-items-center justify-content-${isMyMessage ? 'end' : 'start'}">
                        <div class="d-flex flex-column" style="max-width: 80%;">
                            <strong>${senderName}:</strong> ${msg.message}
                            <small class="text-muted d-block">${msg.timestamp}</small>
                        </div>
                        ${deleteButton}
                    </div>
                `;
    });
    messageHistoryElement.scrollTop = messageHistoryElement.scrollHeight; // Cuộn xuống cuối
}

// Hàm gửi tin nhắn
function sendMessage() {
    if (!currentSelectedPatientId) {
        alert('Vui lòng chọn một bệnh nhân để gửi tin nhắn.');
        return;
    }

    const messageInput = document.getElementById('messageInput');
    const messageText = messageInput.value.trim();

    if (messageText === '') {
        alert('Vui lòng nhập tin nhắn.');
        return;
    }

    const patient = allPatientsData.find(p => p.id === currentSelectedPatientId);
    if (!patient) return;

    if (!patient.messages) {
        patient.messages = [];
    }

    const now = new Date();
    const timestamp = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

    patient.messages.push({
        sender: 'doctor',
        message: messageText,
        timestamp: timestamp,
        doctorEmail: localStorage.getItem('loggedInUserId') // Lưu email bác sĩ gửi
    });

    localStorage.setItem('patientsData', JSON.stringify(allPatientsData)); // Lưu cập nhật vào localStorage
    loadMessages(currentSelectedPatientId); // Tải lại tin nhắn để hiển thị tin mới
    messageInput.value = ''; // Xóa input
}

// Hàm lọc bệnh nhân
function filterPatients() {
    const searchTerm = document.getElementById('searchPatient').value.toLowerCase();
    const loggedInDoctorEmail = localStorage.getItem('loggedInUserId');
    const patientListElement = document.getElementById('patientList');
    patientListElement.innerHTML = ''; // Clear existing list

    const patientsForCurrentDoctor = allPatientsData.filter(patient =>
        patient.assignedDoctorEmail === loggedInDoctorEmail
    );

    const filteredPatients = patientsForCurrentDoctor.filter(patient =>
        patient.name.toLowerCase().includes(searchTerm) || patient.id.toLowerCase().includes(searchTerm)
    );

    if (filteredPatients.length === 0) {
        patientListElement.innerHTML = '<p class="text-muted text-center mt-3">Không tìm thấy bệnh nhân nào.</p>';
        return;
    }

    filteredPatients.forEach(patient => {
        const patientCard = `
                        <div class="col-12 mb-3">
                            <div class="card patient-card shadow-sm" data-patient-id="${patient.id}">
                                <div class="card-body">
                                    <h5 class="card-title mb-1">${patient.name}</h5>
                                    <p class="card-text text-muted mb-1">ID: ${patient.id}</p>
                                    <p class="card-text text-muted mb-0"><span class="badge bg-secondary">${patient.status}</span></p>
                                </div>
                            </div>
                        </div>
                `;
        patientListElement.innerHTML += patientCard;
    });

    // Re-attach click listeners
    document.querySelectorAll('.patient-card').forEach(card => {
        card.addEventListener('click', function () {
            document.querySelectorAll('.patient-card').forEach(c => c.classList.remove('active'));
            this.classList.add('active');
            currentSelectedPatientId = this.dataset.patientId;
            showPatientDetails(currentSelectedPatientId);
            showPatientDetailsUI(); // Đảm bảo hiển thị chi tiết khi click vào kết quả tìm kiếm
            document.getElementById('completeConsultationBtn').style.display = 'inline-block';
        });
    });

    // Giữ bệnh nhân đang chọn active nếu có
    if (currentSelectedPatientId) {
        const activeCard = document.querySelector(`.patient-card[data-patient-id="${currentSelectedPatientId}"]`);
        if (activeCard) {
            activeCard.classList.add('active');
        }
    }
}

// Hàm đăng xuất
function logout() {
    if (confirm('Bạn có chắc chắn muốn đăng xuất?')) {
        localStorage.removeItem('loggedInUserId');
        localStorage.removeItem('loggedInUserName');
        localStorage.removeItem('loggedInUserRole');
        alert('Bạn đã đăng xuất.');
        window.location.href = 'login.html';
    }
}
window.logout = logout; // Để hàm logout có thể được gọi từ HTML

// Hàm điều khiển hiển thị UI cho phần chi tiết bệnh nhân
function showPatientDetailsUI() {
    const patientDetailsSection = document.getElementById('patientDetailsSection');
    const statisticsSection = document.getElementById('statisticsSection');
    const patientListTab = document.getElementById('patientListTab');
    const statisticsTab = document.getElementById('statisticsTab');
    const completeConsultationBtn = document.getElementById('completeConsultationBtn');

    if (patientDetailsSection) patientDetailsSection.style.display = 'block';
    if (statisticsSection) statisticsSection.style.display = 'none';

    // Kích hoạt tab "Danh sách bệnh nhân"
    if (patientListTab) {
        patientListTab.classList.add('active');
        patientListTab.setAttribute('aria-selected', 'true');
    }
    if (statisticsTab) {
        statisticsTab.classList.remove('active');
        statisticsTab.setAttribute('aria-selected', 'false');
    }

    // Hiển thị nút "Hoàn thành tư vấn" nếu có bệnh nhân được chọn
    if (completeConsultationBtn) {
        if (currentSelectedPatientId) {
            completeConsultationBtn.style.display = 'inline-block';
        } else {
            completeConsultationBtn.style.display = 'none';
        }
    }
}

// Hàm điều khiển hiển thị UI cho phần thống kê
function showStatisticsUI() {
    const patientDetailsSection = document.getElementById('patientDetailsSection');
    const statisticsSection = document.getElementById('statisticsSection');
    const patientListTab = document.getElementById('patientListTab');
    const statisticsTab = document.getElementById('statisticsTab');
    const completeConsultationBtn = document.getElementById('completeConsultationBtn');

    if (patientDetailsSection) patientDetailsSection.style.display = 'none';
    if (statisticsSection) statisticsSection.style.display = 'block';

    showStatistics(); // Cập nhật lại số liệu thống kê

    // Kích hoạt tab "Thống kê"
    if (patientListTab) {
        patientListTab.classList.remove('active');
        patientListTab.setAttribute('aria-selected', 'false');
    }
    if (statisticsTab) {
        statisticsTab.classList.add('active');
        statisticsTab.setAttribute('aria-selected', 'true');
    }

    if (completeConsultationBtn) { // Ẩn nút "Hoàn thành tư vấn" khi ở tab thống kê
        completeConsultationBtn.style.display = 'none';
    }
}


// --- DOMContentLoaded: Chạy khi toàn bộ trang được tải ---
document.addEventListener('DOMContentLoaded', function () {
    const loggedInUserId = localStorage.getItem('loggedInUserId');
    const loggedInUserName = localStorage.getItem('loggedInUserName');
    const loggedInUserRole = localStorage.getItem('loggedInUserRole');

    // Kiểm tra xem người dùng đã đăng nhập và có vai trò là bác sĩ không
    if (!loggedInUserId || loggedInUserRole !== 'doctor') {
        alert('Bạn cần đăng nhập với tư cách Bác sĩ để truy cập trang này.');
        window.location.href = 'login.html';
        return;
    }

    // Hiển thị tên bác sĩ trên giao diện
    const doctorNameDisplayElement = document.getElementById('doctorNameDisplay');
    const doctorNameDisplaySidebarElement = document.getElementById('doctorNameDisplaySidebar');
    if (doctorNameDisplayElement) {
        doctorNameDisplayElement.textContent = `${loggedInUserName}`;
    }
    if (doctorNameDisplaySidebarElement) {
        doctorNameDisplaySidebarElement.textContent = `${loggedInUserName}`;
    }

    // Tải dữ liệu ban đầu
    loadInitialPatientsData();
    // loadPatients() sẽ tự động chọn bệnh nhân đầu tiên nếu có
    loadPatients();
    showStatistics(); // Cập nhật số liệu thống kê ban đầu

    // Quyết định chế độ xem ban đầu:
    // Sau khi loadPatients() đã thiết lập currentSelectedPatientId (nếu có bệnh nhân),
    // chúng ta sẽ quyết định hiển thị phần nào.
    const loggedInDoctorEmail = localStorage.getItem('loggedInUserId');
    const patientsForCurrentDoctor = allPatientsData.filter(patient =>
        patient.assignedDoctorEmail === loggedInDoctorEmail
    );

    if (patientsForCurrentDoctor.length > 0) {
        showPatientDetailsUI(); // Hiển thị chi tiết bệnh nhân (và danh sách)
    } else {
        showStatisticsUI(); // Hiển thị thống kê nếu không có bệnh nhân nào
    }


    document.getElementById('updateHealthDataBtn')?.addEventListener('click', function () {
        alert('Chức năng cập nhật dữ liệu sức khỏe (chưa được triển khai đầy đủ) sẽ được xử lý tại đây.');
    });


    document.getElementById('completeConsultationBtn')?.addEventListener('click', completeConsultation);
    document.getElementById('sendMessageBtn')?.addEventListener('click', sendMessage);
    document.getElementById('messageInput')?.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            sendMessage();
        }
    });


    document.getElementById('searchPatient')?.addEventListener('input', filterPatients);

    // Gắn sự kiện cho các tab điều hướng
    document.getElementById('patientListTab')?.addEventListener('click', showPatientDetailsUI);
    document.getElementById('statisticsTab')?.addEventListener('click', showStatisticsUI);
});

function deleteMessage(patientId, messageIndex) {
    if (!confirm('Bạn có chắc chắn muốn xóa tin nhắn này không?')) {
        return;
    }

    const patient = allPatientsData.find(p => p.id === patientId);
    if (!patient || !patient.messages || messageIndex === undefined || messageIndex < 0 || messageIndex >= patient.messages.length) {
        console.error('Không thể xóa tin nhắn: Bệnh nhân hoặc tin nhắn không hợp lệ.');
        return;
    }


    patient.messages.splice(messageIndex, 1);


    localStorage.setItem('patientsData', JSON.stringify(allPatientsData));

    // Tải lại tin nhắn để cập nhật giao diện
    loadMessages(patientId);

    alert('Tin nhắn đã được xóa!');
}