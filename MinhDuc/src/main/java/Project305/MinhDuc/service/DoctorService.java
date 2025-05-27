package Project305.MinhDuc.service;

import java.security.Principal;
import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import Project305.MinhDuc.model.ConsultationRequest;
import Project305.MinhDuc.model.Doctor;
import Project305.MinhDuc.model.Patient;
import Project305.MinhDuc.repository.ConsultationRequestRepository;
import Project305.MinhDuc.repository.DoctorRepository;
import Project305.MinhDuc.repository.PatientRepository;

@Service
public class DoctorService {

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private ConsultationRequestRepository consultationRequestRepository;

    public List<Patient> getRegisteredPatients(Principal principal) {
        String username = principal.getName();
        Doctor doctor = doctorRepository.findByUsername(username);
        if (doctor == null) {
            return Collections.emptyList();
        }
        return patientRepository.findPatientsByDoctorId(doctor.getId());
    }

    public void requestConsultationWithPatient(String patientId, Principal principal) {
        String username = principal.getName();
        Doctor doctor = doctorRepository.findByUsername(username);
        Optional<Patient> patient = patientRepository.findById(patientId);

        if (doctor == null || !patient.isPresent()) {
            return;
        }

        ConsultationRequest request = new ConsultationRequest();
        request.setDoctor(doctor);
        request.setPatient(patient.get()); 
        request.setStatus("PENDING");
        request.setRequestTime(LocalDateTime.now());

        consultationRequestRepository.save(request);
    }
}
