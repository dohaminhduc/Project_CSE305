package Project305.MinhDuc.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import Project305.MinhDuc.model.ConsultationRequest;
import Project305.MinhDuc.model.Doctor;

public interface ConsultationRequestRepository extends JpaRepository<ConsultationRequest, Long> {
    List<ConsultationRequest> findByStatusAndDoctor(String status, Doctor doctor);
}
