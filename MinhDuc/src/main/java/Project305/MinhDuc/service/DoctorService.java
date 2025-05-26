package Project305.MinhDuc.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.time.LocalDateTime;
import java.util.List;

import Project305.MinhDuc.model.ConsultationRequest;
import Project305.MinhDuc.model.Doctor;
import Project305.MinhDuc.model.Patient;
import Project305.MinhDuc.repository.ConsultationRequestRepository;
import Project305.MinhDuc.repository.PatientRepository;
import Project305.MinhDuc.repository.DoctorRepository;

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
        if (doctor != null) {
            return patientRepository.findPatientsByDoctorId(doctor.getId());
        }
        return null;
    }

    public void requestConsultationWithPatient(Long patientId, Principal principal) {
        String username = principal.getName();
        Doctor doctor = doctorRepository.findByUsername(username);
        Patient patient = patientRepository.findById(patientId);

        if (doctor != null && patient != null) {
            ConsultationRequest request = new ConsultationRequest();
            request.setDoctor(doctor);
            request.setPatient(patient);
            request.setStatus("PENDING");
            request.setRequestTime(LocalDateTime.now());

            consultationRequestRepository.save(request);
        }
    }
}
