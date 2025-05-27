package Project305.MinhDuc.model;

import java.time.LocalDate;
import java.util.ArrayList;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "Patients")
public class Patient extends User{
    private LocalDate dob;
    private ArrayList<HealthData> healthRecords;
    private String paymentStatus;

    public String getPaymentStatus() {
        return paymentStatus;
    }
    public void setPaymentStatus(String paymentStatus) {
        this.paymentStatus = paymentStatus;
    }
    public LocalDate getDob() {
        return dob;
    }
    public void setDob(LocalDate dob) {
        this.dob = dob;
    }
    public ArrayList<HealthData> getHealthRecords() {
        return healthRecords;
    }
    public void setHealthRecords(ArrayList<HealthData> healthRecords) {
        this.healthRecords = healthRecords;
    }
}
