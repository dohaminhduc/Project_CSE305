package Project305.MinhDuc.model;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "Doctors")
public class Doctor extends User {

    @OneToMany(mappedBy = "doctor", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Patient> listOfPatient;

    public Doctor() {
        super();
        setUserType(UserType.DOCTOR);
    }

    public Doctor(String id, String username, String password, String email, List<Patient> listOfPatient) {
        super(id, username, password, email, UserType.DOCTOR);
        this.listOfPatient = listOfPatient;
    }

    public List<Patient> getListOfPatient() {
        return listOfPatient;
    }

    public void setListOfPatient(List<Patient> listOfPatient) {
        this.listOfPatient = listOfPatient;
    }
}
