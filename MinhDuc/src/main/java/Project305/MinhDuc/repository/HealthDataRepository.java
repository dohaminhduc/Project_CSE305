package Project305.MinhDuc.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import Project305.MinhDuc.model.HealthData;

@Repository
public interface HealthDataRepository extends JpaRepository<HealthData, String> {
    List<HealthData> findByPatientId(String patientId);

    List<Object> findByUser(String patientId, String doctorId);
}
