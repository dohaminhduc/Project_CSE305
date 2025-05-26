package Project305.MinhDuc.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import Project305.MinhDuc.model.ConsultationRequest;

@Repository
public interface ConsultationRequestRepository extends JpaRepository<ConsultationRequest, Long> {
    List<ConsultationRequest> findByStatusAndRequestedTo(String status, String requestedTo);
}
