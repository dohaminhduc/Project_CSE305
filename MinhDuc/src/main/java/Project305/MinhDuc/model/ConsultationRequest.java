package Project305.MinhDuc.model;

import java.time.LocalDateTime;

public class ConsultationRequest {
    private Long id;
    private Doctor doctor;
    private Patient patient;
    private String status;
    private LocalDateTime requestTIme;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Doctor getDoctor() {
        return doctor;
    }

    public void setDoctor(Doctor doctor) {
        this.doctor = doctor;
    }

    public Patient getPatient() {
        return patient;
    }

    public void setPatient(Patient patient) {
        this.patient = patient;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDateTime getRequestTIme() {
        return requestTIme;
    }

    public void setRequestTIme(LocalDateTime requestTIme) {
        this.requestTIme = requestTIme;
    }

}
