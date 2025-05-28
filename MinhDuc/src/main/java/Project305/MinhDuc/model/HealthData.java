package Project305.MinhDuc.model;

import java.math.BigDecimal;
import java.time.LocalDateTime; 

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "HealthData")
public class HealthData {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "patient_id", nullable = false)
    private Patient patient; 

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sensor_id", nullable = false)
    private Sensor sensor; 

    @Column(name = "recorded_value", nullable = false, precision = 10, scale = 2)
    private BigDecimal recordedValue;

    @Column(name = "recorded_at")
    private LocalDateTime recordedAt;

    // Constructors
    public HealthData() {
        this.recordedAt = LocalDateTime.now();
    }

    public HealthData(Patient patient, Sensor sensor, BigDecimal recordedValue) {
        this();
        this.patient = patient;
        this.sensor = sensor;
        this.recordedValue = recordedValue;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Patient getPatient() {
        return patient;
    }

    public void setPatient(Patient patient) {
        this.patient = patient;
    }

    public Sensor getSensor() {
        return sensor;
    }

    public void setSensor(Sensor sensor) {
        this.sensor = sensor;
    }

    public BigDecimal getRecordedValue() {
        return recordedValue;
    }

    public void setRecordedValue(BigDecimal recordedValue) {
        this.recordedValue = recordedValue;
    }

    public LocalDateTime getRecordedAt() {
        return recordedAt;
    }

    public void setRecordedAt(LocalDateTime recordedAt) {
        this.recordedAt = recordedAt;
    }
}
