package Project305.MinhDuc.model;

import java.time.LocalDateTime; 
import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.PrimaryKeyJoinColumn;
import jakarta.persistence.Table;

@Entity
@Table(name = "Doctors")
@PrimaryKeyJoinColumn(name = "id")
public class Doctor extends User {

    @ManyToMany(mappedBy = "doctors", fetch = FetchType.LAZY)
    private List<Patient> patients;

    public Doctor() {
        super(); 
    }

    public Doctor(String email, String password, String name) {
        super(email, password, name, UserType.DOCTOR, LocalDateTime.now());
    }

    public List<Patient> getPatients() {
        return patients;
    }

    public void setPatients(List<Patient> patients) {
        this.patients = patients;
    }
}
