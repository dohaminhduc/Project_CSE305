package Project305.MinhDuc.service;

import java.security.Principal;
import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import Project305.MinhDuc.model.ConsultationRequest;
import Project305.MinhDuc.model.ConsultationStatus;
import Project305.MinhDuc.model.Doctor;
import Project305.MinhDuc.model.Patient;
import Project305.MinhDuc.repository.ConsultationRequestRepository;
import Project305.MinhDuc.repository.DoctorRepository;
import Project305.MinhDuc.repository.PatientRepository;

@Service
public class DoctorService {

    private final PatientRepository patientRepository;
    private final DoctorRepository doctorRepository;
    private final ConsultationRequestRepository consultationRequestRepository;

    public DoctorService(PatientRepository patientRepository, 
                         DoctorRepository doctorRepository, 
                         ConsultationRequestRepository consultationRequestRepository) {
        this.patientRepository = patientRepository;
        this.doctorRepository = doctorRepository;
        this.consultationRequestRepository = consultationRequestRepository;
    }

    public List<Patient> getRegisteredPatients(Principal principal) {
        String doctorEmail = principal.getName();
        Doctor doctor = doctorRepository.findByEmail(doctorEmail);
        if (doctor == null) {
            return Collections.emptyList();
        }
        return patientRepository.findByDoctorsId(doctor.getId());
    }

    public void requestConsultationWithPatient(Long patientId, Principal principal) {
        String doctorEmail = principal.getName();
        Doctor doctor = doctorRepository.findByEmail(doctorEmail);

        Optional<Patient> patientOptional = patientRepository.findById(patientId);

        if (doctor == null || !patientOptional.isPresent()) {
            System.out.println("Doctor or Patient not found. Cannot create consultation request.");
            return;
        }

        Patient patient = patientOptional.get();

        ConsultationRequest request = new ConsultationRequest();
        request.setDoctor(doctor);
        request.setPatient(patient);
        request.setStatus(ConsultationStatus.PENDING);
        request.setRequestTime(LocalDateTime.now());

        consultationRequestRepository.save(request);
    }
}