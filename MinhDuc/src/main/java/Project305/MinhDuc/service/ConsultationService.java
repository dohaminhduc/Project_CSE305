package Project305.MinhDuc.service;

import java.security.Principal;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import Project305.MinhDuc.model.ConsultationRequest;
import Project305.MinhDuc.model.Doctor;
import Project305.MinhDuc.repository.ConsultationRequestRepository;
import Project305.MinhDuc.repository.DoctorRepository;

@Service
public class ConsultationService {

    @Autowired
    private ConsultationRequestRepository consultationRequestRepository;

    @Autowired
    private DoctorRepository doctorRepository;

    // Lấy tất cả yêu cầu "PENDING" dành cho bác sĩ hiện tại
    public List<ConsultationRequest> getPendingRequests(Principal principal) {
        Doctor doctor = doctorRepository.findByUsername(principal.getName());
        return consultationRequestRepository.findByStatusAndDoctor("PENDING", doctor);
    }

    // Chấp nhận yêu cầu
    public boolean acceptRequest(Long id, Principal principal) {
        Doctor doctor = doctorRepository.findByUsername(principal.getName());
        Optional<ConsultationRequest> optionalRequest = consultationRequestRepository.findById(id);

        if (optionalRequest.isPresent()) {
            ConsultationRequest request = optionalRequest.get();

            if (!request.getDoctor().equals(doctor) || !"PENDING".equals(request.getStatus())) {
                return false;
            }

            request.setStatus("ACCEPTED");
            consultationRequestRepository.save(request);
            return true;
        }

        return false;
    }

    // Từ chối yêu cầu
    public boolean rejectRequest(Long id, Principal principal) {
        Doctor doctor = doctorRepository.findByUsername(principal.getName());
        Optional<ConsultationRequest> optionalRequest = consultationRequestRepository.findById(id);

        if (optionalRequest.isPresent()) {
            ConsultationRequest request = optionalRequest.get();

            if (!request.getDoctor().equals(doctor) || !"PENDING".equals(request.getStatus())) {
                return false;
            }

            request.setStatus("REJECTED");
            consultationRequestRepository.save(request);
            return true;
        }

        return false;
    }
}
