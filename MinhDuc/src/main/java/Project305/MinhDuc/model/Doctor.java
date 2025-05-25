package Project305.MinhDuc.model;

import java.util.ArrayList;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name="Doctors")
public class Doctor extends User{
    private ArrayList<Patient> listOfPatient;

    public ArrayList<Patient> getListOfPatient() {
        return listOfPatient;
    }

    public void setListOfPatient(ArrayList<Patient> listOfPatient) {
        this.listOfPatient = listOfPatient;
    }
}
