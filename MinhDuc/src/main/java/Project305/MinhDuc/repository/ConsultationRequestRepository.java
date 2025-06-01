package Project305.MinhDuc.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import Project305.MinhDuc.model.ConsultationRequest;
import Project305.MinhDuc.model.ConsultationStatus;
import Project305.MinhDuc.model.Doctor;

public interface ConsultationRequestRepository extends JpaRepository<ConsultationRequest, Long> {
    List<ConsultationRequest> findByStatusAndDoctor(ConsultationStatus status, Doctor doctor);
}