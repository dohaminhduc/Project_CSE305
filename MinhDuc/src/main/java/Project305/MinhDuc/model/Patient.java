package Project305.MinhDuc.model;

import java.time.LocalDate;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.PrimaryKeyJoinColumn;
import jakarta.persistence.Table;

@Entity
@Table(name = "Patients")
@PrimaryKeyJoinColumn(name = "id")
public class Patient extends User {

    @Column(name = "dob")
    private LocalDate dob;

    @Column(name = "age")
    private Integer age;

    @Column(name = "payment_status")
    @Enumerated(EnumType.STRING)
    private PaymentStatus paymentStatus;

    @OneToMany(mappedBy = "patient", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<HealthData> healthRecords;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
        name = "doctor_patient",
        joinColumns = @JoinColumn(name = "patient_id"),
        inverseJoinColumns = @JoinColumn(name = "doctor_id")
    )

    private List<Doctor> doctors;

    
    public Patient() {
        super(); 
    }

    public Patient(String email, String password, String name, LocalDate dob) {
        super(email, password, name, UserType.PATIENT, java.time.LocalDateTime.now());
        this.dob = dob;
        this.age = LocalDate.now().getYear() - dob.getYear();
    }

    // Getters và Setters
    public LocalDate getDob() {
        return dob;
    }

    public void setDob(LocalDate dob) {
        this.dob = dob;
        this.age = LocalDate.now().getYear() - dob.getYear();
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public PaymentStatus getPaymentStatus() {
        return paymentStatus;
    }

    public void setPaymentStatus(PaymentStatus paymentStatus) {
        this.paymentStatus = paymentStatus;
    }

    public List<HealthData> getHealthRecords() {
        return healthRecords;
    }

    public void setHealthRecords(List<HealthData> healthRecords) {
        this.healthRecords = healthRecords;
    }

    public List<Doctor> getDoctors() {
        return doctors;
    }

    public void setDoctors(List<Doctor> doctors) {
        this.doctors = doctors;
    }
}