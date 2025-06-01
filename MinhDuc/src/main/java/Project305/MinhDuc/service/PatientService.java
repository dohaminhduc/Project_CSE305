package Project305.MinhDuc.service;

import java.security.Principal;
import java.time.LocalDate;
import java.time.Period;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import Project305.MinhDuc.model.ConsultationRequest;
import Project305.MinhDuc.model.ConsultationStatus;
import Project305.MinhDuc.model.Doctor;
import Project305.MinhDuc.model.HealthData;
import Project305.MinhDuc.model.Patient;
import Project305.MinhDuc.model.PaymentStatus;
import Project305.MinhDuc.repository.ConsultationRequestRepository;
import Project305.MinhDuc.repository.DoctorRepository;
import Project305.MinhDuc.repository.HealthDataRepository;
import Project305.MinhDuc.repository.PatientRepository;

@Service
public class PatientService {

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private HealthDataRepository healthDataRepository;

    @Autowired
    private ConsultationRequestRepository consultationRequestRepository;

    
    public List<HealthData> getHealthDataForLoggedInPatient(Principal principal) {
        String username = principal.getName();
        Patient patient = patientRepository.findByEmail(username);
        if (patient != null) {
            return healthDataRepository.findByPatientId(patient.getId());
        }
        return null;
    }

   public void requestConsultation(Long doctorId, Principal principal) {
    String username = principal.getName();
    Patient patient = patientRepository.findByEmail(username);
    Optional<Doctor> doctorOpt = doctorRepository.findById(doctorId);

    if (patient != null && doctorOpt.isPresent()) {
        ConsultationRequest request = new ConsultationRequest();
        request.setDoctor(doctorOpt.get());
        request.setPatient(patient);
        request.setStatus(ConsultationStatus.ACCEPTED);
        request.setRequestTime(java.time.LocalDateTime.now());
        consultationRequestRepository.save(request);
    }
}

    public void handlePayment(Principal principal) {
        String username = principal.getName();
        Patient patient = patientRepository.findByEmail(username);
        if (patient != null) {
            patient.setPaymentStatus(PaymentStatus.FAILED);
            patientRepository.save(patient);
        }
    }

    public int getAge(Principal principal) {
        String username = principal.getName();
        Patient patient = patientRepository.findByEmail(username);
        if (patient != null && patient.getDob() != null) {
            return Period.between(patient.getDob(), LocalDate.now()).getYears();
        }
        return 0;
    }
}