-- Tạo database nếu chưa tồn tại
CREATE DATABASE IF NOT EXISTS health_management;

-- Sử dụng database
USE health_management;

CREATE TABLE if not exists Users (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    user_type ENUM('DOCTOR', 'PATIENT') NOT NULL,
    created_at datetime
);

CREATE TABLE if not exists Doctors (
    id BIGINT PRIMARY KEY,
    FOREIGN KEY (id) REFERENCES Users(id) ON DELETE CASCADE
);

CREATE TABLE if not exists Patients (
    id BIGINT PRIMARY KEY,
    dob DATE NOT NULL,
    FOREIGN KEY (id) REFERENCES Users(id) ON DELETE CASCADE
);

CREATE TABLE if not exists Doctor_Patient (
    doctor_id BIGINT,
    patient_id BIGINT,
    PRIMARY KEY (doctor_id, patient_id),
    FOREIGN KEY (doctor_id) REFERENCES Doctors(id) ON DELETE CASCADE,
    FOREIGN KEY (patient_id) REFERENCES Patients(id) ON DELETE CASCADE
);

CREATE TABLE if not exists Sensors (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    sensor_id VARCHAR(50) NOT NULL,
    sensor_type ENUM('TEMPERATURE', 'BLOODPRESSURE', 'HEARTRATE') NOT NULL,
    patient_id BIGINT NOT NULL,
    FOREIGN KEY (patient_id) REFERENCES Patients(id) ON DELETE CASCADE
);

CREATE TABLE if not exists HealthData (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    patient_id BIGINT NOT NULL,
    temperature DOUBLE,
    blood_pressure DOUBLE,
    heart_rate DOUBLE,
    timestamp DATETIME NOT NULL,
    FOREIGN KEY (patient_id) REFERENCES Patients(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS ConsultationRequests (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    doctor_id BIGINT,
    patient_id BIGINT,
    status ENUM('PENDING', 'ACCEPTED', 'REJECTED') NOT NULL,
    request_time DATETIME NOT NULL,
    FOREIGN KEY (doctor_id) REFERENCES Doctors(id) ON DELETE SET NULL,
    FOREIGN KEY (patient_id) REFERENCES Patients(id) ON DELETE CASCADE 
);

-- Thêm người dùng (Users)
INSERT INTO Users (name, email, password, user_type) VALUES
('Dr. John Smith', 'dr.john@example.com', 'password123', 'DOCTOR'),
('Dr. Emily Nguyen', 'dr.emily@example.com', 'securepass', 'DOCTOR'),
('Alice Brown', 'alice@example.com', 'alicepass', 'PATIENT'),
('Bob Green', 'bob@example.com', 'bobpass', 'PATIENT');

-- Gán người dùng là Doctor hoặc Patient
INSERT INTO Doctors (id) VALUES (1), (2);  -- Dr. John Smith & Dr. Emily Nguyen
INSERT INTO Patients (id, dob) VALUES 
(3, '1990-04-15'), -- Alice Brown
(4, '1985-11-22'); -- Bob Green

-- Gán mối quan hệ bác sĩ - bệnh nhân
INSERT INTO Doctor_Patient (doctor_id, patient_id) VALUES
(1, 3),  -- Dr. John Smith monitors Alice
(2, 4);  -- Dr. Emily Nguyen monitors Bob

-- Thêm cảm biến (Sensors)
INSERT INTO Sensors (sensor_id, sensor_type, patient_id) VALUES
('SEN001', 'TEMPERATURE', 3),
('SEN002', 'BLOODPRESSURE', 3),
('SEN003', 'HEARTRATE', 3),
('SEN004', 'TEMPERATURE', 4),
('SEN005', 'HEARTRATE', 4);

-- Thêm dữ liệu sức khỏe (HealthData)
INSERT INTO HealthData (patient_id, temperature, blood_pressure, heart_rate, timestamp) VALUES
(3, 37.2, 120.0, 78, '2025-05-28 08:00:00'),
(3, 36.9, 118.0, 76, '2025-05-28 12:00:00'),
(4, 38.0, 130.0, 88, '2025-05-28 08:00:00'),
(4, 37.5, 125.0, 84, '2025-05-28 12:00:00');

