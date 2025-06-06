package Project305.MinhDuc.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import Project305.MinhDuc.model.HealthData;

@Repository
public interface HealthDataRepository extends JpaRepository<HealthData, Long> {
    List<HealthData> findByPatientId(Long patientId);
    List<HealthData> findByPatient_IdAndPatient_Doctors_Id(Long patientId, Long doctorId);
}