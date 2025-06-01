package Project305.MinhDuc.service;

import java.security.Principal;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import Project305.MinhDuc.model.ConsultationRequest;
import Project305.MinhDuc.model.ConsultationStatus;
import Project305.MinhDuc.model.Doctor;
import Project305.MinhDuc.repository.ConsultationRequestRepository;
import Project305.MinhDuc.repository.DoctorRepository;

@Service
public class ConsultationService {

    @Autowired
    private ConsultationRequestRepository consultationRequestRepository;

    @Autowired
    private DoctorRepository doctorRepository;

    
    public List<ConsultationRequest> getPendingRequests(Principal principal) {
        Doctor doctor = doctorRepository.findByEmail(principal.getName());
        return consultationRequestRepository.findByStatusAndDoctor(ConsultationStatus.PENDING, doctor);
    }

    
    public boolean acceptRequest(Long id, Principal principal) {
        Doctor doctor = doctorRepository.findByEmail(principal.getName());
        Optional<ConsultationRequest> optionalRequest = consultationRequestRepository.findById(id);

        if (optionalRequest.isPresent()) {
            ConsultationRequest request = optionalRequest.get();

            if (!request.getDoctor().equals(doctor) || !ConsultationStatus.PENDING.equals(request.getStatus())) {
                return false;
            }

            request.setStatus(ConsultationStatus.ACCEPTED);
            consultationRequestRepository.save(request);
            return true;
        }

        return false;
    }

    
    public boolean rejectRequest(Long id, Principal principal) {
        Doctor doctor = doctorRepository.findByEmail(principal.getName());
        Optional<ConsultationRequest> optionalRequest = consultationRequestRepository.findById(id);

        if (optionalRequest.isPresent()) {
            ConsultationRequest request = optionalRequest.get();

            if (!request.getDoctor().equals(doctor) || !ConsultationStatus.PENDING.equals(request.getStatus())) {
                return false;
            }

            request.setStatus(ConsultationStatus.REJECTED);
            consultationRequestRepository.save(request);
            return true;
        }

        return false;
    }
}